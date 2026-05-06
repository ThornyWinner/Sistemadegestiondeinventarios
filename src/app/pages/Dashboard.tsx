import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import {
  Package,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  Shirt,
  Info,
} from "lucide-react";
import { mockOrdenes, mockMateriales } from "../data/mockData";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { roleLabels } from "../utils/permissions";
import UserGuide from "../components/UserGuide";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Mostrar guía solo la primera vez que se accede
    const hasSeenGuide = localStorage.getItem(`guide_seen_${user?.id}`);
    if (!hasSeenGuide && user) {
      setShowGuide(true);
      localStorage.setItem(`guide_seen_${user.id}`, 'true');
    }
  }, [user]);

  const ordenesEnProceso = mockOrdenes.filter((o) => o.estado === "in-progress").length;
  const ordenesPendientes = mockOrdenes.filter((o) => o.estado === "pending").length;
  const ordenesCompletadas = mockOrdenes.filter((o) => o.estado === "completed").length;
  const materialesBajoStock = mockMateriales.filter((m) => m.stock < m.stockMinimo).length;

  const produccionPorTaller = [
    { taller: "Diseño", ordenes: 8, color: "#059669" },
    { taller: "Sublimación", ordenes: 6, color: "#3B82F6" },
    { taller: "Corte", ordenes: 5, color: "#F59E0B" },
    { taller: "Costura", ordenes: 4, color: "#8B5CF6" },
    { taller: "Bordado", ordenes: 3, color: "#EC4899" },
  ];

  const estadoOrdenes = [
    { name: "Pendiente", value: ordenesPendientes, color: "#EF4444" },
    { name: "En Proceso", value: ordenesEnProceso, color: "#F59E0B" },
    { name: "Completado", value: ordenesCompletadas, color: "#10B981" },
  ];

  return (
    <div className="p-6 space-y-6">
      <UserGuide open={showGuide} onClose={() => setShowGuide(false)} />

      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenido, {user?.nombre} - {roleLabels[user?.rol || 'vendedor']}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowGuide(true)}
          className="flex items-center gap-2"
        >
          <Info className="w-4 h-4" />
          Ver guía de usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Órdenes Activas"
          value={ordenesEnProceso}
          icon={Clock}
          color="warning"
          footer="En proceso de producción"
        />
        <StatCard
          title="Pendientes"
          value={ordenesPendientes}
          icon={AlertTriangle}
          color="danger"
          footer="Esperando iniciar"
        />
        <StatCard
          title="Completadas (mes)"
          value={12}
          icon={CheckCircle2}
          color="success"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Stock Bajo"
          value={materialesBajoStock}
          icon={Package}
          color="danger"
          footer={
            <Link to="/inventario/materiales" className="text-primary hover:underline">
              Ver materiales →
            </Link>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Producción por Taller</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={produccionPorTaller}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="taller" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="ordenes" radius={[8, 8, 0, 0]}>
                  {produccionPorTaller.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Órdenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={250}>
                <PieChart>
                  <Pie
                    data={estadoOrdenes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {estadoOrdenes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {estadoOrdenes.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xl font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Órdenes Recientes</CardTitle>
          <Link
            to="/ordenes"
            className="text-sm text-primary hover:underline font-medium"
          >
            Ver todas →
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Entrega
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockOrdenes.slice(0, 5).map((orden) => (
                  <tr key={orden.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-foreground">{orden.numero}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-foreground">
                      {orden.cliente}
                    </td>
                    <td className="px-6 py-4 text-foreground">{orden.producto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-foreground">
                      {orden.cantidad} uds
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-foreground">
                      {new Date(orden.fechaEntrega).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={orden.estado} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMateriales
                .filter((m) => m.stock < m.stockMinimo)
                .map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 bg-status-pending-bg rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-status-pending" />
                      <div>
                        <p className="font-medium text-foreground">{material.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          Stock: {material.stock} {material.unidad} / Mínimo:{" "}
                          {material.stockMinimo}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/inventario/materiales"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Revisar
                    </Link>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Producción Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shirt className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Prendas Completadas</p>
                    <p className="text-sm text-muted-foreground">Hoy</p>
                  </div>
                </div>
                <p className="text-2xl font-semibold">127</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-status-in-progress-bg rounded-lg">
                    <Clock className="w-5 h-5 text-status-in-progress" />
                  </div>
                  <div>
                    <p className="font-medium">En Proceso</p>
                    <p className="text-sm text-muted-foreground">Hoy</p>
                  </div>
                </div>
                <p className="text-2xl font-semibold">48</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-status-completed-bg rounded-lg">
                    <TrendingUp className="w-5 h-5 text-status-completed" />
                  </div>
                  <div>
                    <p className="font-medium">Eficiencia</p>
                    <p className="text-sm text-muted-foreground">vs. ayer</p>
                  </div>
                </div>
                <p className="text-2xl font-semibold text-status-completed">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}