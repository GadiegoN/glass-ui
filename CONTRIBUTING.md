# Guia de Contribuição — Glass UI

Agradecemos o seu interesse em contribuir com o **Glass UI**! Este documento orienta você sobre o fluxo de trabalho, padrões de código e diretrizes de design.

---

## 🛠️ Configuração do Ambiente Local

1. **Requisitos**:
   - Node.js versão 18+ (recomendado 22+).
   - `pnpm` versão 9+.

2. **Instalação**:
   ```bash
   # Clonar o repositório
   git clone https://github.com/GadiegoN/glass-ui.git
   cd glass-ui

   # Instalar dependências em todo o monorepo
   pnpm install
   ```

3. **Executar a Documentação & Studio em Desenvolvimento**:
   ```bash
   pnpm dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000).

4. **Compilar a Biblioteca**:
   ```bash
   pnpm build:pkg
   ```

---

## 🧱 Como Criar um Novo Componente Glass

Ao criar um novo componente em `packages/react/src/components/`:

1. **Use a primitiva `<Glass />` como fundação**:
   Nunca crie uma div crua com desfoque manual. Utilize a primitiva para herdar automaticamente as propriedades de física (blur, refração, borda especular e ruído).

2. **Tipagem e Props**:
   - Estenda `GlassStyleProps` se o componente aceitar propriedades de estilização de vidro (`material`, `depth`, `tint`, etc.).
   - Mantenha compatibilidade com `ref` usando `React.forwardRef`.
   - Adicione `displayName`.

3. **Checklist de Qualidade do Componente**:
   - [ ] Funciona tanto no tema escuro quanto no tema claro?
   - [ ] Tem estados `:hover`, `:active`, `:focus-visible` e `:disabled` coerentes?
   - [ ] Não bloqueia eventos de clique ou interação?
   - [ ] Foi exportado em `packages/react/src/index.ts`?
   - [ ] Possui exemplo ao vivo adicionado no Showcase em `apps/docs`?

---

## 📝 Convenção de Commits

Seguimos a convenção [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(componente): nova funcionalidade ou componente`
- `fix(componente): correção de bug ou layout`
- `docs: alterações na documentação`
- `perf: melhorias de performance de renderização`
- `refactor: refatoração de código sem alteração visual`
- `chore: atualizações de build, dependências ou configs`

Exemplos:
```bash
git commit -m "feat(components): add GlassAccordion with spring transitions"
git commit -m "fix(slider): resolve thumb offset calculation"
```

---

## 🚀 Criando um Pull Request

1. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
2. Faça os commits seguindo a convenção.
3. Se adicionou ou alterou um componente do pacote `@gadiegon/glass-ui`, crie um changeset:
   ```bash
   pnpm changeset
   ```
4. Verifique a compilação:
   ```bash
   pnpm build
   ```
5. Envie a branch e abra o PR no GitHub descrevendo as motivações da mudança e incluindo capturas de tela/gravação se houver alteração visual.
