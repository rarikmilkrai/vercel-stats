import { generateStats } from './generators/stats.js';
import { generateStreak } from './generators/streak.js';
import { generateTopLangs } from './generators/topLangs.js';
import { fetchGitHubData } from './api/github.js';
import fs from 'fs';
import path from 'path';

const username = process.env.GITHUB_USERNAME || 'rarikmilkrai';
const outputDir = './output';

async function main() {
  try {
    console.log(`🚀 Buscando dados do GitHub para ${username}...`);
    
    // Buscar dados da API
    const data = await fetchGitHubData(username);
    
    // Criar diretório de output se não existir
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('📊 Gerando GitHub Stats...');
    const statsSvg = generateStats(data);
    fs.writeFileSync(path.join(outputDir, 'github-stats.svg'), statsSvg);
    
    console.log('🔥 Gerando GitHub Streak...');
    const streakSvg = generateStreak(data);
    fs.writeFileSync(path.join(outputDir, 'github-streak.svg'), streakSvg);
    
    console.log('💻 Gerando Top Languages...');
    const langsSvg = generateTopLangs(data);
    fs.writeFileSync(path.join(outputDir, 'top-langs.svg'), langsSvg);
    
    console.log('✅ Stats gerados com sucesso!');
    console.log(`📁 Arquivos salvos em: ${outputDir}`);
    
    // Salvar timestamp da última atualização
    const timestamp = new Date().toISOString();
    fs.writeFileSync(
      path.join(outputDir, 'last-update.txt'),
      `Última atualização: ${timestamp}`
    );
    
  } catch (error) {
    console.error('❌ Erro ao gerar stats:', error.message);
    process.exit(1);
  }
}

main();
