export function generateStats(data) {
  const { username, name, totalStars, totalCommits, totalPRs, totalIssues, publicRepos, followers } = data;
  
  const stats = [
    { label: 'Total Stars', value: totalStars, icon: '⭐' },
    { label: 'Total Commits', value: totalCommits, icon: '📝' },
    { label: 'Total PRs', value: totalPRs, icon: '🔀' },
    { label: 'Total Issues', value: totalIssues, icon: '❗' },
    { label: 'Public Repos', value: publicRepos, icon: '📦' },
    { label: 'Followers', value: followers, icon: '👥' },
  ];
  
  const cardWidth = 495;
  const cardHeight = 195;
  const itemHeight = 25;
  const itemsPerColumn = 3;
  
  let statsHtml = '';
  stats.forEach((stat, index) => {
    const column = Math.floor(index / itemsPerColumn);
    const row = index % itemsPerColumn;
    const x = 32 + (column * 240);
    const y = 50 + (row * itemHeight);
    
    statsHtml += `
    <g transform="translate(${x}, ${y})">
      <text x="0" y="0" class="stat-label">${stat.icon} ${stat.label}:</text>
      <text x="200" y="0" class="stat-value" text-anchor="end">${formatNumber(stat.value)}</text>
    </g>`;
  });
  
  return `
<svg width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1b27;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <style>
    .card {
      fill: url(#grad1);
      stroke: #70a5fd;
      stroke-width: 1;
      rx: 4.5;
    }
    .title {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #70a5fd;
    }
    .stat-label {
      font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #a9b1d6;
    }
    .stat-value {
      font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #bb9af7;
    }
    .subtitle {
      font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #7aa2f7;
    }
  </style>
  
  <rect class="card" x="0.5" y="0.5" width="${cardWidth - 1}" height="${cardHeight - 1}" />
  
  <g transform="translate(25, 35)">
    <text x="0" y="0" class="title">${name}'s GitHub Stats</text>
  </g>
  
  ${statsHtml}
  
  <g transform="translate(${cardWidth - 25}, ${cardHeight - 10})">
    <text x="0" y="0" class="subtitle" text-anchor="end">@${username}</text>
  </g>
</svg>`.trim();
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}
