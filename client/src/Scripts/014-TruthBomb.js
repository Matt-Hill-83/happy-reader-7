const story014 = {
  title: "Truth Bpmb",
  scenes: {
    cave: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2", "troll01", "troll02"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          frameConfig: {
            items: [],
          },
          dialogs: [
            `{"liz2" : "So Kat, did you ask your mom if Rori can stay at your house?"}`,
            `{"liz2" : "To hide Vulcan from the evil Wizard Maldred?"}`,
            `{"kat" : "Oh yeah!  She said that would be fine.  It’s all good."}`,
            `{"liz2" : "Oh great.  I was super worried."}`,
            `{"kat" : "She also asked if she can come over and clean your brother’s hamster cage."}`,
          ],
        },
        {
          dialogs: [
            `{"liz2" : "Really?  Wait. What?  Are you messing with me Kat?  Did your mom really say it was ok?"}`,
            `{"kat" : "Of course I didn’t ask her!"}`,
            `{"liz2" : "What?"}`,
            `{"kat" : "Why would I ask her when I know when she would say no?"}`,
            `{"kat" : "That’s right out of Chapter 1 of the Kid Book."}`,
            `{"liz2" : "Oh, right.  I need to re-read that."}`,
          ],
        },
      ],
    },
    bog: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          dialogs: [
            `{"kat" : "Liz, I’m going to drop a truth bomb on you."}`,
            `{"kat" : "Listen up."}`,
            `{"liz2" : "Um ok."}`,
            `{"kat" : "Sometimes it’s better to ask for forgiveness..."}`,
            `{"kat" : "...than for permission."}`,
            `{"liz2" : "Huh?  What are you talking about?"}`,
            `{"kat" : "It takes a second."}`,
            `{"kat" : "Just let it sink in..."}`,
          ],
        },
        {
          dialogs: [
            `{"liz2" : "...it’s better to ask for forgiveness..."}`,
            `{"liz2" : "...than to ask for permission..."}`,
            `{"kat" : "mmm hmmm..."}`,
            `{"liz2" : "Oh... wow...  I think I get it..."}`,
            `{"liz2" : "...just wow...."}`,
          ],
        },
      ],
    },
    log: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          dialogs: [
            `{"kat" : "Crazy right?"}`,
            `{"kat" : "My cousin told me that one."}`,
            `{"kat" : "Once you've thought it, you can't unthink it."}`,
            `{"liz2" : "...like that nun joke..."}`,
            `{"liz2" : "Kat, you are bad..."}`,
            `{"liz2" : "Bad to the bone..."}`,
          ],
        },
        {
          dialogs: [
            `{"kat" : "My mom says it’s part of my process."}`,
            `{"liz2" : "I think you have bees in your bonnet."}`,
          ],
        },
      ],
    },
  },
}

export default story014
