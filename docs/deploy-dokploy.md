# Deploy do site institucional no Dokploy

Runbook operacional deste repositório na VPS gerenciada pelo **Dokploy**.

**Dokploy é a única plataforma de deploy.** Coolify, AWS ECS/EKS e equivalentes
não são usados.

O backend Laravel tem runbook próprio (`backend/docs/deploy-dokploy.md`). Este
arquivo cobre só o site de marketing (`sigapp.com.br` / `www`).

---

## Estado atual — Cenário B

`main` sobe sozinha **somente** em staging. Produção é deploy **manual** da
mesma revisão que passou no smoke de staging. Merge na `main` **não** é go-live.

| | Staging | Produção |
|---|---|---|
| Compose | `docker-compose.staging.yml` | `docker-compose.prod.yml` |
| Branch | `main` | `main` (revisão escolhida no deploy) |
| Auto-deploy | **ON** | **OFF** |
| Hosts | domínio de staging do site (Dokploy/Traefik) | `sigapp.com.br`, `www.sigapp.com.br` |
| `API_URL` | hostname interno do backend de staging | hostname interno do backend de prod |
| Service Compose | `front` | `front` |

```text
local → PR + CI verde → merge main
      → Dokploy auto-deploy STAGING
      → smoke da home
      → (ok) Deploy MANUAL no app de prod (mesmo commit)
      → smoke prod
```

CI é gate de **merge**. O Dokploy não espera o Actions. Não mergeie sem checks
verdes.

Este app **não** roda `sigapp-release`. Não há migrations aqui.

---

## Arquitetura na VPS

| Recurso | Observação |
|---|---|
| Imagem | Next.js `output: "standalone"`; target `runner` |
| Porta | interna `3000` (`expose`, sem publicar no host) |
| Proxy | Traefik do Dokploy (domínio configurado no app, não por labels neste compose) |
| BFF | `app/api/demo-request` usa `API_URL` para o Laravel interno |

---

## Variáveis

Catálogo: `.env.production.example` (sem segredos reais). Valores reais só no
Dokploy.

- `NEXT_PUBLIC_*` entram como **build args**. No Dokploy, marque-os como
  variáveis de build. Mudança nesses valores exige **rebuild**.
- `API_URL` é runtime (server-side).
- Analytics (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`) só com IDs de
  produção no app de prod.

---

## Depois de cada merge (staging)

```text
1. PR → typecheck/lint verdes
2. Merge na main
3. Dokploy auto-deploy só do app staging deste repo
4. Health + smoke da home
5. Confirmar que prod não redeployou
```

```bash
curl -fsS -o /dev/null -w '%{http_code}\n' https://<host-staging-do-site>/
```

Smoke mínimo:

- [ ] Healthcheck do compose passou
- [ ] Home e uma página legal (`/legal/termos-de-uso`) respondem
- [ ] CTA de cadastro/demonstração aponta ao host certo (não prod, em staging)
- [ ] Sem erro novo óbvio nos logs

---

## Checklist de promoção staging → prod

Promova o **mesmo commit** que passou no staging.

- [ ] CI/typecheck verde no SHA
- [ ] Auto-deploy do app **prod** continua **OFF**
- [ ] `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_APP_URL` / `NEXT_PUBLIC_SITE_URL` de prod
- [ ] Deploy **manual** da mesma revisão
- [ ] `https://sigapp.com.br/` e `https://www.sigapp.com.br/` → 200
- [ ] Formulário de demonstração/cadastro (smoke da feature, se o PR tocou nisso)

Rollback: no Dokploy prod, redeploy da revisão anterior. Sem schema neste app.

---

## O que não fazer

| Ação | Motivo |
|---|---|
| Religar auto-deploy de prod | Cada merge volta a ser go-live |
| Promover sem conferir o SHA | Leva commit não validado em staging |
| IDs de analytics de prod no staging | polui métricas |
| Documentar Coolify, ECS ou K8s como caminho de deploy | legado; este runbook prevalece |

---

## Referências

- `docker-compose.staging.yml` / `docker-compose.prod.yml`
- `.env.production.example`
- `CLAUDE.md`
