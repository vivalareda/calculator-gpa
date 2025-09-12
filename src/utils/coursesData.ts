export interface Course {
  code: string;
  name: string;
  specializations: string[];
}

export const specializations = [
  "Intelligence artificielle",
  "Cybersécurité", 
  "Jeux vidéo et réalité virtuelle",
  "Systèmes logiciels",
  "Cyberphysique",
  "Systèmes multimédia",
  "Infrastructures et services TI"
] as const;

export type Specialization = typeof specializations[number];

export const coursesData: Course[] = [
  // Intelligence artificielle
  { code: "LOG635", name: "Systèmes intelligents et algorithmes", specializations: ["Intelligence artificielle"] },
  { code: "GTI771", name: "Apprentissage machine avancée", specializations: ["Intelligence artificielle"] },
  { code: "MTI805", name: "Compréhension de l'image", specializations: ["Intelligence artificielle"] },
  { code: "MTI815", name: "Systèmes de communication vocale", specializations: ["Intelligence artificielle"] },
  { code: "MTI820", name: "Entrepôts de données et intelligence d'affaires", specializations: ["Intelligence artificielle"] },
  { code: "MTI830", name: "Forage de textes et de données audiovisuelles", specializations: ["Intelligence artificielle"] },
  { code: "MTI850", name: "Analytiques des données massives", specializations: ["Intelligence artificielle"] },
  { code: "SYS800", name: "Reconnaissance de formes et inspection", specializations: ["Intelligence artificielle"] },
  { code: "SYS809", name: "Vision par ordinateur", specializations: ["Intelligence artificielle"] },
  { code: "SYS828", name: "Systèmes biométriques", specializations: ["Intelligence artificielle"] },
  { code: "SYS843", name: "Réseaux de neurones et systèmes flous", specializations: ["Intelligence artificielle"] },
  { code: "SYS866", name: "Sujets spéciaux : Réseaux de neurones + apprentissage profond", specializations: ["Intelligence artificielle"] },

  // Cybersécurité
  { code: "LOG460", name: "Sécurité des logiciels", specializations: ["Cybersécurité"] },
  { code: "GTI619", name: "Sécurité des systèmes", specializations: ["Cybersécurité"] },
  { code: "GTI719", name: "Sécurité des réseaux d'entreprise", specializations: ["Cybersécurité"] },
  { code: "GTI721", name: "Mécanismes de cyberdéfense", specializations: ["Cybersécurité"] },
  { code: "GTI723", name: "Test d'intrusion", specializations: ["Cybersécurité"] },

  // Jeux vidéo et réalité virtuelle
  { code: "GTI320", name: "Programmation mathématique : Patrons et algorithmes efficaces", specializations: ["Jeux vidéo et réalité virtuelle"] },
  { code: "LOG645", name: "Architectures de calculs parallèles", specializations: ["Jeux vidéo et réalité virtuelle", "Systèmes multimédia"] },
  { code: "LOG725", name: "Ingénierie et conception de jeux vidéo", specializations: ["Jeux vidéo et réalité virtuelle"] },
  { code: "LOG750", name: "Infographie", specializations: ["Jeux vidéo et réalité virtuelle"] },
  { code: "MTI836", name: "Surfaces discrètes : représentation, algorithmes, et traitement", specializations: ["Jeux vidéo et réalité virtuelle"] },
  { code: "MTI845", name: "Interfaces haptiques", specializations: ["Jeux vidéo et réalité virtuelle", "Systèmes multimédia"] },
  { code: "MTI855", name: "Physique des jeux", specializations: ["Jeux vidéo et réalité virtuelle"] },
  { code: "MTI860", name: "Réalité virtuelle et augmentée", specializations: ["Jeux vidéo et réalité virtuelle", "Systèmes multimédia"] },

  // Systèmes logiciels
  { code: "LOG450", name: "Conception d'applications mobiles", specializations: ["Systèmes logiciels"] },
  { code: "LOG530", name: "Réingénierie du logiciel", specializations: ["Systèmes logiciels"] },
  { code: "LOG550", name: "Conception de système informatique en temps réel", specializations: ["Systèmes logiciels", "Cyberphysique"] },
  { code: "LOG680", name: "Introduction à l'approche DevOps", specializations: ["Systèmes logiciels"] },
  { code: "LOG710", name: "Principes des systèmes d'exploitation et programmation système", specializations: ["Systèmes logiciels"] },
  { code: "LOG721", name: "Intergiciels pour applications distribués", specializations: ["Systèmes logiciels"] },
  { code: "LOG736", name: "Fondements des systèmes distribués", specializations: ["Systèmes logiciels"] },
  { code: "MGL805", name: "Vérification et assurance qualité de logiciels", specializations: ["Systèmes logiciels"] },
  { code: "MGL845", name: "Ingénierie dirigée par les modèles", specializations: ["Systèmes logiciels", "Cyberphysique"] },
  { code: "MGL846", name: "Concepts et pratique des tests logiciels", specializations: ["Systèmes logiciels"] },
  { code: "MGL848", name: "Validation et vérification de modèles en génie logiciel", specializations: ["Systèmes logiciels"] },

  // Cyberphysique
  { code: "MGL849", name: "Modélisation, analyse et programmation des systèmes temps réel", specializations: ["Cyberphysique"] },
  { code: "ELE543", name: "Principes des systèmes embarqués", specializations: ["Cyberphysique"] },
  { code: "ELE641", name: "Systèmes embarqués et normes en aérospatiale", specializations: ["Cyberphysique"] },
  { code: "ELE674", name: "Systèmes embarqués avancés", specializations: ["Cyberphysique"] },

  // Systèmes multimédia
  { code: "GTI540", name: "Systèmes de communication et applications audiovisuels", specializations: ["Systèmes multimédia"] },
  { code: "MTI810", name: "Traitement et systèmes de communication vidéo", specializations: ["Systèmes multimédia"] },
  { code: "MTI812", name: "Systèmes vidéo immersifs : principes et applications", specializations: ["Systèmes multimédia"] },

  // Infrastructures et services TI
  { code: "GTI515", name: "Systèmes d'information dans les entreprises", specializations: ["Infrastructures et services TI"] },
  { code: "GTI525", name: "Technologies de développement Internet", specializations: ["Infrastructures et services TI"] },
  { code: "GTI530", name: "Aspects opérationnels des réseaux", specializations: ["Infrastructures et services TI"] },
  { code: "GTI727", name: "Progiciels de gestion intégrée", specializations: ["Infrastructures et services TI"] },
  { code: "GTI778", name: "Infrastructures et services infonuagiques", specializations: ["Infrastructures et services TI"] },
  { code: "GTI785", name: "Systèmes d'applications mobiles", specializations: ["Infrastructures et services TI"] },
  { code: "MTI840", name: "Sujets avancés sur l'Internet et l'infonuagique du futur", specializations: ["Infrastructures et services TI"] },
];