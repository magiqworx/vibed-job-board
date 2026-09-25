const filters = ['Cursor', 'Windsurf', 'Claude Code', 'Aider', 'APIs'];

interface FiltersProps {
  selectedTech: string | null;
  onFilterChange: (tech: string | null) => void;
}

export default function Filters({ selectedTech, onFilterChange }: FiltersProps) {
  const handleFilterClick = (filter: string) => {
    if (selectedTech === filter) {
      onFilterChange(null);
    } else {
      onFilterChange(filter);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
              selectedTech === filter
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                : 'bg-slate-900/50 text-slate-400 border-slate-700/50 hover:bg-slate-800/50 hover:text-slate-50 hover:border-slate-600/50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}
