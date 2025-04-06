"use client";

import { Keyboard, MessageSquare, SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    orderId: "",
    message: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log("Form submitted:", formData);

    // Show success dialog
    setIsDialogOpen(true);

    // Clear the form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      orderId: "",
      message: "",
    });

    // Show toast notification
    toast.success("Message sent!", {
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <main>
      <div className="container mx-auto border-[#2e160e] sm:border-x-2">
        <section className="flex flex-col border-b-2 border-[#2e160e] lg:flex-row">
          {/* Image Section - Hidden on small screens, shown on left on large screens */}
          <div className="hidden border-[#2e160e] p-6 sm:p-8 lg:flex lg:w-1/2 lg:border-r-2">
            <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
              <div className="rounded-full border-4 border-[#2e160e] bg-[#ebd5bf] p-12">
                <Keyboard className="h-32 w-32 text-[#2e160e]" />
              </div>
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="text-xl">We&apos;d love to hear from you!</p>
                <p className="max-w-md">
                  Have questions about our products, delivery times, or custom
                  keyboard options? Our team is ready to assist you with any
                  inquiries you might have.
                </p>
              </div>
            </div>
          </div>

          {/* Form Section - Full width on small screens */}
          <div className="w-full space-y-4 p-6 sm:p-8 lg:w-1/2">
            {/* Header - visible on all screen sizes */}
            <div className="flex justify-center">
              <div className="flex items-center rounded-full bg-[#2e160e] px-3 py-2">
                <MessageSquare className="text-white" />
              </div>
            </div>

            <h1 className="mb-4 text-center text-4xl font-bold uppercase md:mb-6">
              A question?
            </h1>
            <h2 className="mb-6 text-center text-xl font-medium md:mb-8">
              Send us a message!
            </h2>

            <div className="mx-auto max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-0.5">
                  <label
                    htmlFor="firstName"
                    className="block font-medium text-[#2e160e]">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60"
                  />
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="lastName"
                    className="block font-medium text-[#2e160e]">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60"
                  />
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="email"
                    className="block font-medium text-[#2e160e]">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60"
                  />
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="orderId"
                    className="block font-medium text-[#2e160e]">
                    Order ID
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60"
                  />
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="message"
                    className="block font-medium text-[#2e160e]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60"
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-[#2e160e] bg-[#ef414a] px-6 py-3 font-bold text-white shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#f15e66,inset_0_-3px_0_0_#d12b33] transition-all active:translate-y-1 active:shadow-none">
                    <SendHorizontal size={20} />
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-2 border-[#2e160e] bg-[#efddcc]">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#2e160e]">
              Thanks for your message!
            </DialogTitle>
            <DialogDescription className="text-[#2e160e]/80">
              We&apos;ve received your inquiry and will get back to you as soon
              as possible. Your message is important to us!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
