import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import './Interview.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const Interview = () => {
  const { techStack } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedbackData, setFeedbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [interviewId, setInterviewId] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [error, setError] = useState('');

  // Fetch questions and start interview session
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoadingQuestions(true);
        const [questionsRes, interviewRes] = await Promise.all([
          axios.get(`${API_BASE}/questions?techStack=${techStack}`),
          axios.post(`${API_BASE}/interviews/start`, { techStack }),
        ]);
        setQuestions(questionsRes.data);
        setInterviewId(interviewRes.data.interviewId);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load questions');
      } finally {
        setIsLoadingQuestions(false);
      }
    };
    init();
  }, [techStack]);

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;

    setIsLoading(true);
    setFeedbackData(null);

    try {
      const res = await axios.post(`${API_BASE}/feedback`, {
        question: questions[currentIndex].question,
        answer: answer.trim(),
        techStack,
        interviewId,
        questionId: questions[currentIndex]._id,
      });
      setFeedbackData(res.data);
      setAnsweredCount((prev) => prev + 1);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to get feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer('');
      setFeedbackData(null);
      setError('');
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setAnswer('');
      setFeedbackData(null);
      setError('');
    }
  };

  const handleFinishInterview = async () => {
    if (interviewId) {
      try {
        await axios.put(`${API_BASE}/interviews/complete/${interviewId}`);
        navigate(`/results/${interviewId}`);
      } catch {
        navigate(`/results/${interviewId}`);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'var(--success)';
      case 'medium': return 'var(--warning)';
      case 'hard': return 'var(--danger)';
      default: return 'var(--text-muted)';
    }
  };

  // Format feedback text with basic markdown rendering
  const renderFeedback = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="feedback-bold">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i}>{line.substring(2)}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i}>{line.replace(/\*\*/g, '')}</p>;
    });
  };

  if (isLoadingQuestions) {
    return (
      <div className="interview-loading">
        <div className="spinner"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="interview-loading">
        <p>No questions found for <strong>{techStack}</strong></p>
        <button className="btn-primary" onClick={() => navigate('/interviews')}>Go Back</button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="interview fade-in">
      <div className="container">
        {/* Progress Bar */}
        <div className="interview-progress">
          <div className="progress-info">
            <span className="progress-label">{techStack?.toUpperCase()} Interview</span>
            <span className="progress-count">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="interview-layout">
          {/* Question Panel */}
          <div className="question-panel glass-card">
            <div className="question-header">
              <span className="question-number">Question {currentIndex + 1}</span>
              <span
                className="question-difficulty"
                style={{
                  color: getDifficultyColor(currentQ.difficulty),
                  borderColor: getDifficultyColor(currentQ.difficulty),
                }}
              >
                {currentQ.difficulty}
              </span>
            </div>
            <h2 className="question-text">{currentQ.question}</h2>

            {/* Answer Area */}
            <div className="answer-area">
              <textarea
                className="answer-input"
                placeholder="Type your answer here... Be as detailed as possible for better feedback."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isLoading}
                rows={8}
              />
              <div className="answer-actions">
                <span className="char-count">{answer.length} characters</span>
                <button
                  className="btn-primary submit-btn"
                  onClick={handleSubmitAnswer}
                  disabled={isLoading || !answer.trim()}
                >
                  {isLoading ? (
                    <span className="btn-loading">
                      <div className="spinner" style={{ width: 18, height: 18 }}></div>
                      Analyzing...
                    </span>
                  ) : (
                    'Submit Answer'
                  )}
                </button>
              </div>
            </div>

            {error && <div className="error-msg">{error}</div>}
          </div>

          {/* Feedback Panel */}
          {feedbackData && (
            <div className="feedback-panel glass-card slide-in">
              <div className="feedback-header">
                <h3>AI Feedback</h3>
                <div className="feedback-score">
                  <span className="score-value">{feedbackData.score}</span>
                  <span className="score-max">/10</span>
                </div>
              </div>
              <div className="feedback-body feedback-content">
                {renderFeedback(feedbackData.feedback)}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="interview-nav">
          <button
            className="btn-secondary nav-btn"
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
          >
            <HiOutlineChevronLeft /> Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              className="btn-primary nav-btn finish-btn"
              onClick={handleFinishInterview}
              disabled={answeredCount === 0}
            >
              Finish Interview
            </button>
          ) : (
            <button
              className="btn-primary nav-btn"
              onClick={handleNextQuestion}
            >
              Next <HiOutlineChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
