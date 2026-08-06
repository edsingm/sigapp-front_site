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
  title: "Política de Privacidade",
  description:
    "Como o SIGAPP coleta, utiliza e protege seus dados pessoais conforme a LGPD.",
  path: "/legal/privacidade",
})

const SECTIONS: LegalSection[] = [
  { id: "controlador", title: "1. Controlador e DPO" },
  { id: "dados-coletados", title: "2. Dados que Coletamos" },
  { id: "finalidade", title: "3. Finalidade e Base Legal" },
  { id: "compartilhamento", title: "4. Compartilhamento" },
  { id: "retencao", title: "5. Retenção de Dados" },
  { id: "transferencia", title: "6. Transferência Internacional" },
  { id: "seguranca", title: "7. Segurança" },
  { id: "direitos", title: "8. Seus Direitos (LGPD)" },
  { id: "menores", title: "9. Menores de Idade" },
  { id: "alteracoes", title: "10. Alterações" },
  { id: "contato", title: "11. Contato" },
]

export default function PrivacidadePage() {
  return (
    <LegalLayout
      title="Política de Privacidade"
      description="Como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD (Lei 13.709/2018)."
      lastUpdated="07 de junho de 2026"
      sections={SECTIONS}
    >
      <LHighlight>
        Esta Política se aplica a todos os dados pessoais tratados pelo SIGAPP
        no contexto da plataforma, do site institucional e de comunicações com
        Usuários e potenciais clientes. Leia com atenção — ela explica seus
        direitos e como exercê-los.
      </LHighlight>

      <LSection id="controlador" title="1. Controlador e DPO">
        <LP>
          <strong>Controlador:</strong> {SITE.legalName}, CNPJ {SITE.cnpj}.
        </LP>
        <LP>
          <strong>Encarregado de Dados (DPO):</strong> Responsável pelo canal
          oficial de comunicação sobre privacidade, conforme o Art. 41 da LGPD.
        </LP>
        <LList
          items={[
            `E-mail: ${SITE.dpoEmail}`,
            "Prazo de resposta: até 15 dias corridos, conforme o Art. 18, §3º da LGPD.",
            "Idioma: português.",
          ]}
        />
        <LP>
          Quando o SIGAPP processa dados inseridos pelo Cliente na Plataforma
          (dados de terrenos, viabilidades, contatos, documentos), atua como{" "}
          <strong>operador</strong> sob instrução do Cliente (controlador).
          Nesse contexto, o Cliente é responsável pelas bases legais do
          tratamento e pelo atendimento aos direitos dos titulares de dados que
          ele próprio inseriu.
        </LP>
      </LSection>

      <LSection id="dados-coletados" title="2. Dados que Coletamos">
        <LSubsection title="2.1 Dados de conta e cadastro">
          <LList
            items={[
              "Nome completo e/ou razão social",
              "E-mail profissional",
              "CPF ou CNPJ",
              "Telefone de contato",
              "Dados de faturamento (processados diretamente pelo Stripe — o SIGAPP não armazena número de cartão)",
              "Endereço da empresa",
            ]}
          />
        </LSubsection>
        <LSubsection title="2.2 Dados de uso da plataforma">
          <LList
            items={[
              "Logs de acesso (IP, data/hora, dispositivo, navegador)",
              "Ações realizadas na Plataforma (criação, edição, exclusão de registros)",
              "Histórico de sessões e autenticação",
              "Preferências de interface",
            ]}
          />
        </LSubsection>
        <LSubsection title="2.3 Dados inseridos pelo Cliente (operação)">
          <LP>
            Dados de negócio inseridos pelo Cliente — como informações de
            terrenos, contatos de proprietários, parâmetros de viabilidade e
            documentos — são tratados pelo SIGAPP exclusivamente como operador,
            para prestação dos serviços contratados.
          </LP>
        </LSubsection>
        <LSubsection title="2.4 Dados de comunicação">
          <LList
            items={[
              "Conteúdo de mensagens enviadas ao suporte ou ao DPO",
              "Respostas a pesquisas de satisfação (quando participar voluntariamente)",
              "Dados de leads captados pelo site (nome, e-mail, empresa)",
            ]}
          />
        </LSubsection>
        <LSubsection title="2.5 Dados de cookies e rastreamento">
          <LP>
            Cookies e tecnologias similares são usados conforme descrito na{" "}
            <a
              href="/legal/cookies"
              className="font-medium text-[var(--landing-accent-strong)] hover:underline"
            >
              Política de Cookies
            </a>
            .
          </LP>
        </LSubsection>
      </LSection>

      <LSection id="finalidade" title="3. Finalidade e Base Legal">
        <LP>
          O SIGAPP trata dados pessoais com base nas hipóteses legais previstas
          no Art. 7º da LGPD. A tabela abaixo descreve cada tratamento, sua
          finalidade e base legal:
        </LP>
        <LTable
          headers={[
            "Finalidade",
            "Dados envolvidos",
            "Base legal (LGPD Art. 7º)",
          ]}
          rows={[
            [
              "Criação e gestão de conta",
              "Nome, e-mail, CPF/CNPJ",
              "Execução de contrato (inciso V)",
            ],
            [
              "Faturamento e cobrança",
              "Dados de pagamento, CNPJ/CPF",
              "Execução de contrato (inciso V)",
            ],
            [
              "Prestação dos serviços da Plataforma",
              "Dados de uso, logs, conteúdo do Usuário",
              "Execução de contrato (inciso V)",
            ],
            [
              "Comunicações transacionais (e-mails de conta, alertas)",
              "E-mail, nome",
              "Execução de contrato (inciso V)",
            ],
            [
              "Suporte ao cliente",
              "E-mail, nome, dados do problema relatado",
              "Execução de contrato / Legítimo interesse (inciso IX)",
            ],
            [
              "Segurança, prevenção de fraudes e auditoria",
              "Logs de acesso, IP",
              "Legítimo interesse (inciso IX)",
            ],
            [
              "Marketing e comunicações comerciais",
              "E-mail, nome, empresa",
              "Consentimento (inciso I)",
            ],
            [
              "Análise de uso para melhoria do produto",
              "Dados agregados e anonimizados de uso",
              "Legítimo interesse (inciso IX)",
            ],
            [
              "Cumprimento de obrigações legais e fiscais",
              "Dados de faturamento, CPF/CNPJ",
              "Cumprimento de obrigação legal (inciso II)",
            ],
          ]}
        />
        <LP>
          O consentimento para marketing pode ser revogado a qualquer momento
          clicando em &ldquo;cancelar inscrição&rdquo; em nossos e-mails ou pelo
          canal do DPO.
        </LP>
      </LSection>

      <LSection id="compartilhamento" title="4. Compartilhamento de Dados">
        <LP>
          O SIGAPP não vende dados pessoais. Compartilhamos dados apenas nas
          seguintes situações:
        </LP>
        <LSubsection title="4.1 Prestadores de serviço (suboperadores)">
          <LList
            items={[
              "Stripe: processamento de pagamentos. Política: stripe.com/br/privacy",
              "OpenRouter: processamento de requisições de IA (SIG_IA). Os dados são enviados apenas durante a consulta, sem armazenamento pelo provedor.",
              "Resend: envio de e-mails transacionais.",
              "Amazon Web Services (AWS) ou equivalente: hospedagem e infraestrutura.",
              "Sentry: monitoramento de erros (dados anonimizados).",
            ]}
          />
          <LP>
            Todos os suboperadores são contratualmente obrigados a tratar os
            dados com confidencialidade e em conformidade com a LGPD ou
            regulação equivalente.
          </LP>
        </LSubsection>
        <LSubsection title="4.2 Obrigações legais">
          <LP>
            Podemos divulgar dados em resposta a ordens judiciais, requisições
            de autoridades competentes ou quando necessário para proteger
            direitos legais do SIGAPP.
          </LP>
        </LSubsection>
        <LSubsection title="4.3 Transferência de empresa">
          <LP>
            Em caso de fusão, aquisição ou venda de ativos, os dados poderão ser
            transferidos ao novo controlador, que ficará sujeito a esta
            Política. Os Usuários serão notificados.
          </LP>
        </LSubsection>
      </LSection>

      <LSection id="retencao" title="5. Retenção de Dados">
        <LTable
          headers={["Tipo de dado", "Prazo de retenção", "Critério"]}
          rows={[
            [
              "Dados de conta (nome, e-mail, CPF/CNPJ)",
              "5 anos após encerramento",
              "Obrigação legal fiscal (Lei 9.430/96)",
            ],
            [
              "Logs de acesso",
              "6 meses",
              "Marco Civil da Internet (Lei 12.965/2014, Art. 15)",
            ],
            ["Dados de faturamento", "5 anos", "Código Tributário Nacional"],
            [
              "Conteúdo do Usuário (dados de negócio)",
              "30 dias após cancelamento",
              "Período de exportação; excluídos após",
            ],
            [
              "Comunicações de suporte",
              "2 anos",
              "Legítimo interesse / defesa em processos",
            ],
            [
              "Dados de leads (marketing)",
              "Até revogação do consentimento ou 2 anos sem atividade",
              "Consentimento",
            ],
          ]}
        />
        <LP>
          Após o prazo de retenção, os dados são excluídos de forma segura ou
          anonimizados. A anonimização torna os dados não mais sujeitos à LGPD.
        </LP>
      </LSection>

      <LSection
        id="transferencia"
        title="6. Transferência Internacional de Dados"
      >
        <LP>
          Alguns de nossos suboperadores (Stripe, AWS, OpenRouter) podem
          processar dados fora do Brasil. Nesses casos, garantimos que a
          transferência ocorre em conformidade com o Art. 33 da LGPD, com base
          em:
        </LP>
        <LList
          items={[
            "Cláusulas contratuais padrão que impõem obrigações equivalentes às da LGPD.",
            "Transferência para países ou organizações que proporcionam grau de proteção adequado, conforme decisão da ANPD.",
            "Consentimento específico do titular, quando aplicável.",
          ]}
        />
      </LSection>

      <LSection id="seguranca" title="7. Segurança">
        <LP>
          Adotamos medidas técnicas e organizacionais para proteger seus dados
          pessoais contra acesso não autorizado, alteração, divulgação ou
          destruição:
        </LP>
        <LList
          items={[
            "Criptografia em trânsito (TLS 1.3) e em repouso (AES-256).",
            "Isolamento de banco de dados por Cliente (database-per-tenant com PostgreSQL).",
            "Autenticação com controle de sessão, tokens de acesso e renovação automática.",
            "Controle de acesso baseado em papéis (RBAC) com permissões granulares.",
            "Logs de auditoria de todas as ações realizadas na Plataforma.",
            "Monitoramento contínuo de vulnerabilidades e testes de segurança periódicos.",
            "Política de acesso mínimo (least privilege) para funcionários do SIGAPP.",
          ]}
        />
        <LP>
          Em caso de incidente de segurança que possa causar risco ou dano
          relevante aos titulares, o SIGAPP comunicará a ANPD e os titulares
          afetados no prazo legal de 72 horas a contar da ciência do incidente.
        </LP>
      </LSection>

      <LSection id="direitos" title="8. Seus Direitos (LGPD Art. 18)">
        <LP>
          Como titular de dados pessoais, você tem os seguintes direitos, que
          podem ser exercidos gratuitamente por meio do canal{" "}
          <a
            href={`mailto:${SITE.dpoEmail}`}
            className="font-medium text-[var(--landing-accent-strong)] hover:underline"
          >
            {SITE.dpoEmail}
          </a>
          :
        </LP>
        <LTable
          headers={["Direito", "O que significa"]}
          rows={[
            [
              "Confirmação e acesso",
              "Confirmar se tratamos seus dados e obter cópia deles.",
            ],
            [
              "Correção",
              "Solicitar correção de dados incompletos, inexatos ou desatualizados.",
            ],
            [
              "Anonimização, bloqueio ou eliminação",
              "Solicitar que dados desnecessários, excessivos ou tratados em desconformidade sejam anonimizados, bloqueados ou eliminados.",
            ],
            [
              "Portabilidade",
              "Receber seus dados em formato estruturado e interoperável para transferência a outro fornecedor.",
            ],
            [
              "Eliminação (consentimento)",
              "Solicitar eliminação de dados tratados com base em consentimento, após sua revogação.",
            ],
            [
              "Informação sobre compartilhamento",
              "Saber com quais entidades públicas e privadas compartilhamos seus dados.",
            ],
            [
              "Informação sobre consentimento",
              "Ser informado sobre a possibilidade de não consentir e as consequências da negativa.",
            ],
            [
              "Revogação do consentimento",
              "Revogar consentimento a qualquer momento, sem ônus.",
            ],
            [
              "Oposição",
              "Opor-se ao tratamento realizado com base em legítimo interesse quando violar seus direitos.",
            ],
            [
              "Revisão de decisões automatizadas",
              "Solicitar revisão de decisões tomadas exclusivamente com base em tratamento automatizado que afetem seus interesses.",
            ],
          ]}
        />
        <LHighlight>
          Responderemos a todas as solicitações em até{" "}
          <strong>15 dias corridos</strong> a partir do recebimento, conforme o
          Art. 18, §3º da LGPD. Podemos solicitar documentação para confirmar
          sua identidade antes de processar a solicitação.
        </LHighlight>
        <LP>
          Caso não esteja satisfeito com nossa resposta, você pode peticionar à{" "}
          <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> pelo
          site gov.br/anpd.
        </LP>
      </LSection>

      <LSection id="menores" title="9. Menores de Idade">
        <LP>
          A Plataforma SIGAPP é destinada exclusivamente a pessoas maiores de 18
          anos no contexto empresarial. Não coletamos intencionalmente dados
          pessoais de menores de 18 anos. Se identificarmos que coletamos dados
          de menor, excluiremos tais dados imediatamente.
        </LP>
      </LSection>

      <LSection id="alteracoes" title="10. Alterações desta Política">
        <LP>
          Esta Política pode ser atualizada periodicamente. Alterações materiais
          serão comunicadas por e-mail ao endereço cadastrado, com antecedência
          mínima de 30 dias. O uso continuado da Plataforma após a vigência das
          alterações implica aceite das novas condições.
        </LP>
        <LP>
          O histórico de versões desta Política pode ser solicitado ao DPO.
        </LP>
      </LSection>

      <LSection id="contato" title="11. Contato">
        <LP>
          Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
        </LP>
        <LList
          items={[
            `E-mail DPO: ${SITE.dpoEmail}`,
            "Prazo de resposta: até 15 dias corridos.",
            `E-mail geral: ${SITE.email}`,
          ]}
        />
      </LSection>
    </LegalLayout>
  )
}
