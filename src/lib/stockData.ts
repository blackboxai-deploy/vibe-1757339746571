import { Esencia, Movimiento } from '@/types';

// Datos iniciales de esencias con múltiples proveedores (sin precios)
export const esenciasIniciales: Esencia[] = [
  {
    id: '1',
    nombre: 'Vainilla',
    proveedores: [
      { nombre: 'Proveedor A', stockActual: 150 },
      { nombre: 'Proveedor B', stockActual: 200 },
    ]
  },
  {
    id: '2',
    nombre: 'Canela',
    proveedores: [
      { nombre: 'Proveedor A', stockActual: 120 },
      { nombre: 'Proveedor C', stockActual: 80 },
    ]
  },
  {
    id: '3',
    nombre: 'Lavanda',
    proveedores: [
      { nombre: 'Proveedor B', stockActual: 90 },
      { nombre: 'Proveedor D', stockActual: 110 },
    ]
  },
  {
    id: '4',
    nombre: 'Rosa',
    proveedores: [
      { nombre: 'Proveedor A', stockActual: 75 },
      { nombre: 'Proveedor D', stockActual: 60 },
    ]
  },
  {
    id: '5',
    nombre: 'Eucalipto',
    proveedores: [
      { nombre: 'Proveedor B', stockActual: 180 },
      { nombre: 'Proveedor C', stockActual: 140 },
    ]
  },
  {
    id: '6',
    nombre: 'Jazmín',
    proveedores: [
      { nombre: 'Proveedor A', stockActual: 65 },
      { nombre: 'Proveedor D', stockActual: 50 },
    ]
  },
  {
    id: '7',
    nombre: 'Limón',
    proveedores: [
      { nombre: 'Proveedor B', stockActual: 220 },
      { nombre: 'Proveedor C', stockActual: 190 },
    ]
  },
  {
    id: '8',
    nombre: 'Naranja',
    proveedores: [
      { nombre: 'Proveedor A', stockActual: 170 },
      { nombre: 'Proveedor C', stockActual: 160 },
    ]
  },
  {
    id: '9',
    nombre: 'Menta',
    proveedores: [
      { nombre: 'Proveedor B', stockActual: 130 },
      { nombre: 'Proveedor D', stockActual: 95 },
    ]
  },
  {
    id: '10',
    nombre: 'Sándalo',
    proveedores: [
      { nombre: 'Proveedor A', stockActual: 40 },
      { nombre: 'Proveedor D', stockActual: 35 },
    ]
  }
];

// Movimientos iniciales vacíos
export const movimientosIniciales: Movimiento[] = [];

// Función para generar ID único
export const generarId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Claves para localStorage
export const STORAGE_KEYS = {
  ESENCIAS: 'tia_robertina_esencias',
  MOVIMIENTOS: 'tia_robertina_movimientos'
};