'use client';

import { useState } from 'react';
import BackgroundGradient from '@/components/BackgroundGradient';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Filters from '@/components/Filters';
import JobStream from '@/components/JobStream';
import PostJobModal from '@/components/PostJobModal';

interface Job {
  company: string;
  role: string;
  stack: string;
  location: string;
  description: string;
  fullDescription: string;
}

const initialJobs: Job[] = [
  { 
    company: 'Anthropic', 
    role: 'Senior AI Engineer', 
    stack: 'Claude Code, Python', 
    location: 'Remote (Europe)', 
    description: 'Build safe AI systems with Claude Code',
    fullDescription: 'Join Anthropic\'s European team to build constitutional AI systems. You\'ll work directly with Claude Code to develop safer, more interpretable AI models. Experience with Python and AI safety research required.'
  },
  { 
    company: 'Cursor AI', 
    role: 'ML Infrastructure Engineer', 
    stack: 'Cursor, TypeScript', 
    location: 'Amsterdam', 
    description: 'Scale ML infrastructure for AI-powered IDE',
    fullDescription: 'Scale our AI-powered IDE infrastructure from our Amsterdam office. You\'ll use Cursor daily to optimize ML pipelines and improve developer experience. Strong TypeScript and infrastructure skills essential.'
  },
  { 
    company: 'Windsurf Labs', 
    role: 'AI-Assisted Developer', 
    stack: 'Windsurf, React', 
    location: 'Berlin', 
    description: 'Develop next-gen AI coding assistant',
    fullDescription: 'Build the next generation of AI coding assistants in Berlin\'s thriving tech scene. You\'ll leverage Windsurf and React to create intuitive AI-powered development tools. Passion for developer experience required.'
  },
  { 
    company: 'Aider Technologies', 
    role: 'Full Stack AI Engineer', 
    stack: 'Aider, Python', 
    location: 'Rotterdam', 
    description: 'Build AI pair programming tools',
    fullDescription: 'Develop AI pair programming tools from our Rotterdam HQ. You\'ll use Aider and Python to create seamless AI-human collaboration features. Experience with LLM integration and full-stack development needed.'
  },
  { 
    company: 'OpenAI', 
    role: 'Research Engineer', 
    stack: 'Claude Code, PyTorch', 
    location: 'London', 
    description: 'Advance AI research and deployment',
    fullDescription: 'Work on cutting-edge AI research and deployment from OpenAI\'s London office. You\'ll use Claude Code and PyTorch to push the boundaries of what\'s possible with AI. Strong research background preferred.'
  },
  { 
    company: 'DeepMind', 
    role: 'ML Research Scientist', 
    stack: 'Cursor, JAX', 
    location: 'London', 
    description: 'Solve intelligence with AI research',
    fullDescription: 'Join DeepMind\'s mission to solve intelligence from our London research hub. You\'ll leverage Cursor and JAX to develop novel ML algorithms. PhD in ML or related field required.'
  },
  { 
    company: 'Hugging Face', 
    role: 'AI Platform Engineer', 
    stack: 'Windsurf, Python', 
    location: 'Remote (Europe)', 
    description: 'Build the future of open-source AI',
    fullDescription: 'Build the future of open-source AI from anywhere in Europe. You\'ll use Windsurf and Python to enhance our AI platform and model hub. Passion for open source and democratizing AI essential.'
  },
  { 
    company: 'Stability AI', 
    role: 'Generative AI Engineer', 
    stack: 'Aider, Stable Diffusion', 
    location: 'Berlin', 
    description: 'Create cutting-edge generative AI models',
    fullDescription: 'Create cutting-edge generative AI models in Berlin\'s creative tech hub. You\'ll work with Aider and Stable Diffusion to push generative AI boundaries. Experience with diffusion models and creative AI required.'
  },
  { 
    company: 'Cohere', 
    role: 'NLP Engineer', 
    stack: 'Claude Code, Transformers', 
    location: 'Paris', 
    description: 'Build enterprise NLP solutions',
    fullDescription: 'Build enterprise NLP solutions from Cohere\'s Paris office. You\'ll use Claude Code and Transformers to develop language models for business applications. Strong NLP background needed.'
  },
  { 
    company: 'Mistral AI', 
    role: 'LLM Engineer', 
    stack: 'Cursor, French AI', 
    location: 'Paris', 
    description: 'Develop efficient open-source LLMs',
    fullDescription: 'Develop efficient open-source LLMs in Paris\' thriving AI ecosystem. You\'ll leverage Cursor and French AI innovations to build next-generation language models. Experience with model optimization required.'
  },
  { 
    company: 'Perplexity AI', 
    role: 'Search AI Engineer', 
    stack: 'Windsurf, RAG', 
    location: 'Remote (Europe)', 
    description: 'Revolutionize search with AI',
    fullDescription: 'Revolutionize search with AI from anywhere in Europe. You\'ll use Windsurf and RAG techniques to build next-gen search experiences. Passion for information retrieval and LLMs essential.'
  },
  { 
    company: 'Runway ML', 
    role: 'Video AI Engineer', 
    stack: 'Aider, PyTorch', 
    location: 'Amsterdam', 
    description: 'Build AI tools for creative video',
    fullDescription: 'Build AI tools for creative video from Amsterdam\'s creative tech scene. You\'ll work with Aider and PyTorch to develop video generation and editing AI. Experience with computer vision required.'
  },
  { 
    company: 'Character.AI', 
    role: 'Conversational AI Engineer', 
    stack: 'Claude Code, LLMs', 
    location: 'London', 
    description: 'Create engaging AI companions',
    fullDescription: 'Create engaging AI companions from Character.AI\'s London office. You\'ll use Claude Code and LLMs to build conversational AI that feels human. Experience with dialogue systems and character development needed.'
  },
  { 
    company: 'ElevenLabs', 
    role: 'Audio AI Engineer', 
    stack: 'Cursor, Audio ML', 
    location: 'Remote (Europe)', 
    description: 'Pioneer AI voice synthesis',
    fullDescription: 'Pioneer AI voice synthesis from anywhere in Europe. You\'ll leverage Cursor and Audio ML to create realistic text-to-speech systems. Experience with audio processing and deep learning required.'
  },
  { 
    company: 'Midjourney', 
    role: 'Generative Art Engineer', 
    stack: 'Windsurf, Diffusion', 
    location: 'Berlin', 
    description: 'Build AI art generation platform',
    fullDescription: 'Build AI art generation platform in Berlin\'s creative capital. You\'ll use Windsurf and Diffusion models to create stunning AI-generated artwork. Passion for generative art and creative AI essential.'
  },
];

export default function Home() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const handleAddJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
  };

  return (
    <main className="min-h-screen relative">
      <BackgroundGradient />
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Filters selectedTech={selectedTech} onFilterChange={setSelectedTech} />
      <JobStream 
        jobs={jobs} 
        selectedTech={selectedTech} 
        searchQuery={searchQuery} 
        expandedJobId={expandedJobId} 
        onJobExpand={setExpandedJobId} 
      />
      <PostJobModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddJob={handleAddJob}
      />
    </main>
  );
}
