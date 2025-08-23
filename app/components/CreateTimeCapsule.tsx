"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
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

      toast.success("Time capsule created successfully");
      setContent("");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating time capsule:", error);
      toast.error("Failed to create time capsule");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="content" className="mb-2 block">
              What do you want to remember?
            </Label>
            <Textarea
              id="content"
              placeholder="Write something you want to remember in the future..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-32"
            />
            <div className="text-xs text-muted-foreground mt-1 text-right">
              {content.length} / 1000 characters
            </div>
          </div>

          <div>
            <Label htmlFor="visibility" className="mb-2 block">
              Visibility
            </Label>
            <ToggleGroup
              type="single"
              value={isPublic ? "public" : "private"}
              onValueChange={(value) => setIsPublic(value === "public")}
              className="justify-start"
            >
              <ToggleGroupItem value="private" className="gap-2">
                Private
              </ToggleGroupItem>
              <ToggleGroupItem value="public" className="gap-2">
                Public
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-xs text-muted-foreground mt-1">
              {isPublic
                ? "Everyone can see this time capsule when it's delivered"
                : "Only you can see this time capsule"}
            </p>
          </div>

          <div>
            <Label htmlFor="unlock-date" className="mb-2 block">
              Delivery Date
            </Label>
            <div className="space-y-3">
              <ToggleGroup type="single" className="justify-start">
                <ToggleGroupItem
                  value="1year"
                  onClick={() => handleQuickDateSelect("1year")}
                  className="gap-1"
                >
                  1 Year
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="5years"
                  onClick={() => handleQuickDateSelect("5years")}
                  className="gap-1"
                >
                  5 Years
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="10years"
                  onClick={() => handleQuickDateSelect("10years")}
                  className="gap-1"
                >
                  10 Years
                </ToggleGroupItem>
              </ToggleGroup>

              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="unlock-date"
                  type="date"
                  className="pl-10"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Time Capsule"}
          </Button>
        </div>
      </form>
    </div>
  );
}
