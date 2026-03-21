import { Link } from 'react-router-dom';
import { HiOutlineCode, HiOutlineLightningBolt, HiOutlineChartBar } from 'react-icons/hi';
import './Home.css';

const Home = () => {
  return (
    <div className="home fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-effects">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge">
            <HiOutlineLightningBolt />
            <span>AI-Powered Interview Prep</span>
          </div>
          <h1 className="hero-title">
            Ace Your Tech
            <br />
            <span className="hero-title-gradient">Interviews</span>
          </h1>
          <p className="hero-subtitle">
            Practice with AI-generated questions, get instant feedback on your answers,
            and track your improvement — all in a realistic text-based interview experience.
          </p>
          <div className="hero-actions">
            <Link to="/interviews" className="btn-primary hero-btn">
              Start Practicing Free
            </Link>
            <a href="#features" className="btn-secondary hero-btn">
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">45+</span>
              <span className="stat-label">Questions</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Tech Stacks</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">AI</span>
              <span className="stat-label">Feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Why Interview<span className="brand-accent">Ace</span>?</h2>
          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon">
                <HiOutlineCode />
              </div>
              <h3>Real Interview Questions</h3>
              <p>Curated questions across MERN, Node.js, Java, React, JavaScript, and Python — just like real tech interviews.</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon icon-green">
                <HiOutlineLightningBolt />
              </div>
              <h3>Instant AI Feedback</h3>
              <p>Get detailed, structured feedback on your answers powered by Groq AI. Scores, strengths, and areas for improvement.</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon icon-amber">
                <HiOutlineChartBar />
              </div>
              <h3>Track Your Progress</h3>
              <p>Review your interview sessions with overall scores. Identify patterns and improve over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Built with ❤️ using MERN Stack + Groq AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
