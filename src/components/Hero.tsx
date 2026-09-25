interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-50 mb-4">
        Find Your Next
        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          {' '}Vibe Coding Job
        </span>
      </h1>
      <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
        Premium opportunities for AI Engineers, Cursor users, and AI-assisted developers
      </p>
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search jobs by role, tech stack, or company..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-6 py-4 bg-slate-900/50 backdrop-blur-md text-slate-50 placeholder-slate-500 rounded-xl border border-slate-700/50 focus:border-indigo-500/50 focus:outline-none transition-all duration-300"
        />
      </div>
    </section>
  );
}
