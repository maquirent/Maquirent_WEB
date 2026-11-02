"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { initialData, type SiteData } from "@/lib/data";
const KEY = "maquirent-mockup-v1";
type DemoContext = {
  data: SiteData;
  save: (value: SiteData) => boolean;
  reset: () => void;
  toast: string;
  notify: (message: string) => void;
};
const Context = createContext<DemoContext | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(initialData);
  const [toast, setToast] = useState("");
  useEffect(() => {
    function read() {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const next = JSON.parse(raw);
          if (next.home && next.contact && Array.isArray(next.products))
            setData({
              ...next,
              categories: next.categories || initialData.categories,
            });
        } else setData(initialData);
      } catch {
        /* Use the original mockup if browser storage is unavailable. */
      }
    }
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);
  function save(value: SiteData) {
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
      setData(value);
      setToast("Cambios guardados en este navegador.");
      return true;
    } catch {
      setToast(
        "No se pudo guardar. Prueba con una imagen más pequeña o habilita el almacenamiento local.",
      );
      return false;
    }
  }
  function reset() {
    try {
      localStorage.removeItem(KEY);
      setData(initialData);
      setToast("Se restauró el diseño original del mockup.");
    } catch {
      setToast("No se pudo restaurar el mockup.");
    }
  }
  return (
    <Context.Provider value={{ data, save, reset, toast, notify: setToast }}>
      {children}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </Context.Provider>
  );
}
export function useDemo() {
  const context = useContext(Context);
  if (!context) throw new Error("DemoProvider is required");
  return context;
}
export function whatsappLink(
  number: string,
  message = "Hola, me gustaría cotizar un proyecto con Maquirent.",
) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
