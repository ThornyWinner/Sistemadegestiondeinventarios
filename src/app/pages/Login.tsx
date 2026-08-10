import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#059669] rounded-xl mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Sistema de Gestión</h1>
          <p className="text-neutral-500">Uniformes Industriales</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#059669] hover:bg-[#047857]"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 mb-2">Usuarios de prueba:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="font-medium text-neutral-700">Admin Primario</p>
                  <p className="text-neutral-500">admin / admin123</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="font-medium text-neutral-700">Admin Secundario</p>
                  <p className="text-neutral-500">admin2 / admin456</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="font-medium text-neutral-700">Vendedor</p>
                  <p className="text-neutral-500">vendedor1 / ventas123</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="font-medium text-neutral-700">Diseñador</p>
                  <p className="text-neutral-500">diseño1 / diseno123</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="/demo" 
                  className="text-sm text-[#059669] hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver todas las credenciales de prueba →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}