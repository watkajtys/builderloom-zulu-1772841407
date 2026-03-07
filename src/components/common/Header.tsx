import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    if (pathname === '/') return 'Dashboard';
    
    // Remove leading slash and any trailing slash, then split by slash or dash
    const cleanPath = pathname.replace(/^\/|\/$/g, '');
    const segments = cleanPath.split(/[\/-]/);
    
    // Capitalize each word and join with a space
    return segments
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/30 flex items-center px-8 shrink-0 backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-white capitalize">
        {getPageTitle(location.pathname)}
      </h2>
    </header>
  );
}
