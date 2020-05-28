const story300 = {
  title: "300 - Merlinda the Fairy Princess - part 1",
  description: "Dennis the Menace",
  scenes: [
    {
      title: "home",
      sceneConfig: {
        coordinates: { col: 0, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [],
      },
      frames: [
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              {
                face: "kat-optimistic.ded8aa68.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Uugggh.  I’m bored.  I so wish we had some gold!"}`,
            `{"liz2": "Yeah, me too!  And a pony!"}`,
            `{"kat": "No for real.  I need to buy this cell phone case. It's got bling ALL OVER it!"}`,
            `{"liz2": "Oh my Gosh!  Cool!"}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "This second grader named Zoe had one.  It was pink with teeny tiny jewels and sparkles ALL OVER it!"}`,
            `{"liz2": "So cool!  Wait, tell me what bling is again?"}`,
            `{"kat": "Teeny tiny jewels and sparkles."}`,
            `{"liz2": "Oh yeah! I go crazy for that stuff!"}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "The only problem is, it costs like 300 gold."}`,
            `{"liz2": "Wow!  Is that a lot?"}`,
            `{"kat": "Let me put it this way: for a couple of kids like us, that’s like a million gold."}`,
            `{"liz2": "Oh rats!  I’ve never even had 1 gold!"}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Come on, let’s go see what’s happening at the log."}`,
            `{"liz2": "I love the log!"}`,
            `{"kat": "We should get cell phones too."}`,
            `{"liz2": "We should!"}`,
          ],
        },
      ],
    },
    {
      title: "log",
      sceneConfig: {
        coordinates: { col: 1, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "blank" }, { name: "blank" }],
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
                face: "kat-optimistic.ded8aa68.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Hey, by the way Liz, nice shoes.   You totally slayed that outfit!"}`,
            `{"liz2": "I know. Right?  Wait. What does slayed mean again?"}`,
            `{"kat": "Oh right. Well, sometimes, people will say “the brave knight slayed the fierce dragon”.  "}`,
            `{"kat": "You know, in the old days."}`,
            `{"liz2": "Back when there were castles?"}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Exactly, and dragons"}`,
            `{"liz2": "That is so mean!  Those poor dragons!"}`,
            `{"kat": "It's horrible.  But actually, dragons aren’t even real."}`,
            `{"liz2": "It’s still mean."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "I guess so."}`,
            `{"liz2": "Kat, falling asleep to those Jack and Annie books has made you like 10 times smarter."}`,
            `{"kat": "Yeah totally."}`,
            `{"kat": "And by the way, it’s not called Jack and Annie, it’s called Magic Treehouse."}`,
            `{"liz2": "That’s what we called it at my pre-school."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "You’re thinking of Magic Schoolbus."}`,
            `{"liz2": "Um, hello?.  I think I know the difference between Magic Treehouse and Magic Schoolbus!"}`,
            `{"kat": "Ok fine, Fiona Frizzle."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "But anyways, when a person says “you slayed that outfit”, it means you made it look super cool."}`,
            `{"kat": "Like, you rocked it."}`,
            `{"liz2": "Oh I get it!  Say it again!"}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Girl, you slayed that outfit!"}`,
            `{"liz2": "Yeah I did!  Hee Hee Hee!  My cousin Merlinda is always saying that too."}`,
            `{"kat": "You have a cousin?"}`,
            `{"liz2": "Yeah, remember, the one who is a fairy princess?"}`,
          ],
        },
      ],
    },
    {
      title: "slide",
      sceneConfig: {
        coordinates: { col: 2, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: true,
        isStartScene: false,
        items: [{ name: "blank" }, { name: "dennisTheMenace" }],
      },
      frames: [
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Your cousin is a fairy princess?"}`,
            `{"liz2": "Um, yeah, I just said that.  Really Kat, try to keep up."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Your cousin is a fairy princess...  and you never told me?"}`,
            `{"kat": "Isn’t that the kind of thing you might tell someone that you’ve known, for, I don’t know..."}`,
            `{"kat": "...umpteen years?"}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-2.abafcf11.png",
                character: "liz2",
              },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "Kat, I’ve told you literally 8 bazillion times. You just never listen to anything I say."}`,
            `{"kat": "I remember you said your cousin was a fairy princess."}`,
            `{"kat": "I just thought we were just playing pretend."}`,
            `{"liz2": "I have a real life too you know. "}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                face: "liz-2.abafcf11.png",
                character: "liz2",
              },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "Hey, now that I think of it, Merlinda has tons of gold!"}`,
            `{"kat": "Your cousin has gold?"}`,
            `{"liz2": "Yeah, tons of it.  Literally.  "}`,
            `{"liz2": "Boatloads of gold.  Absolute total boatloads of gold."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Do you think she will give us some, so I can buy that cell phone case?"}`,
            `{"liz2": "Ha!  Keep dreaming Liz.  The only thing Merlinda will give us gold for is dresses."}`,
            `{"kat": "Dresses?  You mean... like this purple thing I am wearing?"}`,
            `{"liz2": "Yup.  Merlinda and her friends are nutty for dresses."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              {
                character: "liz2",

                face: "liz-4.481f07e2.png",
              },
              { character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "Oh sister.  Come on, we are going to Fairy Village."}`,
            `{"liz2": "Like right now."}`,
            `{"liz2": "You are going to lose your marbles."}`,
          ],
        },
      ],
    },
  ],
}

export default story300
