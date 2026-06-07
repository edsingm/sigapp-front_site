const FOOTER_LINKS = {
  Produto: ["Funcionalidades", "Planos", "API", "Changelog"],
  Empresa: ["Sobre", "Blog", "Carreiras", "Imprensa"],
  Suporte: ["Documentação", "Status", "Contato", "Ajuda"],
  Legal: ["Termos de Uso", "Privacidade", "LGPD", "Cookies"],
}

function SigappLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm">
        <svg viewBox="0 0 24 24" className="size-4 text-primary-foreground" fill="none">
          <polygon
            points="12,2 22,7 22,17 12,22 2,17 2,7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="fill-primary-foreground/20"
          />
          <polygon
            points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="fill-primary-foreground/40"
          />
        </svg>
      </div>
      <span className="font-heading text-lg font-bold tracking-tight text-foreground">
        SIGAPP
      </span>
    </div>
  )
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container-landing py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <SigappLogo />
            <p className="max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
              Plataforma SaaS para prospecção, viabilidade e gestão imobiliária B2B.
            </p>
            <div className="flex items-center gap-3">
              {["Li", "Tw", "In"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                {group}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 SIGAPP Tecnologia Ltda. CNPJ 00.000.000/0001-00
          </p>
          <p className="text-xs text-muted-foreground">
            Feito no Brasil para o mercado imobiliário brasileiro
          </p>
        </div>
      </div>
    </footer>
  )
}
