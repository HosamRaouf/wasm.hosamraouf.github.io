'use client';

import { create } from 'zustand';

interface CompareState {
  vehicles: Array<{ id: string; name: string; price: number; image: string }>;
  addVehicle: (v: { id: string; name: string; price: number; image: string }) => boolean;
  removeVehicle: (id: string) => void;
  clearVehicles: () => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  vehicles: [],
  addVehicle: (v) => {
    if (get().vehicles.length >= 2) return false;
    if (get().vehicles.some((x) => x.id === v.id)) return false;
    set({ vehicles: [...get().vehicles, v] });
    return true;
  },
  removeVehicle: (id) => set({ vehicles: get().vehicles.filter((v) => v.id !== id) }),
  clearVehicles: () => set({ vehicles: [] }),
}));

interface FavoriteState {
  ids: Set<string>;
  toggle: (id: string) => void;
  isFavorited: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  ids: new Set<string>(),
  toggle: (id) => {
    const newIds = new Set(get().ids);
    if (newIds.has(id)) newIds.delete(id);
    else newIds.add(id);
    set({ ids: newIds });
  },
  isFavorited: (id) => get().ids.has(id),
}));

interface LanguageState {
  lang: 'ar' | 'en';
  toggle: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: 'ar',
  toggle: () => set((s) => ({ lang: s.lang === 'ar' ? 'en' : 'ar' })),
}));

interface ToastState {
  message: string | null;
  show: (msg: string) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (msg) => {
    set({ message: msg });
    setTimeout(() => set({ message: null }), 2500);
  },
  hide: () => set({ message: null }),
}));
