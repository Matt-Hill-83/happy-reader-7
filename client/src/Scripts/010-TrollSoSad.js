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
            faces: [
              {
                character: "liz2",
                face: "liz-22.c5ad2fd2.png",
              },
              {
                face: "kat-funny.9fa7fcc4.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a frog."}',
            '{"liz2" : "I see a frog... on a log."}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : "Wow Liz, you have good eyes! "}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                character: "liz2",
                face: "liz-22.c5ad2fd2.png",
              },
              {
                face: "kat-funny.9fa7fcc4.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a pig."}',
            '{"liz2" : "I see a pig... in a wig!"}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : "Liz, could we maybe talk about something else today? "}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-12.d70620b2.png",
                character: "liz2",
              },
              {
                face: "kat-hurt.b1c80ebb.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a goat."}',
            '{"liz2" : "I see a goat... in a boat!"}',
            '{"kat" : "Oh my gosh Kat! Turn six! "}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                character: "liz2",
                face: "liz-11.dc1d78bb.png",
              },
              {
                face: "kat-silly.57a8c5ca.png",
                character: "kat",
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
            faces: [
              { face: "happy", character: "liz2" },
              {
                face: "kat-surprised.1c00ae4e.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "The Troll?"}',
            '{"liz2" : "Do you mean the \'TROLL NEEDS GOLD\' Troll?"}',
            '{"liz2" : "What’s up with that guy?"}',
            '{"kat" : "I know, right? He’s the coolest!"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
              },
              {
                face: "kat-unsure.35db04b3.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Really Liz?"}',
            '{"kat" : "Are you seriously asking me why the Troll runs around yelling: \'TROLL NEED GOLD\'?"}',
            '{"liz2" : "Yes!"}',
            '{"kat" : "You’re not kidding?"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
              },
              {
                face: "kat-unsure.35db04b3.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Yeah, totally..."}',
            '{"liz2" : "...but, I don’t get it."}',
            '{"liz2" : "What’s his deal?"}',
            '{"liz2" : "Why does he always yell: \'TROLL NEED GOLD\'?"}',
            '{"liz2" : "It’s a valid question."}',
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
            faces: [
              {
                face: "liz-21.a5a24e47.png",
                character: "liz2",
              },
              {
                face: "kat-optimistic.ded8aa68.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Well, I think he’s saying it because he needs gold."}',
            '{"liz2" : "Um, yeah. Thanks Albert Einstein."}',
            '{"liz2" : "I get that part."}',
            '{"kat" : "Oh."}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                character: "liz2",
                face: "liz-17.9b753827.png",
              },
              {
                face: "kat-normal.e1bc2b82.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I understand that he is literally asking for gold."}',
            '{"liz2" : "I\'m six. Remember?"}',
            '{"kat" : "Ok."}',
            '{"liz2" : "But why does he need gold?"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                character: "liz2",
                face: "liz-23.5a4f9052.png",
              },
              {
                face: "kat-scared.a3316950.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Elliot says he doesn\'t ~need~ gold."}',
            '{"liz2" : "The troll probably just ~wants~ gold."}',
            '{"kat" : "Wait, is that the kid that says:"}',
            '{"kat" : "You get what you get and you don\'t get upset?"}',
            '{"kat" : "Well, I get upset!"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                character: "liz2",
                face: "liz-23.5a4f9052.png",
              },
              {
                face: "kat-scared.a3316950.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Getting upset is my thing!"}',
            '{"liz2" : "Calm down Kat."}',
            '{"kat" : "Getting upset is my happy place!"}',
            '{"liz2" : "Kat, no one is trying to take away your crazy."}',
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
            faces: [
              { character: "liz2", face: "happy" },
              {
                character: "kat",
                face: "kat-dismayed.b719035a.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "But the Troll... What’s his back story?"}',
            '{"kat" : "Liz!!!! Noooooooooooo!!!!"}',
            '{"liz2" : "Huh?"}',
            '{"kat" : "No! No! No! No! No!"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              {
                character: "kat",
                face: "kat-dismayed.b719035a.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "What?"}',
            '{"kat" : "Undo! Undo!"}',
            '{"liz2" : "Kat, today is not your day to be crazy."}',
            '{"liz2" : "We need to take turns."}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
              },
              {
                face: "kat-cringing.62a27ad4.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, never... ever... ever... "}',
            '{"kat" : "...ask for a creature\'s backstory"}',
            '{"kat" : "That\'s like Rule Number One!"}',
            '{"liz2" : "I thought \'Never stand behind a donkey\' was Rule Number One..."}',
            '{"kat" : "Liiiiiiizzzz!"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-15.a0aad93e.png",
                character: "liz2",
              },
              {
                character: "kat",
                face: "kat-sad.cf8672a7.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "You asked about the troll\'s back story."}',
            '{"liz2" : "So?"}',
            '{"kat" : "Now Matt is going to do some loooooong story about the troll."}',
            '{"kat" : "Remember how distracted he gets?"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
              },
              {
                face: "kat-normal.e1bc2b82.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Wait, what\'s a back story?"}',
            '{"kat" : "It\'s a story that tells where the creature came from."}',
            '{"kat" : "What\'s it\'s name?"}',
            '{"kat" : "Where does it live?"}',
            '{"kat" : "Did it have a happy child hood?"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
              },
              {
                face: "kat-normal.e1bc2b82.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Cool!"}',
            '{"kat" : "No! Not cool!"}',
            '{"kat" : "The opposite of cool!"}',
            '{"liz2" : "Warm?"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-15.a0aad93e.png",
                character: "liz2",
              },
              {
                face: "kat-cringing.62a27ad4.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, we are trying to find the that sparkly dress!"}',
            '{"kat" : "Remember... \'Dress Quest\'?"}',
            '{"kat" : "I don\'t even think that\'s the name of this game anymore."}',
            '{"liz2" : "It\'s not."}',
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
            faces: [
              {
                face: "liz-2.abafcf11.png",
                character: "liz2",
              },
              {
                face: "kat-sad.cf8672a7.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2", "troll01"],
          },
          dialogs: [
            '{"kat" : "My point exactly!!!"}',
            '{"liz2" : "I think it\'s Rapping Troll Cave."}',
            '{"kat" : "Oh no... here it comes..."}',
            '{"liz2" : "Hey look! There\'s the troll."}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
              },
              {
                character: "kat",
                face: "kat-tired.0d2a3c60.png",
              },
            ],
            creatures: ["kat", "liz2", "troll01"],
          },
          dialogs: [
            '{"liz2" : "I didn\'t see him there before."}',
            '{"kat" : "Oh dear..."}',
            '{"liz2" : "I swear he wasn\'t there 3 seconds ago."}',
            '{"liz2" : "Hello Troll."}',
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
              },
              {
                character: "kat",
                face: "kat-tired.0d2a3c60.png",
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
            faces: [
              {
                face: "liz-26.792f5b07.png",
                character: "liz2",
              },
              {
                face: "kat-hurt.b1c80ebb.png",
                character: "kat",
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
