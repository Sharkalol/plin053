import { Background } from "../../models/Background"

export const Soldier: Background = {
  name: "Soldier",
  skills: ["Athletics", "Intimidation"],
  equipment: [
    "Insignia of rank",
    "Trophy from a fallen enemy",
    "Set of bone dice or deck of cards",
    "Common clothes",
    "Pouch with 10 gp"
  ],
  feature: "Military Rank",
  personality_traits: [
    "I’m always polite and respectful.",
    "I’m haunted by memories of war. I can’t get the images of violence out of my mind.",
    "I’ve lost too many friends, and I’m slow to make new ones.",
    "I’m full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.",
    "I can stare down a hell hound without flinching.",
    "I enjoy being strong and like breaking things.",
    "I have a crude sense of humor.",
    "I face problems head-on. A simple, direct solution is the best path to success."
  ],
  ideals: {
    Good: [
      "Greater Good. Our lot is to lay down our lives in defense of others."
    ],
    Lawful: [
      "Responsibility. I do what I must and obey just authority."
    ],
    Chaotic: [
      "Independence. When people follow orders blindly, they embrace a kind of tyranny."
    ],
    Evil: [
      "Might. In life as in war, the stronger force wins."
    ],
    Neutral: [
      "Live and Let Live. Ideals aren’t worth killing over or going to war for."
    ],
    Any: [
      "Nation. My city, nation, or people are all that matter."
    ]
  },
  bonds: [
    "I would still lay down my life for the people I served with.",
    "Someone saved my life on the battlefield. To this day, I will never leave a friend behind.",
    "My honor is my life.",
    "I’ll never forget the crushing defeat my company suffered or the enemies who dealt it.",
    "Those who fight beside me are those worth dying for.",
    "I fight for those who cannot fight for themselves."
  ],
  flaws: [
    "The monstrous enemy we faced in battle still leaves me quivering with fear.",
    "I have little respect for anyone who is not a proven warrior.",
    "I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.",
    "My hatred of my enemies is blind and unreasoning.",
    "I obey the law, even if the law causes misery.",
    "I’d rather eat my armor than admit when I’m wrong."
  ]
}