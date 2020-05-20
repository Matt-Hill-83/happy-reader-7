const template = {
  title: "No Title",
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
            `{"kat" : "++++++++++++++++++++++++++++++++"}`,
            `{"liz2" ++++++++++++++++++++++++++++++++"}`,
          ],
        },
        {
          // frameConfig: {},
          dialogs: [
            `{"kat" : "++++++++++++++++++++++++++++++++"}`,
            `{"liz2" ++++++++++++++++++++++++++++++++"}`,
          ],
        },
      ],
    },
    bog: {
      sceneConfig: {
        // items: ["flag", "cup"],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          // frameConfig: {},
          dialogs: [
            `{"kat" : "++++++++++++++++++++++++++++++++"}`,
            `{"liz2" ++++++++++++++++++++++++++++++++"}`,
          ],
        },
        {
          // frameConfig: {},
          dialogs: [
            `{"kat" : "++++++++++++++++++++++++++++++++"}`,
            `{"liz2" ++++++++++++++++++++++++++++++++"}`,
          ],
        },
      ],
    },
  },
}

export default template
