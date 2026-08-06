import type { Metadata } from "next"
import {
  LegalLayout,
  LSection,
  LP,
  LList,
  LSubsection,
  LHighlight,
  type LegalSection,
} from "@/components/landing/layout/LegalLayout"
import { SITE } from "@/lib/landing-data"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Termos de Uso",
  description:
    "Consulte as condições de acesso, contratação, responsabilidades e uso da plataforma SIGAPP.",
  path: "/legal/termos-de-uso",
})

const SECTIONS: LegalSection[] = [
  { id: "partes", title: "1. Partes e Definições" },
  { id: "objeto", title: "2. Objeto" },
  { id: "acesso", title: "3. Acesso e Cadastro" },
  { id: "planos", title: "4. Planos e Pagamento" },
  { id: "obrigacoes-usuario", title: "5. Obrigações do Usuário" },
  { id: "obrigacoes-sigapp", title: "6. Obrigações do SIGAPP" },
  { id: "propriedade", title: "7. Propriedade Intelectual" },
  { id: "dados", title: "8. Dados e Privacidade" },
  { id: "responsabilidade", title: "9. Limitação de Responsabilidade" },
  { id: "suspensao", title: "10. Suspensão e Rescisão" },
  { id: "vigencia", title: "11. Vigência" },
  { id: "disposicoes", title: "12. Disposições Gerais" },
]

export default function TermosDeUsoPage() {
  return (
    <LegalLayout
      title="Termos de Uso"
      description="Condições que regem o acesso e uso da plataforma SIGAPP."
      lastUpdated="07 de junho de 2026"
      sections={SECTIONS}
    >
      <LHighlight>
        Ao acessar ou utilizar a plataforma SIGAPP, você declara ter lido,
        compreendido e concordado integralmente com estes Termos de Uso. Caso
        não concorde com qualquer disposição, não utilize nossos serviços.
      </LHighlight>

      <LSection id="partes" title="1. Partes e Definições">
        <LP>
          <strong>Prestador:</strong> {SITE.legalName}, pessoa jurídica de
          direito privado, inscrita no CNPJ sob o nº {SITE.cnpj} (&ldquo;SIGAPP&rdquo;,
          &ldquo;nós&rdquo; ou &ldquo;nosso&rdquo;).
        </LP>
        <LP>
          <strong>Usuário:</strong> Qualquer pessoa física ou jurídica que
          acessa ou utiliza a plataforma SIGAPP, seja na condição de
          administrador, colaborador ou visitante (&ldquo;você&rdquo; ou
          &ldquo;seu&rdquo;).
        </LP>
        <LP>
          <strong>Cliente:</strong> A pessoa jurídica ou física que contrata um
          dos planos pagos do SIGAPP e que é responsável pela conta e pelos
          usuários vinculados a ela (tenant).
        </LP>
        <LP>Para fins destes Termos, as definições abaixo se aplicam:</LP>
        <LList
          items={[
            "Plataforma: sistema web disponibilizado pelo SIGAPP para gestão de prospecção, viabilidade financeira, workflow e IA imobiliária.",
            "Conta: perfil de acesso criado pelo Cliente ou por usuário convidado.",
            "Tenant: ambiente isolado de dados correspondente a um Cliente.",
            "Conteúdo do Usuário: dados, documentos, análises e informações inseridas pelo Usuário na Plataforma.",
          ]}
        />
      </LSection>

      <LSection id="objeto" title="2. Objeto">
        <LP>
          O SIGAPP disponibiliza um sistema de gestão imobiliária que inclui os
          módulos de Prospecção de Terrenos, Viabilidade Financeira, Comitê de
          Revisão, Negociação, Legalização, SIG_IA (assistente de IA) e
          Dashboard, conforme o plano contratado.
        </LP>
        <LP>
          O acesso é fornecido por meio de assinatura mensal ou anual, com
          período inicial de 7 (sete) dias grátis a partir do cadastro. O
          cadastramento em um plano requer a informação de dados de pagamento,
          que serão cobrados apenas após o encerramento desse período, salvo
          cancelamento antes do prazo.
        </LP>
        <LP>
          O SIGAPP é fornecido &ldquo;no estado em que se encontra&rdquo;
          (as-is), sujeito a atualizações, melhorias e manutenções periódicas,
          sem que isso implique alteração substancial das funcionalidades
          contratadas, salvo comunicação prévia.
        </LP>
      </LSection>

      <LSection id="acesso" title="3. Acesso e Cadastro">
        <LP>
          Para utilizar a Plataforma, o Usuário deve criar uma conta com
          informações verdadeiras, precisas e atualizadas. É vedado criar contas
          com dados falsos, impersonar terceiros ou utilizar identidades
          fictícias.
        </LP>
        <LSubsection title="3.1 Responsabilidade pelas credenciais">
          <LP>
            O Usuário é integralmente responsável pela confidencialidade de suas
            credenciais de acesso (e-mail e senha). Toda atividade realizada sob
            uma conta é de responsabilidade do titular, devendo o SIGAPP ser
            comunicado imediatamente em caso de uso não autorizado.
          </LP>
        </LSubsection>
        <LSubsection title="3.2 Requisitos de elegibilidade">
          <LP>
            O uso da Plataforma é permitido apenas a pessoas maiores de 18
            (dezoito) anos ou representantes legais de pessoas jurídicas
            devidamente constituídas. Ao se cadastrar, você declara atender a
            esses requisitos.
          </LP>
        </LSubsection>
        <LSubsection title="3.3 Limites de usuários por plano">
          <LP>
            Cada plano possui limite de usuários conforme descrito na página de
            Planos. O Cliente é responsável por não exceder o número contratado.
          </LP>
        </LSubsection>
      </LSection>

      <LSection id="planos" title="4. Planos e Pagamento">
        <LP>
          O SIGAPP oferece os planos SIG Broker, SIG Básico, SIG Master e SIG
          Pro, com preços, funcionalidades e limites definidos na página de
          Planos (&ldquo;sigapp.com.br/precos&rdquo;), que pode ser atualizada
          periodicamente mediante aviso prévio de 30 dias.
        </LP>
        <LSubsection title="4.1 Faturamento">
          <LP>
            O pagamento é processado mensalmente ou anualmente por meio da
            plataforma Stripe. Ao fornecer dados de cartão de crédito, o Usuário
            autoriza a cobrança recorrente pelo valor do plano no ciclo
            escolhido.
          </LP>
        </LSubsection>
        <LSubsection title="4.2 Período inicial de 7 dias grátis">
          <LP>
            O período inicial de 7 dias grátis é concedido uma única vez por
            CPF/CNPJ. Ao final desse período, a assinatura é automaticamente
            cancelada, a não ser que o Cliente tenha informado um método de
            pagamento e confirmado a contratação.
          </LP>
        </LSubsection>
        <LSubsection title="4.3 Inadimplência">
          <LP>
            Em caso de falha no pagamento, o SIGAPP notificará o Cliente por
            e-mail. Após 7 dias sem regularização, o acesso poderá ser suspenso.
            Após 30 dias, os dados do tenant poderão ser arquivados e, após 90
            dias, excluídos definitivamente, conforme a Política de Privacidade.
          </LP>
        </LSubsection>
        <LSubsection title="4.4 Reembolso">
          <LP>
            Não há reembolso proporcional de períodos já faturados, exceto nas
            hipóteses previstas no Código de Defesa do Consumidor (Lei
            8.078/1990) para contratos celebrados à distância, onde se aplica o
            direito de arrependimento de 7 dias a contar da contratação.
          </LP>
        </LSubsection>
      </LSection>

      <LSection id="obrigacoes-usuario" title="5. Obrigações do Usuário">
        <LP>O Usuário compromete-se a:</LP>
        <LList
          items={[
            "Utilizar a Plataforma exclusivamente para fins lícitos e em conformidade com estes Termos e a legislação vigente.",
            "Não compartilhar credenciais de acesso com terceiros não autorizados.",
            "Não realizar engenharia reversa, descompilação, desmontagem ou tentativa de extração do código-fonte da Plataforma.",
            "Não usar a Plataforma para armazenar, transmitir ou processar conteúdo ilegal, ofensivo, difamatório ou que viole direitos de terceiros.",
            "Não tentar acessar sistemas, bancos de dados ou contas de outros Clientes (tenants).",
            "Não utilizar robôs, scripts ou outros meios automatizados para extrair dados da Plataforma sem autorização expressa.",
            "Manter atualizados os dados cadastrais da conta, especialmente e-mail e dados de faturamento.",
            "Notificar o SIGAPP imediatamente sobre qualquer incidente de segurança ou uso não autorizado de sua conta.",
            "Responsabilizar-se pela veracidade dos dados inseridos na Plataforma e pela legalidade dos contratos e negócios nela gerenciados.",
          ]}
        />
      </LSection>

      <LSection id="obrigacoes-sigapp" title="6. Obrigações do SIGAPP">
        <LP>O SIGAPP compromete-se a:</LP>
        <LList
          items={[
            "Disponibilizar a Plataforma com disponibilidade-alvo de 99,5% ao mês, excluídas manutenções programadas.",
            "Comunicar manutenções programadas com antecedência mínima de 24 horas, preferencialmente em horários de menor uso.",
            "Adotar medidas técnicas e organizacionais adequadas para proteger os dados dos Usuários.",
            "Tratar os dados pessoais em conformidade com a LGPD e a Política de Privacidade.",
            "Manter isolamento de dados entre tenants (database-per-tenant).",
            "Comunicar incidentes de segurança que afetem dados pessoais à Autoridade Nacional de Proteção de Dados (ANPD) e aos titulares afetados, conforme exigido pela LGPD.",
            "Disponibilizar mecanismo de exportação de dados para que o Cliente possa exercer portabilidade.",
            "Responder chamados de suporte no prazo estabelecido para cada plano.",
          ]}
        />
      </LSection>

      <LSection id="propriedade" title="7. Propriedade Intelectual">
        <LP>
          Todos os direitos de propriedade intelectual relativos à Plataforma —
          incluindo código-fonte, design, interfaces, algoritmos, marca SIGAPP,
          logotipos, nomes comerciais e documentação — são e permanecem de
          titularidade exclusiva do SIGAPP ou de seus licenciantes.
        </LP>
        <LP>
          Estes Termos concedem ao Usuário uma licença limitada, não exclusiva,
          não transferível e revogável para usar a Plataforma durante a vigência
          da assinatura, exclusivamente para os fins contratados.
        </LP>
        <LP>
          O Conteúdo do Usuário (dados inseridos pelo Cliente) permanece de
          propriedade do Cliente. O SIGAPP recebe uma licença limitada para
          armazenar, processar e exibir esse conteúdo exclusivamente para a
          prestação dos serviços contratados, nunca para uso em benefício
          próprio ou de terceiros.
        </LP>
      </LSection>

      <LSection id="dados" title="8. Dados e Privacidade">
        <LP>
          O tratamento de dados pessoais é regido pela Política de Privacidade e
          pela Lei 13.709/2018 (LGPD). O SIGAPP atua como controlador dos dados
          de conta e como operador dos dados de negócio inseridos pelo Cliente
          na Plataforma.
        </LP>
        <LP>
          Os dados do Cliente são armazenados em banco de dados isolado
          (database-per-tenant), garantindo que nenhum outro Cliente tenha
          acesso a eles.
        </LP>
        <LP>
          Em caso de encerramento da conta, o Cliente poderá exportar todos os
          seus dados em formato estruturado por até 30 dias após o cancelamento.
          Após esse período, os dados serão excluídos conforme a política de
          retenção.
        </LP>
      </LSection>

      <LSection id="responsabilidade" title="9. Limitação de Responsabilidade">
        <LP>
          Na máxima extensão permitida pela lei aplicável, o SIGAPP não será
          responsável por danos indiretos, incidentais, especiais,
          consequenciais ou punitivos, incluindo perda de lucros, perda de dados
          ou perda de oportunidade de negócio.
        </LP>
        <LP>
          A responsabilidade total do SIGAPP perante o Cliente, sob qualquer
          teoria legal, não excederá o valor pago pelo Cliente nos últimos 3
          (três) meses que precederam o evento que deu origem à reclamação.
        </LP>
        <LP>
          O SIGAPP não garante que a Plataforma estará livre de erros ou
          interrupções, nem que os cálculos de viabilidade financeira refletirão
          com exatidão os resultados reais de projetos imobiliários. Os cálculos
          são baseados nas premissas inseridas pelo Usuário e não substituem
          análise financeira profissional.
        </LP>
        <LHighlight>
          <strong>Atenção:</strong> Os resultados gerados pela Plataforma (TIR,
          VPL, fluxo de caixa, DRE) são baseados nas premissas informadas pelo
          Usuário. O SIGAPP não é responsável por decisões de investimento
          tomadas com base nesses cálculos. Sempre consulte profissionais
          especializados para decisões financeiras relevantes.
        </LHighlight>
      </LSection>

      <LSection id="suspensao" title="10. Suspensão e Rescisão">
        <LP>
          O SIGAPP reserva-se o direito de suspender ou encerrar uma conta, com
          ou sem aviso prévio, nos seguintes casos:
        </LP>
        <LList
          items={[
            "Violação destes Termos de Uso.",
            "Inadimplência superior a 30 dias.",
            "Uso da Plataforma para fins ilegais ou que causem dano a terceiros.",
            "Fraude, falsidade ideológica ou uso de informações falsas no cadastro.",
            "Tentativa de acesso não autorizado a sistemas ou dados de outros Clientes.",
            "Solicitação do próprio Usuário (cancelamento voluntário).",
          ]}
        />
        <LP>
          O Cliente pode cancelar a assinatura a qualquer momento pelo painel de
          configurações. O acesso permanece ativo até o fim do período já pago.
          Não há cobrança de multa rescisória.
        </LP>
      </LSection>

      <LSection id="vigencia" title="11. Vigência">
        <LP>
          Estes Termos entram em vigor na data de cadastro do Usuário e
          permanecem válidos enquanto a conta estiver ativa. Alterações
          substanciais serão comunicadas com 30 dias de antecedência por e-mail
          cadastrado. O uso continuado após a vigência das alterações implica
          aceitação das novas condições.
        </LP>
      </LSection>

      <LSection id="disposicoes" title="12. Disposições Gerais">
        <LSubsection title="12.1 Lei aplicável">
          <LP>
            Estes Termos são regidos pelas leis da República Federativa do
            Brasil, em especial pelo Código Civil (Lei 10.406/2002), pelo Marco
            Civil da Internet (Lei 12.965/2014), pela LGPD (Lei 13.709/2018) e,
            quando aplicável, pelo Código de Defesa do Consumidor (Lei
            8.078/1990).
          </LP>
        </LSubsection>
        <LSubsection title="12.2 Foro">
          <LP>
            Fica eleito o foro da Comarca de São Paulo – SP para dirimir
            quaisquer controvérsias decorrentes destes Termos, com renúncia
            expressa a qualquer outro, por mais privilegiado que seja.
          </LP>
        </LSubsection>
        <LSubsection title="12.3 Independência das cláusulas">
          <LP>
            Se qualquer cláusula destes Termos for considerada inválida ou
            inexequível, as demais permanecerão em pleno vigor e efeito.
          </LP>
        </LSubsection>
        <LSubsection title="12.4 Contato">
          <LP>
            Para dúvidas sobre estes Termos, entre em contato com{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-[var(--landing-accent-strong)] hover:underline"
            >
              {SITE.email}
            </a>.
          </LP>
        </LSubsection>
      </LSection>
    </LegalLayout>
  )
}
