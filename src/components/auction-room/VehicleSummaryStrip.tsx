import Link from 'next/link';
import { MapPin, Fuel, Palette, Calendar, Gauge, Users, ChevronLeft, ExternalLink } from 'lucide-react';

interface VehicleSummaryStripProps {
  car: {
    id: string;
    nameAr: string;
    year: number;
    mileage: number;
    location: string;
    fuel: string;
    color: string;
    image: string;
    bidCount?: number;
  };
}

function formatNumber(n: number) {
  return n.toLocaleString('ar-SA');
}

const fuelMap: Record<string, string> = {
  gasoline: 'بنزين',
  electric: 'كهرباء',
  hybrid: 'هايبرد',
};

export default function VehicleSummaryStrip({ car }: VehicleSummaryStripProps) {
  return (
    <div className="w-full border-b border-ember/15 bg-ember/[0.04]">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-xs text-muted overflow-x-auto hide-scrollbar">
        <nav className="flex items-center gap-1.5 whitespace-nowrap">
          <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3 w-3 shrink-0" />
          <Link href="/auctions" className="hover:text-gold transition-colors">المزادات</Link>
          <ChevronLeft className="h-3 w-3 shrink-0" />
          <span className="text-cream font-medium">{car.nameAr}</span>
        </nav>
      </div>

      {/* Strip content */}
      <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 pb-3">
        {/* Thumbnail */}
        <div className="relative h-12 w-16 sm:h-14 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.08]">
          <img
            src={car.image}
            alt={car.nameAr}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1 text-xs sm:text-sm min-w-0">
          <h2 className="font-bold text-cream truncate">{car.nameAr}</h2>

          <div className="hidden sm:flex items-center gap-1.5 text-muted">
            <Calendar className="h-3.5 w-3.5" />
            <span>{car.year}</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted">
            <Gauge className="h-3.5 w-3.5" />
            <span>{formatNumber(car.mileage)} كم</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-muted">
            <MapPin className="h-3.5 w-3.5" />
            <span>{car.location}</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-muted">
            <Fuel className="h-3.5 w-3.5" />
            <span>{fuelMap[car.fuel] || car.fuel}</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-muted">
            <Palette className="h-3.5 w-3.5" />
            <span>{car.color}</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Live badge + bidder count */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {car.bidCount != null && (
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted">
              <Users className="h-4 w-4" />
              <span>{car.bidCount} مزايدة</span>
            </div>
          )}

          <span className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-ember/10 border border-ember/30 px-2.5 sm:px-3 py-1 text-xs font-bold text-ember">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            مباشر
          </span>

          <Link
            href={`/cars/${car.id}`}
            className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 sm:px-3 py-1 text-xs font-bold text-gold hover:bg-gold/20 hover:border-gold/50 transition-all"
          >
            <ExternalLink size={12} />
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}
