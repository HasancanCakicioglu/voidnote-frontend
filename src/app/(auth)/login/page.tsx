"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login } from "@/actions/auth"; // API call for authentication
import { useDispatch } from "react-redux";
import { updateAccountState } from "@/store/slice";

const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(6),
  });

export default function Login() {
  const dispatch = useDispatch();
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
      const data = await login({
        email: values.emailAddress,
        password: values.password,
      });

      if (data.success) {
        dispatch(updateAccountState({ email: data.data.email, profilePhotoUrl: data.data.image }));
        router.push("/dashboard");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Failed to login. Please try again.");
    }
  };

  return (
    <main className="flex flex-grow items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Login</h2>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"
              {...form.register("emailAddress")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"
              {...form.register("password")}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 dark:text-red-400">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-200 py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:bg-blue-600 dark:focus:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
