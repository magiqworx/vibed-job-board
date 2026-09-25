interface Job {
  company: string;
  role: string;
  stack: string;
  location: string;
  description: string;
  fullDescription: string;
}

interface JobStreamProps {
  jobs: Job[];
  selectedTech: string | null;
  searchQuery: string;
  expandedJobId: number | null;
  onJobExpand: (id: number | null) => void;
}

export default function JobStream({ jobs, selectedTech, searchQuery, expandedJobId, onJobExpand }: JobStreamProps) {
  const filteredJobs = jobs.filter((job) => {
    const matchesTech = selectedTech
      ? job.stack.toLowerCase().includes(selectedTech.toLowerCase())
      : true;
    
    const matchesSearch = searchQuery
      ? job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesTech && matchesSearch;
  });

  const handleJobClick = (index: number) => {
    if (expandedJobId === index) {
      onJobExpand(null);
    } else {
      onJobExpand(index);
    }
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Application submitted! (Mock action)');
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="space-y-3">
        {filteredJobs.map((job, index) => (
          <div key={index}>
            <div
              onClick={() => handleJobClick(index)}
              className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-md rounded-lg border border-slate-800/50 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-1">
                <div className="font-semibold text-slate-50">{job.role}</div>
                <div className="text-sm text-slate-400">{job.company}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-sm text-slate-400">{job.stack}</div>
                <div className="text-sm text-slate-500">{job.location}</div>
                {expandedJobId === index && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onJobExpand(null); }}
                    className="text-slate-400 hover:text-slate-50 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {expandedJobId === index && (
              <div className="mt-2 px-6 py-4 bg-slate-800/30 backdrop-blur-md rounded-lg border border-slate-700/30 animate-in slide-in-from-top-2 transition-all duration-300">
                <p className="text-slate-300 mb-4 leading-relaxed">{job.fullDescription}</p>
                <button
                  onClick={handleApply}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/25"
                >
                  Apply Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
