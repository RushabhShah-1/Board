"use client";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export const OrgSideBar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 ">
      <div className="flex items-center gap-x-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width="60" height="60" />
        </Link>
        <span className={cn("font-semibold text-2xl", font.className)}>
          Board
        </span>
      </div>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size="lg"
          variant={favorites ? "ghost" : "secondary"}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Dasboard
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant={favorites ? "secondary" : "ghost"}
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorite Dasboard
          </Link>
        </Button>
      </div>
    </div>
  );
};
