import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cars } from '@/lib/data';
import MediaGallery from '@/components/car-detail/MediaGallery';
import CarIdentityBlock from '@/components/car-detail/CarIdentityBlock';
import LiveAuctionBanner from '@/components/car-detail/LiveAuctionBanner';
import FinancingCalculator from '@/components/car-detail/FinancingCalculator';
import SpecTabs from '@/components/car-detail/SpecTabs';
import UserActionButtons from '@/components/car-detail/UserActionButtons';
import SellerCard from '@/components/car-detail/SellerCard';

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-dvh bg-obsidian flex flex-col items-center justify-center gap-6 px-5 pt-32">
        <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-cream mb-2">السيارة غير موجودة</h1>
            <p className="text-muted text-sm max-w-sm">لا يمكن العثور على السيارة المطلوبة. تأكد من الرابط أو ارجع إلى القائمة.</p>
          </div>
          <Link
            href="/cars"
            className="px-6 py-3 rounded-xl gold-gradient-bg text-obsidian font-bold text-sm hover:shadow-gold transition-all min-h-touchLg"
        >
          تصفح السيارات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-obsidian">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-12 sm:pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mt-4 mb-6 sm:mb-8 overflow-x-auto hide-scrollbar">
          <Link href="/" className="hover:text-cream transition-colors whitespace-nowrap">الرئيسية</Link>
          <ChevronLeft size={14} className="shrink-0" />
          <Link href="/cars" className="hover:text-cream transition-colors whitespace-nowrap">السيارات</Link>
          <ChevronLeft size={14} className="shrink-0" />
          <span className="text-cream font-semibold whitespace-nowrap">{car.nameAr}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Left: Identity + Price + CTAs (sticky) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 flex flex-col gap-4 sm:gap-5">
              <div className="rounded-2xl bg-charcoal border border-subtle-border p-4 sm:p-5 flex flex-col gap-4">
                <CarIdentityBlock
                  brand={car.brand}
                  brandAr={car.brandAr}
                  name={car.name}
                  nameAr={car.nameAr}
                  year={car.year}
                  typeAr={car.typeAr}
                  mileage={car.mileage}
                  location={car.location}
                  price={car.price}
                />
                <UserActionButtons
                  carId={car.id}
                  carName={car.nameAr}
                  carPrice={car.price}
                  carImage={car.image}
                />
              </div>

              {car.isAuction && car.currentBid != null && car.bidCount != null && car.lastBidTime != null && car.endsAt != null && (
                <LiveAuctionBanner
                  currentBid={car.currentBid}
                  bidCount={car.bidCount}
                  lastBidTime={car.lastBidTime}
                  endsAt={car.endsAt}
                  carId={car.id}
                />
              )}

              <FinancingCalculator price={car.price} />

              <SellerCard seller={car.seller} />
            </div>
          </div>

          {/* Right: Gallery + Specs */}
          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            <MediaGallery
              image={car.image}
              nameAr={car.nameAr}
              isAuction={car.isAuction}
            />

            <SpecTabs car={car} />
          </div>
        </div>
      </div>
    </div>
  );
}
