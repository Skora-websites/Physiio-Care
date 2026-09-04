export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const apiUrl = (import.meta.env.VITE_API_URL || 'https://api.sudarshandev.online/api').trim();
  let baseUrl = apiUrl.replace(/\/api\/?$/, '');
  
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/api/')) {
    cleanPath = cleanPath.replace('/api/', '/');
  }

  const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `${baseUrl}${formattedPath}`;
};
