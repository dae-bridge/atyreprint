"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/account");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password"
      ) {
        setError("Invalid email or password. Please try again.");
      } else if (code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/account");
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-jost">
      {/* Left Column: Image Background */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-alt">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="AtyrePrint Printing and Embroidery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-16 text-white text-left">
          <Link href="/" className="mb-auto inline-block">
            <span className="text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              ATYRE<span className="text-accent">PRINT</span>
            </span>
          </Link>
          <div className="max-w-md">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Bring Your Vision to Life.
            </h2>
            <p className="text-white/80 text-lg font-medium">
              Log in to access your saved designs, track your recent orders, and
              continue creating stunning personalised clothing and gifts.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 text-center">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-extrabold tracking-wider text-primary">
                ATYRE<span className="text-accent">PRINT</span>
              </span>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-jost">
              Welcome Back
            </h1>
            <p className="text-text-muted text-[15px]">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-3 py-3 px-4 border border-border rounded hover:bg-surface hover:border-black/20 transition-all duration-300 group disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20"
                height="20"
                className="shrink-0 transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span className="text-[13px] font-bold text-foreground">
                Google
              </span>
            </button>
            <button className="flex-1 flex justify-center items-center gap-3 py-3 px-4 border border-border rounded hover:bg-surface hover:border-black/20 transition-all duration-300 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 20"
                width="18"
                height="20"
                fill="currentColor"
                className="shrink-0 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M15.035 15.35c-.786 1.15-1.638 2.3-2.934 2.3-1.277 0-1.69-.78-3.16-.78-1.47 0-1.928.756-3.136.78-1.258.024-2.228-1.248-3.018-2.394-1.61-2.345-2.844-6.618-1.184-9.492.822-1.428 2.292-2.328 3.894-2.352 1.222-.024 2.37.816 3.125.816.737 0 2.112-.99 3.564-.846 1.452.144 2.196.672 3.12 2.022-1.632.99-1.356 3.12.3 3.822-.738 1.122-1.668 2.262-2.472 2.922zM10.199 3.5c-.024-1.956 1.62-3.54 3.552-3.5.216 1.884-1.332 3.588-3.552 3.5z" />
              </svg>
              <span className="text-[13px] font-bold text-foreground">
                Apple
              </span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-text-muted text-[12px] uppercase tracking-wider font-semibold">
                Or Continue With Email
              </span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[13px] font-bold text-foreground mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] px-5 bg-white border border-border outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all rounded placeholder:text-gray-400 text-[15px]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mx-auto mb-2">
                <label className="block text-[13px] font-bold text-foreground uppercase tracking-wide">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[13px] font-medium text-accent hover:text-primary transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] pl-5 pr-12 bg-white border border-border outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all rounded placeholder:text-gray-400 tracking-widest text-[15px]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-[13px] text-text-muted"
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[54px] mt-6 bg-primary text-white flex items-center justify-center font-bold text-[14px] tracking-widest uppercase hover:bg-black transition-colors rounded shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-[14px] text-text-muted">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-foreground hover:text-accent transition-colors underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
