import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import "./main.css";

const Main = () => {
  const fullText = "Smarter Insights. Better Decisions.";
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypingIndex(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Snappy 50ms typing speed for instant satisfaction

    return () => clearInterval(interval);
  }, []);

  const getHeadingContent = () => {
    const line1Limit = 18; // "Smarter Insights. " length
    const word2Limit = 25; // "Smarter Insights. Better " length

    let line1Text = "";
    let line2TextWhite = "";
    let line2TextRed = "";
    let showCursorLine = 1;

    if (typingIndex <= line1Limit) {
      line1Text = fullText.slice(0, typingIndex);
      showCursorLine = 1;
    } else {
      line1Text = fullText.slice(0, line1Limit);
      showCursorLine = 2;

      if (typingIndex <= word2Limit) {
        line2TextWhite = fullText.slice(line1Limit, typingIndex);
      } else {
        line2TextWhite = fullText.slice(line1Limit, word2Limit);
        line2TextRed = fullText.slice(word2Limit, typingIndex);
      }
    }

    return { line1Text, line2TextWhite, line2TextRed, showCursorLine };
  };

  const { line1Text, line2TextWhite, line2TextRed, showCursorLine } = getHeadingContent();

  return (
    <div className="main-page-premium">
      
      {/* Background radial glow meshes */}
      <div className="radial-glow-1"></div>
      <div className="radial-glow-2"></div>
      <div className="radial-glow-3"></div>

      <div className="hero-grid-container">
        
        {/* LEFT COLUMN: HERO CONTENT */}
        <div className="hero-content-left">
          
          <div className="hero-badge-premium animate-fade-in-up">
            <span className="badge-bullet">■</span>
            <span className="badge-text">AI-POWERED STOCK INTELLIGENCE</span>
          </div>

          <h1 className="hero-title-premium">
            <div className="title-line">
              {line1Text}
              {showCursorLine === 1 && <span className="typing-cursor">|</span>}
            </div>
            <div className="title-line text-red-accent">
              <span className="text-white">{line2TextWhite}</span>
              {line2TextRed}
              {showCursorLine === 2 && <span className="typing-cursor">|</span>}
            </div>
          </h1>

          <p className="hero-description-premium animate-fade-in-up delay-1">
            Real-time market data, AI predictions, and advanced analytics — all in one place.
          </p>

          <div className="hero-features-pills animate-fade-in-up delay-1">
            <Link to="/dashboard" className="feature-pill-item">AI Predictions</Link>
            <Link to="/dashboard" className="feature-pill-item">Sentiment Analysis</Link>
            <Link to="/dashboard" className="feature-pill-item">Live Charts</Link>
            <Link to="/dashboard" className="feature-pill-item">Portfolio Tracker</Link>
          </div>

          <div className="hero-cta-actions animate-fade-in-up delay-2">
            <Button
              text="Launch Dashboard →"
              class="btn-glow-premium"
              to="/dashboard"
            />
            <Link to="/dashboard" className="btn-secondary-link">
              Explore Features
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: 3D LAPTOP DASHBOARD SHOWCASE */}
        <div className="hero-showcase-right animate-fade-in-up delay-1">
          <div className="laptop-3d-perspective-container">
            
            {/* The Laptop Device Frame */}
            <div className="laptop-device">
              
              {/* Laptop Lid Screen */}
              <div className="laptop-lid-screen">
                <div className="laptop-screen-glass">
                  
                  {/* DASHBOARD MOCK INTERFACE */}
                  <div className="mock-dashboard-wrapper">
                    
                    {/* MINI SIDEBAR */}
                    <aside className="mock-sidebar">
                      <div className="sidebar-logo-mark">
                        <svg width="22" height="20" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 25L14 14L23 21L37 5" stroke="#FF3847" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M30 5H37V12" stroke="#FF3847" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="5" cy="25" r="4.5" fill="#FF3847" />
                          <circle cx="37" cy="5" r="4.5" fill="#FFFFFF" />
                          <path d="M12 26L18 32L31 15" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      
                      <div className="sidebar-icons-stack">
                        <div className="sidebar-icon-item active">
                          {/* Home Icon */}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                        <div className="sidebar-icon-item">
                          {/* Chart Icon */}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                          </svg>
                        </div>
                        <div className="sidebar-icon-item">
                          {/* Pie chart/Clock icon */}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div className="sidebar-icon-item">
                          {/* Star Icon */}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                        <div className="sidebar-icon-item">
                          {/* Settings Icon */}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                        </div>
                      </div>
                    </aside>

                    {/* MOCK MAIN CONTENT */}
                    <main className="mock-dashboard-content">
                      
                      <header className="mock-dashboard-header">
                        <h1>Dashboard</h1>
                      </header>

                      {/* CARDS GRID */}
                      <div className="mock-cards-grid">
                        
                        {/* CARD 1: MARKET OVERVIEW */}
                        <div className="mock-card">
                          <div className="card-header-label">Market Overview</div>
                          <div className="card-ticker-name">S&P 500</div>
                          <div className="card-value-row">
                            <span className="card-large-val">4,876.24</span>
                            <span className="card-percentage-val green-text">+1.02% (49.28)</span>
                          </div>
                          
                          {/* Mini sparkline chart */}
                          <div className="mock-sparkline-wrapper">
                            <svg viewBox="0 0 200 60" className="sparkline-svg">
                              <defs>
                                <linearGradient id="chart-grad-1" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#FF3847" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="#FF3847" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              <path 
                                d="M 0 45 Q 25 35 50 40 T 100 25 T 150 30 T 200 12" 
                                fill="none" 
                                stroke="#FF3847" 
                                strokeWidth="2.5" 
                                strokeLinecap="round"
                              />
                              <path 
                                d="M 0 45 Q 25 35 50 40 T 100 25 T 150 30 T 200 12 L 200 60 L 0 60 Z" 
                                fill="url(#chart-grad-1)" 
                              />
                              <circle cx="200" cy="12" r="3.5" fill="#FF3847" />
                              <circle cx="200" cy="12" r="7" stroke="#FF3847" strokeWidth="1" fill="none" opacity="0.6" className="pulsing-node" />
                            </svg>
                          </div>

                          <div className="card-sub-tickers">
                            <div className="sub-ticker-item">
                              <span className="label">NASDAQ</span>
                              <span className="val">15,254.35</span>
                              <span className="pct green-text">+0.85%</span>
                            </div>
                            <div className="sub-ticker-item">
                              <span className="label">DOW 30</span>
                              <span className="val">38,996.39</span>
                              <span className="pct green-text">+0.65%</span>
                            </div>
                          </div>
                        </div>

                        {/* CARD 2: AI PREDICTION */}
                        <div className="mock-card">
                          <div className="card-header-label">AI Prediction</div>
                          <div className="card-ticker-name">AAPL</div>
                          <div className="card-value-row">
                            <span className="card-large-val">178.35</span>
                            <span className="card-currency">USD</span>
                            <span className="card-percentage-val green-text">+2.41%</span>
                          </div>

                          {/* Mini sparkline chart */}
                          <div className="mock-sparkline-wrapper">
                            <svg viewBox="0 0 200 60" className="sparkline-svg">
                              <defs>
                                <linearGradient id="chart-grad-2" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#FF3847" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="#FF3847" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              <path 
                                d="M 0 42 Q 30 50 60 35 T 120 28 T 180 15 T 200 8" 
                                fill="none" 
                                stroke="#FF3847" 
                                strokeWidth="2.5" 
                                strokeLinecap="round"
                              />
                              <path 
                                d="M 0 42 Q 30 50 60 35 T 120 28 T 180 15 T 200 8 L 200 60 L 0 60 Z" 
                                fill="url(#chart-grad-2)" 
                              />
                              <circle cx="200" cy="8" r="3.5" fill="#FF3847" />
                              <circle cx="200" cy="8" r="7" stroke="#FF3847" strokeWidth="1" fill="none" opacity="0.6" className="pulsing-node" />
                            </svg>
                          </div>

                          <div className="card-confidence-wrapper">
                            <div className="confidence-label-row">
                              <span>Confidence Score</span>
                              <span className="confidence-bold">86%</span>
                            </div>
                            <div className="confidence-progress-bar">
                              <div className="progress-fill" style={{ width: '86%' }}></div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 3: SENTIMENT ANALYSIS */}
                        <div className="mock-card">
                          <div className="card-header-label">Sentiment Analysis</div>
                          <div className="sentiment-status-label">
                            Overall Market Sentiment <span className="green-text font-bold">Bullish</span>
                          </div>

                          <div className="sentiment-donut-row">
                            <div className="sentiment-donut-chart">
                              <svg width="64" height="64" viewBox="0 0 36 36" className="donut-svg">
                                {/* Gray circle background */}
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                                
                                {/* Bullish (72% Green) */}
                                <circle 
                                  cx="18" 
                                  cy="18" 
                                  r="15.915" 
                                  fill="none" 
                                  stroke="#10b981" 
                                  strokeWidth="3.2" 
                                  strokeDasharray="72 28" 
                                  strokeDashoffset="25" 
                                />
                                
                                {/* Neutral (18% Gray-blue) */}
                                <circle 
                                  cx="18" 
                                  cy="18" 
                                  r="15.915" 
                                  fill="none" 
                                  stroke="#6b7280" 
                                  strokeWidth="3" 
                                  strokeDasharray="18 82" 
                                  strokeDashoffset="-47" 
                                />

                                {/* Bearish (10% Red) */}
                                <circle 
                                  cx="18" 
                                  cy="18" 
                                  r="15.915" 
                                  fill="none" 
                                  stroke="#ef4444" 
                                  strokeWidth="3" 
                                  strokeDasharray="10 90" 
                                  strokeDashoffset="-65" 
                                />
                              </svg>
                              <div className="donut-center-text">72%</div>
                            </div>

                            <div className="sentiment-legend">
                              <div className="legend-item">
                                <span className="dot green"></span>
                                <span className="name">Bullish</span>
                                <span className="pct">72%</span>
                              </div>
                              <div className="legend-item">
                                <span className="dot gray"></span>
                                <span className="name">Neutral</span>
                                <span className="pct">18%</span>
                              </div>
                              <div className="legend-item">
                                <span className="dot red"></span>
                                <span className="name">Bearish</span>
                                <span className="pct">10%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 4: TOP GAINERS */}
                        <div className="mock-card">
                          <div className="card-header-label">Top Gainers</div>
                          
                          <div className="top-gainers-list">
                            
                            {/* NVDA */}
                            <div className="gainer-row">
                              <div className="gainer-left">
                                <div className="gainer-icon nvda">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                  </svg>
                                </div>
                                <div className="gainer-info">
                                  <span className="ticker">NVDA</span>
                                  <span className="full-name">NVIDIA Corporation</span>
                                </div>
                              </div>
                              <div className="gainer-pct green-text">+4.35%</div>
                            </div>

                            {/* MSFT */}
                            <div className="gainer-row">
                              <div className="gainer-left">
                                <div className="gainer-icon msft">
                                  <div className="msft-grid-icon">
                                    <span></span><span></span><span></span><span></span>
                                  </div>
                                </div>
                                <div className="gainer-info">
                                  <span className="ticker">MSFT</span>
                                  <span className="full-name">Microsoft Corporation</span>
                                </div>
                              </div>
                              <div className="gainer-pct green-text">+2.21%</div>
                            </div>

                            {/* AMZN */}
                            <div className="gainer-row">
                              <div className="gainer-left">
                                <div className="gainer-icon amzn">a</div>
                                <div className="gainer-info">
                                  <span className="ticker">AMZN</span>
                                  <span className="full-name">Amazon.com, Inc.</span>
                                </div>
                              </div>
                              <div className="gainer-pct green-text">+1.89%</div>
                            </div>

                            {/* META */}
                            <div className="gainer-row">
                              <div className="gainer-left">
                                <div className="gainer-icon meta">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0084FF" strokeWidth="3">
                                    <path d="M12 17c-2.67 0-4-1.33-4-3s1.33-3 4-3 4 1.33 4 3-1.33 3-4 3zm0-8c-4 0-7 2.5-7 5.5s3 5.5 7 5.5 7-2.5 7-5.5S16 9 12 9z"/>
                                  </svg>
                                </div>
                                <div className="gainer-info">
                                  <span className="ticker">META</span>
                                  <span className="full-name">Meta Platforms, Inc.</span>
                                </div>
                              </div>
                              <div className="gainer-pct green-text">+1.43%</div>
                            </div>

                          </div>
                        </div>

                      </div>

                    </main>

                  </div>

                </div>
              </div>

              {/* Laptop Keyboard Base & Highlight */}
              <div className="laptop-base-hardware">
                <div className="keyboard-reflection"></div>
                <div className="trackpad-notch"></div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Main