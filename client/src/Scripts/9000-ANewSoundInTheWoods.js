const story1000 = {
  title: "9000 - A Troll Eats Gerald",
  scenes: [
    {
      title: "pin",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "pup01" }, { name: "cup" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Liz!"}',
            '{"liz2" : "Hi Kat!"}',
            '{"kat" : "I see a pup."}',
            '{"liz2" : "I see a pup... and a cup!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-26.792f5b07.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                characterIndex: 0,
                face: "kat-dismayed.b719035a.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a pup... go up!!!"}',
            '{"liz2" : "No pup, no!"}',
            '{"kat" : "Boo Hoo!"}',
            '{"liz2" : "up... up... up..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-14.6eef68da.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-cringing.62a27ad4.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a pup."}',
            '{"liz2" : "I see a pup... and a pin!"}',
            '{"kat" : "Oh no. No pin! No pin!"}',
            '{"liz2" : "Pup go POP!"}',
            '{"kat" : "Boooooo... Hoooooooo....."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "That was not fun."}',
            '{"kat" : "Let\'s go to the bun."}',
            '{"liz2" : "Let\'s run to the bun!"}',
            '{"kat" : "Fun, fun, fun!"}',
            '{"liz2" : "Tee Hee Hee!"}',
          ],
        },
      ],
    },
    {
      title: "bun",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "bun" }, { name: "bun" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-26.792f5b07.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                face: "kat-happy.9e02afab.png",
                characterIndex: 0,
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a bun!"}',
            '{"kat" : "I see a bun... and a bun!"}',
            '{"liz2" : "I see a bun... and a bun..."}',
            '{"liz2" : "...and a... bun?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-23.5a4f9052.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-mad.5c5b3103.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Matt!!!"}',
            '{"liz2" : "Kat? Who are you talking to?"}',
            '{"kat" : "Very sloppy matt, very slopppy!!!"}',
            '{"liz2" : "Who is Matt?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-26.792f5b07.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                face: "kat-loud.0dec3d35.png",
                characterIndex: 0,
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Bun Bun was supposed to be here."}',
            '{"liz2" : "I don\'t know what you are talking about..."}',
            '{"kat" : "Remember Matt...? Bun Bun was going to be here? With the carrot?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-26.792f5b07.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                face: "kat-loud.0dec3d35.png",
                characterIndex: 0,
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We were going to do the \'muncha buncha crunchy carrots joke?"}',
            '{"liz2" : "The \'muncha buncha crunchy... what?!?"}',
            '{"kat" : "We went through this last night Matt!"}',
            '{"liz2" : "Kat, what is going on?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Uggghhh!  I spent like 2 hours on the \'muncna buncha cruncy carrots\' joke!"}',
            '{"kat" : "Oh forget it! Let\'s just keep going."}',
            '{"liz2" : "To where?"}',
            '{"kat" : "How about the bees?"}',
            '{"liz2" : "I love the bees!"}',
          ],
        },
      ],
    },
    {
      title: "elf",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 2, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cave" }, { name: "blank" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                characterIndex: 1,
                character: "liz2",
                face: "liz-22.c5ad2fd2.png",
              },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Elf: DO NOT GO IN THE CAVE!!!!"}',
            '{"liz2" : "I see a dog."}',
            '{"kat" : "Liiiiiizzzzz!!!! That is not a dog!"}',
            '{"liz2" : "I see a dog... and a bog!"}',
            '{"kat" : "Liiiiiizzzzz!!!! That is not a dog!"}',
            '{"liz2" : "Hi doggy doggy!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-4.481f07e2.png",
                characterIndex: 1,
              },
              {
                characterIndex: 0,
                character: "kat",
                face: "kat-dismayed.b719035a.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Elf: DO NOT GO IN THE CAVE!!!!"}',
            '{"liz2" : "Hi doggy woggy!"}',
            '{"kat" : "Liz! We need to get out of here!"}',
          ],
        },
      ],
    },
    {
      title: "cat01",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 1, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cap" }, { name: "bunny" }],
      },
      frames: [
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
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a cat."}',
            '{"liz2" : "I see a cat... oh my gosh Kat, that cat is too cute! Don\'t look!"}',
            '{"kat" : "It\'s too late. I looked."}',
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
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Oh no, me too!"}',
            '{"kat" : "I\'m having a cute attack!"}',
            '{"liz2" : "Aaaahhhh, me too!!!!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-23.5a4f9052.png",
                characterIndex: 1,
              },
              {
                face: "kat-lauging.a0c1bc27.png",
                characterIndex: 0,
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: ['{"kat" : "Too cute!!!"}', '{"liz2" : "Too cute!!!"}'],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                characterIndex: 1,
                character: "liz2",
                face: "liz-27.2ec76ef5.png",
              },
              {
                character: "kat",
                face: "kat-surprised.1c00ae4e.png",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, stop!"}',
            '{"liz2" : "What?"}',
            '{"kat" : "What just happened to your hair?"}',
            '{"liz2" : "Oh I put it in a pony tail!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                characterIndex: 1,
                character: "liz2",
                face: "liz-27.2ec76ef5.png",
              },
              {
                character: "kat",
                face: "kat-surprised.1c00ae4e.png",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "You can do that?"}',
            '{"liz2" : "Ummm.. yeah, since Dress Quest 2.2."}',
            '{"liz2" : "Really Kat, try and keep up."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-27.2ec76ef5.png",
                characterIndex: 1,
              },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Oh sister, I gotta get me a pony tail!"}',
            '{"liz2" : "I got a pony tail!"}',
            '{"liz2" : "I got a pony tail!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-27.2ec76ef5.png",
                characterIndex: 1,
              },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I got a puh-puh-puh-puh..."}',
            '{"liz2" : "I got a puh-puh-puh-puh..."}',
            '{"liz2" : "puh-puh-puh-puh..."}',
            '{"liz2" : "pony tail!"}',
            '{"kat" : "Tots Jelly!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-25.7f6c8c15.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                face: "kat-surprised.1c00ae4e.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "But what\'s up with your ears?"}',
            '{"liz2" : "Huh?"}',
            '{"kat" : "Why are your ears pointy?"}',
            '{"liz2" : "My ears are not pointy!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-3.a05caab0.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                character: "kat",
                face: "kat-scared.a3316950.png",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "OK, calm down crazy pants..."}',
            '{"liz2" : "My ears are not pointy!!!"}',
            '{"kat" : "Ok, your ears are not pointy!"}',
            '{"liz2" : "RRRRRrrrrrr!!!!"}',
          ],
        },
      ],
    },
    {
      title: "cave",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { row: 1, col: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "drake02" }, { name: "gerald01" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Drake, what are you doing in the cave?"}',
            '{"drake" : "Oh hi Kat and Liz! This bright pink boy was just telling me about..."}',
            '{"drake" : "...ummm... I have no idea what he was talking about..."}',
            '{"drake" : "But he can make some really cool airplane sounds..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Oh, we know Gerald."}',
            '{"liz2" : "Gerald, 11:00 at the amusement park, remember? Are we still on?"}',
            '{"Gerald" : "You bet Liz and Kat!"}',
            '{"Gerald" : "Buh-buh-buh... Buh-buh-buh... Rooooooommmmmm...."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I\'m just worried about connecting with Vulcan.... What if I never connect with him?"}',
            '{"kat" : "Um, I don\'t know Drake.  I just don\'t know."}',
            '{"kat" : "To tell you the truth, I never really understand a think you Dragon Masters say..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I understand: Vulcan No!"}',
            '{"liz2" : "It means: Vulcan, stop burning everything."}',
            '{"drake" : "Yeah, most of the time."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "But look drake, we have a real problem..."}',
            '{"drake" : "A math problem?"}',
            '{"kat" : "Ummm sure. We need to find the secret glitch in the back of the cave."}',
            '{"drake" : "I need to write a letter to my mom..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"Gerald" : "I love my Mom!"}',
            '{"liz2" : "What?"}',
            '{"Gerald" : "My mom is cool!"}',
            '{"liz2" : "huh?"}',
            '{"Gerald" : "I like it when she drops me off at school!"}',
            '{"liz2" : "Wow!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Wow Gerald, nice poem!"}',
            '{"Gerald" : "Thanks, I wrote it for the Rap Battle!"}',
            '{"liz2" : "Rap Battle?"}',
            '{"kat" : "But, we did the Rap Battle like 4 shows ago... with KatieKooper..."}',
            '{"Gerald" : "Nope, it\'s today!  And I\'m going to win!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Today? Wait! It must be another glitch!"}',
            '{"Gerald" : "Come with me through this yellow door!"}',
            '{"liz2" : "Wow, I didn\'t see that there!"}',
            '{"kat" : "Um..... ok..."}',
            '{"liz2" : "What could possibly go wrong?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"drake" : "I just wish I knew how to write..."}',
            '{"liz2" : "Drake, just use your best guess spelling!"}',
            '{"drake" : "Thanks Liz! You mean like this:"}',
            '{"drake" : "D3@R M@M, horse lollipop tuna fish.?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Um... yeah, that looks uh... pretty good..."}',
            '{"liz2" : "Maybe just have Bo proof read it before you hit send..."}',
            '{"drake" : "Thanks Liz!"}',
          ],
        },
      ],
    },
    {
      title: "doorYellow",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 5, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: true,
        isStartScene: false,
        items: [{ name: "tiredGirl" }, { name: "barkPhone01" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Tired Girl!"}',
            '{"tiredGirl" : " Hi Liz and Kat!"}',
            '{"kat" : "Hey, cool piece of bark!"}',
            '{"tiredGirl" : " It is not mine. You can have it."}',
            '{"kat" : "Sweet!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Beep Boop. Beep Boop. Beep-Beep Boop."}',
            '{"liz2" : "Kat, what are you doing?"}',
            '{"kat" : "Hold on Liz, I\'m making a call..."}',
            '{"liz2" : "Kat, that is not a phone, it\'s a piece of bark."}',
            '{"kat" : "Hush..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Yes, hi. I\'d like to order 16 pepperoni pizzas."}',
            '{"kat" : "With the vegan pepperoni."}',
            '{"kat" : "You don\'t have vegan pepperoni?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Ummm, Kat, earth to Kat..."}',
            '{"kat" : "Sorry Liz, I think this guy is new."}',
            '{"kat" : "Hmmmm, could you do me a favor and put your manager on the phone?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Otis. Look I need those pizzas with the vegan pepperoni."}',
            '{"kat" : "New guy? Yup, that\'s what I figured."}',
            '{"kat" : "Wait, that was Troll? You mean \'Troll\' Troll?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I thought I recognized that voice!"}',
            '{"kat" : "Are we good now? Great."}',
            '{"kat" : "Oh and tell Troll we will see him at the Rap Battle tonite."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Kat, that is not a phone, it\'s a piece of bark!"}',
            '{"kat" : "I\'m keeping this thing!"}',
          ],
        },
      ],
    },
    {
      title: "pigInAWig",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { row: 2, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "dress01" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a pig..."}',
            '{"kat" : "Me too!"}',
            '{"liz2" : "I see a pig... in a wig!"}',
            '{"kat" : "I see a pig in a wig, and a..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz. Freeze! Do you see that?"}',
            '{"liz2" : "The pig in the wig. Yeah, I just did that line...?"}',
            '{"kat" : "No, not that?"}',
            '{"liz2" : "The other pig?"}',
            '{"kat" : "No! No, no, no, no, NO!"}',
            '{"liz2" : "What do you see?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "A dress? I see a dress!"}',
            '{"liz2" : "Oh yes! I see a dress!"}',
            '{"kat" : "Oh yes! Oh yes!"}',
            '{"liz2" : "A dress! A dress!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "...but... how...?"}',
            '{"kat" : "It must be a glitch!"}',
            '{"liz2" : "A glitch?"}',
            '{"kat" : "Yeah, a glitch in the game!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Wait, you mean like that girl Vanelope is always talking about?"}',
            '{"kat" : "Yes, exactly that! That dress is a glitch!"}',
            '{"liz2" : "Cool!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Wait, what is a glitch?"}',
            '{"kat" : "It\'s where the game is broken. And things are in the wrong place."}',
            '{"liz2" : "...like a bunch of hamburger buns just sitting around?"}',
            '{"kat" : "Exactly!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Come on, we need to find Vanelope!"}',
            '{"liz2" : "Yay!"}',
            '{"liz2" : "Wait, who is Vanelope?"}',
            '{"kat" : "No time to explain!"}',
          ],
        },
      ],
    },
    {
      title: "rori",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { row: 2, col: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "vanellope_little" }, { name: "lucy" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Vanelope! Hi Robot Girl!"}',
            '{"lucy" : "It\'s Space Girl..."}',
            '{"kat" : "Vanelope, what\'s with the new look?"}',
            '{"vanelope" : "Sometimes, you must go slow to go fast..."}',
            '{"kat" : "...right..."}',
            '{"liz2" : "Wow, I never thought of that!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "So anyways Vanelope, we have a big problem!"}',
            '{"lucy" : "A math problem? I could tell you about some dark math problems..."}',
            '{"kat" : "maybe some other time..."}',
            '{"rori" : "Vulcan is the best at math problems!"}',
            '{"kat" : "No, it\'s a dress problem!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"vanelope" : "Wow. Yeah. I was actually a little afraid to bring it up."}',
            '{"kat" : "No, not this dress! A \'dress\' dress!"}',
            '{"lucy" : "A \'dress\' dress!"}',
            '{"kat" : "Yes, a \'dress\' dress!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"vanelope" : "keep talking..."}',
            '{"liz2" : "We saw a dress, and we think it\'s a glitch!"}',
            '{"vanelope" : "Wait, did you put it in your pocket?"}',
            '{"kat" : "Do what now?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"vanelope" : "Did you put the dress in your pocket?"}',
            '{"liz2" : "...in her pocket...?"}',
            '{"kat" : "What are you talking about, did I put the dress in my pocket?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Do I look like I could fit a dress in my pocket?"}',
            '{"kat" : "Oh wait. I forgot."}',
            '{"kat" : "I put it right here in my pocket right next to my pet hippopotamus."}',
            '{"kat" : "Um hello? Did you tie your bun too tight this morning..."}',
          ],
        },
      ],
    },
    {
      title: "bus",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 3, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "vanellope_little" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"vanelope" : "Never mind. We need to get to skunk hollow, and fast!"}',
            '{"liz2" : "Do we still need to go slow to go fast...?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"vanelope" : "We need to hurry! There is no time to explain!"}',
            '{"liz2" : "So ummm... go super slow then...?"}',
            '{"kat" : "If that glitch goes unstable, it could tear a memory hole in the game..."}',
            '{"kat" : "...and swallow up this entire world!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "...wait, make those words make sense..."}',
            '{"kat" : "Um Siri... a little help here?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                characterIndex: 1,
                face: "liz-19.8fc8800f.png",
              },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"siri" : "A memory hole. Would you like to hear \'A Memory Hole\', by the Back Street Bugs?"}',
            '{"liz2" : "Yes! We love the Back Street Bugs!"}',
            '{"kat" : "No! No, no, no, no no!!!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                characterIndex: 1,
                face: "liz-19.8fc8800f.png",
              },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Baby, all my memories..."}',
            '{"kat" : "Siri, explain this memory hole that may swallow up the world!"}',
            '{"liz2" : "My memories, my memories..."}',
          ],
        },
      ],
    },
    {
      title: "bag",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 4, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "vanellope_little" }, { name: "flag" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-19.8fc8800f.png",
                characterIndex: 1,
              },
              {
                character: "kat",
                face: "kat-cringing.62a27ad4.png",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"vanelope" : "...the only way to fix a glitch..."}',
            '{"kat" : "Oh brother, here we go..."}',
            '{"vanelope" : "Is to jump into another glitch!"}',
            '{"liz2" : "I see a bad! I see a bad... and a flag!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-26.792f5b07.png",
                characterIndex: 1,
              },
              {
                face: "kat-dismayed.b719035a.png",
                characterIndex: 0,
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "But where can we find a glitch?"}',
            '{"vanelope" : "We have to go behind the cave!"}',
            '{"kat" : "Ha! Girl, you are crazier than a pigeon in a pile of popcorn!"}',
            '{"liz2" : "The cave? But what about the elf who always says: \'Don\'t go in the cave!\'?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-26.792f5b07.png",
                characterIndex: 1,
              },
              {
                face: "kat-scared.a3316950.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"vanelope" : "There is no time to explain! Come with me if you want to live!"}',
            '{"kat" : "Ummm...okay."}',
            '{"liz2" : "This sounds super safe..."}',
          ],
        },
      ],
    },
  ],
  questConfig: {
    missions: [
      {
        name: "Give Gerald a Dress",
        recipient: { name: "gerald01" },
        item: { name: "dress01" },
        rewards: [{ name: "gold", amount: 7000 }],
      },
      {
        name: "Give Lucy a Pin",
        recipient: { name: "lucy" },
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "pin" },
      },
      {
        rewards: [{ amount: 5, name: "gold" }],
        item: { name: "cup" },
        recipient: { name: "rori" },
        name: "Give the cup to the Queen of Crazy",
      },
    ],
    pockets: [{ name: "apple" }],
  },
}
export default story1000
