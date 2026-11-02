"use client";
import Link from "next/link";
import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FileImage,
  Globe,
  Home,
  ImagePlus,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  MapPin,
  Menu,
  Package,
  Pencil,
  Phone,
  Plus,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  categories,
  initialData,
  type Product,
  type Category,
  type SiteData,
} from "@/lib/data";
import { useDemo } from "./demo-provider";
import { Modal } from "./site";
type Section = "home" | "inicio" | "contacto" | "catalogo";
const navItems = [
  { id: "home", href: "/dashboard", label: "Resumen", icon: LayoutDashboard },
  {
    id: "inicio",
    href: "/dashboard/inicio",
    label: "Página de inicio",
    icon: LayoutTemplate,
  },
  {
    id: "contacto",
    href: "/dashboard/contacto",
    label: "Contacto y marca",
    icon: Phone,
  },
  {
    id: "catalogo",
    href: "/dashboard/catalogo",
    label: "Catálogo",
    icon: Package,
  },
];
function ImageUpload({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const { notify } = useDemo();
  const [library, setLibrary] = useState(false);
  function select(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 1_500_000
    ) {
      notify("Selecciona una imagen JPG, PNG o WebP de hasta 1.5 MB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  return (
    <div className="image-upload">
      <div className="upload-preview">
        {value ? (
          <img src={value} alt={`Vista previa: ${label}`} />
        ) : (
          <FileImage size={40} />
        )}
      </div>
      <div>
        <strong>{label}</strong>
        <p>JPG, PNG o WebP · Máximo 1.5 MB</p>
        <label className="button button-small button-outline-dark upload-label">
          <Upload size={15} />
          Cambiar imagen
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={select}
          />
        </label>
        <button
          className="library-toggle"
          type="button"
          aria-expanded={library}
          onClick={() => setLibrary(!library)}
        >
          Elegir de la biblioteca
        </button>
      </div>
      {library && (
        <div className="image-library" aria-label="Biblioteca de Maquirent">
          {(label.toLowerCase().includes("logo")
            ? ["logo.png"]
            : [
                "excavadora.jpg",
                "volteo.jpg",
                "lowboy.jpg",
                "flota.jpg",
                "cargador.jpg",
                "mini.jpg",
              ]
          ).map((name, i) => (
            <button
              key={name}
              type="button"
              aria-label={`Usar fotografía ${i + 1}`}
              onClick={() => {
                onChange(`/images/${name}`);
                setLibrary(false);
              }}
            >
              <img
                src={`/images/${name}`}
                alt={`Fotografía ${i + 1} de la biblioteca`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
function Panel({
  title,
  description,
  children,
  icon,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <section className="admin-panel">
      <div className="panel-heading">
        {icon && <span>{icon}</span>}
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
function Overview() {
  const { data } = useDemo();
  return (
    <>
      <div className="dashboard-welcome">
        <div>
          <span>TU SITIO, EN TUS MANOS</span>
          <h2>
            Todo listo para
            <br />
            seguir construyendo.
          </h2>
          <p>
            Administra la información y el catálogo de Maquirent
            <br />
            desde un mismo lugar.
          </p>
          <Link href="/" target="_blank" className="button button-yellow">
            Ver sitio web <ArrowUpRight size={17} />
          </Link>
        </div>
        <img src="/images/excavadora.jpg" alt="Excavadora Maquirent" />
        <div className="welcome-image-shade" />
        <span className="welcome-mark" aria-hidden="true">
          M / GT
        </span>
      </div>
      <div className="stats-grid">
        <div>
          <span className="stat-icon">
            <Package size={21} />
          </span>
          <div>
            <small>PRODUCTOS DEL CATÁLOGO</small>
            <strong>{data.products.length.toString().padStart(2, "0")}</strong>
            <p>
              {data.products.filter((p) => p.active).length} visibles en el
              sitio
            </p>
          </div>
        </div>
        <div>
          <span className="stat-icon">
            <LayoutTemplate size={21} />
          </span>
          <div>
            <small>CATEGORÍAS DE PRODUCTOS</small>
            <strong>03</strong>
            <p>Maquinaria, camiones y llantas</p>
          </div>
        </div>
        <div>
          <span className="stat-icon">
            <MapPin size={21} />
          </span>
          <div>
            <small>UBICACIONES</small>
            <strong>
              {data.contact.locations.length.toString().padStart(2, "0")}
            </strong>
            <p>Información para tus clientes</p>
          </div>
        </div>
      </div>
      <div className="dashboard-section-title">
        <h2>¿Qué vamos a actualizar hoy?</h2>
        <span>Accesos rápidos</span>
      </div>
      <div className="quick-grid">
        {[
          {
            icon: LayoutTemplate,
            title: "Página de inicio",
            desc: "Actualiza el título, la descripción y la fotografía principal.",
            href: "/dashboard/inicio",
          },
          {
            icon: Phone,
            title: "Contacto y marca",
            desc: "Edita el logo, teléfonos, redes sociales y ubicaciones.",
            href: "/dashboard/contacto",
          },
          {
            icon: Package,
            title: "Catálogo de productos",
            desc: "Agrega equipos y organiza sus fotografías e información.",
            href: "/dashboard/catalogo",
          },
        ].map((c) => (
          <Link className="quick-card" href={c.href} key={c.href}>
            <c.icon size={26} />
            <ArrowUpRight size={18} className="quick-arrow" />
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <span>
              Administrar <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      <div className="prototype-info">
        <ShieldCheck size={24} />
        <div>
          <h3>Estás explorando el mockup de Maquirent</h3>
          <p>
            Las ediciones se guardan solo en este navegador y se reflejan en la
            vista del sitio. La autenticación y Supabase se implementarán
            después de aprobar el diseño.
          </p>
        </div>
        <span>FASE 01 · DISEÑO</span>
      </div>
    </>
  );
}
function HomeEditor() {
  const { data, save } = useDemo();
  const [draft, setDraft] = useState(data.home);
  useEffect(() => {
    setDraft(data.home);
  }, [data.home]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save({ ...data, home: draft });
      }}
    >
      <div className="editor-columns">
        <div>
          <Panel
            title="El primer vistazo a Maquirent"
            description="Contenido del banner principal del sitio."
            icon={<LayoutTemplate size={20} />}
          >
            <div className="admin-form">
              <label>
                Texto superior
                <input
                  value={draft.eyebrow}
                  onChange={(e) =>
                    setDraft({ ...draft, eyebrow: e.target.value })
                  }
                  maxLength={70}
                  required
                />
              </label>
              <label>
                Título principal
                <input
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                  maxLength={42}
                  required
                />
              </label>
              <label>
                Frase destacada en amarillo
                <input
                  value={draft.accent}
                  onChange={(e) =>
                    setDraft({ ...draft, accent: e.target.value })
                  }
                  maxLength={42}
                  required
                />
              </label>
              <label>
                Descripción
                <textarea
                  rows={4}
                  value={draft.description}
                  onChange={(e) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                  maxLength={220}
                  required
                />
              </label>
            </div>
          </Panel>
          <Panel
            title="Fotografía principal"
            description="Elige una fotografía horizontal de tu maquinaria."
            icon={<ImagePlus size={20} />}
          >
            <ImageUpload
              label="Imagen del inicio"
              value={draft.image}
              onChange={(image) => setDraft({ ...draft, image })}
            />
          </Panel>
        </div>
        <aside className="editor-preview">
          <span>VISTA PREVIA DEL BANNER</span>
          <div
            className="mini-hero"
            style={{
              backgroundImage: `linear-gradient(90deg,rgba(15,18,18,.92),rgba(15,18,18,.2)),url("${draft.image}")`,
            }}
          >
            <small>{draft.eyebrow}</small>
            <h2>
              {draft.title}
              <em>{draft.accent}</em>
            </h2>
            <p>{draft.description}</p>
            <span className="mini-button">
              Explorar catálogo <ArrowUpRight size={12} />
            </span>
          </div>
          <p>
            Los cambios guardados aparecerán en la página de inicio del mockup.
          </p>
          <Link href="/" target="_blank" className="text-link">
            Abrir sitio completo <ExternalLink size={15} />
          </Link>
        </aside>
      </div>
      <div className="save-bar">
        <span>
          <CircleHelp size={16} />
          Cambios locales para revisar la propuesta.
        </span>
        <button className="button button-yellow" type="submit">
          <Save size={17} />
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
function ContactEditor() {
  const { data, save, notify } = useDemo();
  const [draft, setDraft] = useState(data.contact);
  useEffect(() => {
    setDraft(data.contact);
  }, [data.contact]);
  const set = (key: keyof typeof draft, value: string) =>
    setDraft({ ...draft, [key]: value });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\d{8,15}$/.test(draft.whatsapp.replace(/\D/g, ""))) {
          notify("Revisa el número de WhatsApp e incluye el código de país.");
          return;
        }
        save({ ...data, contact: draft });
      }}
    >
      <div className="editor-columns contact-editor-columns">
        <div>
          <Panel
            title="Información de contacto"
            description="Estos datos se muestran en el sitio público."
            icon={<Phone size={20} />}
          >
            <div className="admin-form form-grid">
              <label>
                Teléfono
                <input
                  value={draft.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  required
                />
              </label>
              <label>
                WhatsApp (con código de país)
                <input
                  value={draft.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  placeholder="50248202303"
                  required
                />
              </label>
              <label className="span-2">
                Correo electrónico
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) => set("email", e.target.value)}
                  required
                />
              </label>
              <label className="span-2">
                Horario de atención
                <input
                  value={draft.hours}
                  onChange={(e) => set("hours", e.target.value)}
                  required
                />
              </label>
            </div>
          </Panel>
          <Panel
            title="Redes sociales"
            description="Actualiza los enlaces de los perfiles de la empresa."
            icon={<Globe size={20} />}
          >
            <div className="admin-form">
              <label>
                Enlace de Facebook
                <input
                  type="url"
                  pattern="https?://.*"
                  value={draft.facebook}
                  onChange={(e) => set("facebook", e.target.value)}
                  required
                />
              </label>
              <label>
                Enlace de Instagram
                <input
                  type="url"
                  pattern="https?://.*"
                  value={draft.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  required
                />
              </label>
            </div>
          </Panel>
          <Panel
            title="Ubicaciones"
            description="Administra los puntos de atención de Maquirent."
            icon={<MapPin size={20} />}
          >
            <div className="admin-form">
              {draft.locations.map((l, i) => (
                <div className="location-editor" key={l.id}>
                  <div className="location-editor-title">
                    <strong>Ubicación {i + 1}</strong>
                    {draft.locations.length > 1 && (
                      <button
                        className="icon-button"
                        type="button"
                        aria-label={`Quitar ubicación ${i + 1}`}
                        onClick={() =>
                          setDraft({
                            ...draft,
                            locations: draft.locations.filter(
                              (x) => x.id !== l.id,
                            ),
                          })
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>
                  {(
                    [
                      ["name", "Nombre de la ubicación"],
                      ["address", "Dirección"],
                      ["map", "Enlace de Google Maps"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key}>
                      {label}
                      <input
                        type={key === "map" ? "url" : "text"}
                        pattern={key === "map" ? "https?://.*" : undefined}
                        value={l[key]}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            locations: draft.locations.map((x) =>
                              x.id === l.id
                                ? { ...x, [key]: e.target.value }
                                : x,
                            ),
                          })
                        }
                        required
                      />
                    </label>
                  ))}
                </div>
              ))}
              <button
                className="button button-outline-dark button-small"
                type="button"
                onClick={() =>
                  setDraft({
                    ...draft,
                    locations: [
                      ...draft.locations,
                      {
                        id: crypto.randomUUID(),
                        name: "",
                        address: "",
                        map: "",
                      },
                    ],
                  })
                }
              >
                <Plus size={16} />
                Agregar ubicación
              </button>
            </div>
          </Panel>
        </div>
        <aside>
          <Panel
            title="Identidad de marca"
            description="Logo utilizado en el sitio y en el panel."
          >
            <ImageUpload
              label="Logo de la empresa"
              value={draft.logo}
              onChange={(logo) => set("logo", logo)}
            />
            <p className="panel-footnote">
              Recomendamos un PNG con fondo transparente.
            </p>
          </Panel>
          <div className="contact-preview">
            <span>VISTA PREVIA DEL CONTACTO</span>
            <Phone size={25} />
            <h3>{draft.phone}</h3>
            <p>{draft.email}</p>
            <hr />
            <MapPin size={21} />
            <strong>{draft.locations[0]?.name}</strong>
            <p>{draft.locations[0]?.address}</p>
          </div>
        </aside>
      </div>
      <div className="save-bar">
        <span>
          <CircleHelp size={16} />
          Se actualizará la vista local del sitio.
        </span>
        <button className="button button-yellow" type="submit">
          <Save size={17} />
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
function CatalogEditor() {
  const { data, save } = useDemo();
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [remove, setRemove] = useState<Product | null>(null);
  const [categoryEditing, setCategoryEditing] = useState<Category | null>(null);
  const items = data.products.filter(
    (p) =>
      (filter === "todos" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );
  function newProduct() {
    setEditing({
      id: crypto.randomUUID(),
      name: "",
      category: filter === "todos" ? "maquinaria-pesada" : filter,
      image: "",
      description: "",
      active: true,
      featured: false,
    });
  }
  function persist() {
    if (!editing) return;
    const next = data.products.some((p) => p.id === editing.id)
      ? data.products.map((p) => (p.id === editing.id ? editing : p))
      : [...data.products, editing];
    if (save({ ...data, products: next })) setEditing(null);
  }
  return (
    <>
      <div className="catalog-admin-header">
        <div>
          <h2>Tu catálogo, siempre al día.</h2>
          <p>Administra lo que tus clientes ven en el sitio web.</p>
        </div>
        <button className="button button-yellow" onClick={newProduct}>
          <Plus size={18} />
          Agregar producto
        </button>
      </div>
      <div className="admin-panel catalog-table-panel">
        <div className="admin-catalog-toolbar">
          <div className="filter-tabs">
            {[{ id: "todos", name: "Todos" }, ...data.categories].map((c) => (
              <button
                key={c.id}
                aria-pressed={filter === c.id}
                className={filter === c.id ? "selected" : ""}
                onClick={() => setFilter(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} />
            <input
              placeholder="Buscar producto…"
              aria-label="Buscar producto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="table-scroll">
          <table className="catalog-table">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>CATEGORÍA</th>
                <th>VISIBILIDAD</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="table-product">
                      <img src={p.image} alt={p.name} />
                      <div>
                        <strong>{p.name}</strong>
                        <span>{p.description}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data.categories.find((c) => c.id === p.category)?.name}
                  </td>
                  <td>
                    <span
                      className={`visibility-badge ${p.active ? "visible" : "hidden"}`}
                    >
                      <span />
                      {p.active ? "Visible" : "Oculto"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="icon-button"
                        aria-label={`Editar ${p.name}`}
                        title="Editar producto"
                        onClick={() => setEditing({ ...p })}
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        className="icon-button delete-button"
                        aria-label={`Eliminar ${p.name}`}
                        title="Eliminar del mockup"
                        onClick={() => setRemove(p)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!items.length && (
          <div className="empty-state admin-empty">
            <Package size={35} />
            <h3>
              {filter === "llantas-de-trabajo"
                ? "Agrega las primeras llantas de trabajo"
                : "Todavía no hay productos aquí"}
            </h3>
            <p>
              Incorpora fotografías y datos reales para completar esta
              categoría.
            </p>
            <button
              className="button button-yellow button-small"
              onClick={newProduct}
            >
              <Plus size={16} />
              Agregar producto
            </button>
          </div>
        )}
        <div className="table-footer">
          <span>{items.length} productos en esta vista</span>
          <span>3 categorías</span>
        </div>
      </div>
      <details className="category-admin-section">
        <summary>
          <div>
            <LayoutTemplate size={20} />
            <strong>Apartados del catálogo</strong>
          </div>
          <span>
            Editar imágenes y textos <ChevronRight size={16} />
          </span>
        </summary>
        <div className="category-admin-grid">
          {data.categories.map((c) => (
            <article key={c.id}>
              <img
                src={c.image || "/images/llanta-referencia.png"}
                alt={c.name}
              />
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <button
                className="text-link"
                onClick={() => setCategoryEditing({ ...c })}
              >
                Editar apartado <Pencil size={14} />
              </button>
            </article>
          ))}
        </div>
      </details>
      <div className="prototype-info">
        <FileImage size={23} />
        <div>
          <h3>Un catálogo con información real</h3>
          <p>
            Los equipos e imágenes iniciales provienen de la página anterior.
            Las llantas están pendientes de incorporar; agrega los productos
            cuando cuentes con sus fotografías y datos.
          </p>
        </div>
      </div>
      {categoryEditing && (
        <Modal
          label="Editar apartado del catálogo"
          onClose={() => setCategoryEditing(null)}
        >
          <form
            className="product-editor"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                save({
                  ...data,
                  categories: data.categories.map((c) =>
                    c.id === categoryEditing.id ? categoryEditing : c,
                  ),
                })
              )
                setCategoryEditing(null);
            }}
          >
            <span className="eyebrow">APARTADOS DEL CATÁLOGO</span>
            <h2>Editar categoría</h2>
            <div className="admin-form">
              <ImageUpload
                label="Portada de la categoría"
                value={categoryEditing.image || "/images/llanta-referencia.png"}
                onChange={(image) =>
                  setCategoryEditing({ ...categoryEditing, image })
                }
              />
              <label>
                Nombre del apartado
                <input
                  required
                  maxLength={35}
                  value={categoryEditing.name}
                  onChange={(e) =>
                    setCategoryEditing({
                      ...categoryEditing,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Descripción breve
                <textarea
                  required
                  rows={3}
                  maxLength={120}
                  value={categoryEditing.description}
                  onChange={(e) =>
                    setCategoryEditing({
                      ...categoryEditing,
                      description: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="button button-outline-dark"
                onClick={() => setCategoryEditing(null)}
              >
                Cancelar
              </button>
              <button className="button button-yellow" type="submit">
                <Save size={16} />
                Guardar apartado
              </button>
            </div>
          </form>
        </Modal>
      )}
      {editing && (
        <Modal
          label={
            data.products.some((p) => p.id === editing.id)
              ? "Editar producto"
              : "Agregar producto"
          }
          onClose={() => setEditing(null)}
        >
          <form
            className="product-editor"
            onSubmit={(e) => {
              e.preventDefault();
              persist();
            }}
          >
            <span className="eyebrow">CATÁLOGO DE MAQUIRENT</span>
            <h2>
              {data.products.some((p) => p.id === editing.id)
                ? "Editar producto"
                : "Agregar producto"}
            </h2>
            <div className="admin-form">
              <ImageUpload
                label="Fotografía del producto"
                value={editing.image}
                onChange={(image) => setEditing({ ...editing, image })}
              />
              <label>
                Nombre del producto
                <input
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  placeholder="Ej. Excavadora"
                  required
                  maxLength={70}
                />
              </label>
              <label>
                Categoría
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                >
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Descripción
                <textarea
                  rows={4}
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  placeholder="Describe el equipo sin incluir datos que no hayas confirmado."
                  required
                  maxLength={400}
                />
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={editing.active}
                  onChange={(e) =>
                    setEditing({ ...editing, active: e.target.checked })
                  }
                />
                Visible en el sitio público
              </label>
              {!editing.image && (
                <p className="field-hint">
                  Agrega una fotografía para guardar el producto.
                </p>
              )}
            </div>
            <div className="modal-actions">
              <button
                className="button button-outline-dark"
                type="button"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </button>
              <button
                className="button button-yellow"
                disabled={!editing.image}
                type="submit"
              >
                <Save size={17} />
                Guardar producto
              </button>
            </div>
          </form>
        </Modal>
      )}
      {remove && (
        <Modal
          label="Eliminar producto del mockup"
          onClose={() => setRemove(null)}
        >
          <div className="delete-confirm">
            <Trash2 size={30} />
            <h2>¿Eliminar {remove.name}?</h2>
            <p>
              Se quitará del catálogo de este navegador. Puedes restaurar el
              mockup original desde el panel.
            </p>
            <div className="modal-actions">
              <button
                className="button button-outline-dark"
                onClick={() => setRemove(null)}
              >
                Cancelar
              </button>
              <button
                className="button button-danger"
                onClick={() => {
                  if (
                    save({
                      ...data,
                      products: data.products.filter((p) => p.id !== remove.id),
                    })
                  )
                    setRemove(null);
                }}
              >
                Eliminar del mockup
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
export function Dashboard({ section = "home" }: { section?: Section }) {
  const { data, reset } = useDemo();
  const [menu, setMenu] = useState(false);
  const [restore, setRestore] = useState(false);
  const current = navItems.find((i) => i.id === section)!;
  return (
    <div className={`dashboard ${menu ? "sidebar-open" : ""}`}>
      <aside className="admin-sidebar">
        <Link className="admin-logo" href="/dashboard">
          <img
            src={data.contact.logo}
            alt="Maquirent"
            width="170"
            height="96"
          />
        </Link>
        <div className="sidebar-caption">PANEL DE ADMINISTRACIÓN</div>
        <nav aria-label="Navegación del panel">
          {navItems.map((n) => (
            <Link
              href={n.href}
              key={n.id}
              className={section === n.id ? "active" : ""}
              onClick={() => setMenu(false)}
            >
              <n.icon size={19} />
              {n.label}
              {section === n.id && <ChevronRight size={14} />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-demo">
            <span className="demo-pill">
              <span />
              MODO DEMOSTRACIÓN
            </span>
            <p>
              El diseño de tu nueva web,
              <br />
              listo para explorar.
            </p>
            <button onClick={() => setRestore(true)}>
              Restaurar mockup <ArrowRight size={14} />
            </button>
          </div>
          <Link href="/" target="_blank">
            <Globe size={18} />
            Ver sitio web <ArrowUpRight size={15} />
          </Link>
          <Link href="/login">
            <LogOut size={18} />
            Salir de la demostración
          </Link>
        </div>
      </aside>
      {menu && (
        <button
          className="sidebar-backdrop"
          aria-label="Cerrar menú del panel"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <button
              className="admin-menu-button icon-button"
              aria-label="Abrir menú del panel"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <Menu size={21} />
            </button>
            <span>Administración</span>
            <ChevronRight size={14} />
            <strong>{current.label}</strong>
          </div>
          <div>
            <Link className="admin-visit" href="/" target="_blank">
              Vista del sitio <ArrowUpRight size={14} />
            </Link>
            <span className="admin-avatar">M</span>
            <span className="admin-user">
              Equipo Maquirent<small>Demostración</small>
            </span>
          </div>
        </header>
        <main className="admin-content">
          <div className="admin-title">
            <div>
              <p>MAQUIRENT · GESTIÓN DEL SITIO</p>
              <h1>
                {section === "home" ? "Bienvenido a tu panel." : current.label}
              </h1>
            </div>
            <span className="local-badge">
              <span />
              Vista local
            </span>
          </div>
          {section === "home" && <Overview />}
          {section === "inicio" && <HomeEditor />}
          {section === "contacto" && <ContactEditor />}
          {section === "catalogo" && <CatalogEditor />}
          <footer className="admin-footer">
            <span>Maquirent · Panel de administración</span>
            <span>Propuesta visual / 2026</span>
          </footer>
        </main>
      </div>
      {restore && (
        <Modal
          label="Restaurar mockup original"
          onClose={() => setRestore(false)}
        >
          <div className="delete-confirm">
            <Settings2 size={30} />
            <h2>Restaurar el diseño original</h2>
            <p>
              Se reemplazarán las ediciones locales por los textos, fotografías
              y productos iniciales del mockup.
            </p>
            <div className="modal-actions">
              <button
                className="button button-outline-dark"
                onClick={() => setRestore(false)}
              >
                Cancelar
              </button>
              <button
                className="button button-yellow"
                onClick={() => {
                  reset();
                  setRestore(false);
                }}
              >
                Restaurar mockup
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
