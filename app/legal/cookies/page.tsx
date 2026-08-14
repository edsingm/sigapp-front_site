import type { Metadata } from "next"
import {
  LegalLayout,
  LSection,
  LP,
  LList,
  LSubsection,
  LHighlight,
  LTable,
  type LegalSection,
} from "@/components/landing/layout/LegalLayout"
import { SITE } from "@/lib/landing-data"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Política de Cookies",
  description:
    "Quais cookies o SIGAPP utiliza, para quê servem e como você pode gerenciar suas preferências.",
  path: "/legal/cookies",
})

const GA4_ENABLED = Boolean(process.env.NEXT_PUBLIC_GA4_ID)
const PIXEL_ENABLED = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID)

const SECTIONS: LegalSection[] = [
  { id: "o-que-sao", title: "1. O que são Cookies" },
  { id: "tipos", title: "2. Tipos de Cookies" },
  { id: "cookies-usados", title: "3. Cookies que Usamos" },
  { id: "terceiros", title: "4. Cookies de Terceiros" },
  { id: "gestao", title: "5. Como Gerenciar Cookies" },
  { id: "lgpd", title: "6. LGPD e Consentimento" },
  { id: "atualizacoes", title: "7. Atualizações" },
  { id: "contato", title: "8. Contato" },
]

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Política de Cookies"
      description="Como utilizamos cookies e tecnologias similares, quais dados coletam e como você pode gerenciar suas preferências."
      lastUpdated="14 de agosto de 2026"
      sections={SECTIONS}
    >
      <LHighlight>
        Utilizamos cookies para garantir o funcionamento correto da Plataforma,
        lembrar suas preferências e, com seu consentimento, entender como você
        usa nosso site para que possamos melhorá-lo. Você pode ajustar suas
        preferências a qualquer momento.
      </LHighlight>

      <LSection id="o-que-sao" title="1. O que são Cookies">
        <LP>
          Cookies são pequenos arquivos de texto armazenados no seu navegador ou
          dispositivo quando você visita um site. Eles permitem que o site
          reconheça seu dispositivo em visitas subsequentes e lembre informações
          como suas preferências de idioma, status de login e configurações de
          interface.
        </LP>
        <LP>
          Além de cookies (arquivos de texto), utilizamos tecnologias similares
          como:
        </LP>
        <LList
          items={[
            "Local Storage e Session Storage: dados armazenados no próprio navegador, sem envio ao servidor a cada requisição. Usados para preferências de interface e dados de sessão.",
            "Pixels de rastreamento: pequenas imagens (1×1 pixel) em e-mails, que nos informam quando um e-mail foi aberto.",
            "Fingerprinting de navegador (limitado): combinação de atributos do navegador para detecção de fraude e segurança de conta.",
          ]}
        />
      </LSection>

      <LSection id="tipos" title="2. Classificação dos Cookies">
        <LP>Os cookies se classificam quanto à:</LP>
        <LSubsection title="Origem">
          <LList
            items={[
              "Cookies próprios (first-party): definidos pelo SIGAPP, no domínio sigapp.com.br.",
              "Cookies de terceiros (third-party): definidos por domínios de parceiros ou fornecedores de serviços.",
            ]}
          />
        </LSubsection>
        <LSubsection title="Duração">
          <LList
            items={[
              "Cookies de sessão: expiram ao fechar o navegador.",
              "Cookies persistentes: permanecem no dispositivo por um período definido.",
            ]}
          />
        </LSubsection>
        <LSubsection title="Finalidade">
          <LList
            items={[
              "Estritamente necessários: indispensáveis ao funcionamento básico do site e da Plataforma.",
              "Funcionais (preferências): permitem lembrar suas escolhas e personalizar a experiência.",
              "Analíticos: ajudam a entender como os Usuários interagem com o site.",
              "Marketing: usados para exibir anúncios relevantes em outros sites (apenas com consentimento).",
            ]}
          />
        </LSubsection>
      </LSection>

      <LSection id="cookies-usados" title="3. Cookies que o SIGAPP Utiliza">
        <LSubsection title="3.1 Cookies estritamente necessários">
          <LP>
            Estes cookies são essenciais para registrar sua escolha de
            cookies e o funcionamento básico deste site institucional. Não
            podem ser desativados sem impactar essa função.{" "}
            <strong>Não requerem consentimento</strong> com base no legítimo
            interesse (Art. 7º, inciso IX da LGPD).
          </LP>
          <LTable
            headers={["Nome", "Duração", "Finalidade"]}
            rows={[
              [
                "sigapp_cookie_consent",
                "1 ano",
                "Armazena suas preferências de consentimento (localStorage e cookie HTTP).",
              ],
            ]}
          />
        </LSubsection>

        <LSubsection title="3.2 Cookies funcionais">
          <LP>
            Permitem melhorar sua experiência lembrando escolhas e preferências.
            Requerem consentimento quando vão além do estritamente necessário.
          </LP>
          <LTable
            headers={["Nome", "Duração", "Finalidade"]}
            rows={[
              [
                "sigapp-theme",
                "Persistente (localStorage)",
                "Lembra o tema claro/escuro escolhido neste site institucional.",
              ],
            ]}
          />
        </LSubsection>

        <LSubsection title="3.3 Cookies analíticos (com consentimento)">
          {GA4_ENABLED ? (
            <>
              <LP>
                Com o seu consentimento, o Google Analytics 4 (GA4) pode
                definir os cookies abaixo neste site institucional. Sem
                consentimento, o Consent Mode v2 permanece em modo denied e
                esses cookies não são gravados.
              </LP>
              <LTable
                headers={["Provedor", "Nome", "Duração", "Finalidade"]}
                rows={[
                  [
                    "Google Analytics 4",
                    "_ga",
                    "2 anos",
                    "Distingue visitantes de forma agregada.",
                  ],
                  [
                    "Google Analytics 4",
                    "_ga_*",
                    "2 anos",
                    "Mantém o estado da sessão de medição.",
                  ],
                  [
                    "Google Analytics 4",
                    "_gid",
                    "24 horas",
                    "Distingue visitantes no período de um dia.",
                  ],
                ]}
              />
            </>
          ) : (
            <LP>
              Cookies analíticos só são instalados se o Google Analytics 4
              estiver configurado neste site e após o seu consentimento. Neste
              momento não há cookies de GA4 ativos.
            </LP>
          )}
          <LP>
            Os dados analíticos são tratados de forma agregada. Você pode
            recusar ou revogar sem perda das funções essenciais do site.
          </LP>
        </LSubsection>

        <LSubsection title="3.4 Cookies de marketing (com consentimento)">
          <LP>
            No <strong>site institucional</strong> (sigapp.com.br), cookies de
            marketing medem campanhas apenas com o seu consentimento.{" "}
            <strong>Dentro da Plataforma</strong> (app.sigapp.com.br), não
            utilizamos cookies de marketing.
          </LP>
          {PIXEL_ENABLED ? (
            <LTable
              headers={["Provedor", "Nome", "Duração", "Finalidade"]}
              rows={[
                [
                  "Meta Pixel",
                  "_fbp",
                  "90 dias",
                  "Identifica o navegador para medição de campanhas Meta.",
                ],
                [
                  "Meta Pixel",
                  "_fbc",
                  "90 dias",
                  "Registra o clique em anúncio quando a visita vem de uma campanha Meta.",
                ],
              ]}
            />
          ) : (
            <LP>
              Cookies de marketing só são instalados se o Meta Pixel estiver
              configurado neste site e após o seu consentimento. Neste momento
              não há cookies de marketing ativos.
            </LP>
          )}
          <LP>
            Estes cookies só são ativados após consentimento explícito no banner
            de cookies. Você pode revogar a qualquer momento.
          </LP>
        </LSubsection>
      </LSection>

      <LSection id="terceiros" title="4. Cookies de Terceiros">
        <LP>
          Alguns cookies são definidos por terceiros cujos serviços
          incorporamos:
        </LP>
        <LList
          items={[
            "Stripe: apenas em /cadastro, ao iniciar o checkout. A Stripe pode definir cookies para prevenção de fraude. Consulte stripe.com/br/privacy.",
          ]}
        />
        <LP>
          O SIGAPP não controla os cookies de terceiros. Recomendamos consultar
          as políticas de privacidade de cada provedor.
        </LP>
      </LSection>

      <LSection id="gestao" title="5. Como Gerenciar Cookies">
        <LSubsection title="5.1 Central de preferências do SIGAPP">
          <LP>
            Ao acessar o site pela primeira vez, exibimos um banner de
            consentimento. Você pode:
          </LP>
          <LList
            items={[
              "Aceitar todos os cookies.",
              "Aceitar apenas os necessários.",
              "Personalizar categoria por categoria.",
              'Alterar suas preferências a qualquer momento clicando em "Gerenciar cookies" no rodapé.',
            ]}
          />
        </LSubsection>

        <LSubsection title="5.2 Configurações do navegador">
          <LP>
            Você pode controlar cookies diretamente pelo navegador. Veja como em
            cada um:
          </LP>
          <LList
            items={[
              "Google Chrome: Configurações → Privacidade e segurança → Cookies e outros dados do site.",
              "Mozilla Firefox: Configurações → Privacidade e segurança → Cookies e dados do site.",
              "Apple Safari: Preferências → Privacidade → Gerenciar dados do site.",
              "Microsoft Edge: Configurações → Cookies e permissões do site.",
            ]}
          />
          <LHighlight>
            Bloquear cookies estritamente necessários pode impedir o registro
            da sua escolha neste site. Recomendamos gerenciar apenas os cookies
            analíticos e de marketing, mantendo os necessários e funcionais
            ativos.
          </LHighlight>
        </LSubsection>

        <LSubsection title="5.3 Opt-out de analytics">
          <LP>
            Para desativar cookies analíticos ou de marketing neste site,
            use &ldquo;Gerenciar cookies&rdquo; no rodapé ou o banner de
            preferências. A revogação limpa os cookies de fornecedor
            correspondentes.
          </LP>
        </LSubsection>
      </LSection>

      <LSection id="lgpd" title="6. LGPD e Consentimento">
        <LP>
          Em conformidade com a LGPD (Lei 13.709/2018) e com o Marco Civil da
          Internet (Lei 12.965/2014), o SIGAPP:
        </LP>
        <LList
          items={[
            "Obtém consentimento livre, informado e inequívoco antes de instalar cookies não estritamente necessários.",
            "Permite que o consentimento seja revogado a qualquer momento, sem ônus e sem degradação dos serviços essenciais.",
            "Não condiciona o acesso ao conteúdo do site institucional ao consentimento de cookies de marketing.",
            "Registra internamente o consentimento dado (data, versão da política, categorias aceitas) para fins de auditoria.",
            "Atualiza as preferências conforme eventuais mudanças na legislação ou regulamentações da ANPD.",
          ]}
        />
        <LP>
          Cookies estritamente necessários não requerem consentimento, pois seu
          uso é indispensável para o fornecimento do serviço solicitado pelo
          Usuário (base legal: execução de contrato, Art. 7º, inciso V da LGPD,
          e legítimo interesse, inciso IX).
        </LP>
      </LSection>

      <LSection id="atualizacoes" title="7. Atualizações desta Política">
        <LP>
          Esta Política pode ser atualizada para refletir mudanças nos cookies
          utilizados, nas tecnologias de rastreamento ou na legislação
          aplicável. Atualizações serão comunicadas por meio de notificação no
          banner de cookies ou por e-mail, conforme a materialidade da
          alteração.
        </LP>
        <LP>
          A data de &ldquo;última atualização&rdquo; no topo desta página indica
          quando a versão vigente foi publicada.
        </LP>
      </LSection>

      <LSection id="contato" title="8. Contato">
        <LP>
          Para dúvidas sobre o uso de cookies ou para exercer seus direitos
          relacionados a rastreamento, entre em contato com nosso DPO:
        </LP>
        <LList
          items={[
            `E-mail: ${SITE.dpoEmail}`,
            'Assunto sugerido: "Política de Cookies — [sua dúvida]"',
            "Prazo de resposta: até 15 dias corridos.",
          ]}
        />
      </LSection>
    </LegalLayout>
  )
}
