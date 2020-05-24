const story010 = {
  title: "title",
  scenes: {
    pond: {
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
              {
                character: "liz2",
                characterIndex: 1,
                face: "liz-22.c5ad2fd2.png",
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-funny.9fa7fcc4.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a frog."}',
            '{"liz2" : "I see a frog... on a log."}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : "Wow Liz, you have good eyes! "}',
            '{"liz2" : "I see a pig."}',
            '{"liz2" : "I see a pig... in a wig!"}',
            '{"liz2" : "Tee Hee Hee!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-12.d70620b2.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-hurt.b1c80ebb.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, could we maybe talk about something else today? "}',
            '{"liz2" : "I see a goat."}',
            '{"liz2" : "I see a goat... in a boat!"}',
            '{"kat" : "Oh my gosh Kat! Turn six! "}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-11.dc1d78bb.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-silly.57a8c5ca.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "What\'evs girl... I turned six when you were still riding a trycicle."}',
            '{"kat" : "Ha! Good one! Well, I turned six when you were still wearing Sponge Bob training pants! "}',
            '{"liz2" : "Oh yeah, well your mom still drives you around in a backwards car seat!"}',
            '{"kat" : "Oh snap! That’s a good one!"}',
            '{"kat" : "I’m going to drop that one on the Troll later!"}',
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
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "The Troll?"}',
            '{"liz2" : "Do you mean the \'TROLL NEEDS GOLD\' Troll?"}',
            '{"liz2" : "What’s up with that guy?"}',
            '{"kat" : "I know, right? He’s the coolest!"}',
            '{"liz2" : "Yeah, totally..."}',
            '{"liz2" : "...but what’s his deal?"}',
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
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I don’t get it."}',
            '{"liz2" : "Why does he run around yelling: \'TROLL NEED GOLD\'?"}',
            '{"kat" : "Really Liz?"}',
            '{"kat" : "Are you seriously asking me why the Troll runs around yelling: \'TROLL NEED GOLD\'?"}',
            '{"liz2" : "Yes!"}',
            '{"kat" : "You’re not kidding?"}',
          ],
        },
      ],
    },
    bees: {
      sceneConfig: {
        coordinates: { col: 2, row: 0 },
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
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Why does he always yell: \'TROLL NEED GOLD\'? It’s a valid question."}',
            '{"kat" : "Well, I think he’s saying it because he needs gold."}',
            '{"liz2" : "Um, yeah. Thanks Albert Einstein."}',
            '{"liz2" : "I get that part."}',
            '{"kat" : "Oh."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I understand that he is literally asking for gold."}',
            '{"liz2" : "I\'m six. Remember?"}',
            '{"kat" : "Ok."}',
            '{"liz2" : "But why does he need gold?"}',
            '{"liz2" : "Elliot says he doesn\'t ~need~ gold."}',
            '{"liz2" : "The troll probably just ~wants~ gold."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Wait, is that the kid that says:"}',
            '{"kat" : "You get what you get and you don\'t get upset?"}',
            '{"kat" : "Well, I get upset!"}',
            '{"kat" : "Getting upset is my thing!"}',
            '{"liz2" : "Calm down Kat."}',
            '{"kat" : "It\'s my happy place!"}',
            '{"liz2" : "No one is trying to take away your crazy."}',
            '{"liz2" : "My parents better not hear aout that one..."}',
            '{"liz2" : "But the Troll... What’s his back story?"}',
          ],
        },
      ],
    },
    swamp: {
      sceneConfig: {
        coordinates: { col: 3, row: 0 },
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
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz!!!! Noooooooooooo!!!!"}',
            '{"kat" : "No! No! No! No! No!"}',
            '{"liz2" : "What?"}',
            '{"kat" : "Undo! Undo!"}',
            '{"liz2" : "Kat, today is not your day to be crazy."}',
            '{"liz2" : "We need to take turns."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, never... ever... ever... ask for a creature\'s backstory"}',
            '{"kat" : "That\'s like Rule Number One!"}',
            '{"liz2" : "I thought \'Never stand behind a donkey\' was Rule Number One..."}',
            '{"kat" : "Liiiiiiizzzz!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "You asked about the trolls back story."}',
            '{"liz2" : "So?"}',
            '{"kat" : "Now Matt is going to do some loooooong comic about the troll\'s back story."}',
            '{"kat" : "Remember how distracted he gets?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "What\'s a back story?"}',
            '{"kat" : "It\'s a story that tells where the creature came from."}',
            '{"kat" : "What\'s it\'s name?"}',
            '{"kat" : "Where does it live?"}',
            '{"kat" : "Did it have a happy child hood?"}',
            '{"liz2" : "Cool!"}',
            '{"kat" : "No! Not cool!"}',
            '{"kat" : "The opposite of cool!"}',
            '{"liz2" : "Warm?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, we are trying to find the that sparkly dress!"}',
            '{"kat" : "Remember... \'Dress Quest\'?"}',
            '{"kat" : "I don\'t even think that\'s the name of this game anymore."}',
            '{"liz2" : "It\'s not."}',
            '{"kat" : "My point exactly!!!"}',
            '{"liz2" : "I think it\'s Rapping Troll Cave."}',
          ],
        },
      ],
    },
    log: {
      sceneConfig: {
        coordinates: { col: 4, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: true,
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
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2", "troll01"],
          },
          dialogs: [
            '{"kat" : "Oh no... here it comes..."}',
            '{"liz2" : "Hey look! There\'s the troll."}',
            '{"liz2" : "I didn\'t see him there before."}',
            '{"kat" : "Oh dear..."}',
            '{"liz2" : "I swear he wasn\'t there 3 seconds ago."}',
            '{"liz2" : "Hello Troll."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2", "troll01"],
          },
          dialogs: [
            '{"troll2" : "TROLL.... SOOOOOO..... SAD..."}',
            '{"liz2" : "Oh my goodness! Why...?"}',
            '{"troll2" : "BOO HOO!"}',
            '{"kat" : "Oh brother..."}',
            '{"troll2" : "TODAY.... TROLL BIRTHDAY..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2", "troll01"],
          },
          dialogs: [
            '{"liz2" : "You poor thing!"}',
            '{"troll2" : "TROLL WANT FROOT LOOPS!!!"}',
            '{"liz2" : "Oh my gosh... so sad."}',
            '{"troll2" : "TROLL MOM NOT LIKE SUGAR!!!"}',
            '{"liz2" : "I\'m so sorry..."}',
            '{"kat" : "We gotta go. Bye! Bye!"}',
          ],
        },
      ],
    },
  },
}
export default story010
