import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { HomePage } from "./_components/home";
import Dashboard from "./_components/dashboard";
import { GetUser } from "@/lib/api/auth";

export default async function Page() {
  const user = await GetUser();

  if (!user) {
    return <HomePage />
  }

  return <Dashboard user={user}/>;
} 
