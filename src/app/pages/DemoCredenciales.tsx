import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Copy, Key, User, ShieldCheck, Info } from 'lucide-react';
import { toast } from 'sonner';
import RolePreview from '../components/RolePreview';
import type { UserRole } from '../types/auth';

export default function DemoCredenciales() {
  const credenciales = [
    {
      rol: 'admin_primario' as UserRole,
      usuario: 'admin',
      password: 'admin123',
      descripcion: 'Acceso total al sistema',
      color: 'bg-green-500',
    },
    {
      rol: 'admin_secundario' as UserRole,
      usuario: 'admin2',
      password: 'admin456',
      descripcion: 'Solo lectura en todo',
      color: 'bg-yellow-500',
    },
    {
      rol: 'vendedor' as UserRole,
      usuario: 'vendedor1',
      password: 'ventas123',
      descripcion: 'Órdenes e inventario',
      color: 'bg-blue-500',
    },
    {
      rol: 'disenador' as UserRole,
      usuario: 'diseño1',
      password: 'diseno123',
      descripcion: 'Solo módulo de diseño',
      color: 'bg-purple-500',
    },
    {
      rol: 'sublimador' as UserRole,
      usuario: 'sublima1',
      password: 'sublima123',
      descripcion: 'Solo sublimación',
      color: 'bg-cyan-500',
    },
    {
      rol: 'cortador' as UserRole,
      usuario: 'corte1',
      password: 'corte123',
      descripcion: 'Solo corte',
      color: 'bg-orange-500',
    },
    {
      rol: 'costurera' as UserRole,
      usuario: 'costura1',
      password: 'costura123',
      descripcion: 'Solo costura',
      color: 'bg-pink-500',
    },
    {
      rol: 'bordador' as UserRole,
      usuario: 'bordado1',
      password: 'bordado123',
      descripcion: 'Solo bordado',
      color: 'bg-indigo-500',
    },
  ];

  const copyCredentials = (username: string, password: string) => {
    navigator.clipboard.writeText(`Usuario: ${username}\nContraseña: ${password}`);
    toast.success('Credenciales copiadas al portapapeles');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Página de Demostración
            </h2>
            <p className="text-blue-800 mb-4">
              Esta es una página de demostración que muestra todos los usuarios de prueba disponibles en el sistema.
              Puedes cerrar sesión y probar diferentes roles para ver cómo cambia la interfaz y los permisos.
            </p>
            <p className="text-sm text-blue-700">
              <strong>Nota:</strong> Para cerrar sesión, haz click en tu nombre en el header y selecciona "Cerrar Sesión".
            </p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl mb-2">Credenciales de Prueba</h1>
        <p className="text-neutral-500">
          Usuarios disponibles para probar el sistema de roles y permisos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credenciales.map((cred) => (
          <Card key={cred.usuario} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 ${cred.color} rounded-lg`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{cred.rol}</CardTitle>
                  <p className="text-sm text-neutral-500">{cred.descripcion}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-500" />
                    <div>
                      <p className="text-xs text-neutral-500">Usuario</p>
                      <p className="font-mono font-medium">{cred.usuario}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-neutral-500" />
                    <div>
                      <p className="text-xs text-neutral-500">Contraseña</p>
                      <p className="font-mono font-medium">{cred.password}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCredentials(cred.usuario, cred.password)}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar credenciales
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-2xl mb-4">Resumen de Permisos por Rol</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {credenciales.map((cred) => (
            <RolePreview key={cred.rol} role={cred.rol} />
          ))}
        </div>
      </div>

      <Card className="border-[#059669] border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#059669]" />
            <CardTitle>Cómo Probar el Sistema</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside">
            <li className="text-neutral-700">
              <strong>Cerrar sesión actual:</strong> Click en tu nombre en el header → Cerrar Sesión
            </li>
            <li className="text-neutral-700">
              <strong>Seleccionar rol a probar:</strong> Elige uno de los usuarios de arriba
            </li>
            <li className="text-neutral-700">
              <strong>Iniciar sesión:</strong> Ingresa las credenciales en la pantalla de login
            </li>
            <li className="text-neutral-700">
              <strong>Explorar permisos:</strong> Observa cómo cambia el sidebar y los botones según el rol
            </li>
            <li className="text-neutral-700">
              <strong>Probar acciones:</strong> Intenta crear/editar registros para ver las restricciones
            </li>
          </ol>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-900">
              <strong>Importante:</strong> Los datos son simulados y solo existen en tu navegador.
              Al recargar la página, los cambios se perderán.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
