export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io' : '';

export function getAssetPath(path: string) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path;

  // Prevent double prepending of BASE_PATH
  if (BASE_PATH && path.startsWith(BASE_PATH)) return path;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
