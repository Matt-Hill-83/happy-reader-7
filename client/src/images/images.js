// backgrounds
import forest from "./backgrounds/forest-3.jpg"
import forestLeft from "./backgrounds/forest-1-left.png"
import forestRight from "./backgrounds/forest-1-right.png"
import map from "./backgrounds/map-05.jpg"
import rock from "./backgrounds/rock-2.jpg"
import hill01 from "./backgrounds/hill-02.png"

//items
import key from "./items/key.png"
import hat from "./items/hat.png"
import greenKey from "./items/green-key.png"

//doors
import door from "./backgrounds/door.png"
import doorGreen from "./doors/doorGreen.png"
import doorYellow from "./doors/doorYellow.jpg"

//locations
import barn from "./locations/barn.png"
import bees from "./locations/bees.png"
import bog from "./locations/bog.png"
import bus from "./locations/bus.png"
import castle from "./locations/castle.png"
import cave from "./locations/cave.png"
import coop from "./locations/coop.png"
import hill from "./locations/hill.png"
import house from "./locations/house.png"
import lake from "./locations/lake.png"
import log from "./locations/log.png"
import pond from "./locations/pond.png"
import pool from "./locations/pool.png"
import slide from "./locations/slide.png"
import stump from "./locations/stump.png"
import swamp from "./locations/swamp.png"
import swing from "./locations/swing.png"
import tree from "./locations/treehouse.png"
import waterfall from "./locations/waterfall.png"

// creatures
import bug from "./creatures/bug.png"
import dragon from "./creatures/dragon.png"
import elf from "./creatures/elf-1.png"
import fairy from "./creatures/fairy.png"
import girl from "./creatures/girl-1.png"
import goblin from "./creatures/goblin.png"
import hobbit from "./creatures/hobbit.png"
import mermaid from "./creatures/mermaid.png"
import monster from "./creatures/monster.png"
import pig from "./creatures/pig.png"
import troll from "./creatures/troll-01.png"
import unicorn from "./creatures/unicorn-1.png"
import wizard from "./creatures/wizard.png"
import zombie from "./creatures/zombie.png"

// poseable girl
import rubyHappy from "./rigged-girls/ruby/ruby-happy-01.png"
import rubyMad from "./rigged-girls/ruby/ruby-mad-01.png"
import rubySad from "./rigged-girls/ruby/ruby-sad-01.png"
import rubySly from "./rigged-girls/ruby/ruby-sly-01.png"

// rigged girl - amber
import amberNormal from "./rigged-girls/amber/amber-01-normal.png"
import amberSneaky from "./rigged-girls/amber/amber-02-sneaky.png"
import amberBlissful from "./rigged-girls/amber/amber-03-blissful.png"
import amberFrustrated from "./rigged-girls/amber/amber-04-frustrated.png"
import amberGlad from "./rigged-girls/amber/amber-05-glad.png"
import amberSurprised from "./rigged-girls/amber/amber-06-surprised.png"
import amberScared from "./rigged-girls/amber/amber-07-scared.png"
import amberMad from "./rigged-girls/amber/amber-08-mad.png"
import amberShocked from "./rigged-girls/amber/amber-09-shocked.png"
import amberBody from "./rigged-girls/amber/amber-body.png"

// rigged girl - amber
import janBlissful from "./rigged-girls/jan/jan-09-blissful.png"
import janRepulsed from "./rigged-girls/jan/jan-08-repulsed.png"
import janHappy from "./rigged-girls/jan/jan-07-happy.png"
import janSneaky from "./rigged-girls/jan/jan-06-sneaky.png"
import janSorry from "./rigged-girls/jan/jan-05-sorry.png"
import janMad from "./rigged-girls/jan/jan-04-mad.png"
import janSurprised from "./rigged-girls/jan/jan-03-surprised.png"
import janNormal from "./rigged-girls/jan/jan-02-normal.png"
import janScared from "./rigged-girls/jan/jan-01-scared.png"
import janBody from "./rigged-girls/jan/jan-body.png"

// rigged girl - kat
import katBlissful from "./rigged-girls/kat/kat-blissful.png"
import katCringing from "./rigged-girls/kat/kat-cringing.png"
import katCrying from "./rigged-girls/kat/kat-crying.png"
import katDisgusted from "./rigged-girls/kat/kat-disgusted.png"
import katDismayed from "./rigged-girls/kat/kat-dismayed.png"
import katNormal from "./rigged-girls/kat/kat-normal.png"
import katFunny from "./rigged-girls/kat/kat-funny.png"
import katHappy from "./rigged-girls/kat/kat-happy.png"
import katHurt from "./rigged-girls/kat/kat-hurt.png"
import katKissing from "./rigged-girls/kat/kat-kissing.png"
import katLauging from "./rigged-girls/kat/kat-lauging.png"
import katLoud from "./rigged-girls/kat/kat-loud.png"
import katMad from "./rigged-girls/kat/kat-mad.png"
import katOptimistic from "./rigged-girls/kat/kat-optimistic.png"
import katSad from "./rigged-girls/kat/kat-sad.png"
import katScared from "./rigged-girls/kat/kat-scared.png"
import katSilly from "./rigged-girls/kat/kat-silly.png"
import katSinister from "./rigged-girls/kat/kat-sinister.png"
import katSmiling from "./rigged-girls/kat/kat-smiling.png"
import katSurprised from "./rigged-girls/kat/kat-surprised.png"
import katTired from "./rigged-girls/kat/kat-tired.png"
import katUnsure from "./rigged-girls/kat/kat-unsure.png"
import katWinking from "./rigged-girls/kat/kat-winking.png"
import katBody from "./rigged-girls/jan/jan-body.png"

// scene view
import sceneViewBook from "./scene-view/book01.png"
import sceneViewNotebook from "./scene-view/notebook-01.png"

const MOODS = {
  blissful: "blissful",
  frustrated: "frustrated",
  glad: "glad",
  happy: "happy",
  lonely: "lonely",
  mad: "mad",
  normal: "normal",
  sad: "sad",
  scared: "scared",
  shocked: "shocked",
  sly: "sly",
  sneaky: "sneaky",
  surprised: "surprised",
  stunned: "stunned",
  apprehensive: "apprehensive",
  resolute: "resolute",
  repulsed: "repulsed",
  determined: "determined",
  amazed: "amazed"
}

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
    map,
    rock,
    hill01
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
      name: "liz",
      type: "liz",
      mood: "mad",
      images: {
        heads: [
          {
            image: janBlissful,
            mood: "blissful"
          },
          {
            image: janRepulsed,
            mood: "repulsed"
          },
          {
            image: janHappy,
            mood: "happy"
          },
          {
            image: janSneaky,
            mood: "wink"
          },
          {
            image: janSorry,
            mood: "sorry"
          },
          {
            image: janMad,
            mood: "mad"
          },
          {
            image: janSurprised,
            mood: "oh my"
          },
          {
            image: janNormal,
            mood: "ok"
          },
          {
            image: janScared,
            mood: "scared"
          }
        ],
        body: { image: janBody }
      }
    },
    {
      name: "amber",
      type: "amber",
      mood: "frustrated",
      images: {
        heads: [
          {
            image: amberNormal,
            mood: "ok"
          },
          {
            image: amberSneaky,
            mood: "wink"
          },
          {
            image: amberBlissful,
            mood: "blissful"
          },
          {
            image: amberFrustrated,
            mood: "frustrated"
          },
          {
            image: amberGlad,
            mood: "glad"
          },
          {
            image: amberSurprised,
            mood: "oh my"
          },
          {
            image: amberScared,
            mood: "scared"
          },
          {
            image: amberMad,
            mood: "mad"
          },
          {
            image: amberShocked,
            mood: "shocked"
          }
        ],
        body: { image: amberBody }
      }
    },
    {
      name: "kat",
      type: "kat",
      mood: "hurt",
      images: {
        heads: [
          {
            image: katHurt,
            mood: "hurt"
          },
          {
            image: katOptimistic,
            mood: "mad"
          },
          {
            image: katSad,
            mood: "sad"
          },
          {
            image: katScared,
            mood: "scared"
          },
          {
            image: katKissing,
            mood: "kiss"
          },
          {
            image: katCrying,
            mood: "cry"
          },
          {
            image: katDisgusted,
            mood: "gross"
          },
          {
            image: katBlissful,
            mood: "blissful"
          },
          {
            image: katCringing,
            mood: "cringing"
          },
          {
            image: katDismayed,
            mood: "left out"
          },
          {
            image: katNormal,
            mood: "ok"
          },
          {
            image: katFunny,
            mood: "funny"
          },
          {
            image: katHappy,
            mood: "happy"
          },

          {
            image: katLauging,
            mood: "lauging"
          },
          {
            image: katLoud,
            mood: "hey!"
          },
          {
            image: katMad,
            mood: "mad"
          },

          {
            image: katSilly,
            mood: "silly"
          },
          {
            image: katSinister,
            mood: "sinister"
          },
          {
            image: katSmiling,
            mood: "smile"
          },
          {
            image: katSurprised,
            mood: "oh my"
          },
          {
            image: katTired,
            mood: "sleepy"
          },
          {
            image: katUnsure,
            mood: "unsure"
          },
          {
            image: katWinking,
            mood: "wink"
          }
        ],
        body: { image: katBody }
      }
    }
  ],
  sceneView: {
    book: sceneViewBook,
    notebook: sceneViewNotebook
  }
}
