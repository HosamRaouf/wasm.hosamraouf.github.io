import { cars } from '@/lib/data';
import CarCard from '@/components/ui/CarCard';

export const metadata = {
  title: 'المزادات الحية | WASM',
  description: 'تابع المزادات الحية وزايد على أرقى السيارات الفاخرة في المملكة العربية السعودية',
};

export default function AuctionsPage() {
  const auctionCars = cars.filter((c) => c.isAuction);

  return (
    <div dir="rtl" className="min-h-dvh bg-obsidian text-cream font-cairo">
      <div className="px-5 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black text-cream">المزادات الحية</h1>
            <span className="flex items-center gap-2 rounded-full bg-ember/10 border border-ember/30 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-ember">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              {auctionCars.length} مزادات مباشرة
            </span>
          </div>

          <p className="text-sm text-muted">زايد الآن على أرقى السيارات الفاخرة</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {auctionCars.map((car) => (
            <div key={car.id}>
              <CarCard car={car} variant="auction" />
            </div>
          ))}
        </div>

        {auctionCars.length === 0 && (
          <div className="py-16 sm:py-20 text-center">
            <p className="text-lg font-bold text-cream mb-2">لا توجد مزادات حالياً</p>
            <p className="text-sm text-muted">تابعنا للحصول على أحدث المزادات المباشرة</p>
          </div>
        )}
      </div>
    </div>
  );
}
