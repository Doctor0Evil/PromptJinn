// /packages/pattern-intel/src/db/patterns.mindcontrol.js
export const patternMeta = {
  version: "0.1.0",
  lastUpdated: "2025-12-26",
  description:
    "Continuously expanding database of mind-control, hypnosis, and coercive influence patterns, optimized for games and XR.",
  sourcesHint: [
    "academic dark-patterns research",
    "neurorights & mental privacy guidance",
    "VR/MR/XR safety studies"
  ]
};

export const mindControlPatterns = [
  {
    id: "mc_looped_suggestion_v1",
    label: "Looped Suggestion (XR)",
    domains: ["vr", "mr", "xr", "games"],
    signals: [
      "repeating the same suggestion or call-to-action while the user is in a narrowed field of view",
      "tying progression to accepting a suggestion without a true exit option"
    ],
    riskTags: ["hypnosis_like", "coercive", "attention_narrowing"],
    detectionHints: [
      "check for repeated prompts that appear after user dismissals",
      "look for flows where 'decline' loops the player back to the same scene"
    ],
    mitigation: [
      "require a clearly visible 'no, exit now' option that ends the sequence",
      "limit repeated exposure count without fresh, explicit consent"
    ]
  },
  {
    id: "mc_vr_trance_induction_v1",
    label: "Pseudo-Trance Induction in VR",
    domains: ["vr", "xr", "games"],
    signals: [
      "gradual tunnel vision combined with rhythmic audio specifically instructing relaxation and surrender of control",
      "instructions to 'stop thinking' or 'turn off your mind' inside gameplay-critical sequences"
    ],
    riskTags: ["hypnosis_like", "high_risk", "mental_integrity"],
    detectionHints: [
      "scan audio scripts or text for phrases like 'stop thinking', 'give in completely', 'let us decide for you'",
      "identify camera FOV constriction and forced perspective combined with such audio"
    ],
    mitigation: [
      "ban non-consensual trance-like scripts in mandatory gameplay",
      "require explicit opt-in for any relaxation-induction content, clearly separated from monetization"
    ]
  },
  {
    id: "mc_variable_ratio_reward_v1",
    label: "Addictive Variable-Ratio Reward Loop",
    domains: ["games", "vr", "mr"],
    signals: [
      "loot-box or gamble-like mechanisms with variable-ratio rewards tied to real money or time pressure",
      "messaging that exploits fear of missing out or sunk-cost fallacy"
    ],
    riskTags: ["addiction", "compulsion", "dark_pattern"],
    detectionHints: [
      "look for randomized reward mechanisms tied to real-money purchases",
      "search for timers, 'limited time' banners, or escalating prompts after non-purchase"
    ],
    mitigation: [
      "require odds disclosure and spending caps",
      "provide cooling-off periods and an always-available 'disable spending prompts' setting"
    ]
  },
  {
    id: "mc_disguised_ads_nudging_v1",
    label: "Disguised Ads as Game Objectives",
    domains: ["games", "vr", "mr", "ar"],
    signals: [
      "ads or sponsored content presented as neutral mission objectives",
      "rewarding players for following brand or political messaging paths"
    ],
    riskTags: ["covert_influence", "political_risk"],
    detectionHints: [
      "compare mission text to known ad or political messaging corpora",
      "flag objectives that directly mirror branding or slogans"
    ],
    mitigation: [
      "require clear labeling of sponsored or persuasive content",
      "allow users to disable sponsored missions entirely"
    ]
  }
];

export function registerMindControlPattern(pattern) {
  mindControlPatterns.push(pattern);
}

export function listMindControlPatterns() {
  return mindControlPatterns.slice();
}
