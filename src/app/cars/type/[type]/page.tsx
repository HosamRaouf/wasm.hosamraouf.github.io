import { vehicleTypes } from '@/lib/data';
import TypeListingClient from './TypeListingClient';
import { vehicleTypeRepository } from '@/lib/repositories/VehicleTypeRepository';

export async function generateStaticParams() {
  return vehicleTypes.map((type) => ({
    type: type.id,
  }));
}

export default async function CarsByTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: typeSlug } = await params;
  const typeInfo = await vehicleTypeRepository.getById(typeSlug);

  return <TypeListingClient typeSlug={typeSlug} typeInfo={typeInfo} />;
}
