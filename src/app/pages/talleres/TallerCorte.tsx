import { useState } from "react";
import TallerKanban from "../../components/TallerKanban";
import { mockOrdenes } from "../../data/mockData";
import { Ruler } from "lucide-react";

export default function TallerCorte() {
  const [ordenesLocal, setOrdenesLocal] = useState(mockOrdenes);

  const ordenesTaller = ordenesLocal.map((orden) => ({
    id: orden.id,
    numero: orden.numero,
    cliente: orden.cliente,
    producto: orden.producto,
    cantidad: orden.cantidad,
    fechaEntrega: orden.fechaEntrega,
    estado: orden.progreso.corte,
    detalles: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <Ruler className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">Cantidad a cortar:</span>
          <span className="font-medium text-foreground">{orden.cantidad} piezas</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Cortadas:</span>
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
            <span className="text-muted-foreground">Material verificado</span>
          </label>
        </div>
      </div>
    ),
  }));

  const handleChangeEstado = (ordenId: string, nuevoEstado: any) => {
    setOrdenesLocal((prev) =>
      prev.map((orden) =>
        orden.id === ordenId
          ? { ...orden, progreso: { ...orden.progreso, corte: nuevoEstado } }
          : orden
      )
    );
  };

  return (
    <TallerKanban
      titulo="Taller de Corte"
      descripcion="Corte de piezas según patrones y especificaciones"
      ordenes={ordenesTaller}
      onChangeEstado={handleChangeEstado}
    />
  );
}
