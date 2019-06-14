import React from "react";
import { observer } from "mobx-react";
import MediaQuery from "react-responsive";

import mySentences from "../../Models/sentences.js";
import FlashCards from "../FlashCards/FlashCards";
import IntroPage1 from "../IntroPage1/IntroPage1.js";
import PicturePage from "../PicturePage/PicturePage";
import Utils from "../../Utils/Utils.js";

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
// import MainHeader from "../MainHeader/MainHeader.js";
import { Button } from "@blueprintjs/core";

import css from "./MainStory.module.scss";

const { locationsMap, generatePlot, generateYou } = mySentences;

class MainStory extends React.Component {
  state = {
    // showStory: false,
    showStory: true,
    activeScene: undefined,
    pageNum: 0,
    pages: {},
    showIntro: false
  };

  async componentWillMount() {
    if (this.state.showIntro) {
      localStateStore.setPage("intro1");
    } else {
      localStateStore.setPage("intro2");
      this.onExitIntro({ you: { name: "Luna", creature: "girl" } });
    }
  }

  onExitIntro = ({ you }) => {
    generateYou({ you });
    generatePlot();
    const plot = localStateStore.getPlot();
    this.updateActiveScene({ activeScene: plot.activeScene });
  };

  updateActiveScene = ({ activeScene }) => {
    const plot = localStateStore.getPlot();
    const { you, narrativeGenerators } = plot;

    activeScene.neighborNames = this.getNeighbors({ activeScene });

    const narrativeGenerator =
      activeScene.builtInNarrativeGenerator ||
      Utils.getRandomItem({ items: narrativeGenerators });

    activeScene.generatedNarrative = narrativeGenerator({ you, activeScene });

    this.setState({ activeScene, pageNum: this.state.pageNum + 1 });
  };

  getNeighbors = ({ activeScene }) => {
    const activeLocation = activeScene.name;

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

    return neighborNames;
  };

  toggleFlashCards = () => {
    this.setState({ showStory: !this.state.showStory });
  };

  changeCharacter = () => {
    localStateStore.setPage("intro1");
  };

  toggleMap = () => {
    const showMap = localStateStore.getShowMap();
    localStateStore.setShowMap(!showMap);
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

    const toggleButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.changeCharacter}
      >
        <span> Change Character </span>
      </Button>
    );

    const toggleMapButton = (
      <Button tabIndex={0} className={css.newStoryBtn} onClick={this.toggleMap}>
        <span> Toggle Map </span>
      </Button>
    );

    return (
      <div className={css.main}>
        {/* <MainHeader toggleFlashCards={this.toggleFlashCards} /> */}

        <div className={css.floatingButtons}>
          <div>
            <div>Device Test!</div>
            <MediaQuery minDeviceWidth={1224}>
              <div>You are a desktop or laptop</div>
              <MediaQuery minDeviceWidth={1824}>
                <div>You also have a huge screen</div>
              </MediaQuery>
              <MediaQuery maxWidth={1224}>
                <div>You are sized like a tablet or mobile phone though</div>
              </MediaQuery>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
              <div>You are a tablet or mobile phone</div>
            </MediaQuery>
            <MediaQuery orientation="portrait">
              <div>You are portrait</div>
            </MediaQuery>
            <MediaQuery orientation="landscape">
              <div>You are landscape</div>
            </MediaQuery>
            <MediaQuery minResolution="2dppx">
              <div>You are retina</div>
            </MediaQuery>
          </div>
          <div className={css.settingButtons}>
            {toggleButton}
            {toggleMapButton}
          </div>
        </div>
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
