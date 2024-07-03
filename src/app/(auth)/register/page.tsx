"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";


import { register , verifyEmail } from "@/actions/auth"
import { redirect } from "next/navigation";



const formSchema = z
  .object({
    username: z.string().min(3),
    emailAddress: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      emailAddress: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [initialTime, setInitialTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(300); // 300 seconds = 5 minutes
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageDialog, setErrorMessageDialog] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref to store the interval ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to handle the countdown
  useEffect(() => {
    if (isDialogOpen && initialTime !== null) {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - initialTime) / 1000);
        setCountdown((prevCountdown) => Math.max(300 - elapsed, 0));
        console.log(localStorage.getItem('access_token'));
        if (countdown <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isDialogOpen, initialTime, countdown]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) =>  {

    setIsSubmitting(true);
    let data = await register({
      username: values.username,
      email: values.emailAddress,
      password: values.password,
    })

    if (data.status ===201){
      setDialogOpen(true);
      setInitialTime(Date.now());
    }else if (data.status === 208){
      setDialogOpen(true);
    }else{
      setErrorMessage(data.message)
    }
    setIsSubmitting(false);
    
  };
  

  const handleOK = async () => {
    let data = await verifyEmail({
      email: form.getValues("emailAddress"),
      verificationCode:verificationCode
    })

    if (data.status === 200){
      setDialogOpen(false);
    }else{
      setErrorMessageDialog(data.message)
    }

  };

  return (
    <main className="flex min-h-screen">
      {/* Sol Taraf: Form */}
      <div className="flex flex-col items-center justify-center w-1/2 p-10" style={{ backgroundColor: "#1c1c1c" }}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-md w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password confirm</FormLabel>
                  <FormControl>
                    <Input placeholder="Password confirm" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-white text-black" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <FormMessage>{errorMessage}</FormMessage>
          </form>
        </Form>
        
        {/* Additional Links and OAuth */}
        <div className="mt-4 text-center text-white">
          <p className="mb-8">Already have an account? <Link href="/login" className="text-blue-400">Log in</Link></p>
          <p className="m-4">Or sign in with</p>
          
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              theme="filled_blue"
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      {/* Sağ Taraf: Görsel ve Yazı */}
      <div className="relative w-1/2 h-screen overflow-hidden">
        <img
          src="/register.jpg"
          alt="Registration Background"
          className="object-cover w-full h-full max-h-screen"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Welcome to Our Platform
          </h1>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="hidden">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Code Sent</DialogTitle>
            <DialogDescription>
              A verification code has been sent to {form.getValues("emailAddress")}. Please enter it below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="mb-4">Time remaining: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}s</p>
            <Input
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          </div>
          <DialogDescription>
            {errorMessageDialog}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
            <Button onClick={handleOK}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
