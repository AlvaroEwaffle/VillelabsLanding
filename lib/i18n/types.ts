export type Language = 'en' | 'es';

export interface TranslationDictionary {
  nav: {
    services: string;
    work: string;
    portfolio?: string;
    consulting?: string;
    about: string;
    blog: string;
    workshops: string;
    contact: string;
    bookACall: string;
    menu: string;
    closeMenu: string;
    openMenu: string;
  };
  footer: {
    brandDescription: string;
    company: string;
    services: string;
    resources: string;
    connect: string;
    aboutLink: string;
    workLink: string;
    portfolioLink?: string;
    contactLink: string;
    marketingLink: string;
    developmentLink: string;
    consultingLink?: string;
    blogLink: string;
    diagnosticLink: string;
    caseStudiesLink: string;
    whatsappLink: string;
    linkedinLink: string;
    bookACallLink: string;
    allRightsReserved: string;
    privacy: string;
    terms: string;
    privacyHref: string;
    termsHref: string;
  };
  whatsapp: {
    ariaLabel: string;
    chatWithUs: string;
    prefillMessage: string;
  };
  exitPopup: {
    title: string;
    subtitle: string;
    description: string;
    emailPlaceholder: string;
    emailLabel: string;
    submitButton: string;
    submitting: string;
    antiSpam: string;
    successTitle: string;
    successMessage: string;
    successButton: string;
    closePopup: string;
  };
  hero: {
    badge: string;
    headlinePre: string;
    headlineHighlight: string;
    headlinePost: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustBar: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  serviceTracks: {
    label: string;
    heading: string;
    headingHighlight: string;
    description: string;
    marketingTrack: string;
    developmentTrack: string;
    ctaLink: string;
    marketingServices: {
      title: string;
      description: string;
    }[];
    developmentServices: {
      title: string;
      description: string;
    }[];
  };
  featuredCases: {
    label: string;
    heading: string;
    ctaLink: string;
    cases: {
      title: string;
      category: string;
      metric: string;
      description: string;
    }[];
  };
  trust: {
    label: string;
    heading: string;
    listedOn: string;
    testimonials: {
      quote: string;
      name: string;
      company: string;
    }[];
  };
  howWeWork: {
    label: string;
    heading: string;
    headingHighlight: string;
    stepLabel: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  comparison: {
    label: string;
    heading: string;
    headingHighlight: string;
    featureHeader: string;
    villelabsHeader: string;
    freelanceHeader: string;
    agencyHeader: string;
    rows: {
      feature: string;
      villelabs: string;
      freelance: string;
      agency: string;
    }[];
  };
  blogPreview: {
    label: string;
    heading: string;
    readMore: string;
    ctaLink: string;
    comingSoon: string;
    upcomingTitle: string;
    upcomingExcerpt: string;
    upcomingCategory: string;
  };
  finalCTA: {
    heading: string;
    subtitle: string;
    ctaPrimary: string;
    ctaWhatsApp: string;
    scarcityPre: string;
    scarcityHighlight: string;
    scarcityPost: string;
  };
  pages: {
    services: {
      label: string;
      heading: string;
      headingHighlight: string;
      description: string;
      marketingTrack: string;
      marketingDescription: string;
      developmentTrack: string;
      developmentDescription: string;
      ctaHeading: string;
      ctaDescription: string;
      ctaButton: string;
      marketingServices: {
        title: string;
        description: string;
        pricing: string;
      }[];
      developmentServices: {
        title: string;
        description: string;
        pricing: string;
      }[];
      pricingNote: string;
    };
    about: {
      label: string;
      heading: string;
      headingHighlight: string;
      description: string;
      meetTheTeam: string;
      methodologyLabel: string;
      methodologyHeading: string;
      trustedBy: string;
      ctaHeading: string;
      ctaDescription: string;
      ctaButton: string;
      team: {
        name: string;
        role: string;
        bio: string;
        credentials: string[];
      }[];
      methodology: {
        title: string;
        description: string;
      }[];
    };
    contact: {
      label: string;
      heading: string;
      description: string;
      calendlyHeading: string;
      calendlyDescription: string;
      calendlyButton: string;
      whatsappHeading: string;
      whatsappDescription: string;
      whatsappButton: string;
      servingGlobally: string;
      diagnosticLabel: string;
      diagnosticHeading: string;
      diagnosticDescription: string;
      diagnosticComingSoon: string;
      formHeading: string;
      formDescription: string;
    };
    consulting: {
      badge: string;
      heading: string;
      headingHighlight: string;
      description: string;
      engagementLabel: string;
      engagementHeading: string;
      enterpriseLabel: string;
      credentialsLabel: string;
      credentialsHeading: string;
      ctaHeading: string;
      ctaDescription: string;
      ctaButton: string;
      achievements: {
        metric: string;
        label: string;
      }[];
      serviceModels: {
        title: string;
        description: string;
        ideal: string;
      }[];
    };
    portfolio: {
      label: string;
      heading: string;
      description: string;
      filterAll: string;
      filterWeb: string;
      filterPlatform: string;
      projects: {
        title: string;
        description: string;
      }[];
    };
    diagnostic: {
      label: string;
      heading: string;
      description: string;
      complete: string;
      questionOf: string;
      previousQuestion: string;
      yourTopPriorities: string;
      bookFreeCall: string;
      getGuide: string;
      emailReportHeading: string;
      emailReportDescription: string;
      emailPlaceholder: string;
      sendReport: string;
      reportSent: string;
      shareResults: string;
      retakeDiagnostic: string;
      scoreTiers: {
        critical: { label: string; message: string };
        developing: { label: string; message: string };
        solid: { label: string; message: string };
        optimized: { label: string; message: string };
      };
      questions: {
        text: string;
        answers: string[];
        recommendation: {
          title: string;
          action: string;
        };
      }[];
    };
    blog: {
      label: string;
      heading: string;
      description: string;
      readArticle: string;
      newsletterHeading: string;
      newsletterDescription: string;
      newsletterPlaceholder: string;
      subscribe: string;
      subscribing: string;
      subscribedTitle: string;
      subscribedDescription: string;
      noSpam: string;
    };
  };
  blogPost: {
    backToBlog: string;
    needHelp: string;
    needHelpDescription: string;
    bookFreeCall: string;
    wantResults: string;
    wantResultsDescription: string;
    getDiagnostic: string;
    contactUs: string;
    moreArticles: string;
  };
  caseStudy: {
    backToPortfolio: string;
    contextLabel: string;
    contextHeading: string;
    challengeLabel: string;
    challengeHeading: string;
    approachLabel: string;
    approachHeading: string;
    resultsLabel: string;
    resultsHeading: string;
    ctaDescription: string;
    bookStrategyCall: string;
    seeMoreWork: string;
    moreCaseStudies: string;
  };
}
