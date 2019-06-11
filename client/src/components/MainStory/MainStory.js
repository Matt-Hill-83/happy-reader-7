import React from "react";
import { observer } from "mobx-react";

import mySentences from "../../Models/sentences.js";
import FlashCards from "../FlashCards/FlashCards";
import IntroPage1 from "../IntroPage1/IntroPage1.js";
import PicturePage from "../PicturePage/PicturePage";
import Utils from "../../Utils/Utils.js";
import WordPage from "../WordPage/WordPage.js";

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
import MainHeader from "../MainHeader/MainHeader.js";

import css from "./MainStory.module.scss";

const {
  locationsMap,
  generateNewFriend,
  generatePlot,
  generateYou
} = mySentences;

// const { locationsMap } = sentences;

class MainStory extends React.Component {
  state = {
    // showStory: false,
    showStory: true,
    activeScene: undefined,
    pageNum: 0,
    pages: {}
  };

  async componentWillMount() {
    localStateStore.setPage("intro2");
    this.onExitIntro({ you: { name: "Luna", creature: "girl" } });
    // localStateStore.setPage("intro1");
  }

  onExitIntro = ({ you }) => {
    generateYou({ you });
    generatePlot();
    const plot = localStateStore.getPlot();
    this.updateActiveScene({ activeScene: plot.activeScene });
  };

  updateActiveScene = ({ activeScene }) => {
    const plot = localStateStore.getPlot();

    console.log("activeScene", activeScene); // zzz
    console.log("activeScene.neighbors", activeScene.neighbors); // zzz

    // TODO: figure out the neighbors here and use them to create the butttons
    // TODO: figure out the neighbors here and use them to create the butttons
    // TODO: figure out the neighbors here and use them to create the butttons
    // TODO: figure out the neighbors here and use them to create the butttons
    // TODO: figure out the neighbors here and use them to create the butttons

    const { you, scenes = [], narrativeGenerators } = plot;
    console.log("scenes", scenes); // zzz

    this.getNeighbors({ activeScene });

    const narrativeGenerator =
      activeScene.builtInNarrativeGenerator ||
      Utils.getRandomItem({ items: narrativeGenerators });

    Utils.unreserveItems({ items: scenes });

    const newFriend = generateNewFriend();
    activeScene.newFriend = newFriend;

    activeScene.sceneOptionA = Utils.reserveRandomItem({ items: scenes });
    activeScene.sceneOptionB = Utils.reserveRandomItem({ items: scenes });
    activeScene.generatedNarrative = narrativeGenerator({ you, activeScene });
    activeScene.isUsed = true;

    console.log("activeScene.sceneOptionA", activeScene.sceneOptionA); // zzz

    this.setState({ activeScene, pageNum: this.state.pageNum + 1 });
  };

  getNeighbors = ({ activeScene }) => {
    const activeLocation = activeScene.location;

    const neighbors = [];
    const neighborsArray = [];

    // create a map of all the locations for future use
    locationsMap.forEach((row, rowIndex) => {
      row.forEach((location, locationIndex) => {
        neighborsArray.push({
          name: location.name,
          position: { x: rowIndex, y: locationIndex }
        });
      });
    });

    const currentLocation = neighborsArray.find(item => {
      return item.name === activeLocation;
    });

    const currentPosition = currentLocation.position;

    neighbors.push({ x: currentPosition.x - 1, y: currentPosition.y });
    neighbors.push({ x: currentPosition.x + 1, y: currentPosition.y });
    neighbors.push({ x: currentPosition.x, y: currentPosition.y + 1 });
    neighbors.push({ x: currentPosition.x, y: currentPosition.y - 1 });

    const neighborNames = [];

    neighbors.forEach(neighbor => {
      neighborsArray.forEach(item => {
        if (item.position.x === neighbor.x && item.position.y === neighbor.y) {
          neighborNames.push(item.name);
        }
      });
    });

    // TODO: make these the options on the buttons.
    // TODO: make these the options on the buttons.
    // TODO: make these the options on the buttons.
    // TODO: make these the options on the buttons.
    // TODO: make these the options on the buttons.
    console.log("neighborNames", neighborNames); // zzz

    activeScene.neighbors = neighborNames;

    return neighborNames;
  };
  toggleFlashCards = () => {
    this.setState({ showStory: !this.state.showStory });
  };

  render() {
    const page = localStateStore.getPage();

    const { activeScene, pageNum } = this.state;
    const wordPageProps = { activeScene, pageNum };

    if (page === "intro1") {
      return (
        <IntroPage1 className={css.IntroPage1} onExitIntro={this.onExitIntro} />
      );
    }

    return (
      <div className={css.main}>
        {/* <MainHeader toggleFlashCards={this.toggleFlashCards} /> */}

        <div className={css.body}>
          {!this.state.showStory && <FlashCards />}
          {this.state.showStory && (
            <div className={css.storyBox}>
              <PicturePage
                wordPageProps={wordPageProps}
                updateActiveScene={this.updateActiveScene}
                activeScene={activeScene}
                pageNum={pageNum}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default observer(MainStory);
