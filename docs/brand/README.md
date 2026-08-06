# SIGAPP — Brand System

Documentação de marca extraída do site de marketing e do design system em produção.

**Posicionamento visual:** Cartografia Decisiva  
**Gênero:** modern-minimal B2B SaaS com restrição editorial cartográfica  
**Produto:** plataforma de dossiê territorial e viabilidade para incorporadoras brasileiras

## Índice

| Arquivo | Conteúdo |
|---|---|
| [identity.md](./identity.md) | Essência, posicionamento, princípios, público |
| [voice-and-tone.md](./voice-and-tone.md) | Voz, tom, padrões de copy, CTAs |
| [color.md](./color.md) | Paleta OKLCH — tinta / papel / sinal |
| [typography.md](./typography.md) | Famílias, escalas, papéis tipográficos |
| [logo.md](./logo.md) | Marcas, símbolo, assets e regras de uso |
| [visual-system.md](./visual-system.md) | Layout, motion, componentes de marca, imagery |
| [do-and-dont.md](./do-and-dont.md) | O que fazer e o que evitar |
| [marketing/](./marketing/) | Fotos editoriais + [canvas kit Survey Silence](./marketing/canvas/) |

## Fontes de verdade no código

| Assunto | Onde vive |
|---|---|
| Tokens de cor / tema | `app/globals.css` — `:root`, `.dark`, `@theme inline` |
| Landing semantic | mesmos `:root` (`--landing-*`) + CSS de seções no arquivo |
| Motion | segundo bloco `:root` (`--motion-fast`, `--motion-reveal`, `--motion-ease-out`) |
| Export portátil de tokens | `tokens.css` (espelho de design; runtime = globals) |
| Design system (layout, motion, CTAs) | `design.md` |
| Copy e metadados de marca | `lib/landing-data.ts` (`SITE`, seções, CTAs) |
| Wordmark / ícone | `public/logo-mark.svg`, `public/icon.svg`, `public/landing-logo-mark.svg` |
| Tipografia (runtime) | `app/layout.tsx` — Space Grotesk · IBM Plex Sans · Geist Mono |

### Inventário vivo vs morto

**Cor de marca** = família `--landing-*` (tinta / papel / sinal).  
**Kit UI** = shadcn (`background`, `primary`, …) — não é o rosto da marca.  
Detalhe e o que foi removido: [color.md](./color.md).

## Snapshot rápido

- **Nome:** SIGAPP
- **Razão social:** SIGAPP Tecnologia Imobiliária
- **CNPJ:** 68.410.328/0001-10
- **Tagline de produto:** Decisões que ganham território
- **Título SEO:** SIGAPP — Decisões que ganham território
- **Site:** https://sigapp.com.br
- **App:** https://app.sigapp.com.br
- **Contato:** contato@sigapp.com.br
- **DPO:** dpo@sigapp.com.br
- **Locale:** pt_BR

## Como usar esta pasta

1. **Marketing / conteúdo** → `identity.md` + `voice-and-tone.md`  
2. **Design visual** → `color.md` + `typography.md` + `logo.md` + `visual-system.md`  
3. **Engenharia** → respeitar `design.md` + tokens em `app/globals.css`; copy só via `lib/landing-data.ts`  
4. **Revisão de marca** → checklist em `do-and-dont.md`

> Alterações de identidade, voz ou tokens devem ser refletidas aqui **e** nas fontes de verdade do código. Esta pasta documenta; não substitui o runtime.
