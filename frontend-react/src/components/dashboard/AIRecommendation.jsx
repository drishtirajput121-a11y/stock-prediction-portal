import React from 'react';

const AIRecommendation = ({ recommendation, sentiment }) => {
    if (!recommendation) return null;

    const signalColors = {
        BUY: '#00C853',
        SELL: '#FF1744',
        HOLD: '#FFD600',
    };

    const riskColors = {
        Low: '#00C853',
        Medium: '#FFD600',
        High: '#FF1744',
    };

    const signalColor = signalColors[recommendation.signal] || '#FFD600';
    const riskColor = riskColors[recommendation.risk] || '#FFD600';

    return (
        <div className="mb-4">
            {/* AI Recommendation Card */}
            <div className="glass-panel p-4 mb-3">
                <h5 className="text-light mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>
                    AI Recommendation
                </h5>
                <div className="d-flex align-items-center gap-3 mb-3">
                    <span style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: signalColor,
                        textShadow: `0 0 20px ${signalColor}40`,
                    }}>
                        {recommendation.signal}
                    </span>
                    <span className="text-light" style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                        {recommendation.predicted_change_pct > 0 ? '↑' : '↓'} {Math.abs(recommendation.predicted_change_pct)}% predicted
                    </span>
                </div>

                {/* Confidence Bar */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                        <small className="text-light" style={{ opacity: 0.7 }}>Confidence</small>
                        <small style={{ color: signalColor }}>{recommendation.confidence}%</small>
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }}>
                        <div style={{
                            height: '100%',
                            width: `${recommendation.confidence}%`,
                            borderRadius: '3px',
                            background: `linear-gradient(90deg, ${signalColor}80, ${signalColor})`,
                            transition: 'width 1s ease',
                        }} />
                    </div>
                </div>

                {/* Risk Meter */}
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-light" style={{ opacity: 0.7 }}>Risk Level</small>
                        <span style={{
                            color: riskColor,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            padding: '2px 12px',
                            borderRadius: '12px',
                            background: `${riskColor}15`,
                            border: `1px solid ${riskColor}30`,
                        }}>
                            {recommendation.risk}
                        </span>
                    </div>
                </div>
            </div>

            {/* Market Sentiment Card */}
            <div className="glass-panel p-4 mb-3">
                <h5 className="text-light mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>
                    Market Sentiment
                </h5>
                <div className="d-flex align-items-center gap-3 mb-3">
                    <span style={{ fontSize: '2.5rem' }}>{sentiment?.label}</span>
                    <div>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: sentiment?.sentiment === 'Bullish' ? '#00C853' : sentiment?.sentiment === 'Bearish' ? '#FF1744' : '#A8DADC',
                        }}>
                            {sentiment?.sentiment}
                        </div>
                        <small className="text-light" style={{ opacity: 0.5 }}>Based on price momentum</small>
                    </div>
                </div>

                {/* Sentiment Score Gauge */}
                <div>
                    <div className="d-flex justify-content-between mb-1">
                        <small style={{ color: '#FF1744' }}>Bearish</small>
                        <small className="text-light" style={{ opacity: 0.7 }}>Score: {sentiment?.score}/100</small>
                        <small style={{ color: '#00C853' }}>Bullish</small>
                    </div>
                    <div style={{ height: '8px', borderRadius: '4px', background: 'linear-gradient(90deg, #FF1744, #FFD600, #00C853)', position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            left: `${sentiment?.score || 50}%`,
                            top: '-3px',
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: 'white',
                            border: '2px solid #333',
                            transform: 'translateX(-50%)',
                            transition: 'left 1s ease',
                            boxShadow: '0 0 8px rgba(255,255,255,0.5)',
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIRecommendation;
