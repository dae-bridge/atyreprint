"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KeyRound, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      if (code === "auth/user-not-found") {
        // Don't reveal whether user exists — show success anyway
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await resetPassword(email);
    } catch {
      // Silently fail resend
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-jost items-center justify-center p-8 sm:p-12 lg:p-24 overflow-y-auto">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-extrabold tracking-wider text-primary">
              ATYRE<span className="text-accent">PRINT</span>
            </span>
          </Link>
        </div>

        {!submitted ? (
          <>
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3 font-jost">
              Forgot Password?
            </h1>
            <p className="text-text-muted text-[15px] mb-10 leading-relaxed">
              No worries, it happens! Enter your email address below and we'll
              send you a link to reset your password.
            </p>

            <form className="space-y-6 text-left" onSubmit={handleSubmit}>
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

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[54px] bg-primary text-white flex items-center justify-center font-bold text-[14px] tracking-widest uppercase hover:bg-black transition-colors rounded shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3 font-jost">
              Check Your Email
            </h1>
            <p className="text-text-muted text-[15px] mb-10 leading-relaxed">
              We have sent a password reset link to your email address. Please
              check your inbox and follow the instructions.
            </p>
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full h-[54px] border-2 border-primary text-primary font-bold text-[14px] tracking-widest uppercase hover:bg-primary hover:text-white transition-all rounded disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin mx-auto" />
              ) : (
                "Resend Link"
              )}
            </button>
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-text-muted hover:text-accent transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
