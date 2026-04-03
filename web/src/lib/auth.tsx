"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// ─── User Profile (Firestore) ────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  photoURL: string;
  phone: string;
  createdAt: unknown;
  updatedAt: unknown;
}

// ─── Auth Context ─────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Create/update user profile in Firestore
  const ensureUserProfile = async (
    firebaseUser: User,
    firstName?: string,
    lastName?: string,
  ) => {
    const userRef = doc(db, "users", firebaseUser.uid);
    const existing = await getDoc(userRef);

    if (!existing.exists()) {
      const fName = firstName || firebaseUser.displayName?.split(" ")[0] || "";
      const lName =
        lastName ||
        firebaseUser.displayName?.split(" ").slice(1).join(" ") ||
        "";

      const newProfile: Omit<UserProfile, "createdAt" | "updatedAt"> & {
        createdAt: unknown;
        updatedAt: unknown;
      } = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: `${fName} ${lName}`.trim(),
        firstName: fName,
        lastName: lName,
        photoURL: firebaseUser.photoURL || "",
        phone: firebaseUser.phoneNumber || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(userRef, newProfile);
      setProfile(newProfile as unknown as UserProfile);
    } else {
      setProfile(existing.data() as UserProfile);
    }
  };

  const signIn = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await ensureUserProfile(cred.user);
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, {
      displayName: `${firstName} ${lastName}`.trim(),
    });
    await ensureUserProfile(cred.user, firstName, lastName);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await ensureUserProfile(cred.user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
