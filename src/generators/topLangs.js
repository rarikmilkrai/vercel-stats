export function generateTopLangs(data) {
  const { username, languages } = data;
  
  const cardWidth = 300;
  const cardHeight = 280;
  const topLanguages = languages.slice(0, 6);
  
  // Calcular total para percentuais
  const total = topLanguages.reduce((sum, lang) => sum + lang.count, 0);
  
  // Cores para linguagens (adicione mais conforme necessário)
  const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Go: '#00ADD8',
    Java: '#b07219',
    Rust: '#dea584',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    Ruby: '#701516',
    PHP: '#4F5D95',
    'C++': '#f34b7d',
    C: '#555555',
    Dart: '#00B4AB',
    Kotlin: '#A97BFF',
    Swift: '#ffac45',
  };
  
  let languagesHtml = '';
  topLanguages.forEach((lang, index) => {
    const percentage = ((lang.count / total) * 100).toFixed(1);
    const y = 60 + (index * 35);
    const barWidth = (percentage / 100) * (cardWidth - 80);
    const color = languageColors[lang.name] || '#858585';
    
    languagesHtml += `
    <g transform="translate(25, ${y})">
      <circle cx="0" cy="-6" r="5" fill="${color}" />
      <text x="15" y="0" class="lang-name">${lang.name}</text>
      <text x="${cardWidth - 60}" y="0" class="lang-percent" text-anchor="end">${percentage}%</text>
    </g>
    <g transform="translate(25, ${y + 8})">
      <rect width="${barWidth}" height="4" rx="2" fill="${color}" opacity="0.8" />
      <rect width="${cardWidth - 50}" height="4" rx="2" fill="#ffffff" opacity="0.1" />
    </g>`;
  });
  
  return `
<svg width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1b27;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <style>
    .card {
      fill: url(#grad3);
      stroke: #70a5fd;
      stroke-width: 1;
      rx: 4.5;
    }
    .title {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #70a5fd;
    }
    .lang-name {
      font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #a9b1d6;
    }
    .lang-percent {
      font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #bb9af7;
    }
  </style>
  
  <rect class="card" x="0.5" y="0.5" width="${cardWidth - 1}" height="${cardHeight - 1}" />
  
  <g transform="translate(25, 35)">
    <text x="0" y="0" class="title">💻 Top Languages</text>
  </g>
  
  ${languagesHtml}
  
  <g transform="translate(${cardWidth - 25}, ${cardHeight - 10})">
    <text x="0" y="0" class="lang-name" text-anchor="end">@${username}</text>
  </g>
</svg>`.trim();
}
