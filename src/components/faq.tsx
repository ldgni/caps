import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="w-full p-6 sm:p-8">
      <h2 className="mb-2 text-3xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">What is Caps?</AccordionTrigger>
          <AccordionContent className="text-base">
            Caps is a premium keyboard company specializing in custom,
            handcrafted mechanical keyboards designed for both enthusiasts and
            professionals. We combine vintage aesthetics with modern technology
            to create unique typing experiences that stand out from
            mass-produced alternatives.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">
            Why would I buy from Caps?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            When you buy from Caps, you&apos;re investing in a keyboard
            that&apos;s built to last. Our keyboards feature premium components,
            thoughtful design, and unmatched craftsmanship. Each keyboard is
            meticulously assembled and tested to ensure the best typing
            experience possible. Plus, our unique retro-inspired designs make
            your setup truly one-of-a-kind.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">
            What&apos;s inside a Caps package?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            Every Caps package includes your custom-built keyboard, a detachable
            USB-C cable, a keycap puller tool, a switch puller tool, a selection
            of extra keycaps, and a comprehensive care guide. We also include a
            personalized thank-you note and stickers to welcome you to the Caps
            community.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg">
            What materials are used to build Caps keyboards?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            We use only the highest quality materials in our keyboards. Our
            cases are crafted from aircraft-grade aluminum or premium woods,
            depending on the model. Our keycaps are made from durable PBT or ABS
            plastic with dye-sublimated or double-shot legends. We offer a
            variety of premium mechanical switches from manufacturers like
            Cherry, Gateron, and Kailh. All internal components are selected for
            reliability and longevity.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg">
            How long will my Caps keyboard last?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            With proper care, a Caps keyboard is designed to last for decades.
            Our switches are rated for up to 100 million keystrokes, and our
            robust construction ensures your keyboard will remain a reliable
            tool for years to come. Many of our customers consider their Caps
            keyboard an investment that improves their daily computing
            experience for the long term.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg">
            Do you offer customization options?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            Absolutely! We offer extensive customization options including
            switch types (linear, tactile, or clicky), case colors and
            materials, keycap profiles and designs, RGB lighting configurations,
            and more. You can also request custom programmability features for
            your specific workflow needs. If you have a specific customization
            request, please reach out to our customer service team.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default FAQ;
