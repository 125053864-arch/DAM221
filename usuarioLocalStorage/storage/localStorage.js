
const verificarDisponible = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    throw new Error('LocalStorage no está disponible. Ejecuta la app en el navegador web.');
  }
};

export const guardarDato = async (clave, valor) => {
  verificarDisponible();
  window.localStorage.setItem(clave, JSON.stringify(valor));
};

export const obtenerDato = async (clave, porDefecto = null) => {
  verificarDisponible();
  const texto = window.localStorage.getItem(clave);
  if (texto === null) return porDefecto;
  try {
    return JSON.parse(texto);
  } catch {
    return porDefecto;
  }
};

export const eliminarDato = async (clave) => {
  verificarDisponible();
  window.localStorage.removeItem(clave);
};