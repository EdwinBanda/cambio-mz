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

O build de produção usa `/cambio-mz/` como base (repositório GitHub `Cambio-MZ`) e o Vue Router utiliza navegação por hash. Se o repositório de publicação tiver outro nome, atualize `base` em `vite.config.js` para corresponder ao caminho do projeto.

## Conversão

O conversor usa os valores sintéticos apenas para demonstrar a interação dos campos e o cálculo. Não apresenta taxas atuais nem cotações garantidas.
