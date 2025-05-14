import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

export default function Terms_Conditions() {
  const t = useTranslations("TermsConditions");
  const locale = useLocale();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-8 mb-8 text-gray-800">
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="list-reset flex items-center">
          <li className="text-black font-semibold">{t("home")}</li>
          <li className="mx-2 flex items-center text-gray-400">
            <FaChevronRight size={16} />
          </li>
          <li>{t("pageTitle")}</li>
        </ol>
      </nav>
      <h1 className="text-2xl md:text-[40px] font-bold mb-6">
        {t("pageTitle")}
      </h1>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">1. {t("introduction.title")}</h2>
        <p>{t("introduction.content")}</p>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">2. {t("definitions.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <b>{t("definitions.printPlus")}</b> {t("definitions.printPlusText")}
          </li>
          <li>
            <b>{t("definitions.user")}</b> {t("definitions.userText")}
          </li>
          <li>
            <b>{t("definitions.product")}</b> {t("definitions.productText")}
          </li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">3. {t("accountRegistration.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("accountRegistration.features")}</li>
          <li>{t("accountRegistration.credentials")}</li>
          <li>{t("accountRegistration.information")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">4. {t("orderPlacement.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("orderPlacement.processed")}</li>
          <li>{t("orderPlacement.rightToRefuse")}</li>
          <li>{t("orderPlacement.productionTimes")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">5. {t("customDesigns.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("customDesigns.infringe")}</li>
          <li>{t("customDesigns.grantRights")}</li>
          <li>{t("customDesigns.rejectContent")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">6. {t("pricing.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("pricing.displayed")}</li>
          <li>{t("pricing.paymentMethods")}</li>
          <li>{t("pricing.taxes")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">7. {t("shipping.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("shipping.costs")}</li>
          <li>{t("shipping.delays")}</li>
          <li>{t("shipping.information")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">8. {t("returns.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("returns.accepted")}</li>
          <li>{t("returns.requests")}</li>
          <li>{t("returns.refunds")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">9. {t("userConduct.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("userConduct.permitted")}</li>
          <li>{t("userConduct.attempts")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">10. {t("liability.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("liability.damages")}</li>
          <li>{t("liability.maximum")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">11. {t("changes.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("changes.modify")}</li>
          <li>{t("changes.notified")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">12. {t("governingLaw.title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("governingLaw.country")}</li>
          <li>{t("governingLaw.disputes")}</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">13. {t("contact.title")}</h2>
        <p>
          {t("contact.inquiries")}{" "}
          <a
            href="mailto:support@printplus.com"
            className="text-blue-600 underline"
          >
            support@printplus.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}