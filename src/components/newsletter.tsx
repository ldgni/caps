"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // In the future, this could be connected to a backend API
    // Example: await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });

    setSubmittedEmail(email);
    setIsDialogOpen(true);
    setEmail("");
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
            className="w-full max-w-xl flex-1 rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#4A3C3C] px-6 py-3 font-bold text-[#fbf8e3] shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#5D4F4F,inset_0_-3px_0_0_#3C2D2D] transition-all active:translate-y-1 active:shadow-none">
            Subscribe Now
          </button>
        </form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-2 border-[#2e160e] bg-[#efddcc]">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#2e160e]">
              Thanks for signing up!
            </DialogTitle>
            <DialogDescription className="text-[#2e160e]/80">
              We&apos;ve added {submittedEmail} to our newsletter. You&apos;ll
              be the first to hear about our new keyboard releases and exclusive
              offers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
