import { brands } from '@/lib/data';
import BrandListingClient from './BrandListingClient';
import { brandRepository } from '@/lib/repositories/BrandRepository';

export async function generateStaticParams() {
  return brands.map((brand) => ({
    brand: brand.id,
  }));
}

export default async function CarsByBrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const brandInfo = await brandRepository.getById(brandSlug);

  return <BrandListingClient brandSlug={brandSlug} brandInfo={brandInfo} />;
}
