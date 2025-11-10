import { notFound } from "next/navigation";

const ENABLE_LOGO_MAKER_PAGE = false;

export default async function LogoMakerPage() {
  if (!ENABLE_LOGO_MAKER_PAGE) {
    notFound();
  }

  const { default: LogoMakerContent } = await import("./LogoMakerContent");
  return <LogoMakerContent />;
}
