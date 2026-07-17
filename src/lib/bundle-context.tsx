"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { BRAND } from "@/lib/site-config";

export interface BundleItem {
  id: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  imageUrl?: string;
  emoji: string;
  quantity: number;
  color?: string;
}

interface BundleContextValue {
  items: BundleItem[];
  totalProducts: number;
  totalQuantity: number;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  addItem: (item: Omit<BundleItem, "quantity">, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearBundle: () => void;
  lastAdded: { name: string; quantity: number; token: number } | null;
}

const BundleContext = createContext<BundleContextValue | null>(null);

const STORAGE_KEY = "nb-bundle-v1";

function readStorage(): BundleItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const subscribeNever = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

export function BundleProvider({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const [items, setItems] = useState<BundleItem[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<BundleContextValue["lastAdded"]>(null);

  // Hydrate from localStorage once the client has mounted — this can't be derived
  // during render without a server/client markup mismatch, since localStorage
  // only exists client-side.
  useEffect(() => {
    if (!mounted) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStorage());
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const addItem = useCallback((item: Omit<BundleItem, "quantity">, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...item, quantity }];
    });
    setLastAdded({ name: item.name, quantity, token: Date.now() });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearBundle = useCallback(() => setItems([]), []);

  const totalProducts = items.length;
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  const value = useMemo<BundleContextValue>(
    () => ({
      items,
      totalProducts,
      totalQuantity,
      panelOpen,
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearBundle,
      lastAdded,
    }),
    [items, totalProducts, totalQuantity, panelOpen, addItem, updateQuantity, removeItem, clearBundle, lastAdded]
  );

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>;
}

export function useBundle() {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error("useBundle must be used within a BundleProvider");
  return ctx;
}

export function buildBundleWhatsAppMessage(items: BundleItem[]): string {
  const lines = items
    .map((i) => `• ${i.name}${i.color ? ` (${i.color})` : ""}\nQuantity: ${i.quantity}`)
    .join("\n\n");
  return `Hello ${BRAND.name},\n\nI would like a quotation for the following products:\n\n${lines}\n\nPlease send me pricing, branding options and estimated delivery timelines.\n\nThank you.`;
}
