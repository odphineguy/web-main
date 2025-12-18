import { notFound } from "next/navigation";

const ENABLE_GET_STARTED_PAGE = false;

export default async function GetStartedPage() {
  if (!ENABLE_GET_STARTED_PAGE) {
    notFound();
  }

  const { default: GetStartedContent } = await import("./GetStartedContent");
  return <GetStartedContent />;
}
