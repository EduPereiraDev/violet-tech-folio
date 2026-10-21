// Todo o texto do site. Fonte da verdade: ~/Projetos/carreira/cv/cv-mestre.md.
// Regra de compliance: nenhum nome de cliente ou fornecedor que identifique o cliente.

export type Lang = "pt" | "en";

export const links = {
  email: "pereirassantosedu@gmail.com",
  phone: "+55 (11) 94771-3875",
  phoneHref: "tel:+5511947713875",
  linkedin: "https://www.linkedin.com/in/eduardo-pereira-dos-santos-035311320",
  github: "https://github.com/EduPereiraDev",
  credlySecurity: "https://www.credly.com/badges/37cdb65e-9600-4dd4-a9b1-ab5a5dc38f67/linked_in",
  credlyDeveloper: "https://www.credly.com/badges/32b82b1c-79b5-4078-9eec-f1a16cabc0be/linked_in",
  financial: "https://github.com/EduPereiraDev/financial-project",
};

// Contagem real de agentes por cadeia (soma 49). A ordem define a geometria da cena 3D:
// a primeira cadeia fica no centro, as outras seis em volta.
export const chainSizes = [2, 10, 6, 9, 4, 9, 9];

type Strip = {
  code: string;
  status: "prod" | "golive" | "pilot" | "progress" | "done" | "neutral";
  statusLabel: string;
  title: string;
  client: string;
  from: string;
  to: string;
  role: string;
  summary: string;
  metrics: { value: string; label: string }[];
  stack: string[];
};

const pt = {
  meta: {
    title: "Eduardo Pereira dos Santos | Tech Lead e AI Engineer",
    description:
      "Líder Técnico (Tech Lead) na Alest Consultoria. Agentes de IA generativa, sistemas multiagente e modernização de sistemas críticos com .NET, Node.js e Python na AWS.",
  },
  nav: {
    about: "Resumo",
    agents: "Agentes",
    work: "Projetos",
    path: "Trajetória",
    stack: "Stack",
    contact: "Contato",
    switchTo: "EN",
    switchLabel: "EN, ver em inglês",
    navLabel: "Principal",
    skip: "Pular para o conteúdo",
  },
  hero: {
    first: "Eduardo",
    last: "Pereira",
    headline: "Coloco agentes de IA para trabalhar em sistemas críticos.",
    role: "Líder Técnico (Tech Lead) na Alest Consultoria",
    facts: [
      "AI Engineer e sistemas multiagente",
      ".NET, Node.js e Python",
      "AWS Certified Security – Specialty",
    ],
    ctaWork: "Ver projetos",
    ctaContact: "Falar comigo",
    scroll: "Role para decolar",
  },
  summary: {
    lead: "Tech lead em uma consultoria AI-first, com engenharia de software desde junho de 2025 concentrada em projetos de grande escala no setor aéreo.",
    body: "Levei um chatbot de autoatendimento de NLP clássico para um agente de IA generativa em produção, fui referência técnica na migração de um contact center para a nuvem e conduzi ao go-live a modernização de um sistema crítico de operações de voo. Hoje coordeno de 4 a 9 pessoas por projeto e converso direto com CTO, diretoria e a arquitetura do cliente.",
    stats: [
      { value: "49", label: "agentes no sistema multiagente que criei" },
      { value: "163", label: "ações de negócio ligadas a um agente de IA" },
      { value: "638", label: "testes unitários no go-live de um sistema de voo" },
      { value: "2", label: "certificações AWS, incluindo Security – Specialty" },
    ],
  },
  agents: {
    kicker: "Sistema multiagente",
    title: "49 agentes. 7 cadeias. Ninguém aprova o próprio trabalho.",
    intro: "Criei um sistema multiagente de engenharia de software que roda no Claude Code, no OpenAI Codex e no AWS Kiro (49 de 49 agentes validados nos três). Cada cadeia cuida de uma etapa do ciclo de desenvolvimento, e a verificação é sempre de um agente independente de quem implementou.",
    proof: "Uso em projetos de cliente, incluindo uma cadeia dedicada de 73 agentes gerada a partir dele para modernizar um portal de despacho de voo.",
    agentsWord: "agentes",
    chains: [
      { name: "Orquestração", detail: "Roteia o pedido para a cadeia certa e consolida o resultado." },
      { name: "Spec para software", detail: "Lê a especificação, planeja, implementa e verifica até o código funcionar." },
      { name: "QA no navegador", detail: "Explora a aplicação, reproduz o bug, corrige e testa de novo." },
      { name: "Segurança", detail: "Audita código, dependências, segredos e configuração e valida cada finding." },
      { name: "Code review", detail: "Revisor independente, correção só do que foi confirmado e verificação final." },
      { name: "Documentação técnica", detail: "Gera C4, arc42 e ADRs a partir do código, que é a fonte da verdade." },
      { name: "Documentação de projeto", detail: "Mantém a documentação do projeto em dia com o que foi entregue." },
    ],
  },
  work: {
    kicker: "Projetos",
    title: "Sistemas que não podem parar",
    intro: "Cada faixa é um projeto real. Os clientes não são citados por compliance.",
    from: "De",
    to: "Para",
    role: "Meu papel",
    strips: [
      {
        code: "GENAI",
        status: "prod",
        statusLabel: "Em produção",
        title: "Agente de IA generativa no autoatendimento",
        client: "Programa de fidelidade de uma das maiores companhias aéreas do Brasil",
        from: "NLP clássico",
        to: "LLM + RAG",
        role: "Condução técnica e arquitetura do gateway de integração",
        summary: "Conduzi a troca da plataforma legada por um agente com LLM e RAG sobre 675 artigos. Arquitetei a modernização do gateway em Node.js entre o agente e as ações de negócio, com camada LGPD: mascaramento de PII, OAuth/JWKS e auditoria.",
        metrics: [
          { value: "163", label: "ações de negócio" },
          { value: "7 → 4", label: "componentes na cadeia" },
          { value: "~2 meses", label: "até o canal web em produção" },
        ],
        stack: ["Node.js", "Express", "Redis", "BullMQ", "Aurora MySQL", "AWS ECS", "OpenAI GPT"],
      },
      {
        code: "VOZ",
        status: "pilot",
        statusLabel: "Piloto com 5% do tráfego",
        title: "Agente de voz com LLM na URA",
        client: "Cliente do setor aéreo",
        from: "URA tradicional",
        to: "Agente de voz com tools",
        role: "Projeto e iteração do agente",
        summary: "Agente de voz com consultas autenticadas. Analisei as ligações pela transcrição, medi containment e resolução real e evoluí regras e prompts a cada rodada.",
        metrics: [
          { value: "750+", label: "ligações analisadas" },
          { value: "13", label: "relatórios de resultado" },
          { value: "12", label: "versões de regras e prompts" },
        ],
        stack: ["LLM", "Tools", "Engenharia de prompt", "Avaliação por transcrição"],
      },
      {
        code: "OPS",
        status: "golive",
        statusLabel: "Go-live em ago/2026",
        title: "Distribuição de voos e escala operacional",
        client: "Cliente do setor aéreo",
        from: ".NET Framework 4.6.1 + Angular 12",
        to: ".NET 8 + Angular 19 em Kubernetes",
        role: "Desenvolvedor principal da consultoria",
        summary: "Levei o sistema ao go-live com processamento assíncrono que acabou com os timeouts 504, segredos no vault e hardening de Redis. A auditoria de segurança da API trouxe 11 findings, todos tratados.",
        metrics: [
          { value: "638", label: "testes unitários passando" },
          { value: "11", label: "findings de segurança tratados (2 críticos)" },
        ],
        stack: [".NET 8", "Angular 19", "Kubernetes (OCI OKE)", "Vault", "Redis"],
      },
      {
        code: "DSP",
        status: "progress",
        statusLabel: "Em andamento, go-live em 2027",
        title: "Portal de despacho de voo",
        client: "Cliente do setor aéreo",
        from: "Runtime PHP declarativo + XSL",
        to: ".NET 8 + Angular 21 + Oracle",
        role: "Tech lead titular",
        summary: "Legado de 158 aplicações, 176 transformações XSL e 58 jobs batch. A migração roda em 19 fases paralelas, executadas por uma cadeia de 73 agentes; 18 já foram aprovadas por um verificador independente.",
        metrics: [
          { value: "159", label: "telas do legado preservadas" },
          { value: "19", label: "fases paralelas" },
          { value: "73", label: "agentes na cadeia dedicada" },
        ],
        stack: [".NET 8", "Angular 21", "Oracle", "PostgreSQL", "Sistema multiagente"],
      },
      {
        code: "CCAAS",
        status: "done",
        statusLabel: "Migração entregue",
        title: "Contact center na nuvem",
        client: "Uma das maiores companhias aéreas do Brasil",
        from: "Plataforma legada",
        to: "Contact center em nuvem (CCaaS)",
        role: "Referência técnica de integração e dados",
        summary: "Implementei e evoluí os fluxos de URA, as integrações em AWS Lambda com o atendimento e o ETL de BI em Python, validado contra os logs de gravação.",
        metrics: [
          { value: "~1.200", label: "contas de agentes, sem erros" },
          { value: "13", label: "fluxos de URA principais" },
          { value: "10/10", label: "validação do ETL" },
        ],
        stack: ["AWS Lambda", "Node.js", "Python", "Zendesk", "Fluxos de URA"],
      },
      {
        code: "A11Y",
        status: "neutral",
        statusLabel: "Remediação WCAG 2.2 AA",
        title: "Acessibilidade no site de vendas",
        client: "Cliente do setor aéreo",
        from: "Falhas de acessibilidade",
        to: "Rumo a WCAG 2.2 AA, com gate no pipeline",
        role: "Remediação e agente de QA",
        summary: "Remediação de acessibilidade no site de vendas em Angular, mirando WCAG 2.2 AA, e um agente de QA que roda axe-core no Puppeteer com gate no Sonar.",
        metrics: [
          { value: "242", label: "commits no projeto" },
          { value: "172", label: "deles de acessibilidade" },
        ],
        stack: ["Angular", "Node.js", "axe-core", "Puppeteer", "Sonar"],
      },
    ] as Strip[],
  },
  builds: {
    kicker: "Projetos autorais",
    title: "Coisas que construí sozinho",
    items: [
      {
        title: "Plataforma de aprendizado adaptativo com IA",
        tag: "Interno Alest, autor único",
        text: "FastAPI, PostgreSQL e Next.js, com Claude no Amazon Bedrock e Gemini atrás de uma interface de provedor. Modelos BKT e FSRS, RAG e Terraform na AWS.",
        metrics: "413 testes e 85% de cobertura",
        href: null as string | null,
      },
      {
        title: "IDE corporativa para governança de LLMs",
        tag: "Interno Alest, em piloto",
        text: "Fork do VS Code (Electron e TypeScript) que mede o uso de LLMs pelos desenvolvedores sem capturar o conteúdo dos prompts. Backend em App Runner, RDS, SQS e CloudFormation, com SSO e dashboard em tempo real.",
        metrics: "Autor único",
        href: null as string | null,
      },
      {
        title: "Financial Control",
        tag: "Código aberto",
        text: "Controle financeiro multiusuário com relatórios por período, gráficos e categorias. API em camadas com .NET 9 no backend e React no frontend.",
        metrics: ".NET 9, React, PostgreSQL e Docker",
        href: links.financial,
      },
    ],
    viewCode: "Ver código no GitHub",
  },
  path: {
    kicker: "Trajetória",
    title: "De Alfenas a tech lead em São Paulo",
    jobs: [
      {
        period: "fev 2026 – hoje",
        role: "Líder Técnico (Tech Lead)",
        org: "Alest Consultoria, São Paulo",
        points: [
          "Tech lead titular na modernização do portal de despacho de voo de uma companhia aérea.",
          "Coordeno de 4 a 9 pessoas por projeto, defino o fluxo de branches e pull requests e reviso antes do merge.",
          "Escrevi o pacote de documentação as-built (8 entregáveis) para a arquitetura do cliente.",
          "Criei o sistema multiagente de 49 agentes usado em projetos de cliente.",
        ],
      },
      {
        period: "jun 2025 – fev 2026",
        role: "Desenvolvedor Full Stack",
        org: "Alest Consultoria, São Paulo",
        points: [
          "Referência técnica de integração e dados na migração de um contact center para a nuvem.",
          "Backend em C#/.NET para uma plataforma de educação médica.",
          "Middleware de e-commerce migrado de Node.js para .NET 8 com Clean Architecture (VTEX e SAP).",
          "Apps monday.com em React e integração com Power BI.",
        ],
      },
      {
        period: "jan 2020 – dez 2024",
        role: "Financeiro e administrativo",
        org: "Vida + Saúde, Alfenas (MG)",
        points: ["Faturamento, emissão de notas fiscais e análise financeira."],
      },
    ],
    education: {
      period: "2023 – dez 2026",
      role: "Bacharelado em Ciência da Computação",
      org: "Universidade Anhembi Morumbi",
      note: "Conclusão prevista em dezembro de 2026",
    },
  },
  stack: {
    kicker: "Stack",
    title: "Ferramentas que uso",
    groups: [
      { name: "IA", items: ["LLMs (OpenAI GPT, Claude no Bedrock, Gemini)", "RAG", "Agentes com tools", "Sistemas multiagente", "Avaliação por transcrição", "Claude Code", "Codex"] },
      { name: "Backend", items: [".NET 8/9", "ASP.NET Core", "Node.js", "Express", "NestJS", "FastAPI", "Redis", "BullMQ"] },
      { name: "Frontend", items: ["Angular", "React", "Next.js", "TypeScript"] },
      { name: "Dados", items: ["PostgreSQL", "SQL Server", "Oracle", "Aurora MySQL"] },
      { name: "Cloud e DevOps", items: ["AWS (Lambda, ECS, App Runner, RDS, SQS, Bedrock)", "OCI (OKE, Vault)", "GCP", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Azure DevOps"] },
      { name: "Qualidade e segurança", items: ["xUnit", "pytest", "Vitest", "Playwright", "WCAG 2.2 AA", "OWASP", "Veracode", "Gitleaks"] },
    ],
    langs: "Idiomas",
    langItems: ["Português nativo", "Inglês avançado (SmallTalk2Me)"],
  },
  certs: {
    kicker: "Certificações",
    verify: "Verificar no Credly",
    main: [
      { name: "AWS Certified Security – Specialty", issuer: "Amazon Web Services", date: "mar 2026", img: "/aws-security-specialty.png", href: links.credlySecurity },
      { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", date: "dez 2025", img: "/aws-developer-associate.png", href: links.credlyDeveloper },
      { name: "OCI 2025 Certified Foundations Associate", issuer: "Oracle", date: "out 2025", img: null as string | null, href: null as string | null },
    ],
    others: [
      "Banco de Dados, Fundação Bradesco (ago 2024)",
    ],
  },
  contact: {
    kicker: "Contato",
    title: "Vamos conversar?",
    text: "Estou aberto a novas oportunidades. O jeito mais rápido de falar comigo é por e-mail ou LinkedIn.",
    copy: "Copiar e-mail",
    copied: "E-mail copiado",
    linkedin: "LinkedIn",
    github: "GitHub",
    phone: "Telefone",
    location: "São Paulo, Brasil",
  },
  footer: {
    made: "Feito com React, Three.js e GSAP.",
    top: "Voltar ao topo",
  },
};

export type Content = typeof pt;

const en: Content = {
  meta: {
    title: "Eduardo Pereira dos Santos | Tech Lead and AI Engineer",
    description:
      "Tech Lead at Alest Consultoria. Generative AI agents, multi-agent systems and modernization of critical systems with .NET, Node.js and Python on AWS.",
  },
  nav: {
    about: "Summary",
    agents: "Agents",
    work: "Work",
    path: "Career",
    stack: "Stack",
    contact: "Contact",
    switchTo: "PT",
    switchLabel: "PT, ver em português",
    navLabel: "Main",
    skip: "Skip to content",
  },
  hero: {
    first: "Eduardo",
    last: "Pereira",
    headline: "I put AI agents to work on critical systems.",
    role: "Tech Lead at Alest Consultoria",
    facts: [
      "AI Engineer and multi-agent systems",
      ".NET, Node.js and Python",
      "AWS Certified Security – Specialty",
    ],
    ctaWork: "See the work",
    ctaContact: "Get in touch",
    scroll: "Scroll for takeoff",
  },
  summary: {
    lead: "Tech lead at an AI-first consultancy, building software since June 2025, mostly on large-scale projects in the airline industry.",
    body: "I moved a self-service chatbot from classic NLP to a generative AI agent in production, was the go-to technical reference for integration in a cloud contact center migration, and took the modernization of a critical flight operations system to go-live. Today I coordinate 4 to 9 people per project and work directly with the CTO, leadership and the client's architecture team.",
    stats: [
      { value: "49", label: "agents in the multi-agent system I built" },
      { value: "163", label: "business actions wired to an AI agent" },
      { value: "638", label: "unit tests at a flight system go-live" },
      { value: "2", label: "AWS certifications, including Security – Specialty" },
    ],
  },
  agents: {
    kicker: "Multi-agent system",
    title: "49 agents. 7 chains. Nobody approves their own work.",
    intro: "I built a multi-agent software engineering system that runs on Claude Code, OpenAI Codex and AWS Kiro (49 of 49 agents validated on all three). Each chain owns one stage of the development cycle, and verification always comes from an agent independent of the one that did the work.",
    proof: "I use it on client projects, including a dedicated 73-agent chain generated from it to modernize a flight dispatch portal.",
    agentsWord: "agents",
    chains: [
      { name: "Orchestration", detail: "Routes each request to the right chain and merges the results." },
      { name: "Spec to software", detail: "Reads the spec, plans, builds and verifies until the code works." },
      { name: "Browser QA", detail: "Explores the app, reproduces the bug, fixes it and tests again." },
      { name: "Security", detail: "Audits code, dependencies, secrets and config, and validates every finding." },
      { name: "Code review", detail: "Independent reviewer, fixes only confirmed findings, then a final check." },
      { name: "Technical docs", detail: "Writes C4, arc42 and ADRs from the code, which is the source of truth." },
      { name: "Project docs", detail: "Keeps project documentation in step with what was delivered." },
    ],
  },
  work: {
    kicker: "Work",
    title: "Systems that can't go down",
    intro: "Each strip is a real project. Clients are not named for compliance reasons.",
    from: "From",
    to: "To",
    role: "My role",
    strips: [
      {
        code: "GENAI",
        status: "prod",
        statusLabel: "In production",
        title: "Generative AI agent for customer self-service",
        client: "Loyalty program of one of Brazil's largest airlines",
        from: "Classic NLP",
        to: "LLM + RAG",
        role: "Technical lead and integration gateway architecture",
        summary: "Led the technical side of replacing the legacy platform with an LLM agent using RAG over 675 articles. Architected the modernization of the Node.js gateway between the agent and the business actions, with an LGPD layer: PII masking, OAuth/JWKS and auditing.",
        metrics: [
          { value: "163", label: "business actions" },
          { value: "7 → 4", label: "components in the chain" },
          { value: "~2 months", label: "to web channel in production" },
        ],
        stack: ["Node.js", "Express", "Redis", "BullMQ", "Aurora MySQL", "AWS ECS", "OpenAI GPT"],
      },
      {
        code: "VOICE",
        status: "pilot",
        statusLabel: "Pilot on 5% of traffic",
        title: "LLM voice agent in the IVR",
        client: "Airline industry client",
        from: "Traditional IVR",
        to: "Voice agent with tools",
        role: "Agent design and iteration",
        summary: "Voice agent with authenticated lookups. I analyzed calls through transcripts, measured containment and real resolution, and evolved rules and prompts every round.",
        metrics: [
          { value: "750+", label: "calls analyzed" },
          { value: "13", label: "results reports" },
          { value: "12", label: "versions of rules and prompts" },
        ],
        stack: ["LLM", "Tools", "Prompt engineering", "Transcript-based evaluation"],
      },
      {
        code: "OPS",
        status: "golive",
        statusLabel: "Go-live Aug 2026",
        title: "Flight distribution and operational scheduling",
        client: "Airline industry client",
        from: ".NET Framework 4.6.1 + Angular 12",
        to: ".NET 8 + Angular 19 on Kubernetes",
        role: "Lead developer for the consultancy",
        summary: "Took the system to go-live with async processing that ended the 504 timeouts, secrets moved to a vault and Redis hardening. The API security audit raised 11 findings, all addressed.",
        metrics: [
          { value: "638", label: "unit tests passing" },
          { value: "11", label: "security findings addressed (2 critical)" },
        ],
        stack: [".NET 8", "Angular 19", "Kubernetes (OCI OKE)", "Vault", "Redis"],
      },
      {
        code: "DSP",
        status: "progress",
        statusLabel: "In progress, go-live 2027",
        title: "Flight dispatch portal",
        client: "Airline industry client",
        from: "Declarative PHP runtime + XSL",
        to: ".NET 8 + Angular 21 + Oracle",
        role: "Appointed tech lead",
        summary: "A legacy of 158 applications, 176 XSL transforms and 58 batch jobs. The migration runs in 19 parallel phases executed by a 73-agent chain; 18 have been approved by an independent verifier so far.",
        metrics: [
          { value: "159", label: "legacy screens preserved" },
          { value: "19", label: "parallel phases" },
          { value: "73", label: "agents in the dedicated chain" },
        ],
        stack: [".NET 8", "Angular 21", "Oracle", "PostgreSQL", "Multi-agent system"],
      },
      {
        code: "CCAAS",
        status: "done",
        statusLabel: "Migration delivered",
        title: "Cloud contact center",
        client: "One of Brazil's largest airlines",
        from: "Legacy platform",
        to: "Cloud contact center (CCaaS)",
        role: "Technical reference for integration and data",
        summary: "Built and evolved the IVR flows, the AWS Lambda integrations with customer support and the Python BI ETL, validated against the call recording logs.",
        metrics: [
          { value: "~1,200", label: "agent accounts, zero errors" },
          { value: "13", label: "main IVR flows" },
          { value: "10/10", label: "ETL validation" },
        ],
        stack: ["AWS Lambda", "Node.js", "Python", "Zendesk", "IVR flows"],
      },
      {
        code: "A11Y",
        status: "neutral",
        statusLabel: "WCAG 2.2 AA remediation",
        title: "Accessibility on the sales site",
        client: "Airline industry client",
        from: "Accessibility failures",
        to: "Toward WCAG 2.2 AA, gated in the pipeline",
        role: "Remediation and QA agent",
        summary: "Accessibility remediation on the Angular sales site, targeting WCAG 2.2 AA, plus a QA agent that runs axe-core on Puppeteer with a gate in Sonar.",
        metrics: [
          { value: "242", label: "commits on the project" },
          { value: "172", label: "of them on accessibility" },
        ],
        stack: ["Angular", "Node.js", "axe-core", "Puppeteer", "Sonar"],
      },
    ],
  },
  builds: {
    kicker: "Solo builds",
    title: "Things I built on my own",
    items: [
      {
        title: "Adaptive learning platform with AI",
        tag: "Internal at Alest, sole author",
        text: "FastAPI, PostgreSQL and Next.js, with Claude on Amazon Bedrock and Gemini behind a provider interface. BKT and FSRS models, RAG and Terraform on AWS.",
        metrics: "413 tests and 85% coverage",
        href: null,
      },
      {
        title: "Corporate IDE for LLM governance",
        tag: "Internal at Alest, in pilot",
        text: "A VS Code fork (Electron and TypeScript) that measures how developers use LLMs without capturing prompt content. Backend on App Runner, RDS, SQS and CloudFormation, with SSO and a real-time dashboard.",
        metrics: "Sole author",
        href: null,
      },
      {
        title: "Financial Control",
        tag: "Open source",
        text: "Multi-user personal finance app with period reports, charts and categories. Layered .NET 9 API on the backend and React on the frontend.",
        metrics: ".NET 9, React, PostgreSQL and Docker",
        href: links.financial,
      },
    ],
    viewCode: "View code on GitHub",
  },
  path: {
    kicker: "Career",
    title: "From Alfenas to tech lead in São Paulo",
    jobs: [
      {
        period: "Feb 2026 – now",
        role: "Tech Lead",
        org: "Alest Consultoria, São Paulo",
        points: [
          "Appointed tech lead on the modernization of an airline's flight dispatch portal.",
          "I coordinate 4 to 9 people per project, set the branching and pull request flow, and review before merge.",
          "Wrote the as-built documentation package (8 deliverables) for the client's architecture team.",
          "Built the 49-agent multi-agent system used on client projects.",
        ],
      },
      {
        period: "Jun 2025 – Feb 2026",
        role: "Full Stack Developer",
        org: "Alest Consultoria, São Paulo",
        points: [
          "Technical reference for integration and data in a cloud contact center migration.",
          "C#/.NET backend for a medical education platform.",
          "E-commerce middleware migrated from Node.js to .NET 8 with Clean Architecture (VTEX and SAP).",
          "monday.com apps in React and a Power BI integration.",
        ],
      },
      {
        period: "Jan 2020 – Dec 2024",
        role: "Finance and administration",
        org: "Vida + Saúde, Alfenas (Brazil)",
        points: ["Billing, invoicing and financial analysis."],
      },
    ],
    education: {
      period: "2023 – Dec 2026",
      role: "B.Sc. in Computer Science",
      org: "Universidade Anhembi Morumbi",
      note: "Expected graduation December 2026",
    },
  },
  stack: {
    kicker: "Stack",
    title: "Tools I work with",
    groups: [
      { name: "AI", items: ["LLMs (OpenAI GPT, Claude on Bedrock, Gemini)", "RAG", "Agents with tools", "Multi-agent systems", "Transcript-based evaluation", "Claude Code", "Codex"] },
      { name: "Backend", items: [".NET 8/9", "ASP.NET Core", "Node.js", "Express", "NestJS", "FastAPI", "Redis", "BullMQ"] },
      { name: "Frontend", items: ["Angular", "React", "Next.js", "TypeScript"] },
      { name: "Data", items: ["PostgreSQL", "SQL Server", "Oracle", "Aurora MySQL"] },
      { name: "Cloud and DevOps", items: ["AWS (Lambda, ECS, App Runner, RDS, SQS, Bedrock)", "OCI (OKE, Vault)", "GCP", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Azure DevOps"] },
      { name: "Quality and security", items: ["xUnit", "pytest", "Vitest", "Playwright", "WCAG 2.2 AA", "OWASP", "Veracode", "Gitleaks"] },
    ],
    langs: "Languages",
    langItems: ["Portuguese, native", "English, advanced (SmallTalk2Me)"],
  },
  certs: {
    kicker: "Certifications",
    verify: "Verify on Credly",
    main: [
      { name: "AWS Certified Security – Specialty", issuer: "Amazon Web Services", date: "Mar 2026", img: "/aws-security-specialty.png", href: links.credlySecurity },
      { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", date: "Dec 2025", img: "/aws-developer-associate.png", href: links.credlyDeveloper },
      { name: "OCI 2025 Certified Foundations Associate", issuer: "Oracle", date: "Oct 2025", img: null, href: null },
    ],
    others: [
      "Databases, Fundação Bradesco (Aug 2024)",
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Let's talk?",
    text: "I'm open to new opportunities. Email or LinkedIn is the fastest way to reach me.",
    copy: "Copy email",
    copied: "Email copied",
    linkedin: "LinkedIn",
    github: "GitHub",
    phone: "Phone",
    location: "São Paulo, Brazil",
  },
  footer: {
    made: "Built with React, Three.js and GSAP.",
    top: "Back to top",
  },
};

export const content: Record<Lang, Content> = { pt, en };
