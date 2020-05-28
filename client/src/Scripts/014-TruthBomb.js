const story014 = {
  title: "014 - Truth Bomb",
  scenes: [
    {
      title: "cave",
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
                face: "liz-1.93dddc98.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-optimistic.ded8aa68.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            '{"liz2" : "So Kat, did you ask your mom if Rori can stay at your house?"}',
            '{"liz2" : "To hide Vulcan from the evil Wizard Maldred?"}',
            '{"kat" : "Oh yeah! She said that would be fine. It’s all good."}',
            '{"liz2" : "Oh great. I was super worried."}',
            '{"kat" : "She also asked if she can come over and clean your brother’s hamster cage."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-15.a0aad93e.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-funny.9fa7fcc4.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            '{"liz2" : "Really? Wait. What? Are you messing with me Kat? Did your mom really say it was ok?"}',
            '{"kat" : "Of course I didn’t ask her!"}',
            '{"liz2" : "What?"}',
            '{"kat" : "Why would I ask her when I know when she would say no?"}',
            '{"kat" : "That’s right out of Chapter 1 of the Kid Book."}',
            '{"liz2" : "Oh, right. I need to re-read that."}',
          ],
        },
      ],
    },
    {
      title: "bog",
      sceneConfig: {
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
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
                face: "kat-normal.e1bc2b82.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, I’m going to drop a truth bomb on you."}',
            '{"kat" : "Listen up."}',
            '{"liz2" : "Um ok."}',
            '{"kat" : "Sometimes it’s better to ask for forgiveness..."}',
            '{"kat" : "...than for permission."}',
            '{"liz2" : "Huh? What are you talking about?"}',
            '{"kat" : "It takes a second."}',
            '{"kat" : "Just let it sink in..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-normal.e1bc2b82.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "...it’s better to ask for forgiveness..."}',
            '{"liz2" : "...than to ask for permission..."}',
            '{"kat" : "mmm hmmm..."}',
            '{"liz2" : "Oh... wow... I think I get it..."}',
            '{"liz2" : "...just wow...."}',
          ],
        },
      ],
    },
    {
      title: "log",
      sceneConfig: {
        coordinates: { col: 2, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: true,
        isStartScene: false,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-17.9b753827.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-optimistic.ded8aa68.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Crazy right?"}',
            '{"kat" : "My cousin told me that one."}',
            '{"kat" : "Once you\'ve thought it, you can\'t unthink it."}',
            '{"liz2" : "...like that nun joke..."}',
            '{"liz2" : "Kat, you are bad..."}',
            '{"liz2" : "Bad to the bone..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-17.9b753827.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-sad.cf8672a7.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "My mom says it’s part of my process."}',
            '{"liz2" : "I think you have bees in your bonnet."}',
          ],
        },
      ],
    },
  ],
}
export default story014
