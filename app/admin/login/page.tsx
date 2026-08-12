"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, Button, TextInput } from "@tremor/react";
import { RiShieldUserFill, RiMailFill, RiLockFill, RiArrowRightLine } from "@remixicon/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Email atau password salah.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <main className="w-full max-w-md">
        <Card className="bg-white border border-gray-200 rounded-[2rem] shadow-sm p-8 md:p-10 flex flex-col gap-8 mx-auto">
          {/* Header */}
          <div className="text-center flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow/20 mb-4">
              <RiShieldUserFill className="w-8 h-8 text-brand-orange" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2 font-medium">PAUD Mentari</p>
          </div>

          {/* Form */}
          <div className="w-full">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl mb-6 text-center font-medium">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="email">Email Address</label>
                <TextInput 
                  id="email" 
                  type="email" 
                  icon={RiMailFill}
                  placeholder="admin@paudmentari.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="password">Password</label>
                <TextInput 
                  id="password" 
                  type="password"
                  icon={RiLockFill}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mt-1 mb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded text-brand-orange border-gray-300 focus:ring-brand-orange bg-white transition-colors" />
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-xs font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors">Forgot password?</a>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-4 px-8 rounded-2xl transition-all shadow-sm border-none mt-2 text-base"
              >
                {isLoading ? "Memproses..." : "Login to Dashboard"}
              </Button>
            </form>

            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-xs font-medium text-gray-500">
                Secure access restricted to authorized personnel only.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
