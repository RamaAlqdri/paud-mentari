"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@tremor/react";
import { Button } from "@tremor/react";
import { TextInput } from "@tremor/react";
;

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-none">
        <div className="mb-4 space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-brand-yellow flex items-center justify-center font-bold text-foreground text-xl">
              M
            </div>
          </div>
          <h3 className="text-xl font-semibold text-2xl font-bold">Admin Login</h3>
          <p className="text-sm text-gray-500">
            Masukkan kredensial Anda untuk masuk ke sistem PAUD Mentari.
          </p>
        </div>
        <div>
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium block mb-1" htmlFor="email">Email</label>
              <TextInput 
                id="email" 
                type="email" 
                placeholder="admin@paudmentari.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium block mb-1" htmlFor="password">Password</label>
              <TextInput 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
