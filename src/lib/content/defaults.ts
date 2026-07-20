import { docFromParts, docFromText, inlineDocFromParts } from "./schemas";
import type {
  AboutContent,
  ApproachContent,
  BusinessChallengesContent,
  ContactContent,
  FooterContent,
  HeroContent,
  HomeExperienceContent,
  HomeIntroContent,
  HomeTeasersContent,
  HowIWorkContent,
  MyStoryContent,
  NavigationContent,
  PositioningContent,
  ServicesContent,
  SettingsContent,
} from "./schemas";

/**
 * Current site copy, as typed defaults. These are the fallback whenever a
 * `content_sections` row is missing or fails validation — the public site
 * can never break from bad or absent CMS data.
 */

export const heroDefault: HeroContent = {
  eyebrow: "Supply Chain & Operations Advisory",
  headingLine1: "Helping Manufacturing Leaders",
  headingLine2: inlineDocFromParts([
    { text: "Solve Complex Operational Challenges", italic: true },
  ]),
  subheading: docFromText(
    "Independent operational advisory for manufacturing organisations seeking greater clarity, stronger performance and confident decision-making."
  ),
  primaryCta: { label: "Arrange an Initial Conversation", href: "#contact" },
  secondaryCta: { label: "See the Business Challenges", href: "/business-challenges" },
};

export const servicesDefault: ServicesContent = {
  eyebrow: "What I do",
  heading: "Advisory across the operation, not just one corner of it",
  intro: docFromText(
    "Every engagement is shaped around where you actually are — a targeted fix, a broader programme, or a steady hand alongside your team."
  ),
  items: [
    {
      icon: "workflow",
      title: "Supply Chain Strategy",
      body: docFromText(
        "Map your sourcing, network and inventory end to end — then build a plan that balances cost, service and resilience against real-world disruption."
      ),
    },
    {
      icon: "gauge",
      title: "Operations Improvement",
      body: docFromText(
        "Find where throughput, quality and cost are leaking on the shop floor, and put practical, lean-informed changes in place that stick."
      ),
    },
    {
      icon: "lineChart",
      title: "Planning & S&OP",
      body: docFromText(
        "Bring demand, supply and finance into one conversation with a planning rhythm that reduces firefighting and improves forecast accuracy."
      ),
    },
    {
      icon: "lifeBuoy",
      title: "Interim & Advisory",
      body: docFromText(
        "Hands-on operational support when you need an extra pair of experienced hands — from a specific project to steadying a team through change."
      ),
    },
  ],
};

export const approachDefault: ApproachContent = {
  eyebrow: "How I work",
  heading: "A grounded, practical way of working",
  intro: docFromText(
    "No thick reports left on a shelf. Just clear diagnosis, sensible priorities, and changes that make the day-to-day genuinely easier."
  ),
  steps: [
    {
      title: "Listen & diagnose",
      body: docFromText(
        "We start on the ground — walking the operation, talking to the people doing the work, and looking honestly at the numbers to find what's really driving the pain."
      ),
    },
    {
      title: "Prioritise what matters",
      body: docFromText(
        "Not everything is worth fixing at once. Together we agree the handful of changes that will move the needle most for cost, service and sanity."
      ),
    },
    {
      title: "Make it happen",
      body: docFromText(
        "Plans are worth little without follow-through. I work alongside your team to implement changes, build the routines, and make sure they hold."
      ),
    },
    {
      title: "Hand back stronger",
      body: docFromText(
        "The goal is a capable, confident team — not a dependency on me. I leave you with the tools and habits to keep improving on your own."
      ),
    },
  ],
};

export const aboutDefault: AboutContent = {
  eyebrow: "About",
  heading: inlineDocFromParts([
    { text: "Hello, I'm " },
    { text: "Conor Lee", italic: true },
  ]),
  paragraphs: [
    docFromText(
      "I've spent [X years] in supply chain and operations across [industries — e.g. medical devices, food, manufacturing], working through the messy reality of making, moving and delivering product when things rarely go to plan."
    ),
    docFromText(
      "Cloon is named for [home place / townland] in the Burren — a landscape of grey limestone and green pasture that says a lot about how I work: grounded, straightforward, and built to last. My background blends [engineering / operations qualification] with years on real shop floors, so the advice is practical, not theoretical."
    ),
    docFromText(
      "I set up Cloon Operations Advisory to bring that experience to businesses that need clarity and momentum — without the overhead of a big consultancy."
    ),
  ],
  image: null,
};

export const positioningDefault: PositioningContent = {
  heading: inlineDocFromParts([
    {
      text: "The kind of advisor you actually want in the room when it's not going to plan.",
    },
  ]),
  pillars: [
    {
      title: "Independent",
      body: "Straight advice with no product to sell and no agenda but yours.",
    },
    {
      title: "Hands-on",
      body: "In the operation with your team, not observing from a distance.",
    },
    {
      title: "Grounded",
      body: "Practical changes that work on a real shop floor, not just on paper.",
    },
  ],
  cta: { label: "Start a conversation", href: "#contact" },
};

export const contactDefault: ContactContent = {
  eyebrow: "Get in touch",
  heading: "Arrange an Initial Conversation",
  intro: docFromText(
    "If your organisation is facing an operational challenge, planning significant change or would value an experienced independent perspective, I'd welcome the opportunity to understand your business and explore how I can help."
  ),
  methods: [
    { icon: "mail", label: "Email", value: "hello@cloon.ie", href: "mailto:hello@cloon.ie" },
    { icon: "linkedin", label: "LinkedIn", value: "Conor Lee", href: "https://www.linkedin.com/" },
    { icon: "mapPin", label: "Based in", value: "Co. Clare, Ireland", href: null },
  ],
};

export const navigationDefault: NavigationContent = {
  items: [
    { label: "Business Challenges", href: "/business-challenges" },
    { label: "How I Work", href: "/how-i-work" },
    { label: "My Story", href: "/my-story" },
    { label: "Contact", href: "/#contact" },
  ],
  cta: { label: "Get in touch", href: "/#contact" },
};

export const footerDefault: FooterContent = {
  tagline: docFromText(
    "Practical supply chain and operations advisory, rooted in the West of Ireland and built on hands-on experience."
  ),
  links: [
    { label: "Business Challenges", href: "/business-challenges" },
    { label: "How I Work", href: "/how-i-work" },
    { label: "My Story", href: "/my-story" },
    { label: "Contact", href: "/#contact" },
  ],
  copyrightName: "Cloon Operations Advisory",
  email: "hello@cloon.ie",
};

export const settingsDefault: SettingsContent = {
  title: "Cloon Operations Advisory — Supply Chain & Operations Consulting",
  description:
    "Cloon Operations Advisory helps businesses strengthen their supply chain and operations — practical, grounded advisory led by Conor Lee.",
  ogTitle: "Cloon Operations Advisory",
  ogDescription: "Practical supply chain and operations advisory led by Conor Lee.",
};

// Client copy 17 Jul 2026 — home page content, shortening/adaptation permitted here only.

export const homeIntroDefault: HomeIntroContent = {
  eyebrow: "Our Approach",
  heading: inlineDocFromParts([
    { text: "Practical Experience. " },
    { text: "Independent Perspective.", italic: true },
  ]),
  body: docFromText(
    "Operational challenges are rarely straightforward.  Whether the objective is improving Supply Chain Performance, supporting Business Growth, increasing Manufacturing Capacity or preparing for Transformation, the first challenge is always to Understanding the Problem that really needs to be solved.  Experience has shown that organisations achieve better outcomes when they take the time to Clearly Define the Challenge before committing significant investment, resources and effort to delivering a solution.  That philosophy underpins every engagement."
  ),
};

export const homeExperienceDefault: HomeExperienceContent = {
  eyebrow: "Experience",
  heading: inlineDocFromParts([{ text: "Experience That Supports Delivery" }]),
  paragraphs: [
    docFromParts([
      [
        { text: "My role is not to arrive with a predetermined answer.  It is to work alongside leadership teams to " },
        { text: "Understand the Business", italic: true },
        { text: ", " },
        { text: "Define the Challenge", italic: true },
        { text: ", " },
        { text: "Evaluate Practical Options", italic: true },
        { text: " and " },
        { text: "Support Delivery", italic: true },
        { text: "." },
      ],
    ]),
    docFromText(
      "Having progressed through operational roles focused on execution and performance before leading manufacturing operations, supply chain functions and enterprise transformation programmes, I bring practical experience of working with teams to implement change, solve problems and deliver results in real operational environments."
    ),
    docFromText(
      "This combination of operational leadership and transformation experience is particularly important for organizations that may want independent perspective, additional executive capacity or to supplement internal skills with specialist supply chain or operational expertise."
    ),
  ],
  image: null,
};

export const homeTeasersDefault: HomeTeasersContent = {
  eyebrow: "Explore",
  heading: "Three ways to go deeper",
  items: [
    {
      title: "Business Challenges",
      body: docFromText(
        "Operational challenges rarely arrive with a clear diagnosis.  More often, they begin as persistent frustrations, declining performance or increasing complexity."
      ),
      cta: { label: "See the Business Challenges", href: "/business-challenges" },
    },
    {
      title: "How I Work",
      body: docFromText(
        "Every organisation is different. Rather than applying a standard methodology or promoting a preferred solution, I work alongside leadership teams to understand their business, challenge assumptions where appropriate and help them make confident, evidence-based decisions."
      ),
      cta: { label: "See How I Work", href: "/how-i-work" },
    },
    {
      title: "My Story",
      body: docFromText(
        "Looking back over my career, I've come to realise that the roles I've held are far less important than the lessons they taught me."
      ),
      cta: { label: "Read My Story", href: "/my-story" },
    },
  ],
};

// Client copy 17 Jul 2026 — VERBATIM, do not "fix" spelling/punctuation.
export const businessChallengesDefault: BusinessChallengesContent = {
  hero: {
    eyebrow: "Where to Start",
    heading: "Business Challenges",
    intro: docFromText(
      "Operational challenges rarely arrive with a clear diagnosis.\n\nMore often, they begin as persistent frustrations, declining performance or increasing complexity. Leadership teams recognise that something isn't working as it should, but determining the underlying cause—and the best way forward—is often far less straightforward.\n\nCloon Operations Advisory works with manufacturing leadership teams to clearly understand the business challenge before evaluating practical options to resolve it."
    ),
  },
  pullQuote: inlineDocFromParts([
    { text: "“Define the business challenge before deciding on the solution.”" },
  ]),
  reviewLabels: {
    symptoms: "Does any of this sound familiar?",
    reality: "What's Really Happening?",
    help: "How I Can Help",
    outcomes: "Typical Outcomes",
  },
  areas: [
    {
      title: "Operational Performance",
      reviews: [
        {
          title: "Supply Chain Performance Review",
          symptoms: [
            "“Our inventory continues to grow.”",
            "“Customer service isn't where it needs to be.”",
            "“Planning has become reactive.”",
            "“Every week feels like firefighting.”",
            "“We're constantly expediting.”",
            "“Different departments have different priorities.”",
          ],
          reality: docFromText(
            "These symptoms are often the visible effects of broader issues across planning, governance, operational processes, decision-making or organisational alignment. The objective is to understand how the entire supply chain is performing and identify the factors limiting business performance."
          ),
          help: docFromText(
            "The Supply Chain Performance Review provides an independent perspective through executive conversations, operational observation and evidence to help leadership teams understand the challenge, distinguish symptoms from underlying causes and evaluate practical options"
          ),
          outcomes: [
            "Greater supply chain visibility",
            "Improved planning confidence",
            "Better cross-functional alignment",
            "Reduced operational firefighting",
            "Improved inventory performance",
            "Stronger customer service",
            "Clear priorities for future improvement",
          ],
        },
      ],
    },
    {
      title: "Manufacturing Capacity",
      reviews: [
        {
          title: "Manufacturing Capacity Review",
          symptoms: [
            "“We're running flat out but still can't meet demand.”",
            "“We know we need more capacity, but we're not sure where.”",
            "“Everyone believes the bottleneck is somewhere different.”",
            "“We're planning another capital investment, but are we solving the right problem?”",
          ],
          reality: docFromText(
            "Capacity constraints are rarely caused by one machine, one department or one resource. They often arise from the interaction between planning, production flow, scheduling, labour utilisation, equipment performance and operational decision-making."
          ),
          help: docFromText(
            "The review evaluates manufacturing performance from an operational perspective, helping leadership teams identify the operational factors limiting performance, understand where capacity is genuinely constrained and what practical options exist to improve performance."
          ),
          outcomes: [
            "Improved operational flow",
            "Better utilisation of existing assets",
            "Greater confidence in future investment decisions",
            "Increased manufacturing resilience",
            "Clear understanding of operational constraints",
          ],
        },
      ],
    },
    {
      title: "Transformation Readiness",
      reviews: [
        {
          title: "ERP Business Readiness Review",
          symptoms: [
            "“We've selected the ERP system... but are we actually ready?”",
            "“We’re not confident in the quality of our data”",
            "“The implementation plan looks good, but does the business?”",
            "“We're concerned about the level of change.”",
            "“Do we really understand what success looks like?”",
            "“Different functions are working in different ways”",
          ],
          reality: docFromText(
            "Successful ERP programmes depend far more on business readiness than technology readiness. Leadership alignment, process ownership, master data, governance, organisational capability and change readiness all influence success."
          ),
          help: docFromText(
            "The review helps leadership teams evaluate whether the business is genuinely prepared for ERP transformation and identifies the practical actions that should be addressed before implementation begins."
          ),
          outcomes: [
            "Greater executive alignment",
            "Clear understanding of business readiness",
            "Reduced implementation risk",
            "Stronger governance",
            "Improved confidence before programme mobilisation",
          ],
        },
      ],
    },
  ],
  closing: {
    heading: "Let's Start With The Challenge",
    body: docFromText(
      "Every organisation is different. The starting point is not a predefined methodology or a preferred solution. It is understanding your business, your objectives and the challenge your leadership team is trying to resolve. From there, practical options can be evaluated that support better decisions and sustainable operational improvement."
    ),
    cta: { label: "Arrange an Initial Conversation", href: "#contact" },
  },
  seo: {
    metaTitle: "Business Challenges | Cloon Operations Advisory",
    metaDescription:
      "Independent reviews that help manufacturing leaders define the real challenge — supply chain, capacity and ERP readiness — before choosing a solution.",
  },
};

// Client copy 17 Jul 2026 — VERBATIM, do not "fix" spelling/punctuation.
export const howIWorkDefault: HowIWorkContent = {
  hero: {
    eyebrow: "The Approach",
    heading: "How I Work",
    intro: docFromText(
      "Every organisation is different. Rather than applying a standard methodology or promoting a preferred solution, I work alongside leadership teams to understand their business, challenge assumptions where appropriate and help them make confident, evidence-based decisions."
    ),
  },
  experience: {
    heading: "Experience That Shapes My Approach",
    body: docFromText(
      "Over almost 25 years working across manufacturing operations, supply chain, operational improvement and business transformation, I've learned that sustainable improvement comes from understanding the business before deciding on the solution.\n\nThroughout that time, I've led and supported Continuous Improvement initiatives across manufacturing and supply chain functions, applying a wide range of structured problem-solving and operational improvement techniques. Those tools provide a disciplined way to investigate challenges, test assumptions and identify opportunities—but they are never the objective in themselves.\n\nEqually important is combining operational evidence with leadership insight. Executive conversations, operational observation, performance information and practical experience together create a balanced understanding of the challenge, helping leadership teams make decisions with greater confidence.\n\nThese principles underpin every engagement, regardless of the business challenge being addressed."
    ),
  },
  principles: [
    {
      title: "Independent by Design",
      body: docFromText(
        "I don't represent a software vendor, implementation partner or consulting methodology. My advice is shaped by what is right for your business, your objectives and your long-term success."
      ),
    },
    {
      title: "Collaborative, Not Prescriptive",
      body: docFromText(
        "Your leadership team already understands the business. My role is to ask the right questions, provide constructive challenge and help build a shared understanding of the issues that matter most."
      ),
    },
    {
      title: "Practical Over Perfect",
      body: docFromText(
        "Recommendations should be realistic, achievable and capable of delivering measurable business value. The objective is to identify improvements that can be implemented successfully—not simply documented."
      ),
    },
    {
      title: "Executive-Level Engagement",
      body: docFromText(
        "I work directly with senior leadership teams in an open, honest and confidential manner, providing an independent perspective that supports informed decision-making."
      ),
    },
    {
      title: "Flexible Support",
      body: docFromText(
        "Some organisations need a focused operational review. Others benefit from ongoing executive advisory support. Every engagement is tailored to the level of support the organisation needs."
      ),
    },
  ],
  expectations: {
    heading: "What You Can Expect",
    items: [
      "A collaborative and respectful approach.",
      "Independent advice grounded in operational leadership experience.",
      "Practical recommendations supported by evidence.",
      "Clear communication throughout the engagement.",
      "A focus on sustainable business outcomes.",
    ],
  },
  outcome: {
    heading: "The Outcome",
    body: docFromText(
      "My objective is to leave your leadership team with a clearer understanding of the challenge, greater confidence in the decisions ahead and practical options that reflect the reality of your organisation."
    ),
  },
  cta: { label: "Arrange an Initial Conversation", href: "#contact" },
  seo: {
    metaTitle: "How I Work | Cloon Operations Advisory",
    metaDescription:
      "A grounded, evidence-based way of working with manufacturing leadership teams — independent, collaborative and practical over perfect.",
  },
};

// Client copy 17 Jul 2026 — VERBATIM, do not "fix" spelling/punctuation.
export const myStoryDefault: MyStoryContent = {
  hero: {
    eyebrow: "About Conor Lee",
    heading: "My Story",
  },
  paragraphsBefore: [
    docFromText(
      "Looking back over my career, I've come to realise that the roles I've held are far less important than the lessons they taught me."
    ),
    docFromText(
      "I've been fortunate to work across manufacturing operations, supply chain, business transformation and operational improvement, supporting organisations through periods of growth, change and increasing complexity. Every role brought different challenges, but together they shaped the way I think about business, leadership and improvement."
    ),
    docFromText("One lesson has remained constant throughout that journey."),
    docFromText(
      "The organisations that achieve the most sustainable improvements are rarely those with the biggest budgets, the newest technology or the most ambitious transformation programmes. More often, they are the organisations that take the time to understand the business challenge they are trying to solve before committing to a solution."
    ),
    docFromText(
      "As my responsibilities grew, I realised that operational challenges rarely belong to a single function. Manufacturing performance, planning, inventory, customer service, technology, organisational capability and leadership alignment are all interconnected. Decisions made in one area almost always influence outcomes somewhere else."
    ),
    docFromText("That understanding fundamentally changed the way I approached improvement."),
    docFromText(
      "The more complex the programmes became, the more I realised that technology was rarely the biggest challenge. Success depended far more on people understanding the problem they were trying to solve, working together across functions and maintaining a shared focus on achieving better business outcomes."
    ),
    docFromText(
      "Throughout my career I've drawn on Continuous Improvement principles, structured problem-solving techniques and operational excellence practices. They have all played an important role, but I've never viewed them as solutions in their own right. They are simply tools that help organisations understand problems more clearly and deliver practical improvements more effectively."
    ),
  ],
  pullQuote: inlineDocFromParts([
    { text: "Solutions are rarely difficult to find. Correctly defining the challenge is often the harder part." },
  ]),
  paragraphsAfter: [
    docFromText("That belief became the foundation of Cloon Operations Advisory."),
    docFromText(
      "After many years leading operational and transformation programmes, I realised the part of my work I found most rewarding wasn't simply delivering projects or implementing change. It was helping people make sense of complexity, bringing different perspectives together and seeing organisations become stronger as a result. That realisation inspired me to create a different kind of advisory practice—one that combines strategic thinking with practical operational experience. A practice that is equally comfortable facilitating executive discussions, working alongside operational leaders or cross-functional teams and supporting organisations as they turn decisions into meaningful improvements."
    ),
    docFromText(
      "Over the years, I've found that the best results rarely come from having all the answers. They come from asking better questions, listening carefully, bringing different perspectives together and helping people build confidence in the decisions they make. That's the role I enjoy most, and it's the approach I bring to every engagement."
    ),
    docFromText(
      "I've always believed that the best improvements are achieved with people, not imposed on them. Sustainable change comes from creating understanding, building alignment and developing capability so that organisations continue improving long after an engagement has finished."
    ),
    docFromText(
      "What continues to excite me after all these years is seeing people and organisations achieve more than they believed was possible. Whether that's helping a leadership team gain clarity, supporting operational teams through change or seeing a business perform at a higher level, there is genuine satisfaction in knowing that the work has made a lasting difference. That's what continues to motivate me."
    ),
    docFromText(
      "Today, my objective remains the same: to help organisations solve the right problems, make better decisions and deliver meaningful, lasting improvements."
    ),
    docFromText("Ultimately, that's why I established Cloon Operations Advisory."),
  ],
  cta: { label: "Arrange an Initial Conversation", href: "#contact" },
  seo: {
    metaTitle: "My Story | Cloon Operations Advisory",
    metaDescription:
      "Why Conor Lee founded Cloon Operations Advisory — almost 25 years leading manufacturing operations, supply chain and transformation.",
  },
};

export const defaults = {
  hero: heroDefault,
  services: servicesDefault,
  approach: approachDefault,
  about: aboutDefault,
  positioning: positioningDefault,
  contact: contactDefault,
  navigation: navigationDefault,
  footer: footerDefault,
  settings: settingsDefault,
  homeIntro: homeIntroDefault,
  homeExperience: homeExperienceDefault,
  homeTeasers: homeTeasersDefault,
  businessChallenges: businessChallengesDefault,
  howIWork: howIWorkDefault,
  myStory: myStoryDefault,
};
