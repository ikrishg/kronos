"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { createTimeCapsule } from "@/app/actions/timecapsule";

interface CreateTimeCapsuleProps {
  userId: string;
}

export default function CreateTimeCapsule({ userId }: CreateTimeCapsuleProps) {
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickDateSelect = (value: string) => {
    const now = new Date();
    let date: Date;

    switch (value) {
      case "1year":
        date = new Date(now.setFullYear(now.getFullYear() + 1));
        break;
      case "5years":
        date = new Date(now.setFullYear(now.getFullYear() + 5));
        break;
      case "10years":
        date = new Date(now.setFullYear(now.getFullYear() + 10));
        break;
      default:
        date = new Date(now.setFullYear(now.getFullYear() + 1));
    }

    setDeliveryDate(date.toISOString().split("T")[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please add some content to your time capsule");
      return;
    }

    try {
      setIsSubmitting(true);

      await createTimeCapsule({
        content,
        isPublic,
        deliverAt: new Date(deliveryDate),
        userId,
      });

      toast.success("Time capsule sealed");
      setContent("");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating time capsule:", error);
      toast.error("Failed to seal capsule");
      setIsSubmitting(false);
    }
  };

  const pillToggle =
    "rounded-full border border-[rgba(255,255,255,0.25)] px-4 data-[state=on]:bg-muted data-[state=on]:text-foreground first:rounded-full last:rounded-full data-[variant=outline]:border-l";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="content" className="mb-2 block text-sm text-muted-foreground">
          What do you want to remember?
        </Label>
        <Textarea
          id="content"
          placeholder="Write something you want to remember in the future..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-32"
        />
        <div className="mt-1 text-right text-xs text-muted-foreground">
          {content.length} / 1000
        </div>
      </div>

      <div>
        <Label
          id="visibility-label"
          className="mb-2 block text-sm text-muted-foreground"
        >
          Visibility
        </Label>
        <ToggleGroup
          type="single"
          variant="outline"
          value={isPublic ? "public" : "private"}
          onValueChange={(value) => value && setIsPublic(value === "public")}
          aria-labelledby="visibility-label"
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem value="private" className={pillToggle}>
            Private
          </ToggleGroupItem>
          <ToggleGroupItem value="public" className={pillToggle}>
            Public
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <Label htmlFor="unlock-date" className="mb-2 block text-sm text-muted-foreground">
          Unlock date
        </Label>
        <div className="space-y-3">
          <Label id="unlock-duration-label" className="sr-only">
            Unlock duration preset
          </Label>
          <ToggleGroup
            type="single"
            variant="outline"
            aria-labelledby="unlock-duration-label"
            className="flex flex-wrap gap-2"
          >
            <ToggleGroupItem
              value="1year"
              onClick={() => handleQuickDateSelect("1year")}
              className={pillToggle}
            >
              1Y
            </ToggleGroupItem>
            <ToggleGroupItem
              value="5years"
              onClick={() => handleQuickDateSelect("5years")}
              className={pillToggle}
            >
              5Y
            </ToggleGroupItem>
            <ToggleGroupItem
              value="10years"
              onClick={() => handleQuickDateSelect("10years")}
              className={pillToggle}
            >
              10Y
            </ToggleGroupItem>
          </ToggleGroup>

          <Input
            id="unlock-date"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting || !content.trim()}
      >
        {isSubmitting ? "Sealing…" : "Seal capsule"}
      </Button>
    </form>
  );
}
