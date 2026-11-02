import { Site } from "@/components/site";
import { categories } from "@/lib/data";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categories.some((c) => c.id === category)) notFound();
  return <Site page="productos" category={category} />;
}
