import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const PortfolioTracker = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [prices, setPrices] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ ticker: '', shares: '', buyPrice: '' });

    // Load portfolio from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('mv_portfolio');
        if (saved) {
            setPortfolio(JSON.parse(saved));
        }
    }, []);

    // Fetch current prices for all portfolio tickers
    useEffect(() => {
        const tickers = [...new Set(portfolio.map(p => p.ticker))];
        if (tickers.length > 0) {
            fetchPrices(tickers);
        }
    }, [portfolio]);

    const fetchPrices = async (tickers) => {
        try {
            const response = await axiosInstance.post('batch-prices/', { tickers });
            setPrices(response.data);
        } catch (err) {
            console.error('Failed to fetch portfolio prices:', err);
        }
    };

    const addHolding = (e) => {
        e.preventDefault();
        const holding = {
            id: Date.now(),
            ticker: form.ticker.toUpperCase(),
            shares: parseFloat(form.shares),
            buyPrice: parseFloat(form.buyPrice),
        };
        if (!holding.ticker || !holding.shares || !holding.buyPrice) return;

        const updated = [...portfolio, holding];
        setPortfolio(updated);
        localStorage.setItem('mv_portfolio', JSON.stringify(updated));
        setForm({ ticker: '', shares: '', buyPrice: '' });
        setShowForm(false);
    };

    const removeHolding = (id) => {
        const updated = portfolio.filter(p => p.id !== id);
        setPortfolio(updated);
        localStorage.setItem('mv_portfolio', JSON.stringify(updated));
    };

    // Compute totals
    let totalInvested = 0;
    let totalCurrent = 0;

    portfolio.forEach(h => {
        const invested = h.shares * h.buyPrice;
        totalInvested += invested;
        const currentPrice = prices[h.ticker]?.price;
        if (currentPrice) {
            totalCurrent += h.shares * currentPrice;
        } else {
            totalCurrent += invested;
        }
    });

    const totalPL = totalCurrent - totalInvested;
    const totalPLPct = totalInvested > 0 ? ((totalPL / totalInvested) * 100) : 0;
    const plColor = totalPL >= 0 ? '#00C853' : '#FF1744';

    return (
        <div className="glass-panel p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-light mb-0" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>
                    Portfolio Tracker
                </h5>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-sm"
                    style={{
                        background: 'linear-gradient(135deg, #E63946, #D62828)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        padding: '4px 14px',
                    }}
                >
                    {showForm ? 'Cancel' : '+ Add Stock'}
                </button>
            </div>

            {/* Add holding form */}
            {showForm && (
                <form onSubmit={addHolding} className="d-flex flex-wrap gap-2 mb-3 p-3" style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)',
                }}>
                    <input
                        type="text"
                        value={form.ticker}
                        onChange={(e) => setForm({ ...form, ticker: e.target.value.toUpperCase() })}
                        placeholder="Ticker"
                        className="form-control form-control-sm"
                        style={{ maxWidth: '100px' }}
                    />
                    <input
                        type="number"
                        value={form.shares}
                        onChange={(e) => setForm({ ...form, shares: e.target.value })}
                        placeholder="Shares"
                        className="form-control form-control-sm"
                        style={{ maxWidth: '90px' }}
                        step="any"
                    />
                    <input
                        type="number"
                        value={form.buyPrice}
                        onChange={(e) => setForm({ ...form, buyPrice: e.target.value })}
                        placeholder="Buy Price ($)"
                        className="form-control form-control-sm"
                        style={{ maxWidth: '120px' }}
                        step="any"
                    />
                    <button type="submit" className="btn btn-sm btn-primary">Add</button>
                </form>
            )}

            {/* Portfolio Summary */}
            {portfolio.length > 0 && (
                <div className="d-flex flex-wrap gap-4 mb-3 p-3" style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                }}>
                    <div>
                        <small className="text-light d-block" style={{ opacity: 0.5 }}>Invested</small>
                        <span className="text-light fw-bold">${totalInvested.toFixed(2)}</span>
                    </div>
                    <div>
                        <small className="text-light d-block" style={{ opacity: 0.5 }}>Current Value</small>
                        <span className="text-light fw-bold">${totalCurrent.toFixed(2)}</span>
                    </div>
                    <div>
                        <small className="text-light d-block" style={{ opacity: 0.5 }}>P/L</small>
                        <span style={{ color: plColor, fontWeight: 700 }}>
                            {totalPL >= 0 ? '+' : ''}{totalPL.toFixed(2)} ({totalPLPct >= 0 ? '+' : ''}{totalPLPct.toFixed(2)}%)
                        </span>
                    </div>
                </div>
            )}

            {/* Holdings list */}
            {portfolio.length === 0 ? (
                <p className="text-light mb-0" style={{ opacity: 0.4, fontSize: '0.85rem' }}>
                    No holdings yet. Add your first stock above!
                </p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-100" style={{ fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th className="text-light py-2" style={{ opacity: 0.5, fontWeight: 500 }}>Stock</th>
                                <th className="text-light py-2" style={{ opacity: 0.5, fontWeight: 500 }}>Shares</th>
                                <th className="text-light py-2" style={{ opacity: 0.5, fontWeight: 500 }}>Buy Price</th>
                                <th className="text-light py-2" style={{ opacity: 0.5, fontWeight: 500 }}>Current</th>
                                <th className="text-light py-2" style={{ opacity: 0.5, fontWeight: 500 }}>P/L</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map((h) => {
                                const currentPrice = prices[h.ticker]?.price;
                                const invested = h.shares * h.buyPrice;
                                const current = currentPrice ? h.shares * currentPrice : invested;
                                const pl = current - invested;
                                const plPct = invested > 0 ? ((pl / invested) * 100) : 0;
                                const color = pl >= 0 ? '#00C853' : '#FF1744';

                                return (
                                    <tr key={h.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td className="text-light py-2 fw-bold">{h.ticker}</td>
                                        <td className="text-light py-2">{h.shares}</td>
                                        <td className="text-light py-2">${h.buyPrice.toFixed(2)}</td>
                                        <td className="text-light py-2">{currentPrice ? `$${currentPrice}` : '...'}</td>
                                        <td className="py-2" style={{ color, fontWeight: 600 }}>
                                            {pl >= 0 ? '+' : ''}{pl.toFixed(2)} ({plPct >= 0 ? '+' : ''}{plPct.toFixed(1)}%)
                                        </td>
                                        <td className="py-2">
                                            <button
                                                onClick={() => removeHolding(h.id)}
                                                className="btn btn-sm p-0"
                                                style={{ color: '#FF1744', fontSize: '1rem', background: 'none', border: 'none' }}
                                            >
                                                ×
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PortfolioTracker;
