# Cambio-MZ

Interface demonstrativa de consulta e conversão de moedas em Moçambique.

## Desenvolvimento

```sh
npm install
npm run dev
```

A aplicação usa valores sintéticos de demonstração, definidos em `src/data/demoCurrencies.js`, para que os formulários, gráficos e conversor possam ser explorados sem uma API. Estes valores não são taxas reais e não devem ser usados em transações.

## Build e GitHub Pages

```sh
npm run build
npm run preview
```

O workflow `.github/workflows/deploy.yml` compila o site e publica `dist` no GitHub Pages a cada push para `main` (ou manualmente em **Actions → Deploy to GitHub Pages → Run workflow**). Em **Settings → Pages**, selecione **GitHub Actions** como origem de publicação.

O build usa `/cambio-mz/` como base para o repositório `jrdimande/cambio-mz`, e o Vue Router usa navegação por hash para funcionar em páginas de projeto.

## Conversão

O conversor usa os valores sintéticos apenas para demonstrar a interação dos campos e o cálculo. Não apresenta taxas atuais nem cotações garantidas.
