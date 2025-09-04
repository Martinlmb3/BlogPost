"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Bell,User } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Blog<span className="text-green-500">Post</span>
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link
            className="text-sm font-medium hover:text-green-500 transition-colors"
            href="/posts"
          >
            Posts
          </Link>
          {user && (
            <>
              <Link
                className="text-sm font-medium hover:text-green-500 transition-colors"
                href="/my-post"
              >
                My Posts
              </Link>
              <Link
                className="text-sm font-medium hover:text-green-500 transition-colors"
                href="/create"
              >
                Create Post
              </Link>
              <Link
                className="text-sm font-medium hover:text-green-500 transition-colors"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-black cursor-pointer hover:text-green-500 transition-colors" />
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-black cursor-pointer hover:text-green-500 transition-colors" />
          <LogoutLink className={buttonVariants({ variant: "secondary" })}>
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Login</LoginLink>
            <RegisterLink className={`${buttonVariants({ variant: "outline" })} border-2 border-black-100`}>
            Sign up
            </RegisterLink>
        </div>
      )}
    </nav>
  );
}