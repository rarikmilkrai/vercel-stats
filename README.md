# GitHub Stats Generator

Gerador automático de estatísticas do GitHub com atualização diária via GitHub Actions.

## 🚀 Features

- ✅ Gera SVGs estáticos das suas estatísticas do GitHub
- ✅ Atualização automática diária via GitHub Actions
- ✅ Tema Tokyo Night (pode ser customizado)
- ✅ Sem dependência de serviços externos
- ✅ 100% open source

## 📊 Estatísticas Geradas

- **GitHub Stats**: Total de stars, commits, PRs, issues, repos e followers
- **GitHub Streak**: Streak atual, maior streak e total de dias
- **Top Languages**: Linguagens mais usadas nos seus repositórios

## 🛠️ Como Usar

### 1. Clone o repositório

```bash
git clone <seu-repo>
cd vercel-stats
```

### 2. Instale as dependências

```bash
npm install
```

### 3. (Opcional) Configure um token do GitHub

Para evitar rate limits, crie um token em: https://github.com/settings/tokens

Copie o `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` e adicione seu token:

```
GITHUB_TOKEN=seu_token_aqui
GITHUB_USERNAME=seu_usuario
```

### 4. Gere as estatísticas localmente

```bash
npm start
```

Os SVGs serão gerados na pasta `output/`.

### 5. Configure no GitHub

1. Faça push do código para o GitHub
2. Os workflows do GitHub Actions rodarão automaticamente todos os dias
3. Você também pode executar manualmente em: `Actions` > `Update GitHub Stats` > `Run workflow`

## 📝 Uso no README

Adicione as seguintes linhas ao seu README.md:

```markdown
### 📊 GitHub Stats

![GitHub Stats](output/github-stats.svg)

![GitHub Streak](output/github-streak.svg)

![Top Langs](output/top-langs.svg)
```

## ⚙️ Personalização

Você pode personalizar os geradores de SVG editando os arquivos em `src/generators/`:

- `stats.js` - Estatísticas gerais
- `streak.js` - Streak de commits
- `topLangs.js` - Linguagens mais usadas

### Temas

O tema atual é Tokyo Night. Para mudar as cores, edite as seções `<style>` nos geradores de SVG.

## 📅 Frequência de Atualização

Por padrão, as estatísticas são atualizadas:
- Todo dia às 00:00 UTC (21:00 horário de Brasília)
- Em cada push na branch `main`
- Manualmente via GitHub Actions

Para mudar a frequência, edite o cron em `.github/workflows/update-stats.yml`.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

## 📄 Licença

MIT

---

Feito com ❤️ por RARIK
