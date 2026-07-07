import Link from "next/link";
import React from "react";

export function HomePage() {
  return (
    <div>
      <h1>home</h1>
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
