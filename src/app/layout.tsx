import type { Metadata } from "next";
import { DemoProvider } from "@/components/demo-provider";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Maquirent | La fuerza detrás de tu proyecto",
    template: "%s | Maquirent",
  },
  description:
    "Propuesta visual de Maquirent Guatemala. Maquinaria pesada, camiones de volteo y soluciones de transporte.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-GT">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
