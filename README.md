# MotoShift

Aplicação web estática para visualizar a escala semanal de motoboys e exportar a semana em imagem.

## Estrutura do projeto

- `index.html`: estrutura da página
- `assets/css/styles.css`: estilos da interface
- `assets/js/app.js`: lógica de rotação, navegação e exportação da imagem
- `.github/workflows/deploy-pages.yml`: deploy automático para GitHub Pages

## Deploy no GitHub Pages (pronto para ativar)

1. Faça push para a branch `main`.
2. No GitHub, abra `Settings > Pages`.
3. Em `Build and deployment`, selecione `Source: GitHub Actions`.
4. Aguarde o workflow `Deploy MotoShift to GitHub Pages` concluir com sucesso.

Depois disso, cada push na `main` publica automaticamente.

## Desenvolvimento local

Abra `index.html` no navegador ou rode um servidor estático simples:

```powershell
python -m http.server 8080
```

Acesse `http://localhost:8080`.
