// TODO: associate colors with word types
const wordTypes = {
  animal: "animal",
  name: "name",
  feeling: "feeling",
  location: "location",
  garment: "garment",
  food: "food",
  vehicle: "vehicle",
  action: "action",
  creature: "creature"
};

const wordFamilies = {
  cow: "cow",
  cat: "cat",
  pig: "pig",
  bug: "bug",
  snake: "snake",
  mad: "mad"
};

// TODO: wordTypes should be an array of tags.
const animals = [
  { name: "cat", image: "noun", type: wordTypes.animal },
  { name: "rat", image: "noun", type: wordTypes.animal },
  { name: "bat", image: "noun", type: wordTypes.animal },
  { name: "dog", image: "noun", type: wordTypes.animal },
  { name: "pig", image: "noun", type: wordTypes.animal },
  { name: "cow", image: "noun", type: wordTypes.animal },
  { name: "bee", image: "noun", type: wordTypes.animal },
  { name: "frog", image: "noun", type: wordTypes.animal },
  { name: "crab", image: "noun", type: wordTypes.animal },
  { name: "fish", image: "noun", type: wordTypes.animal },
  { name: "bear", image: "noun", type: wordTypes.animal },
  { name: "deer", image: "noun", type: wordTypes.animal },
  { name: "bird", image: "noun", type: wordTypes.animal },
  { name: "crow", image: "noun", type: wordTypes.animal },
  { name: "turtle", image: "noun", type: wordTypes.animal },
  { name: "bunny", image: "noun", type: wordTypes.animal },
  { name: "monster", image: "noun", type: wordTypes.animal },
  // { name: "alligator", image: "noun", type: wordTypes.animal },
  { name: "snake", image: "noun", type: wordTypes.animal }
];

const other = [
  { name: "today", image: "noun", type: wordTypes.other },
  { name: "green", image: "noun", type: wordTypes.other }
];

const colors = [
  { name: "red", image: "noun", type: wordTypes.color },
  { name: "purple", image: "noun", type: wordTypes.color },
  { name: "pink", image: "noun", type: wordTypes.color },
  { name: "pink", image: "noun", type: wordTypes.color },
  { name: "green", image: "noun", type: wordTypes.color }
];

const actions = [
  { name: "runs", image: "noun", type: wordTypes.action },
  { name: "flys", image: "noun", type: wordTypes.action }
];

const names = [
  { name: "Bingo Bongo", image: "noun", type: wordTypes.name },
  { name: "Bun Bun", image: "noun", type: wordTypes.name },
  { name: "Charlie", image: "noun", type: wordTypes.name },
  { name: "Bob", image: "noun", type: wordTypes.name },
  { name: "Matt", image: "noun", type: wordTypes.name },
  { name: "Zippy", image: "noun", type: wordTypes.name },
  // { name: "Mom", image: "noun", type: wordTypes.name },
  // { name: "Dad", image: "noun", type: wordTypes.name },
  { name: "Mason", image: "noun", type: wordTypes.name },
  { name: "Abi", image: "noun", type: wordTypes.name },
  { name: "Elliot", image: "noun", type: wordTypes.name },
  { name: "Annadare", image: "noun", type: wordTypes.name },
  { name: "Noak", image: "noun", type: wordTypes.name },
  { name: "Nick", image: "noun", type: wordTypes.name },
  { name: "Chris", image: "noun", type: wordTypes.name },
  { name: "Tami", image: "noun", type: wordTypes.name },
  { name: "Nico", image: "noun", type: wordTypes.name },
  { name: "Plato", image: "noun", type: wordTypes.name }
];

const emotions = [
  { name: "sad", image: "noun", type: wordTypes.feeling },
  { name: "mad", image: "noun", type: wordTypes.feeling },
  { name: "glad", image: "noun", type: wordTypes.feeling },
  { name: "happy", image: "noun", type: wordTypes.feeling },
  { name: "silly", image: "noun", type: wordTypes.feeling },
  { name: "angry", image: "noun", type: wordTypes.feeling },
  { name: "scared", image: "noun", type: wordTypes.feeling },
  { name: "brave", image: "noun", type: wordTypes.feeling },
  { name: "surprised", image: "noun", type: wordTypes.feeling }
];

const garments = [
  { name: "hat", image: "noun", type: wordTypes.garment, family: "cat" },
  { name: "bow", image: "noun", type: wordTypes.garment },
  { name: "pants", image: "noun", type: wordTypes.garment },
  { name: "gloves", image: "noun", type: wordTypes.garment },
  { name: "shirt", image: "noun", type: wordTypes.garment }
];

const foods = [
  { name: "pizza", image: "noun", type: wordTypes.food },
  { name: "grass", image: "noun", type: wordTypes.food },
  { name: "cake", image: "noun", type: wordTypes.food },
  { name: "candy", image: "noun", type: wordTypes.food },
  { name: "muffin", image: "noun", type: wordTypes.food },
  { name: "lemon", image: "noun", type: wordTypes.food },
  { name: "apple", image: "noun", type: wordTypes.food },
  { name: "cookies", image: "noun", type: wordTypes.food },
  { name: "popsicle", image: "noun", type: wordTypes.food },
  { name: "banana", image: "noun", type: wordTypes.food },
  { name: "lollipop", image: "noun", type: wordTypes.food }
];

const vehicles = [
  { name: "car", image: "noun", type: wordTypes.vehicle },
  { name: "bike", image: "noun", type: wordTypes.vehicle },
  { name: "scooter", image: "noun", type: wordTypes.vehicle },
  { name: "boat", image: "noun", type: wordTypes.vehicle },
  { name: "plane", image: "noun", type: wordTypes.vehicle },
  { name: "train", image: "noun", type: wordTypes.vehicle }
  // { name: "helicopter", image: "noun", type: wordTypes.vehicle }
];

const familyCow = [
  { family: "cow", name: "cow", image: "noun", type: wordTypes.animal },
  { family: "cow", name: "now", image: "noun", type: "" },
  { family: "cow", name: "how", image: "noun", type: "" },
  { family: "cow", name: "plow", image: "noun", type: "" }
];

const familyCat = [
  { family: "cat", name: "cat", image: "noun", type: wordTypes.animal },
  { family: "cat", name: "bat", image: "noun", type: wordTypes.animal },
  // { family: "cat", name: "hat", image: "noun", type: '' },
  { family: "cat", name: "sat", image: "noun", type: "" },
  { family: "cat", name: "mat", image: "noun", type: "" },
  { family: "cat", name: "pat", image: "noun", type: "" },
  { family: "cat", name: "flat", image: "noun", type: "" },
  { family: "cat", name: "fat", image: "noun", type: "" },
  { family: "cat", name: "that", image: "noun", type: "" },
  { family: "cat", name: "splat", image: "noun", type: "" },
  { family: "cat", name: "at", image: "noun", type: "" },
  { family: "cat", name: "chat", image: "noun", type: "" }
];

const familyPig = [
  { family: "pig", name: "pig", image: "noun", type: wordTypes.animal },
  { family: "pig", name: "big", image: "noun", type: "" },
  { family: "pig", name: "twig", image: "noun", type: "" }
];

const familyBug = [
  { family: "bug", name: "bug", image: "noun", type: wordTypes.animal },
  { family: "bug", name: "pug", image: "noun", type: wordTypes.animal },
  { family: "bug", name: "hug", image: "noun", type: "" },
  { family: "bug", name: "rug", image: "noun", type: "" },
  { family: "bug", name: "tug", image: "noun", type: "" },
  { family: "bug", name: "mug", image: "noun", type: "" },
  { family: "bug", name: "jug", image: "noun", type: "" },
  { family: "bug", name: "twig", image: "noun", type: "" }
];

const familySnake = [
  { family: "snake", name: "snake", image: "noun", type: wordTypes.animal },
  { family: "snake", name: "lake", image: "noun", type: "" },
  { family: "snake", name: "rake", image: "noun", type: "" },
  { family: "snake", name: "bake", image: "noun", type: "" },
  { family: "snake", name: "take", image: "noun", type: "" },
  { family: "snake", name: "wake", image: "noun", type: "" },
  { family: "snake", name: "cake", image: "noun", type: "" },
  { family: "snake", name: "fake", image: "noun", type: "" }
];

const familyMad = [
  { family: "mad", name: "sad", image: "noun", type: "" },
  { family: "mad", name: "mad", image: "noun", type: "" },
  { family: "mad", name: "had", image: "noun", type: "" },
  { family: "mad", name: "bad", image: "noun", type: "" },
  { family: "mad", name: "glad", image: "noun", type: "" }
];

// const locations = [
//   { name: "park", image: "noun", type: wordTypes.location },
//   { name: "lake", image: "noun", type: wordTypes.location },
//   { name: "store", image: "noun", type: wordTypes.location },
//   { name: "school", image: "noun", type: wordTypes.location },
//   { name: "forest", image: "noun", type: wordTypes.location },
//   { name: "library", image: "noun", type: wordTypes.location },
//   { name: "island", image: "noun", type: wordTypes.location },
//   { name: "waterfall", image: "noun", type: wordTypes.location },
//   { name: "home", image: "noun", type: wordTypes.location },
//   { name: "beach", image: "noun", type: wordTypes.location },
//   { name: "playground", image: "noun", type: wordTypes.location }
// ];

const locations = [
  { name: "tree", type: wordTypes.location },
  { name: "stump", type: wordTypes.location },
  { name: "castle", type: wordTypes.location },
  { name: "waterfall", type: wordTypes.location },
  { name: "bees", type: wordTypes.location },
  { name: "swamp", type: wordTypes.location },
  { name: "house", type: wordTypes.location },
  { name: "lake", type: wordTypes.location },
  { name: "barn", type: wordTypes.location },

  { name: "woods", type: wordTypes.location },
  { name: "pool", type: wordTypes.location },
  { name: "yard", type: wordTypes.location },

  { name: "pond", type: wordTypes.location },
  { name: "bog", type: wordTypes.location },
  { name: "pool", type: wordTypes.location },

  { name: "hill", type: wordTypes.location }
];

const creatures = [
  { name: "dragon", type: wordTypes.creature },
  { name: "elf", type: wordTypes.creature },
  { name: "fairy", type: wordTypes.creature },
  { name: "goblin", type: wordTypes.creature },
  { name: "hobbit", type: wordTypes.creature },
  { name: "mermaid", type: wordTypes.creature },
  { name: "monster", type: wordTypes.creature },
  { name: "troll", type: wordTypes.creature },
  { name: "unicorn", type: wordTypes.creature },
  { name: "wizard", type: wordTypes.creature },
  { name: "zombie", type: wordTypes.creature }
  // { name: "giant", image: "noun", type: wordTypes.creature }
];

const words = [
  ...animals,
  ...actions,
  ...names,
  ...emotions,
  ...locations,
  ...garments,
  ...foods,
  ...vehicles,
  ...creatures,
  ...other,
  ...colors,
  ...familyCow,
  ...familyCat,
  ...familyPig,
  ...familyBug,
  ...familySnake,
  ...familyMad
];

export default {
  // These words have been added to the database, but are preserved here as backup.
  words,
  wordTypes,
  wordFamilies
};
