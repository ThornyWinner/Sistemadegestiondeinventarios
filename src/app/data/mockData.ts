export interface Material {
  id: string;
  nombre: string;
  tipo: "tela" | "hilo" | "accesorio";
  stock: number;
  unidad: "metros" | "piezas" | "kg";
  stockMinimo: number;
  proveedor: string;
  precio: number;
}

export interface Producto {
  id: string;
  nombre: string;
  tipo: "camisa" | "pantalon" | "overol" | "chaleco";
  tallas: string[];
  colores: string[];
  stock: number;
  precio: number;
  categoria: string;
  imagen?: string;
}

export type TallerEstado = "pending" | "in-progress" | "completed";
export type Taller = "diseno" | "sublimacion" | "corte" | "costura" | "bordado";

export interface OrdenBordadoDetalle {
  lugarBordar: "bolsillo" | "personalizado" | "espalda";
  logotipo?: string;
  coloresHilo: string[];
  notasAdicionales?: string;
}

export interface Orden {
  id: string;
  numero: string;
  vendedor: string;
  vendedorId: string;
  cliente: string;
  producto: string;
  tipoPrenda: "camisa" | "pantalon" | "overol" | "chaleco" | "otro";
  marca?: string;
  talla: string;
  color: string;
  cantidad: number;
  fechaCreacion: string;
  fechaEntrega: string;
  estado: "pending" | "in-progress" | "completed";
  talleres: Taller[];
  progreso: Partial<Record<Taller, TallerEstado>>;
  prioridad: "alta" | "media" | "baja";
  bordadoDetalle?: OrdenBordadoDetalle;
}

export interface Proveedor {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  insumos: string[];
  calificacion: number;
}

export const mockMateriales: Material[] = [
  {
    id: "1",
    nombre: "Tela Gabardina Azul Marino",
    tipo: "tela",
    stock: 150,
    unidad: "metros",
    stockMinimo: 50,
    proveedor: "Textiles del Norte",
    precio: 85,
  },
  {
    id: "2",
    nombre: "Tela Drill Gris",
    tipo: "tela",
    stock: 25,
    unidad: "metros",
    stockMinimo: 40,
    proveedor: "Telas Industriales SA",
    precio: 75,
  },
  {
    id: "3",
    nombre: "Hilo Poliéster Negro",
    tipo: "hilo",
    stock: 500,
    unidad: "piezas",
    stockMinimo: 100,
    proveedor: "Mercería Central",
    precio: 12,
  },
  {
    id: "4",
    nombre: "Hilo Poliéster Blanco",
    tipo: "hilo",
    stock: 450,
    unidad: "piezas",
    stockMinimo: 100,
    proveedor: "Mercería Central",
    precio: 12,
  },
  {
    id: "5",
    nombre: "Cierre Metálico 20cm",
    tipo: "accesorio",
    stock: 1200,
    unidad: "piezas",
    stockMinimo: 300,
    proveedor: "Accesorios Industriales",
    precio: 3.5,
  },
  {
    id: "6",
    nombre: "Botones Metálicos Grande",
    tipo: "accesorio",
    stock: 180,
    unidad: "piezas",
    stockMinimo: 500,
    proveedor: "Accesorios Industriales",
    precio: 0.8,
  },
  {
    id: "7",
    nombre: "Tela Oxford Verde",
    tipo: "tela",
    stock: 200,
    unidad: "metros",
    stockMinimo: 60,
    proveedor: "Textiles del Norte",
    precio: 95,
  },
  {
    id: "8",
    nombre: "Elástico 3cm",
    tipo: "accesorio",
    stock: 80,
    unidad: "metros",
    stockMinimo: 50,
    proveedor: "Mercería Central",
    precio: 8,
  },
];

export const mockProductos: Producto[] = [
  {
    id: "1",
    nombre: "Camisa Industrial Manga Larga",
    tipo: "camisa",
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["Azul Marino", "Gris", "Negro"],
    stock: 45,
    precio: 380,
    categoria: "Industrial",
  },
  {
    id: "2",
    nombre: "Pantalón Cargo Reforzado",
    tipo: "pantalon",
    tallas: ["28", "30", "32", "34", "36", "38"],
    colores: ["Azul Marino", "Khaki", "Negro"],
    stock: 32,
    precio: 420,
    categoria: "Industrial",
  },
  {
    id: "3",
    nombre: "Overol Completo",
    tipo: "overol",
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["Azul Rey", "Verde", "Gris"],
    stock: 18,
    precio: 650,
    categoria: "Seguridad",
  },
  {
    id: "4",
    nombre: "Chaleco Reflectivo",
    tipo: "chaleco",
    tallas: ["Único"],
    colores: ["Naranja", "Amarillo"],
    stock: 75,
    precio: 180,
    categoria: "Seguridad",
  },
  {
    id: "5",
    nombre: "Camisa Ejecutiva",
    tipo: "camisa",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Blanco", "Celeste"],
    stock: 28,
    precio: 320,
    categoria: "Corporativo",
  },
];

export const mockOrdenes: Orden[] = [
  {
    id: "1",
    numero: "ORD-2026-001",
    vendedor: "Luis Hernández",
    vendedorId: "3",
    cliente: "Constructora ABC",
    producto: "Overol Completo",
    tipoPrenda: "overol",
    marca: "Dickies",
    talla: "L",
    color: "Azul Rey",
    cantidad: 50,
    fechaCreacion: "2026-04-10",
    fechaEntrega: "2026-04-20",
    estado: "in-progress",
    talleres: ["diseno", "sublimacion", "corte", "costura", "bordado"],
    progreso: {
      diseno: "completed",
      sublimacion: "completed",
      corte: "in-progress",
      costura: "pending",
      bordado: "pending",
    },
    prioridad: "alta",
    bordadoDetalle: {
      lugarBordar: "bolsillo",
      logotipo: "logo-constructora.png",
      coloresHilo: ["Azul Marino", "Blanco"],
      notasAdicionales: "Logo en pecho izquierdo y nombre en espalda",
    },
  },
  {
    id: "2",
    numero: "ORD-2026-002",
    vendedor: "Luis Hernández",
    vendedorId: "3",
    cliente: "Minera XYZ",
    producto: "Camisa Industrial + Pantalón",
    tipoPrenda: "camisa",
    marca: "RedKap",
    talla: "M",
    color: "Gris Oxford",
    cantidad: 100,
    fechaCreacion: "2026-04-11",
    fechaEntrega: "2026-04-25",
    estado: "in-progress",
    talleres: ["diseno", "sublimacion", "corte", "costura"],
    progreso: {
      diseno: "completed",
      sublimacion: "in-progress",
      corte: "pending",
      costura: "pending",
    },
    prioridad: "alta",
  },
  {
    id: "3",
    numero: "ORD-2026-003",
    vendedor: "Luis Hernández",
    vendedorId: "3",
    cliente: "Empresa Logística DEF",
    producto: "Chaleco Reflectivo",
    tipoPrenda: "chaleco",
    talla: "Unitalla",
    color: "Amarillo Neón",
    cantidad: 200,
    fechaCreacion: "2026-04-12",
    fechaEntrega: "2026-04-18",
    estado: "in-progress",
    talleres: ["corte", "costura"],
    progreso: {
      corte: "completed",
      costura: "in-progress",
    },
    prioridad: "alta",
  },
  {
    id: "4",
    numero: "ORD-2026-004",
    vendedor: "Luis Hernández",
    vendedorId: "3",
    cliente: "Hotel Grand Plaza",
    producto: "Camisa Ejecutiva",
    tipoPrenda: "camisa",
    marca: "Van Heusen",
    talla: "XL",
    color: "Blanco",
    cantidad: 30,
    fechaCreacion: "2026-04-13",
    fechaEntrega: "2026-04-28",
    estado: "pending",
    talleres: ["diseno", "corte", "costura", "bordado"],
    progreso: {
      diseno: "in-progress",
      corte: "pending",
      costura: "pending",
      bordado: "pending",
    },
    prioridad: "media",
    bordadoDetalle: {
      lugarBordar: "bolsillo",
      logotipo: "logo-hotel.png",
      coloresHilo: ["Dorado", "Negro"],
      notasAdicionales: "Nombre del hotel en cursiva",
    },
  },
  {
    id: "5",
    numero: "ORD-2026-005",
    vendedor: "Luis Hernández",
    vendedorId: "3",
    cliente: "Fábrica GHI",
    producto: "Pantalón Cargo",
    tipoPrenda: "pantalon",
    marca: "Carhartt",
    talla: "32",
    color: "Khaki",
    cantidad: 75,
    fechaCreacion: "2026-04-09",
    fechaEntrega: "2026-04-22",
    estado: "in-progress",
    talleres: ["corte", "costura", "bordado"],
    progreso: {
      corte: "completed",
      costura: "completed",
      bordado: "in-progress",
    },
    prioridad: "media",
    bordadoDetalle: {
      lugarBordar: "personalizado",
      logotipo: "logo-fabrica.png",
      coloresHilo: ["Verde", "Negro"],
      notasAdicionales: "Bordado lateral derecho",
    },
  },
];

export const mockProveedores: Proveedor[] = [
  {
    id: "1",
    nombre: "Textiles del Norte",
    contacto: "Juan Pérez",
    telefono: "+52 81 1234 5678",
    email: "ventas@texnorte.com",
    insumos: ["Tela Gabardina", "Tela Oxford", "Tela Drill"],
    calificacion: 4.5,
  },
  {
    id: "2",
    nombre: "Telas Industriales SA",
    contacto: "María González",
    telefono: "+52 33 8765 4321",
    email: "contacto@telasindustriales.com",
    insumos: ["Tela Drill", "Tela Canvas", "Tela Mezclilla"],
    calificacion: 4.2,
  },
  {
    id: "3",
    nombre: "Mercería Central",
    contacto: "Carlos Ramírez",
    telefono: "+52 55 9876 5432",
    email: "pedidos@merceriacentral.com",
    insumos: ["Hilos", "Elásticos", "Botones"],
    calificacion: 4.8,
  },
  {
    id: "4",
    nombre: "Accesorios Industriales",
    contacto: "Ana López",
    telefono: "+52 81 5555 1234",
    email: "info@accind.com",
    insumos: ["Cierres", "Botones Metálicos", "Hebillas", "Remaches"],
    calificacion: 4.6,
  },
];
