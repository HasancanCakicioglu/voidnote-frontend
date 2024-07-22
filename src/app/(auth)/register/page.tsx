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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { google, register, verifyEmail } from "@/actions/auth";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { updateAccountState } from "@/store/slice";
import { toast } from "@/components/ui/use-toast";

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
  const dispatch = useDispatch();
  const router = useRouter();

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
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageDialog, setErrorMessageDialog] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isDialogOpen && initialTime !== null) {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - initialTime) / 1000);
        setCountdown((prevCountdown) => Math.max(300 - elapsed, 0));
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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      let data = await register({
        username: values.username,
        email: values.emailAddress,
        password: values.password,
      });

      if (data.status === 201) {
        setDialogOpen(true);
        setInitialTime(Date.now());
      } else if (data.status === 208) {
        setDialogOpen(true);
      } else {
        setErrorMessage(data.message);
      }
      setIsSubmitting(false);
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  const handleOK = async () => {
    try {
      let data = await verifyEmail({
        email: form.getValues("emailAddress"),
        verificationCode: verificationCode,
      });

      if (data.status === 200) {
        setDialogOpen(false);
        router.push("/dashboard");
      } else {
        setErrorMessageDialog(data.message);
      }
    } catch (error) {
      setErrorMessageDialog("Failed to verify. Please try again.");
    }
  };

  return (
    <main className="flex flex-grow dark:bg-gray-900 justify-center">
      {/* Left Side: Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-10 ">
        <div className="dark:bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center ">Register</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 "
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" dark:text-gray">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        className="bg-white  border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
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
                    <FormLabel className=" dark:text-gray">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        type="email"
                        {...field}
                        className="bg-white  border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
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
                    <FormLabel className=" dark:text-gray">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="bg-white  border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
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
                    <FormLabel className=" dark:text-gray">
                      Password confirm
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password confirm"
                        type="password"
                        {...field}
                        className="bg-white  border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              {errorMessage && (
                <FormMessage className="text-red-500">
                  {errorMessage}
                </FormMessage>
              )}
            </form>
          </Form>

          <div className="mt-4 text-center">
            <p className="mb-4 ">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
            <p className="mb-4 ">Or sign in with</p>
            <GoogleOAuthProvider clientId="826732552126-6iab49okf9umiqdjg6utueln3omgcanf.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if(credentialResponse.credential){
                    let response = await google({id:credentialResponse.credential});

                    if (response.success) {
                      dispatch(updateAccountState({ email: response.data.email, profilePhotoUrl: response.data.image }));
                      router.push("/dashboard");
                    }else{
                      toast({
                        variant: "destructive",
                        title: "Something went wrong.",
                        description: response.message || "Failed to login with Google",
                      });
                    }
                  }
                }}
                onError={() => {
                  toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Failed to login with Google",
                  });
                }}
                theme="filled_blue"
              />
            </GoogleOAuthProvider>
          </div>
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
              A verification code has been sent to{" "}
              {form.getValues("emailAddress")}. Please enter it below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="mb-4">
              Time remaining: {Math.floor(countdown / 60)}:
              {String(countdown % 60).padStart(2, "0")}s
            </p>
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <DialogDescription>{errorMessageDialog}</DialogDescription>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
            <Button onClick={handleOK}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
