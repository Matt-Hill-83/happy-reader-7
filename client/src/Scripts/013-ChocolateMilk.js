const story013 = {
  title: "No Title",
  worldConfig: {
    characters: ["kat", "katieKooper01"],
    items: ["flag", "cup"],
  },

  status: "not imported",
  scenes: {
    cave: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "katieKooper01", "troll01", "troll02"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          frameConfig: {
            items: [],
          },
          dialogs: [
            `{"katieKooper01" ++++++++++++++++++++++++++++++++"}`,
            `{"kat" : "++++++++++++++++++++++++++++++++"}`,
          ],
        },
        {
          dialogs: [
            `{"troll01" : "LOOK GIRLS!"}`,
            `{"troll02" : "GIRLS TAKE DIAMOND?"}`,
          ],
        },
      ],
    },
    bog: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "katieKooper01"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          dialogs: [
            `{"kat" : "++++++++++++++++++++++++++++++++"}`,
            `{"troll01" : "FROG ON LOG!"}`,
          ],
        },
        {
          dialogs: [
            `{"kat" : "++++++++++++++++++++++++++++++++"}`,
            `{"troll01" : "TROLL LIKE BOG!"}`,
          ],
        },
      ],
    },
  },
}

export default story013
