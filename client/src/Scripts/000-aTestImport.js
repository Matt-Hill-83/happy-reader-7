const testImport001 = {
  title: "title",
  scenes: {
    cave: {
      sceneConfig: {
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-smiling.49647334.png",
              },
            ],
            creatures: ["kat", "katieKooper01"],
          },
          dialogs: [
            '{"katieKooper01" : "Yay, we are just in time for the rap battle"}',
            '{"kat" : "Cool! What\'s a rap battle?"}',
            '{"katieKooper01" : "I don\'t know."}',
            '{"katieKooper01" : "Let\'s find out!."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-cringing.62a27ad4.png",
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "The trolls don\'t know we stole the diamond. So just act cool."}',
            '{"katieKooper01" : "What! We STOLE the DIAMOND? "}',
            '{"kat" : "Shhhhhhhhhhh! "}',
            '{"troll01" : "LOOK GIRLS!"}',
            '{"troll02" : "GIRLS TAKE DIAMOND?"}',
            '{"troll01" : "TROLLS EAT GIRLS!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-dismayed.b719035a.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "What? Who? Me? Don\'t be silly. We hate diamonds!"}',
            '{"katieKooper01" : "What? Kat, we love diamonds!!!"}',
            '{"kat" : "Katie!!!!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-cringing.62a27ad4.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "Oh hello trolls. We are not here to take your diamond."}',
            '{"kat" : "We are here for....ummmm.... uuuuuhhhh..."}',
            '{"kat" : "Katie! Think of something quick!"}',
            '{"katieKooper01" : "We\'re here for the rap battle!"}',
            '{"kat" : "Good save Katie Kooper!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-surprised.1c00ae4e.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "My friend Kat here is going to show you trolls how to rap!"}',
            '{"kat" : "Katie!!!!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-dismayed.b719035a.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"troll01" : "RAP BATTLE!"}',
            '{"troll02" : "RAP BATTLE!"}',
            '{"kat" : "Katie? What in the world are you getting us into."}',
            '{"katieKooper01" : "Chill out Kat, it\'s fine."}',
            '{"katieKooper01" : "Just do the rap about the frog on the log."}',
            '{"kat" : "The frog on the log?!?"}',
            '{"kat" : "Yeah. The one you did this morning! That was hilarious!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-loud.0dec3d35.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "Ugggghhh! Katie! That was not a rap!"}',
            '{"kat" : "This morning, I literally, saw a frog on a log."}',
            '{"katieKooper01" : "That was so funny! You had me dying!"}',
            '{"kat" : "Katie!!!!"}',
            '{"kat" : "Stop Talking! For the first time in your life!"}',
            '{"kat" : "Listen to me very closely. There is no rap."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-dismayed.b719035a.png",
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "This morning..."}',
            '{"kat" : "I SAW A FROG..."}',
            '{"troll01" : "GIRL SAW FROG???"}',
            '{"kat" : "...ON A LOG!"}',
            '{"troll02" : "FROG ON LOG!"}',
            '{"troll01" : "HA! HA! HOO! HOO!"}',
            '{"troll01" : "TROLL LIKE FROG!"}',
          ],
        },
      ],
    },
    bog: {
      sceneConfig: {
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: ["flag", "cup"],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-scared.a3316950.png",
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "And I\'m NOT gonna RAP."}',
            '{"kat" : "It\'s just a silly fad."}',
            '{"kat" : "You think your day was bad?"}',
            '{"kat" : "Well let me tell you trolls about the day I\'ve had."}',
            '{"troll01" : "FROG ON LOG!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-cringing.62a27ad4.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "First we saw a frog"}',
            '{"kat" : "The frog was on a log."}',
            '{"kat" : "Then there was this dog..."}',
            '{"kat" : "...stuck in a bog wearing clogs!"}',
            '{"troll01" : "TROLL LIKE BOG!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-surprised.1c00ae4e.png",
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "Me and Liz took a walk. "}',
            '{"kat" : "First we see a mop."}',
            '{"kat" : "Then there was this top?"}',
            '{"kat" : "Right next to a cop,"}',
            '{"kat" : "with a frog on a log, drinking pop!"}',
            '{"troll01" : "HA! HA! HOO! HOO!"}',
            '{"troll02" : "FROGGY LIKE POP!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-smiling.49647334.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "So quit squishin all the fish and sit and listen!"}',
            '{"kat" : "Cause I\'m the kinda kid that makes the grown ups stop."}',
            '{"kat" : "And yell: Honey! Hide the keys to the donut shop!"}',
            '{"troll01" : "DONUT SHOP!"}',
            '{"kat" : "You trolls like the Donut Shop?"}',
            '{"troll21" : "DONUT SHOP!"}',
          ],
        },
      ],
    },
    swamp: {
      sceneConfig: {
        coordinates: { col: 2, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: ["flag", "cup"],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-silly.57a8c5ca.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "My parents groan a lot."}',
            '{"kat" : "You hear that rumble? That\'s my tummy from the soda pop."}',
            '{"kat" : "Call the doc!"}',
            '{"kat" : "So we can ask if I\'ll explode or not!"}',
            '{"kat" : "I check my phone a lot, but it won\'t unlock!"}',
            '{"kat" : "Yeah, it\'s bark, just wait. I\'ll get it Photoshopped."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-surprised.1c00ae4e.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "I\'ll see you at my birthday when corona stops."}',
            '{"kat" : "And when the party starts rockin..."}',
            '{"kat" : "That\'s just me and Liz squawkin..."}',
            '{"kat" : "Like 2 sea gulls that got locked in-"}',
            '{"kat" : "side a donut shop."}',
            '{"troll01" : "DONUT SHOP!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-unsure.35db04b3.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "They said this was a battle, but you Trolls don\'t bloop."}',
            '{"kat" : "Fellas, I\'m about to tell a troll the stone cold truth."}',
            '{"kat" : "Here\'s some cold stone soup."}',
            '{"kat" : "In an old sewn shoe."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-normal.e1bc2b82.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "And wait, here\'s a bone for your pooch too!"}',
            '{"kat" : "Little kid, you want a cold cone for your loose tooth?"}',
            '{"kat" : "And here\'s some goop for the hole in your boot where your big hairy toes poke through."}',
            '{"kat" : "And you two. You don\'t bloop? You ever heard of youTube?"}',
            '{"troll01" : "We don\'t do it..."}',
            '{"troll02" : "...it\'s too new."}',
          ],
        },
      ],
    },
    hill: {
      sceneConfig: {
        coordinates: { col: 3, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: ["flag", "cup"],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-silly.57a8c5ca.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "Buddy, Bloop Blip,"}',
            '{"kat" : "Flip Flop, won\'t do"}',
            '{"kat" : "Not for Trolls like you."}',
            '{"kat" : "Stop!"}',
            '{"kat" : "Let me drop that Deedle Daddle, Ding Dong. Dilly Dally "}',
            '{"kat" : "Blip Blap Flip."}',
            '{"kat" : "Flap Flop Floop, Flizz."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-smiling.49647334.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "I like you trolls a lot"}',
            '{"kat" : "But I gotta find liz."}',
            '{"troll01" : "Bye Bye!"}',
            '{"troll02" : "See you soon!"}',
            '{"troll01" : "Hope you have a nice trip!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-funny.9fa7fcc4.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"katieKooper01" : "Kat, you won the Rap battle!"}',
            '{"kat" : "What\'s a rap battle?"}',
            '{"kat" : "Um.... Never mind. Let\'s go find Liz!"}',
            '{"troll01" : "Baby troll wants to come with you."}',
            '{"kat" : "Oh dear. Oh no no no no no... come on Matt!"}',
            '{"katieKooper01" : "Cuuu----uuuute! OK!"}',
            '{"kat" : "Think about pretty dresses Katie. Pretty Dresses!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-surprised.1c00ae4e.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "katieKooper01", "troll01", "troll02"],
          },
          dialogs: [
            '{"troll01" : "Here is baby troll\'s diaper pin."}',
            '{"kat" : "Oh no, it\'s sundown and we don\'t have the magical stone of Azkabat."}',
            '{"spoiler" : "It\'s actually part of the diaper pin"}',
          ],
        },
      ],
    },
  },
}
export default testImport001
