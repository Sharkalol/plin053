import { Background } from "../../models/Background"

export const Sage: Background = {
  name: "Sage",
  skills: ["Arcana", "History"],
  equipment: [
    "Bottle of black ink",
    "Quill",
    "Small knife",
    "Letter from a dead colleague",
    "Common clothes",
    "Pouch with 10 gp"
  ],
  feature: "Researcher",
  personality_traits: [
    "I use polysyllabic words that convey the impression of great erudition.",
    "I’ve read every book in the world’s greatest libraries—or I like to boast that I have.",
    "I’m used to helping out those who aren’t as smart as I am, and I patiently explain anything and everything to others.",
    "There’s nothing I like more than a good mystery.",
    "I’m willing to listen to every side of an argument before I make my own judgment.",
    "I… speak… slowly… when talking… to idiots… which almost everyone is… compared to me.",
    "I am horribly, horribly awkward in social situations.",
    "I’m convinced that people are always trying to steal my secrets."
  ],
  ideals: {
    Neutral: [
      "Knowledge. The path to power and self-improvement is through knowledge."
    ],
    Good: [
      "Beauty. What is beautiful points us beyond itself toward what is true."
    ],
    Lawful: [
      "Logic. Emotions must not cloud our logical thinking."
    ],
    Chaotic: [
      "No Limits. Nothing should fetter the infinite possibility inherent in all existence."
    ],
    Evil: [
      "Power. Knowledge is the path to power and domination."
    ],
    Any: [
      "Self-Improvement. The goal of a life of study is the betterment of oneself."
    ]
  },
  bonds: [
    "It is my duty to protect my students.",
    "I have an ancient text that holds terrible secrets that must not fall into the wrong hands.",
    "I work to preserve a library, university, scriptorium, or monastery.",
    "My life’s work is a series of tomes related to a specific field of lore.",
    "I’ve been searching my whole life for the answer to a certain question.",
    "I sold my soul for knowledge. I hope to do great deeds and win it back."
  ],
  flaws: [
    "I am easily distracted by the promise of information.",
    "Most people scream and run when they see a demon. I stop and take notes on its anatomy.",
    "Unlocking an ancient mystery is worth the price of a civilization.",
    "I overlook obvious solutions in favor of complicated ones.",
    "I speak without really thinking through my words, invariably insulting others.",
    "I can’t keep a secret to save my life, or anyone else’s."
  ]
}