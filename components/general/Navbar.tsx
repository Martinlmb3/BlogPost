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
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <nav className="py-5 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 w-full shadow-sm">
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
          <ThemeToggle />
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-foreground cursor-pointer hover:text-green-500 transition-colors" />
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-foreground cursor-pointer hover:text-green-500 transition-colors" />
          <LogoutLink className={buttonVariants({ variant: "secondary" })}>
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LoginLink className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Login</LoginLink>
            <RegisterLink className="bg-white dark:bg-gray-800 text-green-500 border-2 border-green-500 px-4 py-2 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition-colors">
            Sign up
            </RegisterLink>
        </div>
      )}
    </nav>
  );
}