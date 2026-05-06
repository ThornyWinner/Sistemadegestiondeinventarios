import { useState } from "react";
import TallerKanban from "../../components/TallerKanban";
import { mockOrdenes } from "../../data/mockData";
import { Sparkles } from "lucide-react";

export default function TallerBordado() {
  const [ordenesLocal, setOrdenesLocal] = useState(mockOrdenes);

  const ordenesTaller = ordenesLocal.map((orden) => ({
    id: orden.id,
    numero: orden.numero,
    cliente: orden.cliente,
    producto: orden.producto,
    cantidad: orden.cantidad,
    fechaEntrega: orden.fechaEntrega,
    estado: orden.progreso.bordado,
    detalles: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">Diseño de bordado:</span>
        </div>
        <div className="p-2 bg-secondary rounded text-xs text-center text-foreground">
          Logo corporativo
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Bordados completados:</span>
          <input
            type="number"
            min="0"
            max={orden.cantidad}
            defaultValue={0}
            className="w-16 px-2 py-1 bg-input-background border border-border rounded text-center"
          />
        </div>
        <div className="pt-2 border-t border-border">
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" className="rounded" />
            <span className="text-muted-foreground">Revisión final</span>
          </label>
        </div>
      </div>
    ),
  }));

  const handleChangeEstado = (ordenId: string, nuevoEstado: any) => {
    setOrdenesLocal((prev) =>
      prev.map((orden) =>
        orden.id === ordenId
          ? { ...orden, progreso: { ...orden.progreso, bordado: nuevoEstado } }
          : orden
      )
    );
  };

  return (
    <TallerKanban
      titulo="Taller de Bordado"
      descripcion="Bordado de logos y detalles personalizados"
      ordenes={ordenesTaller}
      onChangeEstado={handleChangeEstado}
    />
  );
}
