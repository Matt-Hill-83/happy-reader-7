const story200 = {
  title: "200 - Dennis the Menace",
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
            creatures: ["kat", "liz2", "dog01"],
          },
          dialogs: [
            '{"dog01" : "Yo, what’s up Kat? "}',
            '{"kat" : "Nothin’ dog. Just chillin with my girl Liz."}',
            '{"dog01" : "Sweet! Keep it Fresh Kat! I gotta bounce. I’ll catch you on the flip!"}',
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
            '{"kat" : "Laters!"}',
            '{"liz2" : "Bye Bye Pete! Hee Hee!"}',
            '{"liz2" : "Wow Kat, where did you learn all those cool things to say?"}',
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
            '{"kat" : "Cool right? It’s called slang."}',
            '{"liz2" : "Wow! I want to learn!"}',
            '{"liz2" : "I used to ride the bus with this second grader who knew like a million slangs. Like literally."}',
            '{"liz2" : "Cooooool!!!!"}',
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
            '{"kat" : " He’d say Kat, I like you, but sometimes, think you are a couple sandwiches short of a picnic?"}',
            '{"liz2" : "Cooooool! What does that mean?"}',
            '{"liz2" : "I dunno, but I say it all the time now."}',
            '{"liz2" : "Wait, you know a second grader? "}',
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
            '{"kat" : "Yeah, this kid Dennis. He’s hilarious."}',
            '{"kat" : "This one time he made me laugh so hard chocolate milk sprayed out of my nose. "}',
            '{"liz2" : "Wait.. Hold your horses. Back up!"}',
            '{"liz2" : "What?"}',
            '{"liz2" : "Are you talking about Dennis, as in, Dennis the Menace?"}',
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
            '{"kat" : "Yeah, that’s him."}',
            '{"liz2" : "You know Dennis the Menace?"}',
            '{"liz2" : "The kid who runs up slides the wrong way and has a slingshot hanging out of his back pocket?"}',
            '{"kat" : "Yeah, totally. He’s super chill. We should go hang out with him."}',
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
            '{"liz2" : "He is like the coolest kid in the Magic Forest!"}',
            '{"kat" : "For sure."}',
            '{"liz2" : "Zombie said his parents grounded him until he turns 13!"}',
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
            '{"kat" : "Wait, What does grounded mean?"}',
            '{"liz2" : "Oh sorry. Grounded is when you get in super big trouble and your parents don’t let you out of your room for a week!"}',
            '{"kat" : "Oh that. Yeah, he’s definitely grounded."}',
            '{"kat" : "But he sneaks out his bedroom window during nap and plays at the playground."}',
            '{"liz2" : "Wow!"}',
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
            '{"kat" : "Come on, let’s go see if he is at the slide."}',
            '{"liz2" : "Fine with me."}',
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
            creatures: ["kat", "liz2", "dennisTheMenace"],
          },
          dialogs: [
            '{"kat" : "Hi Dennis!"}',
            '{"dennisTheMenace" : "Oh hi Kat! What are you up to?"}',
            '{"liz2" : "Just some trouble."}',
            '{"dennisTheMenace" : "Count me in. But keep an eye out for Mr. Wilson."}',
            '{"dennisTheMenace" : "He\'s not going to be too happy when he finds out what happened to his new shoes!"}',
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
            creatures: ["kat", "liz2", "dennisTheMenace"],
          },
          dialogs: [
            '{"kat" : "What happened to his new shoes?"}',
            '{"dennisTheMenace" : "You don\'t even want to know. Where\'s the fun at?"}',
            '{"kat" : "Well, there\'s this new girl named Rori. She needs a place to hide her dragon."}',
            '{"dennisTheMenace" : "Well now you are talking my language."}',
            '{"dennisTheMenace" : "Have I ever told you about Mr. Wilson\'s shed?"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2", "dennisTheMenace"],
          },
          dialogs: [
            '{"kat" : "Keep talking..."}',
            '{"dennisTheMenace" : "It\'s dustier than a book of manners in a schoolyard, but it might to the trick."}',
            '{"kat" : "We will pass that along to Rori."}',
            '{"liz2" : "Dennis, do you have a piece of paper and a pin? Rori said to pin a note to a tree."}',
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
            creatures: ["kat", "liz2", "dennisTheMenace"],
          },
          dialogs: [
            '{"dennisTheMenace" : "I have a ball of lint and this thumb tack, but I\'m saving it to make a surprise for Mr. Wilson."}',
            '{"liz2" : "Lucky him!"}',
            '{"dennisTheMenace" : "Yeah, he must have been born under a 4 leaf clover."}',
            '{"liz2" : "See you later Dennis the Menace! Hee Hee Hee!"}',
          ],
        },
      ],
    },
  ],
}

export default story200
