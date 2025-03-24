"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocale, useTranslations } from "use-intl";

// Define the type for a FAQ item from your API
interface FAQItem {
  faqId: number;
  question: string;
  answer: string;
  seq: number;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  // State to track the index of the currently open FAQ item
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const locale = useLocale();
  const t = useTranslations("ProductDetails");

  // Function to toggle the open/close state of an FAQ item
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Sort FAQs by seq if needed (assuming lower numbers should come first)
  const sortedFaqs = [...faqs].sort((a, b) => a.seq - b.seq);

  return (
    <div className="mx-auto flex flex-col px-4 py-4 mt-0 gap-4 max-w-[1920px] lg:px-[71.55px] lg:py-[60px] xlg:mt-[71.55px] xlg:gap-6">
      {/* FAQ Section Heading */}
      <h2 className="text-2xl font-semibold xlg:text-[30px]">
        {t("productFaqs")}
      </h2>

      {/* FAQ List */}
      <div className="flex flex-col">
        {sortedFaqs.map((faq, index) => (
          <div
            key={faq.faqId} // Using faqId as key since it's unique
            className="border-b border-[#D2D6DB] overflow-hidden"
          >
            {/* FAQ Question Button */}
            <button
              className={`w-full text-left h-[83.7px] flex justify-between items-center px-4 xlg:px-6 xlg:text-[20px] ${
                openIndex === index ? "bg-[#ececfd]" : "bg-white"
              }`}
              onClick={() => toggleFAQ(index)}
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
              <div
                className="px-4 py-2 text-shadeGray xlg:py-3 xlg:px-[24px] xlg:text-[20px]"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
