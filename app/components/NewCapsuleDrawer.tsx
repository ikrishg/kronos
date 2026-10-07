"use client";

import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CreateTimeCapsule from "./CreateTimeCapsule";
import { cn } from "@/lib/utils";

type NewCapsuleDrawerProps = {
  userId: string;
  variant?: "default" | "outline";
  className?: string;
  label?: string;
  fullWidth?: boolean;
};

export default function NewCapsuleDrawer({
  userId,
  variant = "default",
  className,
  label = "New capsule",
  fullWidth = false,
}: NewCapsuleDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={variant}
          className={cn(fullWidth && "w-full", className)}
        >
          <PenSquare className="h-4 w-4" />
          {label}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-border bg-background">
        <div className="mx-auto w-full max-w-lg px-6 pb-8 pt-2">
          <CreateTimeCapsule userId={userId} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
