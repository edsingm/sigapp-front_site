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

export const metadata: Metadata = {
  title: "LGPD — Seus Direitos como Titular de Dados — SIGAPP",
  description:
    "Conheça seus direitos garantidos pela Lei Geral de Proteção de Dados (Lei 13.709/2018) e saiba como exercê-los no SIGAPP.",
}

const SECTIONS: LegalSection[] = [
  { id: "o-que-e", title: "1. O que é a LGPD" },
  { id: "titulares", title: "2. Quem é o Titular de Dados" },
  { id: "controlador", title: "3. SIGAPP como Controlador" },
  { id: "direitos", title: "4. Seus 10 Direitos" },
  { id: "como-exercer", title: "5. Como Exercer seus Direitos" },
  { id: "prazos", title: "6. Prazos de Resposta" },
  { id: "bases-legais", title: "7. Bases Legais que Usamos" },
  { id: "dados-sensiveis", title: "8. Dados Sensíveis" },
  { id: "incidentes", title: "9. Incidentes de Segurança" },
  { id: "anpd", title: "10. Recurso à ANPD" },
  { id: "contato", title: "11. Canal do DPO" },
]

export default function LgpdPage() {
  return (
    <LegalLayout
      title="LGPD — Seus Direitos"
      description="Informações sobre a Lei Geral de Proteção de Dados (Lei 13.709/2018) e como exercer seus direitos como titular de dados pessoais no SIGAPP."
      lastUpdated="07 de junho de 2026"
      sections={SECTIONS}
    >
      <LHighlight>
        A Lei Geral de Proteção de Dados (LGPD) garante a você direitos sobre
        seus dados pessoais. Esta página explica o que são esses direitos, como
        o SIGAPP trata seus dados e como você pode exercê-los de forma gratuita
        e descomplicada.
      </LHighlight>

      <LSection id="o-que-e" title="1. O que é a LGPD">
        <LP>
          A{" "}
          <strong>
            Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018)
          </strong>{" "}
          — a LGPD — é a lei brasileira que regula o tratamento de dados
          pessoais por empresas e pessoas, no setor público e privado. Ela
          entrou em vigor em setembro de 2020 e tem como fundamentos:
        </LP>
        <LList
          items={[
            "O respeito à privacidade do indivíduo como direito fundamental.",
            "A autodeterminação informativa — você decide sobre seus próprios dados.",
            "A liberdade de expressão, informação, comunicação e opinião.",
            "A inviolabilidade da intimidade, honra e imagem.",
            "O desenvolvimento econômico e tecnológico sustentável.",
            "A defesa do consumidor.",
            "Os direitos humanos, o livre desenvolvimento da personalidade, a dignidade e o exercício da cidadania.",
          ]}
        />
        <LP>
          A lei é aplicada a qualquer operação de tratamento realizada por
          pessoa natural ou jurídica (pública ou privada) que colete, processe
          ou armazene dados pessoais de pessoas localizadas no Brasil.
        </LP>
      </LSection>

      <LSection id="titulares" title="2. Quem é o Titular de Dados">
        <LP>
          O <strong>titular de dados pessoais</strong> é a pessoa natural a quem
          os dados se referem. São dados pessoais: nome, CPF, e-mail, telefone,
          endereço, IP, localização, dados de navegação — qualquer informação
          que identifique ou torne identificável uma pessoa física.
        </LP>
        <LP>
          Dados de pessoas jurídicas (CNPJ, razão social){" "}
          <strong>não são</strong> dados pessoais protegidos pela LGPD, mas
          dados de representantes (sócios, funcionários) que sejam pessoas
          físicas sim.
        </LP>
        <LP>
          Como usuário do SIGAPP, você é titular dos dados que o SIGAPP trata
          sobre você como pessoa física: seus dados de conta, de acesso e de
          comunicação com nossa equipe.
        </LP>
      </LSection>

      <LSection id="controlador" title="3. SIGAPP como Controlador e Operador">
        <LP>
          O SIGAPP desempenha dois papéis diferentes dependendo do dado tratado:
        </LP>
        <LTable
          headers={["Papel", "Quando ocorre", "Responsabilidade"]}
          rows={[
            [
              "Controlador",
              "Ao tratar seus dados de conta, faturamento, logs de acesso, comunicações de suporte e marketing.",
              "SIGAPP decide as finalidades e meios do tratamento. É o interlocutor para o exercício dos seus direitos.",
            ],
            [
              "Operador",
              "Ao processar dados de negócio inseridos pelo Cliente em sua conta (terrenos, contatos de proprietários, viabilidades).",
              "O Cliente (empresa) é o controlador desses dados. SIGAPP os trata apenas conforme instrução do Cliente.",
            ],
          ]}
        />
        <LP>
          Se você é funcionário de um Cliente do SIGAPP e deseja exercer
          direitos sobre dados que seu empregador inseriu na plataforma, você
          deve contactar diretamente o Cliente (controlador), não o SIGAPP.
        </LP>
      </LSection>

      <LSection
        id="direitos"
        title="4. Seus 10 Direitos como Titular (Art. 18 da LGPD)"
      >
        <LP>
          A LGPD garante os seguintes direitos, todos gratuitos e exercíveis a
          qualquer tempo:
        </LP>

        <LSubsection title="4.1 Confirmação e acesso">
          <LP>
            Você pode confirmar se o SIGAPP trata dados seus e, em caso
            positivo, obter acesso a eles. Forneceremos um relatório com: quais
            dados tratamos, para qual finalidade, com quem compartilhamos e por
            quanto tempo serão mantidos.
          </LP>
        </LSubsection>

        <LSubsection title="4.2 Correção">
          <LP>
            Se seus dados estiverem incompletos, inexatos ou desatualizados,
            você pode solicitar a correção. Exemplo: atualizar nome, e-mail ou
            endereço.
          </LP>
        </LSubsection>

        <LSubsection title="4.3 Anonimização, bloqueio ou eliminação">
          <LP>
            Você pode solicitar que dados desnecessários, excessivos ou tratados
            em desconformidade com a LGPD sejam anonimizados (tornados não
            identificáveis), bloqueados (suspenso o tratamento) ou eliminados.
            Esse direito não se aplica quando há obrigação legal de retenção.
          </LP>
        </LSubsection>

        <LSubsection title="4.4 Portabilidade">
          <LP>
            Você pode solicitar seus dados em formato estruturado e
            interoperável para transferência a outro fornecedor de produto ou
            serviço. O SIGAPP fornece exportação dos dados de conta e negócio em
            formato JSON ou CSV.
          </LP>
        </LSubsection>

        <LSubsection title="4.5 Eliminação de dados tratados com consentimento">
          <LP>
            Ao revogar um consentimento dado anteriormente (ex.: para receber
            marketing), você pode solicitar a eliminação dos dados tratados
            exclusivamente com base nesse consentimento.
          </LP>
        </LSubsection>

        <LSubsection title="4.6 Informação sobre compartilhamento">
          <LP>
            Você pode saber com quais entidades públicas e privadas o SIGAPP
            compartilha seus dados. As categorias de destinatários já estão na
            nossa{" "}
            <a
              href="/legal/privacidade#compartilhamento"
              className="font-medium text-primary hover:underline"
            >
              Política de Privacidade, seção 4
            </a>
            .
          </LP>
        </LSubsection>

        <LSubsection title="4.7 Informação sobre a possibilidade de não consentir">
          <LP>
            Antes de qualquer coleta de dados baseada em consentimento,
            informamos o que ocorre caso você não consinta. Para marketing:
            simplesmente não receberá nossas comunicações. Para dados
            necessários à prestação do serviço, a não concessão pode
            impossibilitar o uso da Plataforma.
          </LP>
        </LSubsection>

        <LSubsection title="4.8 Revogação do consentimento">
          <LP>
            Consentimentos podem ser revogados a qualquer momento, sem ônus,
            pelo link &ldquo;cancelar inscrição&rdquo; em nossos e-mails ou pelo
            e-mail do DPO. A revogação não afeta a licitude do tratamento
            realizado antes da revogação.
          </LP>
        </LSubsection>

        <LSubsection title="4.9 Oposição">
          <LP>
            Você pode se opor ao tratamento realizado com base em legítimo
            interesse (Art. 7º, inciso IX) quando entender que ele viola a LGPD
            ou seus direitos. O SIGAPP avaliará e responderá fundamentadamente.
          </LP>
        </LSubsection>

        <LSubsection title="4.10 Revisão de decisões automatizadas">
          <LP>
            Você pode solicitar revisão de decisões tomadas exclusivamente por
            meios automatizados que afetem seus interesses. O SIGAPP utilizará
            IA (SIG_IA) apenas para suporte à decisão do Usuário humano — não há
            decisões automatizadas com efeitos jurídicos ou equivalentes sem
            intervenção humana.
          </LP>
        </LSubsection>
      </LSection>

      <LSection id="como-exercer" title="5. Como Exercer seus Direitos">
        <LP>
          Para exercer qualquer dos direitos acima, envie solicitação ao nosso
          DPO:
        </LP>
        <LList
          items={[
            "E-mail: privacidade@sigapp.com.br",
            'Assunto sugerido: "Exercício de Direito LGPD — [tipo de direito]"',
            "Idioma: português",
          ]}
        />
        <LP>
          Para sua segurança, podemos solicitar documentação para confirmar sua
          identidade antes de processar qualquer solicitação. Isso evita que
          terceiros exerçam direitos em seu nome sem sua autorização.
        </LP>
        <LP>
          Se a solicitação envolver dados de outras pessoas, aplicaremos os
          controles necessários para proteger a privacidade de todos os
          envolvidos.
        </LP>
        <LHighlight>
          <strong>Não cobramos nenhuma taxa</strong> pelo exercício de direitos
          da LGPD. Se a solicitação for manifestamente infundada ou excessiva
          (especialmente por seu caráter repetitivo), podemos cobrar custo
          administrativo razoável ou recusar o pedido, comunicando o motivo.
        </LHighlight>
      </LSection>

      <LSection id="prazos" title="6. Prazos de Resposta">
        <LP>
          O SIGAPP atende às solicitações dentro dos prazos abaixo, contados a
          partir do recebimento do pedido completo:
        </LP>
        <LTable
          headers={["Situação", "Prazo"]}
          rows={[
            [
              "Confirmação de existência de tratamento",
              "Imediato (resposta automatizada + confirmação manual em 5 dias úteis)",
            ],
            ["Acesso aos dados", "Até 15 dias corridos"],
            ["Correção de dados", "Até 15 dias corridos"],
            ["Anonimização, bloqueio ou eliminação", "Até 15 dias corridos"],
            ["Portabilidade", "Até 15 dias corridos"],
            ["Revogação de consentimento (marketing)", "Até 10 dias úteis"],
            ["Resposta à oposição", "Até 15 dias corridos, com justificativa"],
            [
              "Solicitações complexas ou em volume",
              "Prazo informado na confirmação de recebimento, máximo de 30 dias corridos com justificativa",
            ],
          ]}
        />
        <LP>
          Esses prazos estão alinhados com o Art. 18, §3º da LGPD. Quando não
          for possível atender no prazo, comunicaremos por e-mail com
          justificativa e nova previsão.
        </LP>
      </LSection>

      <LSection id="bases-legais" title="7. Bases Legais que o SIGAPP Utiliza">
        <LP>
          A LGPD exige que todo tratamento de dados pessoais tenha uma base
          legal (Art. 7º). As bases que o SIGAPP utiliza são:
        </LP>
        <LList
          items={[
            "Execução de contrato (inciso V): para criar sua conta, prestar os serviços contratados e processar pagamentos.",
            "Cumprimento de obrigação legal ou regulatória (inciso II): para manter registros fiscais, atender auditorias e cumprir o Marco Civil da Internet.",
            "Legítimo interesse do controlador (inciso IX): para segurança da plataforma, prevenção de fraudes, análise de uso e suporte.",
            "Consentimento (inciso I): para envio de comunicações de marketing e pesquisas de satisfação.",
          ]}
        />
        <LP>
          O SIGAPP <strong>não</strong> utiliza como base o interesse vital do
          titular, a proteção do crédito, a tutela da saúde, o exercício regular
          de direitos em processos judiciais ou a execução de políticas públicas
          — exceto se obrigado legalmente.
        </LP>
      </LSection>

      <LSection id="dados-sensiveis" title="8. Dados Pessoais Sensíveis">
        <LP>
          A LGPD define como &ldquo;dados sensíveis&rdquo; (Art. 5º, inciso II)
          os dados sobre: origem racial ou étnica, convicção religiosa, opinião
          política, filiação a sindicato ou organização de caráter
          religioso/filosófico, dado referente à saúde, vida sexual, dado
          genético ou biométrico.
        </LP>
        <LP>
          O SIGAPP{" "}
          <strong>
            não coleta nem processa intencionalmente dados sensíveis
          </strong>{" "}
          de seus Usuários. A Plataforma é voltada para gestão imobiliária e
          financeira, não envolvendo essas categorias. Se identificarmos
          qualquer dado sensível em conteúdo inserido por Usuários,
          solicitaremos sua exclusão imediata.
        </LP>
      </LSection>

      <LSection id="incidentes" title="9. Incidentes de Segurança">
        <LP>
          Em caso de incidente de segurança (vazamento, acesso não autorizado,
          perda de dados) que possa causar risco ou dano relevante a titulares,
          o SIGAPP:
        </LP>
        <LList
          items={[
            "Comunicará a Autoridade Nacional de Proteção de Dados (ANPD) no prazo razoável de 72 horas após a ciência do incidente.",
            "Notificará os titulares afetados por e-mail, com descrição dos dados envolvidos, riscos estimados e medidas adotadas.",
            "Disponibilizará canal dedicado para dúvidas dos titulares afetados.",
            "Documentará o incidente, as causas e as medidas corretivas adotadas.",
          ]}
        />
        <LHighlight>
          Se você suspeitar que seus dados foram comprometidos, entre em contato
          imediatamente com nosso DPO em{" "}
          <a
            href="mailto:privacidade@sigapp.com.br"
            className="font-medium text-primary hover:underline"
          >
            privacidade@sigapp.com.br
          </a>
          .
        </LHighlight>
      </LSection>

      <LSection id="anpd" title="10. Recurso à ANPD">
        <LP>
          A <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> é o
          órgão federal responsável por zelar pela proteção de dados pessoais e
          por fiscalizar e aplicar a LGPD.
        </LP>
        <LP>
          Se você não estiver satisfeito com a resposta do SIGAPP a uma
          solicitação de direito, pode peticionar à ANPD pelo portal
          gov.br/anpd. O acesso é gratuito e direto.
        </LP>
        <LP>
          O SIGAPP se compromete a cooperar plenamente com a ANPD em qualquer
          investigação ou procedimento administrativo relacionado ao tratamento
          de dados pessoais.
        </LP>
      </LSection>

      <LSection id="contato" title="11. Canal do DPO — Encarregado de Dados">
        <LP>
          O <strong>Encarregado de Dados (DPO)</strong> é o ponto de contato
          oficial para questões de privacidade e proteção de dados, conforme o
          Art. 41 da LGPD.
        </LP>
        <LList
          items={[
            "E-mail: privacidade@sigapp.com.br",
            "Assunto: indique claramente o direito que deseja exercer.",
            "Idioma: português.",
            "Prazo de resposta: até 15 dias corridos.",
            "Endereço: SIGAPP Tecnologia Ltda., Av. Paulista, 1234, Conjunto 56, Bela Vista, São Paulo – SP, CEP 01310-100 — A/C: Encarregado de Dados.",
          ]}
        />
      </LSection>
    </LegalLayout>
  )
}
