const testImport001 = {
  title: "test import",
  scenes: {
    cave: {
      sceneConfig: {
        items: ["hat", "flag"],
        creatures: ["kat", "liz2", "troll01", "troll02"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                characterIndex: 1,
                face: "liz-13.a5596c86.png",
                // face: "happy",
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-pigtails.22bff545.png",
              },
            ],
          },
          dialogs: [
            `{"kat" : "I am kat"}`,
            `{"liz2" : "Kat, you are a bad frog!!!"}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                characterIndex: 1,
                face: "liz-13.a5596c86.png",
                // face: "happy",
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-pigtails.22bff545.png",
              },
            ],
          },
          dialogs: [
            `{"kat" : "I am kat"}`,
            `{"liz2" : "Kat, you are a bad frog!!!"}`,
          ],
        },
      ],
    },
  },
}

export default testImport001
