import { useParams, useNavigate } from "react-router";
import { mockOrdenes } from "../data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import WorkflowStepper from "../components/WorkflowStepper";
import {
  ArrowLeft,
  Calendar,
  User,
  Package,
  Ruler,
  Palette,
  Tag,
  ShoppingBag,
  FileText,
  Image as ImageIcon,
  Shirt,
} from "lucide-react";

export default function OrdenDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orden = mockOrdenes.find((o) => o.id === id);

  if (!orden) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2>Orden no encontrada</h2>
          <button
            onClick={() => navigate("/ordenes")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Volver a Órdenes
          </button>
        </div>
      </div>
    );
  }

  const diasRestantes = Math.ceil(
    (new Date(orden.fechaEntrega).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const getProgresoTotal = () => {
    const talleresActivos = orden.talleres;
    const completados = talleresActivos.filter(
      (t) => orden.progreso[t] === "completed"
    ).length;
    return Math.round((completados / talleresActivos.length) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/ordenes")}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1>{orden.numero}</h1>
            <StatusBadge status={orden.estado} size="md" />
            {orden.prioridad === "alta" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-status-pending-bg text-status-pending-text">
                Prioridad Alta
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Detalles de la orden de producción
          </p>
        </div>
      </div>

      {/* Flujo de Trabajo */}
      <Card>
        <CardHeader>
          <CardTitle>Flujo de Producción</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <WorkflowStepper
              talleres={orden.talleres}
              progreso={orden.progreso}
              size="lg"
              showLabels={true}
            />
          </div>
          <div className="mt-6 flex items-center gap-4 p-4 bg-secondary rounded-lg">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Progreso Total</p>
              <p className="text-2xl font-semibold mt-1">{getProgresoTotal()}%</p>
            </div>
            <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${getProgresoTotal()}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Vendedor</p>
                <p className="font-medium">{orden.vendedor}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="font-medium">{orden.cliente}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Producto</p>
                <p className="font-medium">{orden.producto}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Fecha de Entrega</p>
                <p className="font-medium">
                  {new Date(orden.fechaEntrega).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    diasRestantes < 3
                      ? "text-status-pending"
                      : "text-muted-foreground"
                  }`}
                >
                  {diasRestantes > 0 ? `${diasRestantes} días restantes` : "Vencida"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Especificaciones del Producto */}
        <Card>
          <CardHeader>
            <CardTitle>Especificaciones del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Shirt className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Tipo de Prenda</p>
                <p className="font-medium capitalize">{orden.tipoPrenda}</p>
              </div>
            </div>
            {orden.marca && (
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Marca</p>
                  <p className="font-medium">{orden.marca}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Talla</p>
                <p className="font-medium">{orden.talla}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Palette className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-medium">{orden.color}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Cantidad</p>
                <p className="text-2xl font-semibold">{orden.cantidad} unidades</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detalles de Bordado */}
      {orden.bordadoDetalle && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shirt className="w-5 h-5 text-primary" />
              Detalles de Bordado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lugar a Bordar</p>
                  <p className="font-medium capitalize">
                    {orden.bordadoDetalle.lugarBordar === "bolsillo"
                      ? "Bolsillo"
                      : orden.bordadoDetalle.lugarBordar === "espalda"
                      ? "Espalda"
                      : "Personalizado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Colores de Hilo
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {orden.bordadoDetalle.coloresHilo.map((color, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary rounded-full text-sm font-medium"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                {orden.bordadoDetalle.notasAdicionales && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Notas Adicionales
                    </p>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm">{orden.bordadoDetalle.notasAdicionales}</p>
                    </div>
                  </div>
                )}
              </div>
              {orden.bordadoDetalle.logotipo && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Logotipo</p>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 bg-secondary flex flex-col items-center justify-center gap-3">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {orden.bordadoDetalle.logotipo}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
