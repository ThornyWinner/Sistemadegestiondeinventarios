import { useState } from "react";
import TallerKanban from "../../components/TallerKanban";
import { mockOrdenes } from "../../data/mockData";
import { CheckCircle2, XCircle, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function TallerDiseno() {
  const { user } = useAuth();
  const [ordenesLocal, setOrdenesLocal] = useState(mockOrdenes);

  const isReadOnly = user?.rol === 'admin_secundario';

  const ordenesTaller = ordenesLocal.map((orden) => ({
    id: orden.id,
    numero: orden.numero,
    cliente: orden.cliente,
    producto: orden.producto,
    cantidad: orden.cantidad,
    fechaEntrega: orden.fechaEntrega,
    estado: orden.progreso.diseno,
    detalles: (
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Estado del diseño:</p>
        {isReadOnly ? (
          <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-100 rounded text-xs text-neutral-600">
            <Lock className="w-3 h-3" />
            <span>Solo lectura</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-status-completed-bg text-status-completed-text rounded text-xs hover:bg-status-completed-bg/80 transition-colors">
              <CheckCircle2 className="w-3 h-3" />
              Aprobar
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-status-pending-bg text-status-pending-text rounded text-xs hover:bg-status-pending-bg/80 transition-colors">
              <XCircle className="w-3 h-3" />
              Rechazar
            </button>
          </div>
        )}
      </div>
    ),
  }));

  const handleChangeEstado = (ordenId: string, nuevoEstado: any) => {
    setOrdenesLocal((prev) =>
      prev.map((orden) =>
        orden.id === ordenId
          ? { ...orden, progreso: { ...orden.progreso, diseno: nuevoEstado } }
          : orden
      )
    );
  };

  return (
    <TallerKanban
      titulo="Taller de Diseño"
      descripcion="Diseño y aprobación de uniformes antes de producción"
      ordenes={ordenesTaller}
      onChangeEstado={handleChangeEstado}
    />
  );
}