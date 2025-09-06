# Brazweed Landing Page

Uma landing page moderna e responsiva baseada no design original da Brazweed, uma plataforma de gestão para dispensários de cannabis.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional inspirada no design original
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Interativo**: Animações suaves e efeitos de hover
- **Performance Otimizada**: Carregamento rápido e experiência fluida
- **Acessibilidade**: Navegação por teclado e semântica adequada

## 📋 Seções Incluídas

1. **Header/Navigation** - Menu de navegação com logo e botão CTA
2. **Hero Section** - Título principal com call-to-action
3. **Features Section** - Principais recursos da plataforma
4. **Powerful Features** - Detalhamento das funcionalidades
5. **Pricing Section** - Planos Basic e Pro com toggle anual/mensal
6. **Join Waitlist** - Seção de call-to-action
7. **Footer** - Informações de contato e links

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com flexbox e grid
- **JavaScript ES6+** - Interatividade e animações
- **Font Awesome** - Ícones vetoriais
- **Google Fonts** - Tipografia (Inter)

## 📱 Recursos Implementados

### Interatividade
- Menu hamburger responsivo para mobile
- Smooth scrolling entre seções
- Modal de inscrição na waitlist
- Toggle de preços mensal/anual
- Animações on scroll
- Header que esconde/mostra durante o scroll

### Responsive Design
- Layout flexível para todas as telas
- Breakpoints otimizados:
  - Desktop: 1024px+
  - Tablet: 768px - 1023px
  - Mobile: até 767px

### Performance
- Preload de imagens
- Throttling de eventos de scroll
- Animações otimizadas com CSS transforms
- Carregamento otimizado de fontes

## 🎨 Paleta de Cores

- **Primary**: #00C851 (Verde principal)
- **Primary Dark**: #00A945 (Verde escuro)
- **Text Dark**: #1a1a1a (Texto principal)
- **Text Gray**: #666 (Texto secundário)
- **Background**: #f8f9fa (Fundo claro)
- **White**: #ffffff (Fundo branco)

## 📂 Estrutura de Arquivos

```
brazweed-landing-page/
├── index.html          # Estrutura principal da página
├── styles.css          # Estilos CSS
├── script.js          # JavaScript interativo
└── README.md          # Documentação
```

## 🚀 Como Usar

1. **Visualização Local**:
   - Abra o arquivo `index.html` em qualquer navegador moderno
   - Ou use um servidor local como Live Server no VS Code

2. **Hospedagem**:
   - Faça upload dos arquivos para qualquer servidor web
   - Compatível com Netlify, Vercel, GitHub Pages, etc.

## 🔧 Customização

### Cores
Edite as variáveis CSS no arquivo `styles.css`:
```css
:root {
    --primary-color: #00C851;
    --primary-dark: #00A945;
    /* ... outras variáveis */
}
```

### Conteúdo
- Edite o texto diretamente no `index.html`
- Substitua as imagens placeholder pelos logos reais
- Configure o formulário de waitlist com sua API

### Funcionalidades
- Modifique o comportamento do JavaScript no `script.js`
- Adicione novas animações ou interações
- Integre com serviços de email marketing

## 📊 Funcionalidades do Formulário

O modal de waitlist inclui:
- Validação de campos obrigatórios
- Estados de loading e sucesso
- Design responsivo
- Fechamento com ESC ou clique fora
- Coleta de dados:
  - Nome da empresa
  - Nome do contato
  - Email
  - Telefone (opcional)
  - Plano de interesse

## 🎯 Otimizações de Performance

- **Lazy Loading**: Imagens carregadas conforme necessário
- **CSS Minificado**: Estilos otimizados
- **JavaScript Otimizado**: Funções throttled para scroll
- **Fontes Otimizadas**: Carregamento eficiente do Google Fonts

## 🔒 Acessibilidade

- Navegação por teclado
- Foco visível em elementos interativos
- Textos alternativos para imagens
- Contraste adequado de cores
- Estrutura semântica HTML

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Dispositivos Testados
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px, 414px)

## 🎨 Design System

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Hierarquia**: H1-H6 com escalas proporcionais

### Espaçamentos
- **Base**: 1rem (16px)
- **Seções**: 80px padding vertical
- **Componentes**: 2rem padding interno

### Bordas e Sombras
- **Border Radius**: 8px, 12px, 16px, 50px (pills)
- **Sombras**: Suaves com transparência

## 🚀 Deploy

### Netlify
1. Conecte seu repositório GitHub
2. Configure build settings (nenhum build necessário)
3. Deploy automático

### Vercel
1. Import do GitHub
2. Deploy instantâneo
3. Preview automático de branches

### GitHub Pages
1. Enable Pages no repositório
2. Selecione branch main
3. Acesse via username.github.io/repo-name

## 🤝 Contribuição

Para contribuir com melhorias:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é baseado no design original da Brazweed e foi criado para fins educacionais e de demonstração.

## 📞 Contato

Para dúvidas ou sugestões sobre esta implementação, entre em contato através dos canais de comunicação apropriados.

---

**Nota**: Esta é uma implementação independente baseada no design público da Brazweed. Para a plataforma oficial, visite [brazweed.framer.website](https://brazweed.framer.website/).
