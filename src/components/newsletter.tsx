"use client";

import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // In the future, this could be connected to a backend API
    // Example: await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });

    const submittedEmail = email;
    // Show toast notification
    toast.success("Thanks for signing up!", {
      description: `We've added ${submittedEmail} to our newsletter.`,
      duration: 5000,
    });

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
    </section>
  );
}
