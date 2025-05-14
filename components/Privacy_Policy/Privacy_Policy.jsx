import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

export default function Privacy_Policy() {
  const t = useTranslations("PrivacyPolicy");
  const locale = useLocale();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800">
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="list-reset flex items-center">
          <li className="text-black font-semibold">{t("home")}</li>
          <li className="mx-2 flex items-center text-gray-400">
            <FaChevronRight size={16} />
          </li>
          <li>{t("pageTitle")}</li>
        </ol>
      </nav>
      <h1 className="text-2xl md:text-[40px] font-bold mb-6">{t("pageTitle")}</h1>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">1. {t("introduction.title")}</h2>
        <p className="mb-2">{t("introduction.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">2. {t("informationWeCollect.title")}</h2>
        <p className="mb-2">{t("informationWeCollect.description")}</p>
        <ul className="list-disc list-inside mb-2">
          <li>
            <span className="font-semibold">{t("informationWeCollect.accountInfo")}:</span> {t("informationWeCollect.accountInfoDetails")}
          </li>
          <li>
            <span className="font-semibold">{t("informationWeCollect.orderInfo")}:</span> {t("informationWeCollect.orderInfoDetails")}
          </li>
        </ul>
        <p className="font-semibold mb-1">{t("informationWeCollect.uploadedContent")}:</p>
        <p className="mb-2">{t("informationWeCollect.uploadedContentDetails")}</p>
        <p className="font-semibold mb-1">{t("informationWeCollect.communicationData")}:</p>
        <p>{t("informationWeCollect.communicationDataDetails")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">3. {t("howWeUseInfo.title")}</h2>
        <p className="mb-2 font-semibold">{t("howWeUseInfo.description")}</p>
        <ul className="list-disc list-inside mb-2">
          <li>{t("howWeUseInfo.point1")}</li>
          <li>{t("howWeUseInfo.point2")}</li>
          <li>{t("howWeUseInfo.point3")}</li>
          <li>{t("howWeUseInfo.point4")}</li>
          <li>{t("howWeUseInfo.point5")}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">4. {t("protectionInfo.title")}</h2>
        <p>{t("protectionInfo.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">5. {t("sharingInfo.title")}</h2>
        <p className="mb-2">{t("sharingInfo.description")}</p>
        <ul className="list-disc list-inside mb-2">
          <li>
            <span className="font-semibold">{t("sharingInfo.serviceProviders")}:</span> {t("sharingInfo.serviceProvidersDetails")}
          </li>
          <li>
            <span className="font-semibold">{t("sharingInfo.legalRequirements")}:</span> {t("sharingInfo.legalRequirementsDetails")}
          </li>
          <li>
            <span className="font-semibold">{t("sharingInfo.policyViolations")}:</span> {t("sharingInfo.policyViolationsDetails")}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">6. {t("uploadedContent.title")}</h2>
        <p>{t("uploadedContent.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">7. {t("updatingInfo.title")}</h2>
        <p>{t("updatingInfo.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-[600] text-[28px] mb-2">8. {t("policyChanges.title")}</h2>
        <p>{t("policyChanges.content")}</p>
      </section>

      <section>
        <h2 className="font-[600] text-[28px] mb-2">9. {t("contactInfo.title")}</h2>
        <p>
          {t("contactInfo.description")}{" "}
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