import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import InterviewSelect from './pages/InterviewSelect';
import Interview from './pages/Interview';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interviews" element={<InterviewSelect />} />
          <Route path="/interview/:techStack" element={<Interview />} />
          <Route path="/results/:interviewId" element={<Results />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
