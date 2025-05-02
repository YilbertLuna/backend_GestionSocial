import he from 'he';

// Función para reemplazar caracteres especiales usando la librería 'he'
export function decodeEntities(str) {
    return he.decode(str);
}