"use client";

import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to the API endpoint
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Check if the message indicates already subscribed
        if (data.message.includes("already subscribed")) {
          // Show info toast for already subscribed emails
          toast.error("Newsletter", {
            description: data.message,
            duration: 5000,
          });
        } else {
          // Show success toast notification for new subscriptions
          toast.success("Newsletter", {
            description: data.message,
            duration: 5000,
          });

          // Clear the form on success
          setEmail("");
        }
      } else {
        // Show error toast
        toast.error("Subscription Failed", {
          description:
            data.message || "Something went wrong. Please try again.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      toast.error("Subscription Failed", {
        description:
          "Network error. Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border-b-2 border-[#2e160e] p-6 sm:p-8">
      <div className="flex flex-col gap-4 rounded-lg border-2 border-[#2e160e] bg-[#f9f2eb] p-4 sm:p-6">
        <div>
          <h2 className="text-xl font-bold uppercase md:text-2xl">
            Newsletter
          </h2>
          <p className="text-base font-medium text-gray-700">
            Don&apos;t miss the launch of the next keyboard!
          </p>
        </div>

        <form
          onSubmit={handleNewsletterSubmit}
          className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <input
            type="email"
            name="email"
            id="newsletter-email"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="w-full max-w-xl flex-1 rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60 disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#4A3C3C] px-6 py-3 font-bold text-[#fbf8e3] shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#5D4F4F,inset_0_-3px_0_0_#3C2D2D] transition-all active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>
      </div>
    </section>
  );
}
