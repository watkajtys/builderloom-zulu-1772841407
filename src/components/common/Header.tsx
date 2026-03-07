import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/agents':
        return 'Agents';
      default:
        return 'Unknown Route';
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/30 flex items-center px-8 shrink-0 backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-white capitalize">
        {getPageTitle(location.pathname)}
      </h2>
    </header>
  );
}
