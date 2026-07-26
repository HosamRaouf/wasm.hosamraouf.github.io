export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io' : '';

export function getAssetPath(path: string) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
