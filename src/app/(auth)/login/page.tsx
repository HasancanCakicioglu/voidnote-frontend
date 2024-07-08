"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login } from "@/actions/auth"; // Örneğin, auth işlemleri için bir API çağrısı

const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(6),
  });

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // API çağrısı yaparak giriş işlemini gerçekleştir
      const data = await login({
        email: values.emailAddress,
        password: values.password,
      });

      // Başarılı giriş durumunda, kullanıcıyı yönlendir
      if (data.success) {
        router.push("/dashboard"); // Örneğin, başarılı girişte dashboard'a yönlendir
      } else {
        setErrorMessage(data.message); // Giriş başarısız ise hata mesajını göster
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Failed to login. Please try again."); // Genel hata durumu
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              {...form.register("emailAddress")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              {...form.register("password")}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
