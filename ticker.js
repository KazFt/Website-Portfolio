// ========== LIVE TICKER ==========
  const tickerData = [
    { name: 'NASDAQ',   symbol: '^IXIC' },
    { name: 'S&P 500',  symbol: '^GSPC' },
    { name: 'DOW JONES',symbol: '^DJI'  },
    { name: 'BTC/USD',  symbol: 'BTC-USD' },
    { name: 'ETH/USD',  symbol: 'ETH-USD' },
    { name: 'GOLD',     symbol: 'GC=F'  },
    { name: 'CRUDE OIL',symbol: 'CL=F'  },
    { name: 'EUR/USD',  symbol: 'EURUSD=X' },
  ];

  async function fetchPrice(symbol) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`;
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const json = await res.json();
    const data = JSON.parse(json.contents);
    const meta = data.chart.result[0].meta;
    const price = meta.regularMarketPrice;
    const prev  = meta.chartPreviousClose;
    const change = ((price - prev) / prev * 100).toFixed(2);
    return { price, change };
  }

  async function updateTicker() {
    for (const item of tickerData) {
      try {
        const { price, change } = await fetchPrice(item.symbol);
        const isPositive = change >= 0;

        const html = `
          <span class="ticker-name">${item.name}</span>
          <span class="ticker-value">${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span class="ticker-change ${isPositive ? 'positive' : 'negative'}">${isPositive ? '▲' : '▼'} ${Math.abs(change)}%</span>
        `;

        // Update all matching ticker items (original + duplicate)
        document.querySelectorAll('.ticker-item').forEach(el => {
          if (el.querySelector('.ticker-name')?.textContent === item.name) {
            el.innerHTML = html;
          }
        });

      } catch (err) {
        console.warn(`Failed to fetch ${item.name}:`, err);
      }
    }
  }

  // Fetch on load then every 60 seconds
  updateTicker();
  setInterval(updateTicker, 60000);


  // ========== LIGHTBOX ==========
  function openCert(card) {
    const img = card.querySelector('.cert-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });