import BusinessCard from "@/components/ProductDetailsComponents/BusinessCard";
import FAQ from "@/components/ProductDetailsComponents/Faqs";
import ProductsSection from "@/components/ProductDetailsComponents/ProductsSection";
import Reviews from "@/components/ProductDetailsComponents/Reviews";

interface PageProps {
  params: {
    locale: string;
    id: string;
    cityId: string;
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { locale, id, cityId } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}/${cityId}`,
    {
      headers: {
        accept: "*/*",
        "Accept-Language": locale,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Failed to fetch product details");

  const { data } = await response.json();

  // Check if FAQs exist and is not empty
  const hasFAQs = data.faQs && data.faQs.length > 0;

  return (
    <div>
      <BusinessCard
        productName={data.name}
        mainFileId={data.mainFileId}
        fileIds={data.fileIds}
        description={data.description}
        productOptions={data.productOptions}
        firstPrice={data.firstPrice}
        averageRate={data.averageRate}
        reviewsCount={data.reviewsCount}
        faQs={data.faQs}
        productInstallation={data.productInstallation}
        productDesign={data.productDesign}
        productFastDelivery={data.productFastDelivery}
        designGuideLineFileId={data.designGuideLineFileId || null}
        designGuidelines={data.designGuidelines || []}
      />
      <Reviews />
      {hasFAQs && <FAQ faqs={data.faQs} />}
      <ProductsSection />
    </div>
  );
}