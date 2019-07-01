// backgrounds
import forest from "./backgrounds/forest-3.jpg";
import forestLeft from "./backgrounds/forest-1-left.png";
import forestRight from "./backgrounds/forest-1-right.png";
import map02 from "./backgrounds/map-05.jpg";
import rock from "./backgrounds/rock-2.jpg";

//items
import key from "./items/key.png";
import hat from "./items/hat.png";
import greenKey from "./items/green-key.png";

//doors
import door from "./backgrounds/door.png";
import doorGreen from "./doors/doorGreen.png";
import doorYellow from "./doors/doorYellow.jpg";

//locations
import barn from "./locations/barn.png";
import bees from "./locations/bees.png";
import bog from "./locations/bog.png";
import bus from "./locations/bus.png";
import castle from "./locations/castle.png";
import cave from "./locations/cave.png";
import coop from "./locations/coop.png";
import hill from "./locations/hill.png";
import house from "./locations/house.png";
import lake from "./locations/lake.png";
import log from "./locations/log.png";
import pond from "./locations/pond.png";
import pool from "./locations/pool.png";
import slide from "./locations/slide.png";
import stump from "./locations/stump.png";
import swamp from "./locations/swamp.png";
import swing from "./locations/swing.png";
import tree from "./locations/treehouse.png";
import waterfall from "./locations/waterfall.png";

// creatures
import bug from "./creatures/bug.png";
import dragon from "./creatures/dragon.png";
import elf from "./creatures/elf-1.png";
import fairy from "./creatures/fairy.png";
import girl from "./creatures/girl-1.png";
import goblin from "./creatures/goblin.png";
import hobbit from "./creatures/hobbit.png";
import mermaid from "./creatures/mermaid.png";
import monster from "./creatures/monster.png";
import pig from "./creatures/pig.png";
import troll from "./creatures/troll-01.png";
import unicorn from "./creatures/unicorn-1.png";
import wizard from "./creatures/wizard.png";
import zombie from "./creatures/zombie.png";

// poseable girl
import rubyHappy from "./rigged-girls/ruby/ruby-happy-01.png";
import rubyMad from "./rigged-girls/ruby/ruby-mad-01.png";
import rubySad from "./rigged-girls/ruby/ruby-sad-01.png";
import rubySly from "./rigged-girls/ruby/ruby-sly-01.png";

// import amber01 from "/Users/matthill/projects/GCP_stuff/happy-reader-7/client/src/images/rigged-girls/amber/amber-01.png";
import amber01 from "./rigged-girls/amber/amber-01.png";
import amber02 from "./rigged-girls/amber/amber-02.png";
import amber03 from "./rigged-girls/amber/amber-03.png";
import amber04 from "./rigged-girls/amber/amber-04.png";
import amber05 from "./rigged-girls/amber/amber-05.png";
import amber06 from "./rigged-girls/amber/amber-06.png";
import amber07 from "./rigged-girls/amber/amber-07.png";
import amber08 from "./rigged-girls/amber/amber-08.png";
import amber09 from "./rigged-girls/amber/amber-09.png";
import amberBody from "./rigged-girls/amber/amber-body.png";

const amberHeads = [
  amber01,
  amber02,
  amber03,
  amber04,
  amber05,
  amber06,
  amber07,
  amber08,
  amber09
];

const MOODS = {
  glad: "glad",
  happy: "happy",
  lonely: "lonely",
  mad: "mad",
  sad: "sad",
  scared: "scared",
  sly: "sly",
  surprised: "surprised"
};

export default {
  locations: {
    barn,
    bees,
    bog,
    castle,
    cave,
    coop,
    hill,
    home: house,
    lake,
    log,
    pond,
    pool,
    slide,
    stump,
    swamp,
    swing,
    tree,
    bus,
    waterfall
  },
  creatures: {
    bug,
    dragon,
    pig,
    hog: pig,
    elf,
    fairy,
    girl,
    goblin,
    hobbit,
    mermaid,
    monster,
    troll,
    unicorn,
    wizard,
    zombie
  },
  backgrounds: {
    door,
    forest,
    forestLeft,
    forestRight,
    map02,
    rock
  },
  items: {
    hat,
    key,
    greenKey
  },
  doors: {
    doorGreen,
    doorYellow,
    door
  },
  posableGirls: [
    {
      name: "amber",
      images: {
        heads: amberHeads,
        body: { image: amberBody }
      }
    }
    // {
    //   name: "ruby",
    //   images: {
    //     heads: [
    //       {
    //         image: rubyHappy,
    //         mood: MOODS.happy,
    //         offset: { x: 0, y: 0 }
    //       },
    //       {
    //         image: rubyMad,
    //         mood: MOODS.mad,
    //         offset: { x: 0, y: 0 }
    //       },
    //       {
    //         image: rubySad,
    //         mood: MOODS.sad,
    //         offset: { x: 0, y: 0 }
    //       },
    //       {
    //         image: rubySly,
    //         mood: MOODS.sly,
    //         offset: { x: 0, y: 0 }
    //       }
    //     ],
    //     body: { image: "asdf" }
    //   }
    // }
  ],
  frames: {
    name: "mad girl",
    characters: [{}],
    // narrative,
    // scene,
    isVisited: false
  }
};
