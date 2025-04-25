"use client";

import { MessageSquare, SendHorizontal } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    orderId: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to the API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Show success toast notification
        toast.success("Message sent!", {
          description: data.message,
          duration: 5000,
        });

        // Clear the form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          orderId: "",
          message: "",
        });
      } else {
        // Show error toast
        toast.error("Message Failed", {
          description:
            data.message || "Something went wrong. Please try again.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Message Failed", {
        description:
          "Network error. Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="container mx-auto border-[#2e160e] sm:border-x-2">
        <section className="flex flex-col lg:flex-row">
          {/* Image Section - Hidden on small screens, shown on left on large screens */}
          <div className="hidden border-[#2e160e] lg:flex lg:w-1/2 lg:border-r-2">
            <div className="flex h-full w-full items-center justify-center p-4">
              <div className="relative h-5/6 w-5/6 overflow-hidden rounded-lg border-2 border-[#2e160e] shadow-lg">
                <Image
                  src="/images/phone-contact.jpg"
                  alt="A phone"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                  priority
                />
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 outline-none placeholder:font-semibold placeholder:text-[#2e160e]/60"
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-[#2e160e] bg-[#ef414a] px-6 py-3 font-bold text-white shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#f15e66,inset_0_-3px_0_0_#d12b33] transition-all active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <SendHorizontal size={20} />
                        Send message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
