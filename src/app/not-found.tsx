import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span>MAQUIRENT / 404</span>
      <h1>ESTA RUTA NO LLEVA A LA OBRA.</h1>
      <p>La página que buscas no está disponible.</p>
      <Link className="button button-yellow" href="/">
        Volver al inicio ↗
      </Link>
    </main>
  );
}
