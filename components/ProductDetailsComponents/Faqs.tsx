"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Define the type for a FAQ item
type FAQItem = {
  question: string;
  answer: string;
};

// FAQ data
const faqs: FAQItem[] = [
  {
    question: "What is this FAQ section for?",
    answer:
      "The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details about the underlying content and can choose to expand that content within the constraints of the accordion.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply sign up and follow the on-screen instructions to begin using the platform.",
  },
  {
    question: "Where can I find more information?",
    answer:
      "You can check our documentation or contact support for further details.",
  },
  {
    question: "Can I customize this platform?",
    answer: "Yes! The platform allows full customization to suit your needs.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team via email or through our contact form.",
  },
];

export default function FAQ() {
  // State to track the index of the currently open FAQ item
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Function to toggle the open/close state of an FAQ item
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto flex flex-col px-4 py-4 mt-0 gap-4 max-w-[1920px] lg:px-[71.55px] lg:py-[60px] lg:mt-[71.55px] xlg:gap-6">
      {/* FAQ Section Heading */}
      <h2 className="text-2xl font-semibold xlg:text-[30px]">Business Card FAQs</h2>

      {/* FAQ List */}
      <div className="flex flex-col">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#D2D6DB] overflow-hidden"
          >
            {/* FAQ Question Button */}
            <button
              className={`w-full text-left h-[83.7px] flex justify-between items-center px-4 xlg:px-6 xlg:text-[20px] ${
                openIndex === index ? "bg-[#ececfd]" : "bg-white"
              }`}
              onClick={() => toggleFAQ(index)} // Toggle FAQ on click
            >
              <span className="font-medium">{faq.question}</span>
              {/* Display ChevronUp or ChevronDown based on open state */}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* FAQ Answer (Visible when open) */}
            {openIndex === index && (
              <div className="px-4 py-2 text-shadeGray xlg:py-3 xlg:px-[24px] xlg:text-[20px]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}