import ProfileSideBar from "@/components/ProfileComponents/ProfileSideBar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-xlg xlg:mx-auto">
      <div className="my-6 md:my-12 xlg:mt-[72px] xlg:mb-24">
        <div className="mx-4 lg:mx-12 xlg:mx-[72px]">
          <div className="flex gap-6 lg:gap-[80px] xl:gap-[116px] xlg:gap-[174px] items-start justify-center">
            <ProfileSideBar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
