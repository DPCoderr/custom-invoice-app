'use server'

import { loginSchema } from "@/components/login-form";
import { apiFetch } from "@/lib/api/fetcher";
import { redirect } from "next/navigation";
import z from "zod";

export async function LoginAction(request: z.infer<typeof loginSchema>) {
  try {
    const data = await apiFetch('/login', {
    method: "POST",
    body: JSON.stringify(request)
  });
  } catch (error) {
    
  }
  

  redirect("/")
}