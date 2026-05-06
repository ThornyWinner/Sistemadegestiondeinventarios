import { useState } from "react";
import TallerKanban from "../../components/TallerKanban";
import { mockOrdenes } from "../../data/mockData";

export default function TallerSublimacion() {
  const [ordenesLocal, setOrdenesLocal] = useState(mockOrdenes);

  const ordenesTaller = ordenesLocal.map((orden) => ({
    id: orden.id,
    numero: orden.numero,
    cliente: orden.cliente,
    producto: orden.producto,
    cantidad: orden.cantidad,
    fechaEntrega: orden.fechaEntrega,
    estado: orden.progreso.sublimacion,
    detalles: (
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Material requerido:</p>
        <p className="text-xs text-foreground">Tela lista para sublimar</p>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Piezas completadas:</span>
          <input
            type="number"
            min="0"
            max={orden.cantidad}
            defaultValue={0}
            className="w-16 px-2 py-1 bg-input-background border border-border rounded text-center"
          />
        </div>
      </div>
    ),
  }));

  const handleChangeEstado = (ordenId: string, nuevoEstado: any) => {
    setOrdenesLocal((prev) =>
      prev.map((orden) =>
        orden.id === ordenId
          ? { ...orden, progreso: { ...orden.progreso, sublimacion: nuevoEstado } }
          : orden
      )
    );
  };

  return (
    <TallerKanban
      titulo="Taller de Sublimación"
      descripcion="Proceso de sublimación de telas y materiales"
      ordenes={ordenesTaller}
      onChangeEstado={handleChangeEstado}
    />
  );
}
