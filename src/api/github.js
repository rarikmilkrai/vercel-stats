import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export async function fetchGitHubData(username) {
  const token = process.env.GITHUB_TOKEN;
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  
  try {
    // Buscar dados do usuário
    const userResponse = await axios.get(`${GITHUB_API}/users/${username}`, { headers });
    const user = userResponse.data;
    
    // Buscar repositórios do usuário
    const reposResponse = await axios.get(
      `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
      { headers }
    );
    const repos = reposResponse.data;
    
    // Buscar commits recentes (para calcular streak)
    const events = await fetchRecentEvents(username, headers);
    
    // Calcular estatísticas
    const stats = calculateStats(user, repos, events);
    
    return stats;
  } catch (error) {
    throw new Error(`Erro ao buscar dados do GitHub: ${error.message}`);
  }
}

async function fetchRecentEvents(username, headers) {
  try {
    const response = await axios.get(
      `${GITHUB_API}/users/${username}/events?per_page=100`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.warn('Aviso: não foi possível buscar eventos recentes');
    return [];
  }
}

function calculateStats(user, repos, events) {
  // Filtrar repos próprios (não forks)
  const ownRepos = repos.filter(repo => !repo.fork);
  
  // Calcular totais
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalCommits = calculateTotalCommits(events);
  const totalPRs = events.filter(e => e.type === 'PullRequestEvent').length;
  const totalIssues = events.filter(e => e.type === 'IssuesEvent').length;

  // adicionar contagem de commits por repositório
  ownRepos.forEach(repo => {
    const repoEvents = events.filter(e => e.repo.name === repo.full_name && e.type === 'PushEvent');
    const repoCommits = calculateTotalCommits(repoEvents);
    repo.commitCount = repoCommits;
  });

  // Calcular linguagens
  const languages = calculateLanguages(repos);
  
  // Calcular streak
  const streak = calculateStreak(events);
  
  return {
    username: user.login,
    name: user.name || user.login,
    avatarUrl: user.avatar_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars,
    totalForks,
    totalCommits,
    totalPRs,
    totalIssues,
    languages,
    streak,
    createdAt: user.created_at,
  };
}

function calculateTotalCommits(events) {
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  return pushEvents.reduce((sum, event) => {
    return sum + (event.payload?.commits?.length || 0);
  }, 0);
}

function calculateLanguages(repos) {
  const langStats = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      langStats[repo.language] = (langStats[repo.language] || 0) + 1;
    }
  });
  
  // Converter para array e ordenar
  const sorted = Object.entries(langStats)
    .sort(([, a], [, b]) => b - a)
    .map(([lang, count]) => ({ name: lang, count }));
  
  return sorted;
}

function calculateStreak(events) {
  if (events.length === 0) {
    return { current: 0, longest: 0, total: 0 };
  }
  
  // Extrair datas únicas de commits
  const commitDates = events
    .filter(e => e.type === 'PushEvent')
    .map(e => e.created_at.split('T')[0])
    .filter((date, index, self) => self.indexOf(date) === index)
    .sort()
    .reverse();
  
  if (commitDates.length === 0) {
    return { current: 0, longest: 0, total: commitDates.length };
  }
  
  // Calcular current streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < commitDates.length; i++) {
    const date = new Date(commitDates[i]);
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === i) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Calcular longest streak
  let longestStreak = 1;
  let tempStreak = 1;
  
  for (let i = 1; i < commitDates.length; i++) {
    const prevDate = new Date(commitDates[i - 1]);
    const currDate = new Date(commitDates[i]);
    const diffDays = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }
  
  return {
    current: currentStreak,
    longest: longestStreak,
    total: commitDates.length,
  };
}
