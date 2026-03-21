import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineChartBar, HiOutlineCheckCircle } from 'react-icons/hi';
import './Results.css';

const API_BASE = 'http://localhost:8080/api';

const Results = () => {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${API_BASE}/interviews/${interviewId}`);
        setInterview(res.data);
      } catch (err) {
        console.error('Failed to load results', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [interviewId]);

  const getScoreColor = (score) => {
    if (score >= 8) return 'var(--success)';
    if (score >= 5) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getScoreLabel = (score) => {
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Average';
    if (score >= 3) return 'Needs Work';
    return 'Poor';
  };

  if (isLoading) {
    return (
      <div className="results-loading">
        <div className="spinner"></div>
        <p>Loading results...</p>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="results-loading">
        <p>Interview not found</p>
        <Link to="/interviews" className="btn-primary">Start New Interview</Link>
      </div>
    );
  }

  return (
    <div className="results fade-in">
      <div className="container">
        {/* Header */}
        <div className="results-header">
          <div className="results-icon">
            <HiOutlineCheckCircle />
          </div>
          <h1>Interview Complete!</h1>
          <p className="results-tech">{interview.techStack.toUpperCase()} Interview</p>
        </div>

        {/* Overall Score */}
        <div className="overall-score glass-card">
          <div className="score-circle" style={{ borderColor: getScoreColor(interview.overallScore) }}>
            <span className="score-big" style={{ color: getScoreColor(interview.overallScore) }}>
              {interview.overallScore}
            </span>
            <span className="score-out">/10</span>
          </div>
          <div className="score-details">
            <h2 style={{ color: getScoreColor(interview.overallScore) }}>
              {getScoreLabel(interview.overallScore)}
            </h2>
            <p>You answered {interview.responses.length} questions in this session.</p>
          </div>
          <div className="score-bar-visual">
            <HiOutlineChartBar />
          </div>
        </div>

        {/* Responses */}
        <div className="responses-list">
          <h2 className="responses-title">Detailed Breakdown</h2>
          {interview.responses.map((response, index) => (
            <div
              key={index}
              className={`response-card glass-card ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="response-header">
                <div className="response-info">
                  <span className="response-num">Q{index + 1}</span>
                  <h4>{response.questionText}</h4>
                </div>
                <div
                  className="response-score"
                  style={{
                    background: `${getScoreColor(response.score)}18`,
                    color: getScoreColor(response.score),
                  }}
                >
                  {response.score}/10
                </div>
              </div>
              {expandedIndex === index && (
                <div className="response-details slide-in">
                  <div className="detail-section">
                    <h5>Your Answer</h5>
                    <p>{response.answer}</p>
                  </div>
                  <div className="detail-section">
                    <h5>AI Feedback</h5>
                    <div className="feedback-content">
                      {response.feedback.split('\n').map((line, i) => {
                        if (line.trim() === '') return <br key={i} />;
                        if (line.startsWith('- ')) return <li key={i}>{line.substring(2)}</li>;
                        return <p key={i}>{line.replace(/\*\*/g, '')}</p>;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="results-actions">
          <Link to="/interviews" className="btn-primary">Start New Interview</Link>
          <Link to="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
