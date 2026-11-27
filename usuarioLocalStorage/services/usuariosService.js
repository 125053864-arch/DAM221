
import { guardarDato, obtenerDato } from '../storage/localStorage';

const CLAVE_USUARIOS = 'usuarios';

export const validarUsuario = (datos, usuarios = [], idActual = null) => {
  const errores = {};
  const nombre = String(datos.nombre ?? '').trim();
  const edad = String(datos.edad ?? '').trim();

  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio.';
  } else if (nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombre)) {
    errores.nombre = 'El nombre solo puede contener letras.';
  } else if (
    usuarios.some((u) => u.nombre.toLowerCase() === nombre.toLowerCase() && u.id !== idActual)
  ) {
    errores.nombre = 'Ya existe un usuario con ese nombre.';
  }

  if (!edad) {
    errores.edad = 'La edad es obligatoria.';
  } else if (!/^\d+$/.test(edad)) {
    errores.edad = 'La edad debe ser un número entero.';
  } else if (Number(edad) < 1 || Number(edad) > 120) {
    errores.edad = 'La edad debe estar entre 1 y 120.';
  }

  return errores;
};

export const obtenerUsuarios = async () => {
  return await obtenerDato(CLAVE_USUARIOS, []);
};

export const crearUsuario = async (datos) => {
  const usuarios = await obtenerUsuarios();
  const errores = validarUsuario(datos, usuarios);
  if (Object.keys(errores).length > 0) return { ok: false, errores };

  const nuevo = {
    id: Date.now().toString(),
    nombre: String(datos.nombre).trim(),
    edad: Number(datos.edad),
  };
  await guardarDato(CLAVE_USUARIOS, [...usuarios, nuevo]);
  return { ok: true, usuario: nuevo };
};

export const actualizarUsuario = async (id, datos) => {
  const usuarios = await obtenerUsuarios();
  const errores = validarUsuario(datos, usuarios, id);
  if (Object.keys(errores).length > 0) return { ok: false, errores };

  const actualizados = usuarios.map((u) =>
    u.id === id
      ? { ...u, nombre: String(datos.nombre).trim(), edad: Number(datos.edad) }
      : u
  );
  await guardarDato(CLAVE_USUARIOS, actualizados);
  return { ok: true };
};

export const eliminarUsuario = async (id) => {
  const usuarios = await obtenerUsuarios();
  await guardarDato(CLAVE_USUARIOS, usuarios.filter((u) => u.id !== id));
  return { ok: true };
};