export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  heroImage: string;
  result: string;
  context: string;
  challenge: string;
  approach: string[];
  results: { metric: string; value: string }[];
  testimonial: { quote: string; author: string; role: string };
  ctaText: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'puchacay',
    title: 'From Instagram DMs to a Full E-commerce Funnel',
    client: 'Cerveceria Puchacay',
    category: 'E-commerce + Sales Funnel',
    heroImage:
      'https://cerveceriapuchacay.cl/assets/HeroBg.D9CN-gY4_Tqj8v.webp',
    result: '+120% leads, +35% online sales',
    context:
      'Cerveceria Puchacay is a craft brewery based in southern Chile, known for producing high-quality artisan beers with a loyal local following. Despite having a great product and enthusiastic customers, they had virtually no online sales presence. Orders were taken manually through Instagram DMs, which limited their reach and created a bottleneck that cost them sales every weekend.',
    challenge:
      'Without an e-commerce platform, the brewery was leaving money on the table. Customers who wanted to buy outside of business hours or from other cities had no way to order. There was no structured sales funnel, no analytics, and no way to follow up with interested visitors. Meanwhile, competitors with functional online stores were capturing the market that Puchacay was missing.',
    approach: [
      'Built a responsive e-commerce site optimized for mobile purchases, with a clean product showcase and streamlined checkout flow',
      'Implemented a full conversion funnel: landing page with brand storytelling, product catalog with tasting notes, cart system, and integrated checkout',
      'Integrated WhatsApp for post-purchase follow-up and order status updates, keeping the personal touch their customers loved',
      'Added analytics tracking across the entire funnel to identify drop-off points and optimize conversion at every stage',
    ],
    results: [
      { metric: 'Lead Generation', value: '+120%' },
      { metric: 'Online Sales', value: '+35%' },
      { metric: 'Order Processing Time', value: '-60%' },
      { metric: 'Return Customer Rate', value: '+45%' },
    ],
    testimonial: {
      quote:
        'We went from taking orders on Instagram to having a real sales machine. The funnel Alvaro built changed everything for us.',
      author: 'Diego Soto',
      role: 'Founder, Cerveceria Puchacay',
    },
    ctaText: 'Ready to turn your online presence into a sales engine?',
  },
  {
    slug: 'ewaffle',
    title: 'A Strategic Redesign That Turned Visitors Into Clients',
    client: 'Ewaffle',
    category: 'Strategic Website',
    heroImage: 'https://ewaffle.cl/assets/CoverEwaffle.png',
    result: '+40% conversion in 3 months',
    context:
      'Ewaffle is a content and creative agency that produces high-quality work for established brands. But their own website did not reflect that caliber. In a crowded market of agencies that all look and sound the same, Ewaffle was struggling to stand out online. Their old site was generic, failed to communicate their unique approach, and was not designed to convert visitors into leads.',
    challenge:
      'The website had a low conversion rate, with most visitors bouncing within seconds. The value proposition was buried under vague messaging, and potential clients could not quickly understand what Ewaffle did differently. The contact flow was clunky, with too many steps between interest and action. The site needed to work as a salesperson, not just a brochure.',
    approach: [
      'Complete redesign with a conversion-focused architecture that guided visitors from curiosity to contact in a clear, intentional flow',
      'Crafted clear service positioning that immediately communicated what Ewaffle does, who they serve, and why they are different',
      'Integrated real case studies with measurable outcomes directly into the homepage to build trust early in the visitor journey',
      'Streamlined the contact flow from multiple steps to a single, frictionless action with multiple entry points across the site',
    ],
    results: [
      { metric: 'Conversion Rate', value: '+40%' },
      { metric: 'Average Session Duration', value: '+85%' },
      { metric: 'Bounce Rate', value: '-30%' },
      { metric: 'Qualified Leads/Month', value: '2x' },
    ],
    testimonial: {
      quote:
        'It was not just a redesign. Alvaro rebuilt our entire digital positioning. Clients now understand what we do before they even call.',
      author: 'Team Ewaffle',
      role: 'Creative Agency',
    },
    ctaText: 'Ready to turn your website into your best salesperson?',
  },
  {
    slug: 'fidelidapp',
    title: 'Scaling a SaaS Platform Without Scaling the Support Team',
    client: 'Fidelidapp',
    category: 'SaaS Platform',
    heroImage:
      'https://res.cloudinary.com/di92lsbym/image/upload/v1739838001/photo-1553877522-43269d4ea984_k7fgug_1_anllid.webp',
    result: '-80% manual support load',
    context:
      'Fidelidapp is a loyalty program SaaS platform with a growing user base of businesses that use it to manage customer rewards and retention campaigns. As the platform gained traction, the support team was overwhelmed. Every new client onboarding required manual hand-holding, and the same support questions came up dozens of times per week. Growth was stalling because the team could not keep up.',
    challenge:
      'Manual onboarding processes meant each new client took hours of staff time to get started. Repetitive support queries consumed the team, and there was no self-service option for common tasks. The lack of admin tools for bulk operations made even simple management tasks tedious. Support costs were eating into margins, and the team was hiring more people every quarter just to keep the lights on.',
    approach: [
      'Built a comprehensive self-service dashboard that gave users control over their accounts, reducing the need to contact support for routine tasks',
      'Designed and implemented an automated onboarding flow that guided new users from signup to first campaign without manual intervention',
      'Created a knowledge base integration with contextual help throughout the platform, answering questions before users needed to ask',
      'Developed an admin panel with bulk operations and management tools that let the team handle tasks in minutes instead of hours',
    ],
    results: [
      { metric: 'Support Tickets', value: '-80%' },
      { metric: 'User Onboarding Time', value: '-65%' },
      { metric: 'Customer Satisfaction', value: '+25%' },
      { metric: 'Support Team Size Needed', value: '-50%' },
    ],
    testimonial: {
      quote:
        'We were hiring more support staff every quarter. After the platform rebuild, we actually reduced the team and improved satisfaction scores.',
      author: 'Fidelidapp Team',
      role: 'SaaS Platform',
    },
    ctaText: 'Ready to scale your platform without scaling your problems?',
  },
  {
    slug: 'defensa-total',
    title: 'Lead Generation System for Legal Services',
    client: 'Defensa Total',
    category: 'Lead Generation + Legal Services',
    heroImage:
      'https://res.cloudinary.com/di92lsbym/image/upload/v1739838001/photo-1553877522-43269d4ea984_k7fgug_1_anllid.webp',
    result: '+200% qualified leads in 60 days',
    context:
      'Defensa Total is a well-established Chilean legal services firm specializing in criminal defense, labor law, and family law. Despite an excellent track record and strong word-of-mouth reputation built over a decade, the firm had zero digital presence. Competitors offering inferior legal representation were consistently winning new clients simply because they appeared in Google searches and ran social media campaigns, while Defensa Total remained completely invisible online.',
    challenge:
      'The firm had no website, no online lead capture mechanism, and no way to showcase their expertise or case results digitally. Potential clients searching for legal help in their practice areas were finding competitors first and never discovering Defensa Total existed. The managing partners were initially skeptical that digital marketing could work for a profession built on trust and personal referrals, which meant any solution needed to deliver undeniable results quickly to maintain buy-in.',
    approach: [
      'Built a conversion-focused landing page with clear service positioning across their three core practice areas — criminal defense, labor law, and family law — each with dedicated sections addressing the specific concerns clients have when seeking that type of representation',
      'Implemented a lead qualification form that filtered incoming inquiries by case type, urgency level, and geographic location, ensuring the attorneys only received consultations they could actually serve',
      'Created a content strategy with FAQ-style pages addressing common legal questions in plain Spanish, targeting the exact search queries potential clients use when they first realize they need a lawyer',
      'Set up WhatsApp integration with automated routing so qualified leads received a response within five minutes during business hours, dramatically outpacing the industry standard of 24-48 hour callback times',
    ],
    results: [
      { metric: 'Qualified Leads', value: '+200%' },
      { metric: 'Cost per Lead', value: '-45%' },
      { metric: 'Response Time', value: '<5 min' },
      { metric: 'Client Conversion Rate', value: '+60%' },
    ],
    testimonial: {
      quote:
        'We were invisible online. Now we get more qualified consultations from the website than from all our referral networks combined.',
      author: 'Marcelo Gutierrez',
      role: 'Managing Partner, Defensa Total',
    },
    ctaText:
      'Ready to make your professional services visible to the clients who need you?',
  },
  {
    slug: 'revenue-ai-system',
    title: 'Enterprise AI Platform That Automates Revenue Operations',
    client: 'Revenue AI System',
    category: 'Enterprise AI Platform',
    heroImage:
      'https://res.cloudinary.com/di92lsbym/image/upload/v1739838001/photo-1553877522-43269d4ea984_k7fgug_1_anllid.webp',
    result: '-70% manual operations, 3x throughput',
    context:
      'A mid-size company with a growing team was drowning in manual processes that consumed the majority of their working hours. Email management, lead qualification, customer support responses, and document processing were all handled by people doing repetitive, rules-based work that never ended. The company had tried adopting off-the-shelf automation tools — Zapier workflows, standalone chatbots, CRM automations — but nothing integrated cleanly with their existing systems, creating more fragmentation instead of less.',
    challenge:
      'The team was spending over 60% of their time on repetitive tasks that followed predictable patterns but still required human judgment at key decision points. Multiple disconnected tools had created data silos where critical information lived in different systems that did not talk to each other. Previous automation attempts had failed because they tried to replace entire workflows rather than augmenting them, which led to resistance from the team and abandoned implementations. They needed a custom platform that worked with their existing processes, not against them.',
    approach: [
      'Audited all manual processes across the organization and identified the highest-ROI automation targets: email triage and response drafting, lead scoring and qualification, and structured data extraction from incoming documents',
      'Built a modular AI platform with GPT-4 integration that handled natural language processing tasks — reading emails, scoring leads, generating draft responses — while maintaining a consistent interface across all workflows',
      'Created automated workflows that kept humans in the loop for critical decisions while handling routine tasks autonomously, ensuring the team maintained control over outcomes that mattered while offloading the repetitive work that burned them out',
      'Implemented a real-time dashboard showing time saved, tasks automated, and direct revenue impact, giving leadership clear visibility into the platform ROI and the team confidence that the system was working',
    ],
    results: [
      { metric: 'Manual Operations', value: '-70%' },
      { metric: 'Processing Throughput', value: '3x' },
      { metric: 'Team Capacity Freed', value: '+25 hrs/week' },
      { metric: 'ROI Timeline', value: '<90 days' },
    ],
    testimonial: {
      quote:
        'This is not just automation. It is an entirely new way of operating. The platform paid for itself in the first month.',
      author: 'Technical Lead',
      role: 'Enterprise Client',
    },
    ctaText:
      'Ready to build an AI system that actually works for your business?',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
