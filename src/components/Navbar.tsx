interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-slate-50">
          Vibed
        </div>
        <button 
          onClick={onOpenModal}
          className="px-4 py-2 bg-slate-900/50 hover:bg-slate-800/50 text-slate-50 text-sm font-medium rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
        >
          Post a Job
        </button>
      </div>
    </nav>
  );
}
