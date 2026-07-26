'use client';

import { Heart, Scale, Share2, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCompareStore, useFavoriteStore, useToastStore } from '@/stores';

interface UserActionButtonsProps {
  carId: string;
  carName: string;
  carPrice: number;
  carImage: string;
}

const ACTIONS = [
  { id: 'favorite', label: 'المفضلة', icon: Heart },
  { id: 'compare', label: 'المقارنة', icon: Scale },
  { id: 'share', label: 'مشاركة', icon: Share2 },
  { id: 'report', label: 'إبلاغ', icon: Flag },
] as const;

export default function UserActionButtons({ carId, carName, carPrice, carImage }: UserActionButtonsProps) {
  const { toggle, isFavorited } = useFavoriteStore();
  const { addVehicle } = useCompareStore();
  const { show } = useToastStore();

  const handleClick = (id: string) => {
    switch (id) {
      case 'favorite':
        toggle(carId);
        show(isFavorited(carId) ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة');
        break;
      case 'compare':
        const added = addVehicle({ id: carId, name: carName, price: carPrice, image: carImage });
        show(added ? 'تمت الإضافة للمقارنة' : 'المقارنة ممتلئة أو السيارة مكررة');
        break;
      case 'share':
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({ title: carName, url: window.location.href });
        } else {
          show('تم نسخ الرابط');
        }
        break;
      case 'report':
        show('تم الإبلاغ — شكراً لك');
        break;
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        const isActive = action.id === 'favorite' && isFavorited(carId);

        return (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(action.id)}
            className="group relative flex h-touchSm w-touchSm items-center justify-center rounded-xl bg-charcoal border border-subtle-border hover:border-gold/40 hover:bg-gold/5 transition-all duration-200"
            title={action.label}
          >
            <Icon
              size={16}
              className={`transition-colors duration-200 ${
                isActive
                  ? 'text-danger fill-danger'
                  : 'text-muted group-hover:text-gold'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
