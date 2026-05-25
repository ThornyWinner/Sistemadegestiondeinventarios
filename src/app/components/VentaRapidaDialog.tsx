import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { mockProductos } from "../data/mockData";
import {
  X,
  User,
  Package,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";

interface VentaRapidaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orden: any) => void;
}

export default function VentaRapidaDialog({
  isOpen,
  onClose,
  onSubmit,
}: VentaRapidaDialogProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    cliente: "",
    metodoPago: "efectivo" as const,
  });

  const [productosSeleccionados, setProductosSeleccionados] = useState<
    Array<{ productoId: string; cantidad: number }>
  >([]);

  if (!isOpen) return null;

  const agregarProducto = (productoId: string) => {
    const existe = productosSeleccionados.find((p) => p.productoId === productoId);
    if (existe) {
      setProductosSeleccionados(
        productosSeleccionados.map((p) =>
          p.productoId === productoId ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setProductosSeleccionados([
        ...productosSeleccionados,
        { productoId, cantidad: 1 },
      ]);
    }
  };

  const removerProducto = (productoId: string) => {
    setProductosSeleccionados(
      productosSeleccionados.filter((p) => p.productoId !== productoId)
    );
  };

  const ajustarCantidad = (productoId: string, delta: number) => {
    setProductosSeleccionados(
      productosSeleccionados
        .map((p) => {
          if (p.productoId === productoId) {
            const nuevaCantidad = p.cantidad + delta;
            return nuevaCantidad > 0 ? { ...p, cantidad: nuevaCantidad } : null;
          }
          return p;
        })
        .filter((p) => p !== null) as Array<{
        productoId: string;
        cantidad: number;
      }>
    );
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce((acc, item) => {
      const producto = mockProductos.find((p) => p.id === item.productoId);
      return acc + (producto?.precio || 0) * item.cantidad;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (productosSeleccionados.length === 0) {
      alert("Debe agregar al menos un producto");
      return;
    }

    const total = calcularTotal();

    const nuevaOrden = {
      vendedor: user?.nombre || "Usuario",
      vendedorId: user?.id || "0",
      cliente: formData.cliente,
      numero: `ORD-2026-${String(Date.now()).slice(-3)}`,
      fechaCreacion: new Date().toISOString().split("T")[0],
      fechaEntrega: new Date().toISOString().split("T")[0],
      tipoVenta: "directa" as const,
      estado: "completed" as const,
      prioridad: "media" as const,
      metodoPago: formData.metodoPago,
      estadoPago: "liquidado" as const,
      total,
      anticipo: 0,
      pagos: [
        {
          monto: total,
          fecha: new Date().toISOString().split("T")[0],
          metodo: formData.metodoPago,
          concepto: "Pago total",
        },
      ],
      productos: productosSeleccionados.map((item) => {
        const producto = mockProductos.find((p) => p.id === item.productoId)!;
        return {
          id: `p${item.productoId}`,
          nombre: producto.nombre,
          tipoPrenda: producto.tipo,
          marca: producto.categoria,
          talla: producto.tallas[0] || "Unitalla",
          color: producto.colores[0] || "N/A",
          cantidad: item.cantidad,
          precioUnitario: producto.precio,
          tipoProduccion: "directa" as const,
          talleres: [],
          progreso: {},
        };
      }),
    };

    onSubmit(nuevaOrden);
    onClose();
  };

  const productosDisponibles = mockProductos.filter((p) => p.stock > 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h2>Venta Rápida</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cliente}
                    onChange={(e) =>
                      setFormData({ ...formData, cliente: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Nombre del cliente"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Método de Pago *
                  </label>
                  <select
                    required
                    value={formData.metodoPago}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metodoPago: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="efectivo">💵 Efectivo</option>
                    <option value="transferencia">🏦 Transferencia</option>
                    <option value="tarjeta">💳 Tarjeta</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Productos Disponibles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Productos en Stock ({productosDisponibles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {productosDisponibles.map((producto) => (
                  <div
                    key={producto.id}
                    className="p-3 border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium">{producto.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          Stock: {producto.stock} • ${producto.precio}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => agregarProducto(producto.id)}
                        className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carrito de Compra */}
          {productosSeleccionados.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Carrito ({productosSeleccionados.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {productosSeleccionados.map((item) => {
                  const producto = mockProductos.find(
                    (p) => p.id === item.productoId
                  );
                  if (!producto) return null;

                  return (
                    <div
                      key={item.productoId}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{producto.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          ${producto.precio} x {item.cantidad} = $
                          {(producto.precio * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => ajustarCantidad(item.productoId, -1)}
                          className="p-1 bg-background rounded hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => ajustarCantidad(item.productoId, 1)}
                          className="p-1 bg-background rounded hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removerProducto(item.productoId)}
                          className="p-1.5 bg-status-pending-bg text-status-pending-text rounded hover:bg-status-pending/20 transition-colors ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-2xl text-primary">
                      ${calcularTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={productosSeleccionados.length === 0}
              className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Completar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
