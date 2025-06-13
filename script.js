async function fetchCryptoNews() {
  const newsGrid = document.getElementById("news-grid");
  
  try {
    // Mostra placeholder de carregamento
    newsGrid.innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>Carregando portais de notícias...</p></div>`;
// Dados dos portais brasileiros de criptomoedas
    const brazilianCryptoPortals = [
      {
        title: "Portal do Bitcoin - Notícias sobre Bitcoin e Criptomoedas",
        description: "As principais notícias sobre Bitcoin, criptomoedas e blockchain no Brasil",
        source: "Portal do Bitcoin",
        url: "https://portaldobitcoin.com",
        image: "assets/images/logo-portaldobitcoin.png",
        date: new Date().toLocaleString('pt-BR')
      },
      {
        title: "Livecoins - Notícias do Mercado Cripto",
        description: "Cotações, análises e novidades sobre criptomoedas",
        source: "Livecoins",
        url: "https://livecoins.com.br",
        image: "assets/images/logo-livecoins.png",
        date: new Date().toLocaleString('pt-BR')
      },
      {
        title: "Cointelegraph Brasil - Notícias de Blockchain",
        description: "As últimas notícias sobre Bitcoin, Ethereum, DeFi e NFTs",
        source: "Cointelegraph Brasil",
        url: "https://br.cointelegraph.com",
        image: "assets/images/logo-cointelegraph.png",
        date: new Date().toLocaleString('pt-BR')
      },
      {
        title: "CriptoFacil - Guia para Iniciantes em Criptomoedas",
        description: "Notícias, tutoriais e análises do mercado cripto",
        source: "CriptoFácil",
        url: "https://www.criptofacil.com",
        image: "assets/images/logo-criptofacil.png",
        date: new Date().toLocaleString('pt-BR')
      },
      {
        title: "BitcoinTrade - Mercado e Análises",
        description: "Notícias e análises do mercado de criptomoedas brasileiro",
        source: "BitcoinTrade",
        url: "https://blog.bitcointrade.com.br",
        image: "assets/images/logo-bitcointrade.png",
        date: new Date().toLocaleString('pt-BR')
      },
      {
        title: "Seudinheiro - Criptomoedas e Investimentos",
        description: "Notícias sobre criptomoedas e finanças pessoais",
        source: "Seu Dinheiro",
        url: "https://www.seudinheiro.com/criptomoedas/",
        image: "assets/images/logo-seudinheiro.png",
        date: new Date().toLocaleString('pt-BR')
      }
    ];

    newsGrid.innerHTML = '';

    brazilianCryptoPortals.forEach(portal => {
      const card = document.createElement("div");
      card.className = "news-card glass-card";
      card.innerHTML = `
        <div class="news-card glass-card">
          <img src="${portal.image}" alt="${portal.title}" class="news-image" onerror="this.src='https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop'">
          <div class="news-content">
            <div class="news-source">
              <img src="${portal.image}" alt="${portal.source}" onerror="this.src='https://via.placeholder.com/20x20/ff8906/ffffff?text=N'">
              <span>${portal.source}</span>
            </div>
            <h4 class="news-title">${portal.title}</h4>
            <p class="news-excerpt">${portal.description}</p>
            <div class="news-date">Atualizado em: ${portal.date}</div>
            <a href="${portal.url}" target="_blank" rel="noopener noreferrer" class="cta-button" style="margin-top: 1rem;">
              <i class="fas fa-external-link-alt"></i> Acessar Portal
            </a>
          </div>
        </div>
      `;

      newsGrid.appendChild(card);
    });
} catch (error) {
    console.error('Erro ao carregar portais:', error);
    newsGrid.innerHTML = `
      <div class="swiper-slide">
        <div class="news-card glass-card">
          <div class="news-content">
            <h4 class="news-title">Portais de Notícias Cripto</h4>
            <p class="news-excerpt">Principais fontes em língua portuguesa</p>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
              <a href="https://portaldobitcoin.com" target="_blank" rel="noopener noreferrer" class="cta-button" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fas fa-external-link-alt"></i> Portal do Bitcoin
              </a>
              <a href="https://livecoins.com.br" target="_blank" rel="noopener noreferrer" class="cta-button" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fas fa-external-link-alt"></i> Livecoins
              </a>
              <a href="https://br.cointelegraph.com" target="_blank" rel="noopener noreferrer" class="cta-button" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fas fa-external-link-alt"></i> Cointelegraph Brasil
              </a>
              <a href="https://www.criptofacil.com" target="_blank" rel="noopener noreferrer" class="cta-button" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fas fa-external-link-alt"></i> CriptoFácil
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const cryptoPricesContainer = document.getElementById('crypto-prices');
  const refreshButton = document.getElementById('refresh-crypto');
  const lastUpdatedElement = document.getElementById('last-updated');
  
  // Dados das criptomoedas
  let cryptoChart;
  let cryptoData = {};
  const cryptoIds = ['bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana', 'polkadot'];
  
  // Mapeamento de ícones locais
  const cryptoIcons = {
    'bitcoin': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    'ethereum': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    'binancecoin': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    'cardano': 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    'solana': 'https://cryptologos.cc/logos/solana-sol-logo.png',
    'polkadot': 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png'
  };
  
  // Nomes das criptomoedas
  const cryptoNames = {
    'bitcoin': 'Bitcoin',
    'ethereum': 'Ethereum',
    'binancecoin': 'Binance Coin',
    'cardano': 'Cardano',
    'solana': 'Solana',
    'polkadot': 'Polkadot'
  };
  
  // Símbolos das criptomoedas
  const cryptoSymbols = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'binancecoin': 'BNB',
    'cardano': 'ADA',
    'solana': 'SOL',
    'polkadot': 'DOT'
  };
  
  // Função para formatar números como moeda
  function formatCurrency(num) {
    if (num >= 1) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(num);
    } else {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 6
      }).format(num);
    }
  }
  
  // Função para formatar números grandes
  function formatLargeNumber(num) {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + 'T';
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  }
  
  // Função para buscar dados das criptomoedas
  async function fetchCryptoPrices() {
    try {
      // Mostra o spinner de carregamento
      showLoadingSpinner();
      
      // Busca os preços atuais com dados de mercado
      const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Atualiza o timestamp
      const now = new Date();
      lastUpdatedElement.textContent = `Última atualização: ${now.toLocaleTimeString('pt-BR')}`;
      
      // Armazena os dados para o gráfico
      cryptoData = data.reduce((acc, coin) => {
        acc[coin.id] = coin;
        return acc;
      }, {});
      
      // Pega apenas as 5 principais moedas por capitalização de mercado
      const topCoins = data.slice(0, 5);

      // Atualiza a exibição com as 5 moedas principais
      displayCryptoPrices(topCoins);
      updateChart(topCoins);
      updateMarketData(topCoins);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      showErrorMessage();
    }
  }
  
  // Função para mostrar spinner de carregamento
  function showLoadingSpinner() {
    cryptoPricesContainer.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Carregando cotações...</p>
      </div>
    `;
  }
  
  // Função para mostrar mensagem de erro
  function showErrorMessage() {
    cryptoPricesContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Erro ao carregar cotações. Verifique sua conexão e tente novamente.</p>
        <button onclick="fetchCryptoPrices()" class="refresh-button" style="margin-top: 1rem;">
          <i class="fas fa-sync-alt"></i> Tentar Novamente
        </button>
      </div>
    `;
  }
  
  // Função para exibir os preços das criptomoedas
  function displayCryptoPrices(data) {
    cryptoPricesContainer.innerHTML = '';
    
    data.forEach(coin => {
      const change24h = coin.price_change_percentage_24h || 0;
      const changeClass = change24h >= 0 ? 'positive' : 'negative';
      const changeIcon = change24h >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
      
      const card = document.createElement('div');
      card.className = 'crypto-card glass-card';
      card.innerHTML = `
        <div class="crypto-header">
          <img src="${cryptoIcons[coin.id] || coin.image}" alt="${coin.name}" class="crypto-icon" onerror="this.src='${coin.image}'">
          <div>
            <div class="crypto-name">${cryptoNames[coin.id] || coin.name}</div>
            <div class="crypto-symbol">${cryptoSymbols[coin.id] || coin.symbol.toUpperCase()}</div>
          </div>
        </div>
        <div class="crypto-price">${formatCurrency(coin.current_price)}</div>
        <div class="crypto-change ${changeClass}">
          <i class="fas ${changeIcon}"></i>
          <span>${Math.abs(change24h).toFixed(2)}%</span>
        </div>
      `;
      
      cryptoPricesContainer.appendChild(card);
    });
  }
  
  // Função para atualizar dados do mercado global
  function updateMarketData(data) {
    // Calcula dados agregados
    const totalMarketCap = data.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
    const totalVolume = data.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
    
    // Encontra o Bitcoin para calcular dominância
    const bitcoin = data.find(coin => coin.id === 'bitcoin');
    const btcDominance = bitcoin ? (bitcoin.market_cap / totalMarketCap * 100) : 0;
    
    // Atualiza os elementos
    document.getElementById('market-cap').textContent = `$${formatLargeNumber(totalMarketCap)}`;
    document.getElementById('market-volume').textContent = `$${formatLargeNumber(totalVolume)}`;
    document.getElementById('btc-dominance').textContent = `${btcDominance.toFixed(1)}%`;
  }
  
  function updateChart(data) {
    const ctx = document.getElementById('cryptoChart');
    if (!ctx) return;

    const chartCtx = ctx.getContext('2d');

    // Destroi o gráfico anterior, se existir
    if (window.cryptoChart instanceof Chart) {
      window.cryptoChart.destroy();
    }

    const labels = data.map(coin => cryptoSymbols[coin.id] || coin.symbol.toUpperCase());
    const changes = data.map(coin => coin.price_change_percentage_24h || 0);

    window.cryptoChart = new Chart(chartCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Variação 24h (%)',
          data: changes,
          backgroundColor: changes.map(change => change >= 0 ? 'rgba(46, 204, 113, 0.8)' : 'rgba(231, 76, 60, 0.8)'),
          borderColor: changes.map(change => change >= 0 ? 'rgba(46, 204, 113, 1)' : 'rgba(231, 76, 60, 1)'),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 14, 23, 0.9)',
            titleColor: '#fffffe',
            bodyColor: '#fffffe',
            borderColor: 'rgba(255, 137, 6, 0.3)',
            borderWidth: 1,
            cornerRadius: 12,
            callbacks: {
              label: context => `${context.parsed.y.toFixed(2)}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(255, 255, 255, 0.1)', drawBorder: false },
            ticks: {
              color: '#a7a9be',
              font: { family: 'Space Mono' },
              callback: value => value.toFixed(1) + '%'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#a7a9be',
              font: { family: 'Space Mono', weight: 'bold' }
            }
          }
        }
      }
    });
  }

  // Inicialização do Swiper para notícias
  function initializeSwiper() {
    new Swiper('.news-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
  
  // Função para scroll suave
  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Função para animações de entrada
  function initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        }
      });
    }, observerOptions);
    
    // Observa elementos que devem animar
    document.querySelectorAll('.glass-card, .section-title, .feature-item').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }
  
  // Event Listeners
  if (refreshButton) {
    refreshButton.addEventListener('click', fetchCryptoPrices);
  }
  
  // Inicialização
  fetchCryptoPrices();
initializeSmoothScroll();
  initializeScrollAnimations();
  fetchCryptoNews();

  // Atualiza os dados a cada 2 minutos (respeitando rate limit da API)
  setInterval(fetchCryptoPrices, 120000);
  
  // Torna a função fetchCryptoPrices global para uso em botões de erro
  window.fetchCryptoPrices = fetchCryptoPrices;
  
  // Header scroll effect
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    // Add background blur when scrolled
    if (scrollTop > 50) {
      header.style.background = 'rgba(15, 14, 23, 0.95)';
    } else {
      header.style.background = 'rgba(15, 14, 23, 0.8)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Mobile menu toggle (implementação completa)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const body = document.body;
  
  if (mobileMenuToggle && navLinks && mobileMenuOverlay) {
    // Função para abrir o menu
    function openMobileMenu() {
      mobileMenuToggle.classList.add('active');
      navLinks.classList.add('mobile-active');
      mobileMenuOverlay.classList.add('active');
      body.style.overflow = 'hidden';
      
      // Adiciona classe show após um pequeno delay para animação
      setTimeout(() => {
        navLinks.classList.add('show');
      }, 10);
      
      // Muda o ícone para X
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
    
    // Função para fechar o menu
    function closeMobileMenu() {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('show');
      mobileMenuOverlay.classList.remove('active');
      body.style.overflow = '';
      
      // Remove classe mobile-active após animação
      setTimeout(() => {
        navLinks.classList.remove('mobile-active');
      }, 300);
      
      // Muda o ícone para hambúrguer
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
    
    // Toggle do menu
    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains("mobile-active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Fechar menu ao clicar no overlay
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Fechar menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-active')) {
          closeMobileMenu();
        }
      });
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
        closeMobileMenu();
      }
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('mobile-active')) {
        closeMobileMenu();
      }
    });
  }
  
  // Adiciona efeitos de hover para cards
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.glass-card')) {
      e.target.closest('.glass-card').style.transform = 'translateY(-8px)';
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.glass-card')) {
      e.target.closest('.glass-card').style.transform = 'translateY(0)';
    }
  });
});