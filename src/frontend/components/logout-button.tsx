"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { FunctionSquare } from "lucide-react";
import Error from "next/error";

export function LogoutButton() {
  const router = useRouter();

  async function HandleLogout() {
    await fetch("http://localhost:5050/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    router.push("/login");
  }

  return (
    <Button variant={"outline"} onClick={HandleLogout}>
      Logout
    </Button>
  );
}
