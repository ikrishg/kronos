"use client";

import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
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
  /** Hide label text below md (narrow sidebar) */
  collapseLabelBelowMd?: boolean;
};

export default function NewCapsuleDrawer({
  userId,
  variant = "default",
  className,
  label = "New capsule",
  fullWidth = false,
  collapseLabelBelowMd = false,
}: NewCapsuleDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={variant}
          className={cn(
            fullWidth && "w-full",
            collapseLabelBelowMd &&
              "max-md:size-10 max-md:shrink-0 max-md:px-0 max-md:justify-center",
            className
          )}
          aria-label={collapseLabelBelowMd ? label : undefined}
        >
          <PenSquare className="h-4 w-4 shrink-0" />
          <span className={cn(collapseLabelBelowMd && "hidden md:inline")}>
            {label}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-border bg-background">
        <DrawerHeader className="sr-only">
          <DrawerTitle>New capsule</DrawerTitle>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-lg px-6 pb-8 pt-2">
          <CreateTimeCapsule userId={userId} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
