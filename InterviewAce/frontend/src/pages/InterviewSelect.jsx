import { Link } from 'react-router-dom';
import {
  HiOutlineDatabase,
  HiOutlineServer,
  HiOutlineCube,
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineChip,
} from 'react-icons/hi';
import './InterviewSelect.css';

const techStacks = [
  {
    id: 'mern',
    name: 'MERN Stack',
    icon: <HiOutlineDatabase />,
    color: '#6c63ff',
    description: 'MongoDB, Express, React, Node.js — Full-stack web development questions.',
    questionCount: 10,
  },
  {
    id: 'node',
    name: 'Node.js',
    icon: <HiOutlineServer />,
    color: '#00d4aa',
    description: 'Event loop, streams, clustering, async patterns, and backend architecture.',
    questionCount: 10,
  },
  {
    id: 'java',
    name: 'Java',
    icon: <HiOutlineCube />,
    color: '#ff6b6b',
    description: 'OOP, collections, multithreading, Spring Boot, and design patterns.',
    questionCount: 10,
  },
  {
    id: 'react',
    name: 'React',
    icon: <HiOutlineLightningBolt />,
    color: '#61dafb',
    description: 'Components, hooks, state management, lifecycle, and performance.',
    questionCount: 5,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: <HiOutlineCode />,
    color: '#f7df1e',
    description: 'Closures, promises, prototypal inheritance, ES6+, and the event loop.',
    questionCount: 5,
  },
  {
    id: 'python',
    name: 'Python',
    icon: <HiOutlineChip />,
    color: '#ffb347',
    description: 'Decorators, generators, GIL, data structures, and Pythonic patterns.',
    questionCount: 5,
  },
];

const InterviewSelect = () => {
  return (
    <div className="interview-select fade-in">
      <div className="container">
        <div className="select-header">
          <h1>Choose Your <span className="brand-accent">Tech Stack</span></h1>
          <p>Select a category to start your mock interview. Each session includes 10 curated questions with AI-powered feedback.</p>
        </div>

        <div className="stacks-grid">
          {techStacks.map((stack) => (
            <Link to={`/interview/${stack.id}`} key={stack.id} className="stack-card glass-card">
              <div className="stack-icon" style={{ background: `${stack.color}18`, color: stack.color }}>
                {stack.icon}
              </div>
              <h3 className="stack-name">{stack.name}</h3>
              <p className="stack-desc">{stack.description}</p>
              <div className="stack-footer">
                <span className="stack-count">{stack.questionCount} Questions</span>
                <span className="stack-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewSelect;
