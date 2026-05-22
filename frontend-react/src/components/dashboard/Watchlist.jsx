import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const Watchlist = ({ onSelectTicker }) => {
    const [watchlist, setWatchlist] = useState([]);
    const [newTicker, setNewTicker] = useState('');
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(false);

    // Load watchlist from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('mv_watchlist');
        if (saved) {
            setWatchlist(JSON.parse(saved));
        }
    }, []);

    // Fetch prices whenever watchlist changes
    useEffect(() => {
        if (watchlist.length > 0) {
            fetchPrices();
        }
    }, [watchlist]);

    const fetchPrices = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('batch-prices/', { tickers: watchlist });
            setPrices(response.data);
        } catch (err) {
            console.error('Failed to fetch watchlist prices:', err);
        } finally {
            setLoading(false);
        }
    };

    const addTicker = (e) => {
        e.preventDefault();
        const t = newTicker.trim().toUpperCase();
        if (t && !watchlist.includes(t)) {
            const updated = [...watchlist, t];
            setWatchlist(updated);
            localStorage.setItem('mv_watchlist', JSON.stringify(updated));
        }
        setNewTicker('');
    };

    const removeTicker = (ticker) => {
        const updated = watchlist.filter(t => t !== ticker);
        setWatchlist(updated);
        localStorage.setItem('mv_watchlist', JSON.stringify(updated));
        const newPrices = { ...prices };
        delete newPrices[ticker];
        setPrices(newPrices);
    };

    return (
        <div className="glass-panel p-4 mb-4">
            <h5 className="text-light mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>
                Watchlist
            </h5>

            {/* Add ticker form */}
            <form onSubmit={addTicker} className="d-flex gap-2 mb-3">
                <input
                    type="text"
                    value={newTicker}
                    onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
                    placeholder="Add ticker..."
                    className="form-control form-control-sm"
                    style={{ maxWidth: '150px' }}
                />
                <button type="submit" className="btn btn-sm" style={{
                    background: 'linear-gradient(135deg, #E63946, #D62828)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    padding: '4px 14px',
                }}>
                    + Add
                </button>
            </form>

            {/* Watchlist items */}
            {watchlist.length === 0 ? (
                <p className="text-light mb-0" style={{ opacity: 0.4, fontSize: '0.85rem' }}>
                    No stocks in watchlist. Add some above!
                </p>
            ) : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {watchlist.map((ticker) => {
                        const data = prices[ticker];
                        const hasError = data?.error;
                        const changeColor = data?.change_pct > 0 ? '#00C853' : data?.change_pct < 0 ? '#FF1744' : '#A8DADC';

                        return (
                            <div
                                key={ticker}
                                className="d-flex justify-content-between align-items-center py-2 px-2"
                                style={{
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'pointer',
                                    borderRadius: '6px',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                onClick={() => onSelectTicker && onSelectTicker(ticker)}
                            >
                                <div>
                                    <span className="text-light fw-bold" style={{ fontSize: '0.95rem' }}>{ticker}</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    {loading ? (
                                        <small className="text-light" style={{ opacity: 0.4 }}>...</small>
                                    ) : hasError ? (
                                        <small className="text-danger">N/A</small>
                                    ) : data ? (
                                        <>
                                            <span className="text-light" style={{ fontSize: '0.9rem' }}>${data.price}</span>
                                            <span style={{ color: changeColor, fontSize: '0.8rem', fontWeight: 600 }}>
                                                {data.change_pct > 0 ? '+' : ''}{data.change_pct}%
                                            </span>
                                        </>
                                    ) : null}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeTicker(ticker); }}
                                        className="btn btn-sm p-0"
                                        style={{ color: '#FF1744', fontSize: '1.1rem', lineHeight: 1, background: 'none', border: 'none' }}
                                        title="Remove"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
