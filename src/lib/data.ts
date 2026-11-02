export const categories = [
  {
    id: "maquinaria-pesada",
    name: "Maquinaria pesada",
    description: "La fuerza que necesita tu proyecto.",
    image: "/images/excavadoras.jpg",
  },
  {
    id: "camiones-de-volteo",
    name: "Camiones de volteo",
    description: "Capacidad para mover tu obra.",
    image: "/images/volteo.jpg",
  },
  {
    id: "llantas-de-trabajo",
    name: "Llantas de trabajo",
    description: "El soporte para seguir avanzando.",
    image: "",
  },
];
export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};
export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  active: boolean;
  featured: boolean;
};
export type Location = {
  id: string;
  name: string;
  address: string;
  map: string;
};
export type SiteData = {
  home: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    image: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    logo: string;
    facebook: string;
    instagram: string;
    hours: string;
    locations: Location[];
  };
  products: Product[];
  categories: Category[];
};
export const initialData: SiteData = {
  categories,
  home: {
    eyebrow: "MAQUINARIA Y TRANSPORTE EN GUATEMALA",
    title: "LA FUERZA DETRÁS",
    accent: "DE TU PROYECTO.",
    description:
      "Maquinaria pesada, camiones y soluciones de transporte. En Maquirent ponemos tu obra en movimiento.",
    image: "/images/hero.jpg",
  },
  contact: {
    phone: "+502 4820-2303",
    whatsapp: "50248202303",
    email: "maquirent.info@gmail.com",
    logo: "/images/logo.png",
    facebook: "https://www.facebook.com/profile.php?id=61552606162261",
    instagram: "https://www.instagram.com/maquirentguatemala/",
    hours: "Lun–Vie: 7:00–17:00 · Sáb–Dom: 7:00–12:00",
    locations: [
      {
        id: "petapa",
        name: "San Miguel Petapa",
        address:
          "23 calle 16-01, Villa Hermosa 1, zona 7, San Miguel Petapa, Guatemala.",
        map: "https://www.google.com/maps/search/?api=1&query=14.527974,-90.554673",
      },
    ],
  },
  products: [
    {
      id: "excavadora",
      name: "Excavadora",
      category: "maquinaria-pesada",
      image: "/images/hyundai.jpg",
      description:
        "Equipo para excavación y movimiento de tierra. Consulta el modelo y las condiciones para tu proyecto.",
      active: true,
      featured: true,
    },
    {
      id: "cargador-frontal",
      name: "Cargador frontal",
      category: "maquinaria-pesada",
      image: "/images/cargador.jpg",
      description:
        "Carga y manejo de materiales en obra. Consulta las opciones de equipo y disponibilidad.",
      active: true,
      featured: true,
    },
    {
      id: "camion-volteo",
      name: "Camión de volteo",
      category: "camiones-de-volteo",
      image: "/images/volteo.jpg",
      description:
        "Transporte de materiales para tu proyecto. Coordinamos los detalles según la ruta y la carga.",
      active: true,
      featured: true,
    },
    {
      id: "miniexcavadora",
      name: "Miniexcavadora",
      category: "maquinaria-pesada",
      image: "/images/mini.jpg",
      description:
        "Una alternativa para trabajos de excavación en espacios reducidos. Consulta sus características.",
      active: true,
      featured: false,
    },
  ],
};
export const services = [
  {
    id: "maquinaria-en-renta",
    number: "01",
    title: "Maquinaria en renta",
    description:
      "El equipo adecuado para cada etapa de tu obra. Cuéntanos qué necesitas y revisemos las opciones de renta.",
    image: "/images/excavadora.jpg",
    tag: "FUERZA PARA CONSTRUIR",
  },
  {
    id: "traslados",
    number: "02",
    title: "Traslado de maquinaria",
    description:
      "Coordinación de traslados en lowboy. Comparte el origen, el destino y los detalles del equipo a transportar.",
    image: "/images/lowboy.jpg",
    tag: "TU EQUIPO EN MOVIMIENTO",
  },
  {
    id: "traslado-de-materiales",
    number: "03",
    title: "Traslado de materiales",
    description:
      "Soluciones de transporte para el movimiento de materiales. Consultemos la ruta, el volumen y tu fecha de trabajo.",
    image: "/images/flota.jpg",
    tag: "CONECTAMOS TU OBRA",
  },
];
