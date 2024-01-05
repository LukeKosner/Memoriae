"use client";

import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button.tsx";

export default function Header({ destroyChat }: { destroyChat?: () => void }) {
  return (
    <div className="p-3 flex flex-row items-center justify-between bg-white border-b">
      <Button
        variant="link"
        className="text-xl font-normal hover:no-underline p-0"
        onClick={destroyChat}
      >
        Memōriae
      </Button>
      <div>
        <SignedIn>
          <UserButton afterSignOutUrl="sign-in" />
        </SignedIn>
        <div className="space-x-3">
          <SignedOut>
            <Link href="/auth/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button variant="default">Sign Up</Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

Header.defaultProps = {
  destroyChat: () => {
    window.location.href = "/";
  },
};
