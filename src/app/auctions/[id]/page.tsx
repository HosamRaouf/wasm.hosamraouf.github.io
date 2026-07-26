import { cars } from '@/lib/data';
import { carRepository } from '@/lib/repositories/CarRepository';
import AuctionRoomClient from './AuctionRoomClient';

export async function generateStaticParams() {
  return cars
    .filter((c) => c.isAuction)
    .map((car) => ({
      id: car.id,
    }));
}

export default async function AuctionRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await carRepository.getById(id);

  if (!car || !car.isAuction) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-obsidian text-cream px-5">
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-cream mb-2">المزاد غير موجود</p>
          <p className="text-sm text-muted">هذا المزاد قد يكون انتهى أو غير متاح</p>
        </div>
      </div>
    );
  }

  return <AuctionRoomClient car={car} />;
}
