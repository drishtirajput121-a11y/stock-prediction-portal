import React, { useState, useEffect } from 'react'
import Button from './Button'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import "./main.css";

const Main = () => {
  const fullText = "Market Vision";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    let isMounted = true;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (!isMounted) return;
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 120);

      return () => clearInterval(interval);
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, []);

  return (
    <div className="main-page">

      {/* Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* Hero Section */}
      <div className="hero-section">

        {/* LEFT SIDE */}
        <div className="hero-left">
          <div className="hero-logo">
            <img
              src="/logo.png"
              alt="Market Vision Logo"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">

          <h1 className="hero-title">
            {displayedText}
            <span className="typing-cursor">|</span>
          </h1>

          <span className="hero-badge">
            AI-Powered Stock Intelligence
          </span>

          <p className="hero-description">
            Harness the power of artificial intelligence to
            predict stock movements, analyze market sentiment,
            and make smarter investment decisions — all in one
            sleek dashboard.
          </p>

          {/* Features */}
          <div className="hero-features">
            <div className="feature-pill">AI Predictions</div>
            <div className="feature-pill">Sentiment Analysis</div>
            <div className="feature-pill">Live Charts</div>
            <div className="feature-pill">Portfolio Tracker</div>
          </div>

          {/* CTA */}
          <div className="hero-cta">
            <Button
              text="Launch Dashboard →"
              class="btn-glow"
              to="/dashboard"
            />
          </div>

          {/* Divider */}
          <div className="hero-divider"></div>

          {/* Social */}
          <div className="social-section">

            <p className="social-label">
              Follow us
            </p>

            <div className="social-links">

              <a
                href="https://github.com/drishtirajput121-a11y"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/drishti-rajput-181790316/"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Main