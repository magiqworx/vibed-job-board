'use client';

import { useRef, useEffect, useState } from 'react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: any) => void;
}

interface Job {
  company: string;
  role: string;
  stack: string;
  location: string;
  description: string;
  fullDescription: string;
}

export default function PostJobModal({ isOpen, onClose, onAddJob }: PostJobModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    techStack: ''
  });
  const [errors, setErrors] = useState({
    jobTitle: false,
    companyName: false,
    location: false
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      jobTitle: formData.jobTitle.length < 3,
      companyName: formData.companyName.length < 3,
      location: formData.location.length < 3
    };

    setErrors(newErrors);

    if (newErrors.jobTitle || newErrors.companyName || newErrors.location) {
      return;
    }

    const techStackMap: Record<string, string> = {
      'cursor': 'Cursor',
      'windsurf': 'Windsurf',
      'claude-code': 'Claude Code',
      'aider': 'Aider',
      'apis': 'APIs'
    };

    const newJob: Job = {
      company: formData.companyName,
      role: formData.jobTitle,
      stack: techStackMap[formData.techStack] || formData.techStack,
      location: formData.location,
      description: `Join ${formData.companyName} to work on exciting AI projects.`,
      fullDescription: `Join ${formData.companyName} in ${formData.location} to work on cutting-edge AI initiatives. You'll use ${techStackMap[formData.techStack] || formData.techStack} to build innovative solutions. Passion for AI and development required.`
    };

    onAddJob(newJob);
    alert('Success! Your job listing has been vibed.');
    
    setFormData({
      jobTitle: '',
      companyName: '',
      location: '',
      techStack: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 animate-in fade-in duration-300"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl backdrop-blur-md shadow-2xl animate-in zoom-in-95 duration-300"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-50">Post a Job</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-50 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g. Senior AI Engineer"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                  errors.jobTitle ? 'border-red-500/50' : 'border-slate-700 focus:border-indigo-500/50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="e.g. Anthropic"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                  errors.companyName ? 'border-red-500/50' : 'border-slate-700 focus:border-indigo-500/50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Remote, Amsterdam"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                  errors.location ? 'border-red-500/50' : 'border-slate-700 focus:border-indigo-500/50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Tech Stack</label>
              <select
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-50 focus:border-indigo-500/50 focus:outline-none transition-all duration-300"
              >
                <option value="">Select tech stack</option>
                <option value="cursor">Cursor</option>
                <option value="windsurf">Windsurf</option>
                <option value="claude-code">Claude Code</option>
                <option value="aider">Aider</option>
                <option value="apis">APIs</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/25"
            >
              Submit Listing (€49)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
