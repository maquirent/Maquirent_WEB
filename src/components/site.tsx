"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  HardHat,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
  Wrench,
  X,
  CircleDot,
  Search,
} from "lucide-react";
import { Facebook, Instagram } from "./social-icons";
import { categories, services, type Product } from "@/lib/data";
import { useDemo, whatsappLink } from "./demo-provider";

export function ArrowButton({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-outline" : "button-yellow"}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Header({ active }: { active: string }) {
  const { data } = useDemo();
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <MapPin size={13} /> Guatemala · Maquinaria y transporte en renta
          </span>
          <div>
            <a href={`tel:${data.contact.phone.replace(/[^+\d]/g, "")}`}>
              <Phone size={12} />
              {data.contact.phone}
            </a>
            <span className="topbar-email">
              <Mail size={13} />
              {data.contact.email}
            </span>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" aria-label="Maquirent, inicio" className="logo-link">
            <img
              src={data.contact.logo}
              alt="Maquirent — Maquinaria y transporte en renta"
              width="158"
              height="90"
            />
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            className={`main-nav ${open ? "open" : ""}`}
            aria-label="Navegación principal"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <Link className={active === "home" ? "active" : ""} href="/">
              Inicio
            </Link>
            <Link
              className={active === "nosotros" ? "active" : ""}
              href="/nosotros"
            >
              Nosotros
            </Link>
            <details
              className={`nav-dropdown ${active === "productos" ? "active" : ""}`}
            >
              <summary>
                Productos <ChevronDown size={13} />
              </summary>
              <div className="nav-panel">
                <Link href="/productos">
                  Ver todo el catálogo <ArrowUpRight size={14} />
                </Link>
                {data.categories.map((c) => (
                  <Link key={c.id} href={`/productos/${c.id}`}>
                    {c.name}
                    <ChevronRight size={14} />
                  </Link>
                ))}
              </div>
            </details>
            <details
              className={`nav-dropdown ${active === "servicios" ? "active" : ""}`}
            >
              <summary>
                Servicios <ChevronDown size={13} />
              </summary>
              <div className="nav-panel">
                <Link href="/servicios">
                  Todos los servicios <ArrowUpRight size={14} />
                </Link>
                {services.map((s) => (
                  <Link key={s.id} href={`/servicios#${s.id}`}>
                    {s.title}
                    <ChevronRight size={14} />
                  </Link>
                ))}
              </div>
            </details>
            <Link
              className={active === "contacto" ? "active" : ""}
              href="/contacto"
            >
              Contacto
            </Link>
          </nav>
          <div className="nav-actions">
            <Link
              href="/login"
              className="account-link"
              aria-label="Acceso de la empresa"
              title="Acceso de la empresa"
            >
              <UserRound size={20} />
            </Link>
            <ArrowButton href="/contacto">Cotizar proyecto</ArrowButton>
          </div>
        </div>
      </header>
    </>
  );
}
function Footer() {
  const { data } = useDemo();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src={data.contact.logo}
            alt="Maquirent"
            width="175"
            height="99"
          />
          <p>
            La fuerza detrás de tu proyecto.
            <br />
            Maquinaria y transporte en Guatemala.
          </p>
          <div className="social-links">
            <a
              href={data.contact.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de Maquirent"
            >
              <Facebook size={17} />
            </a>
            <a
              href={data.contact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Maquirent"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
        <div>
          <h3>Explora</h3>
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <div>
          <h3>Nuestros productos</h3>
          {data.categories.map((c) => (
            <Link key={c.id} href={`/productos/${c.id}`}>
              {c.name}
            </Link>
          ))}
          <h3 className="footer-subtitle">Nuestros servicios</h3>
          <Link href="/servicios#traslados">Traslado de maquinaria</Link>
          <Link href="/servicios#traslado-de-materiales">
            Traslado de materiales
          </Link>
        </div>
        <div>
          <h3>Hablemos de tu proyecto</h3>
          <a href={`tel:${data.contact.phone.replace(/[^+\d]/g, "")}`}>
            <Phone size={15} />
            {data.contact.phone}
          </a>
          <a href={`mailto:${data.contact.email}`}>
            <Mail size={15} />
            {data.contact.email}
          </a>
          <p>
            <MapPin size={16} />
            {data.contact.locations[0]?.address}
          </p>
          <Link
            className="footer-whatsapp"
            href={whatsappLink(data.contact.whatsapp)}
            target="_blank"
          >
            Escríbenos por WhatsApp <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Maquirent. Todos los derechos reservados.</span>
        <span className="footer-prototype">
          Propuesta visual ·{" "}
          <Link href="/login">
            Acceso de la empresa <ArrowUpRight size={12} />
          </Link>
        </span>
      </div>
    </footer>
  );
}
function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
function Hero() {
  const { data } = useDemo();
  return (
    <section className="hero">
      <img
        className="hero-photo"
        src={data.home.image}
        alt="Excavadora y camión de volteo de Maquirent trabajando en Guatemala"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-content">
        <Eyebrow light>{data.home.eyebrow}</Eyebrow>
        <h1>
          {data.home.title}
          <br />
          <em>{data.home.accent}</em>
        </h1>
        <p className="hero-description">{data.home.description}</p>
        <div className="hero-buttons">
          <ArrowButton href="/productos">Explorar catálogo</ArrowButton>
          <Link className="hero-service-link" href="/servicios">
            <span>
              <ArrowRight size={18} />
            </span>
            Conoce nuestros servicios
          </Link>
        </div>
        <div className="hero-note">
          <span className="status-dot" />
          Equipo, transporte y un mismo aliado.
        </div>
      </div>
      <div className="hero-caption">
        <span>EN EL TERRENO. CONTIGO.</span>
        <span>
          MAQUIRENT / GT <MoveUpRight size={20} />
        </span>
      </div>
      <a
        href="#soluciones"
        className="hero-scroll"
        aria-label="Explorar soluciones"
      >
        EXPLORA <span>↓</span>
      </a>
    </section>
  );
}
function SolutionsStrip() {
  return (
    <section id="soluciones" className="solutions-strip">
      <div className="container solutions-inner">
        <div className="solutions-intro">
          <span>TODO EMPIEZA CON</span>
          <strong>EL EQUIPO CORRECTO.</strong>
        </div>
        <Link href="/productos/maquinaria-pesada">
          <HardHat />
          <div>
            <strong>Maquinaria pesada</strong>
            <span>Potencia para tu obra</span>
          </div>
          <ArrowUpRight size={18} />
        </Link>
        <Link href="/productos/camiones-de-volteo">
          <Truck />
          <div>
            <strong>Camiones de volteo</strong>
            <span>Movemos tu proyecto</span>
          </div>
          <ArrowUpRight size={18} />
        </Link>
        <Link href="/productos/llantas-de-trabajo">
          <CircleDot />
          <div>
            <strong>Llantas de trabajo</strong>
            <span>Soporte para avanzar</span>
          </div>
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
function CategoryCards() {
  const { data } = useDemo();
  return (
    <div className="category-grid">
      {data.categories.map((c, i) => (
        <Link
          className={`category-card category-${i}`}
          href={`/productos/${c.id}`}
          key={c.id}
        >
          <img
            src={c.image || "/images/llanta-referencia.png"}
            alt={
              c.image ? c.name : "Imagen de referencia de una llanta de trabajo"
            }
            loading="lazy"
          />
          {!c.image && (
            <span className="reference-label">Imagen de referencia</span>
          )}
          <div className="category-shade" />
          <span className="category-number">0{i + 1} / PRODUCTOS</span>
          <div className="category-content">
            <div>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
            </div>
            <span className="square-arrow">
              <ArrowUpRight size={22} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
function CatalogIntro() {
  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <Eyebrow>NUESTRO CATÁLOGO</Eyebrow>
          <h2>
            HECHOS PARA
            <br />
            EL TRABAJO DURO.
          </h2>
        </div>
        <div className="section-heading-aside">
          <p>
            Encuentra la solución que tu proyecto necesita.
            <br />
            Nosotros te ayudamos a elegir.
          </p>
          <Link className="text-link" href="/productos">
            Ver todos los productos <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <CategoryCards />
    </section>
  );
}
function Services({ full = false }: { full?: boolean }) {
  return (
    <section
      className={`services-section section ${full ? "services-full" : ""}`}
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow light>SOLUCIONES QUE AVANZAN CONTIGO</Eyebrow>
            <h2>
              MÁS QUE EQUIPO.
              <br />
              UN ALIADO EN TU OBRA.
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              De la maquinaria al transporte, conectamos
              <br />
              lo que necesitas para poner manos a la obra.
            </p>
            {!full && (
              <Link className="text-link" href="/servicios">
                Explorar servicios <ArrowUpRight size={18} />
              </Link>
            )}
          </div>
        </div>
        <div className="service-grid">
          {services.map((s) => (
            <article className="service-card" id={s.id} key={s.id}>
              <div className="service-image">
                <img src={s.image} alt={s.title} loading="lazy" />
                <span>{s.number}</span>
              </div>
              <p className="service-tag">{s.tag}</p>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <Link className="text-link" href={`/contacto?servicio=${s.id}`}>
                Consultar servicio <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function About({ full = false }: { full?: boolean }) {
  return (
    <section className="section container about-section">
      <div className="about-visual">
        <img
          src="/images/flota.jpg"
          alt="Flota de camiones y excavadoras de Maquirent"
          loading="lazy"
        />
        <div className="about-corner">
          <HardHat size={33} />
          <span>
            MAQUIRENT<strong>CONSTRUIMOS CONFIANZA.</strong>
          </span>
        </div>
        <div className="image-label">NUESTRA FLOTA · GUATEMALA</div>
      </div>
      <div className="about-copy">
        <Eyebrow>SOMOS MAQUIRENT</Eyebrow>
        <h2>
          EL RESPALDO QUE
          <br />
          MUEVE TUS IDEAS.
        </h2>
        <p>
          Somos una empresa guatemalteca dedicada a la renta de maquinaria
          pesada y al transporte. Trabajamos junto a quienes construyen,
          transforman y hacen que los proyectos sucedan.
        </p>
        <p>
          Desde la selección del equipo hasta la coordinación del traslado,
          buscamos que encuentres una solución acorde a las necesidades de tu
          obra.
        </p>
        <div className="about-values">
          <span>
            <ShieldCheck size={21} />
            Compromiso en cada proyecto
          </span>
          <span>
            <Wrench size={21} />
            Maquinaria para cada desafío
          </span>
          <span>
            <Truck size={21} />
            Equipo y transporte en un solo lugar
          </span>
        </div>
        <ArrowButton href={full ? "/contacto" : "/nosotros"}>
          {full ? "Conversemos de tu proyecto" : "Conoce Maquirent"}
        </ArrowButton>
      </div>
    </section>
  );
}
function Process() {
  return (
    <section className="process-section">
      <div className="container">
        <div>
          <Eyebrow>ASÍ DE SENCILLO</Eyebrow>
          <h2>
            DE TU IDEA
            <br />
            AL SIGUIENTE PASO.
          </h2>
        </div>
        <div className="process-steps">
          {[
            [
              "01",
              "Cuéntanos qué necesitas",
              "Equipo, ubicación y fecha de tu proyecto.",
            ],
            [
              "02",
              "Revisamos las opciones",
              "Definimos juntos los detalles de la solución.",
            ],
            [
              "03",
              "Coordinamos contigo",
              "Acordamos disponibilidad, condiciones y traslado.",
            ],
          ].map(([n, title, desc]) => (
            <div className="process-step" key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container">
        <div>
          <p>EL SIGUIENTE GRAN PROYECTO ES EL TUYO.</p>
          <h2>HAGAMOS QUE SUCEDA.</h2>
        </div>
        <ArrowButton href="/contacto">Hablemos de tu proyecto</ArrowButton>
      </div>
    </section>
  );
}
function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-heading">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Inicio</Link>
          <ChevronRight size={12} />
          <span>{label}</span>
        </div>
        <Eyebrow>{label.toUpperCase()}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="heading-lines" aria-hidden="true" />
    </section>
  );
}
export function Modal({
  children,
  onClose,
  label,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="modal-close"
        aria-label="Cerrar ventana"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      {children}
    </dialog>
  );
}
function Catalog({ category }: { category?: string }) {
  const { data } = useDemo();
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(category || "todos");
  const items = data.products.filter(
    (p) =>
      p.active &&
      (filter === "todos" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    setFilter(category || "todos");
  }, [category]);
  return (
    <>
      <PageHeading
        label="Productos"
        title="EL EQUIPO PARA HACERLO POSIBLE."
        description="Explora nuestro catálogo y conversemos sobre lo que tu proyecto necesita."
      />
      <section className="container section catalog-section">
        <div className="catalog-toolbar">
          <div className="filter-tabs" aria-label="Filtrar productos">
            {[
              { id: "todos", name: "Todos los productos" },
              ...data.categories,
            ].map((c) => (
              <button
                key={c.id}
                className={filter === c.id ? "selected" : ""}
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={18} />
            <input
              aria-label="Buscar equipo"
              placeholder="Buscar equipo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="catalog-count">
          <span>
            {items.length} {items.length === 1 ? "equipo" : "equipos"} en el
            catálogo
          </span>
          <span>Disponibilidad y condiciones bajo consulta</span>
        </div>
        <div className="product-grid">
          {items.map((p) => (
            <article className="product-card" key={p.id}>
              <div className="product-image">
                <img src={p.image} alt={p.name} loading="lazy" />
                <span>
                  {data.categories.find((c) => c.id === p.category)?.name}
                </span>
              </div>
              <div className="product-content">
                <h2>{p.name}</h2>
                <p>{p.description}</p>
                <button className="text-link" onClick={() => setSelected(p)}>
                  Ver equipo <ArrowUpRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
        {!items.length && (
          <div className="empty-state">
            <CircleDot size={42} />
            <h2>
              {filter === "llantas-de-trabajo" && !search
                ? "UNA NUEVA CATEGORÍA EN CAMINO."
                : "NO ENCONTRAMOS ESTE EQUIPO."}
            </h2>
            <p>
              {filter === "llantas-de-trabajo" && !search
                ? "Estamos preparando el catálogo de llantas de trabajo. Consúltanos las opciones para tu equipo."
                : "Prueba con otro nombre o consulta directamente con nuestro equipo."}
            </p>
            <ArrowButton href="/contacto">Consultar opciones</ArrowButton>
            {search && (
              <button className="text-link" onClick={() => setSearch("")}>
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
        <div className="catalog-help">
          <div>
            <HardHat size={32} />
            <div>
              <h3>¿No sabes qué equipo necesitas?</h3>
              <p>
                Cuéntanos sobre tu obra. Te ayudamos a encontrar una opción.
              </p>
            </div>
          </div>
          <ArrowButton href="/contacto">Recibir asesoría</ArrowButton>
        </div>
      </section>
      {selected && (
        <Modal
          label={`Detalles de ${selected.name}`}
          onClose={() => setSelected(null)}
        >
          <img
            className="detail-image"
            src={selected.image}
            alt={selected.name}
          />
          <div className="detail-content">
            <Eyebrow>
              {data.categories.find((c) => c.id === selected.category)?.name}
            </Eyebrow>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="detail-note">
              <Check size={18} />
              Consulta modelo, ficha técnica y disponibilidad con un asesor.
            </div>
            <Link
              className="button button-yellow"
              href={whatsappLink(
                data.contact.whatsapp,
                `Hola, me interesa cotizar: ${selected.name}.`,
              )}
              target="_blank"
            >
              <MessageCircle size={18} />
              Consultar por WhatsApp <ArrowUpRight size={18} />
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
}
function Contact() {
  const { data } = useDemo();
  const [preview, setPreview] = useState(false);
  const [service, setService] = useState("");
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("servicio");
    const match = services.find((s) => s.id === id);
    if (match) setService(match.title);
  }, []);
  return (
    <>
      <PageHeading
        label="Contacto"
        title="TU PRÓXIMO PROYECTO EMPIEZA AQUÍ."
        description="Cuéntanos qué necesitas. Encontremos juntos el equipo y la solución para tu obra."
      />
      <section className="container section contact-layout">
        <div className="contact-information">
          <Eyebrow>HABLEMOS</Eyebrow>
          <h2>
            ESTAMOS PARA
            <br />
            AYUDARTE A AVANZAR.
          </h2>
          <a
            className="contact-info-row"
            href={`tel:${data.contact.phone.replace(/[^+\d]/g, "")}`}
          >
            <span>
              <Phone size={21} />
            </span>
            <div>
              <small>LLÁMANOS</small>
              <strong>{data.contact.phone}</strong>
            </div>
            <ArrowUpRight size={20} />
          </a>
          <a className="contact-info-row" href={`mailto:${data.contact.email}`}>
            <span>
              <Mail size={21} />
            </span>
            <div>
              <small>ESCRÍBENOS</small>
              <strong>{data.contact.email}</strong>
            </div>
            <ArrowUpRight size={20} />
          </a>
          <div className="contact-info-row">
            <span>
              <Clock3 size={21} />
            </span>
            <div>
              <small>HORARIO DE ATENCIÓN</small>
              <p>{data.contact.hours}</p>
            </div>
          </div>
          <Link
            href={whatsappLink(data.contact.whatsapp)}
            className="button button-dark"
            target="_blank"
          >
            <MessageCircle size={18} />
            Conversar por WhatsApp <ArrowUpRight size={17} />
          </Link>
          <div className="contact-social">
            <span>También nos encuentras en</span>
            <a
              href={data.contact.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href={data.contact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={21} />
            </a>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setPreview(true);
          }}
        >
          <h2>Cuéntanos de tu proyecto</h2>
          <p>Completa los detalles para preparar tu consulta.</p>
          <div className="form-grid">
            <label>
              Nombre completo
              <input
                name="nombre"
                placeholder="Tu nombre"
                autoComplete="name"
                required
              />
            </label>
            <label>
              Teléfono
              <input
                name="telefono"
                type="tel"
                placeholder="Ej. 4820 2303"
                autoComplete="tel"
                required
                pattern="[+0-9 ()-]{8,20}"
              />
            </label>
            <label className="span-2">
              Correo electrónico
              <input
                name="correo"
                type="email"
                placeholder="nombre@empresa.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="span-2">
              ¿Qué necesitas?
              <select
                name="servicio"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un producto o servicio
                </option>
                {data.categories.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
                {services.map((s) => (
                  <option key={s.id}>{s.title}</option>
                ))}
              </select>
            </label>
            <label className="span-2">
              Ubicación del proyecto
              <input
                name="ubicacion"
                placeholder="Municipio y departamento"
                required
              />
            </label>
            <label className="span-2">
              Detalles del proyecto
              <textarea
                name="mensaje"
                rows={4}
                placeholder="Cuéntanos sobre el equipo, la fecha o el material que necesitas mover."
                required
              />
            </label>
          </div>
          <button className="button button-yellow" type="submit">
            Preparar consulta <ArrowUpRight size={18} />
          </button>
          <p className="form-disclaimer">
            Formulario de demostración. No envía ni almacena tus datos.
          </p>
          {preview && (
            <div className="form-feedback" role="status">
              <Check size={20} />
              <div>
                <strong>Así se verá la confirmación de tu consulta.</strong>
                <p>
                  Esta es una vista previa. No se ha enviado ningún mensaje.
                </p>
              </div>
            </div>
          )}
        </form>
      </section>
      <section className="locations-section">
        <div className="container">
          <Eyebrow>CERCA DE TU PROYECTO</Eyebrow>
          <h2>ENCUÉNTRANOS.</h2>
          <div className="locations-grid">
            {data.contact.locations.map((l) => (
              <article className="location-card" key={l.id}>
                <div className="location-art">
                  <MapPin size={38} />
                  <span>MAQUIRENT · GUATEMALA</span>
                </div>
                <div>
                  <h3>{l.name}</h3>
                  <p>{l.address}</p>
                  <a
                    className="text-link"
                    href={l.map}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cómo llegar <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export function Site({
  page = "home",
  category,
}: {
  page?: "home" | "nosotros" | "productos" | "servicios" | "contacto";
  category?: string;
}) {
  const { data } = useDemo();
  return (
    <>
      <Header active={page} />
      <main id="main">
        {page === "home" && (
          <>
            <Hero />
            <SolutionsStrip />
            <CatalogIntro />
            <Services />
            <About />
            <Process />
            <ContactCTA />
          </>
        )}
        {page === "nosotros" && (
          <>
            <PageHeading
              label="Nosotros"
              title="CONSTRUIMOS RELACIONES. MOVEMOS PROYECTOS."
              description="Conoce a Maquirent, tu aliado en maquinaria y transporte en Guatemala."
            />
            <About full />
            <Process />
            <ContactCTA />
          </>
        )}
        {page === "productos" && (
          <>
            <Catalog category={category} />
            <ContactCTA />
          </>
        )}
        {page === "servicios" && (
          <>
            <PageHeading
              label="Servicios"
              title="CADA ETAPA, UNA SOLUCIÓN."
              description="Renta de maquinaria, traslado de equipos y movimiento de materiales para tu proyecto."
            />
            <Services full />
            <Process />
            <ContactCTA />
          </>
        )}
        {page === "contacto" && <Contact />}
      </main>
      <Footer />
      <a
        className="floating-whatsapp"
        href={whatsappLink(data.contact.whatsapp)}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar con Maquirent por WhatsApp"
      >
        <MessageCircle size={25} />
        <span>¿En qué te ayudamos?</span>
      </a>
    </>
  );
}
