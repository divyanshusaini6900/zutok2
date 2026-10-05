/**
 * How a customer goes live, shown as "Live in 3 steps" on the home page and on /about/.
 * Kept apart from company.ts, which imports seo.ts, so the client Industries section stays light.
 */
export const onboardingSteps = [
  { n: "01", title: "Book a demo", body: "We look at how you sell today and show you the parts of Zutok that fit." },
  { n: "02", title: "We set it up with you", body: "Channels, store, catalogue, tiers and team, configured together on a call." },
  { n: "03", title: "Watch it run", body: "Chats get answered, orders confirmed and guests come back, all in one CRM." },
];
