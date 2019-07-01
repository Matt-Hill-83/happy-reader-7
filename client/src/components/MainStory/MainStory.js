import React from "react";
import { observer } from "mobx-react";

import {
  Dialog,
  Popover,
  Position,
  PopoverInteractionKind
} from "@blueprintjs/core";
import mySentences from "../../Models/sentences.js";
import FlashCards from "../FlashCards/FlashCards";
import IntroPage1 from "../IntroPage1/IntroPage1.js";
import PicturePage from "../PicturePage/PicturePage";
import Utils from "../../Utils/Utils.js";

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
// import MainHeader from "../MainHeader/MainHeader.js";
import { Button } from "@blueprintjs/core";

import css from "./MainStory.module.scss";
import { maps } from "../../Stores/InitStores.js";

const { generatePlot, generateYou } = mySentences;

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
    localStateStore.setsmallMap(false);
    if (this.state.showIntro) {
      localStateStore.setPage("intro1");
    } else {
      localStateStore.setPage("intro2");
      this.onExitIntro({ you: { name: "Luna", creature: "kat" } });
    }
  }

  onExitIntro = ({ you }) => {
    generateYou({ you });
    generatePlot();
    const plot = localStateStore.getPlot();
    this.updateActiveScene({ activeScene: plot.activeScene });
  };

  updateActiveScene = ({ activeScene }) => {
    // console.log("activeScene", activeScene); // zzz

    // TODO - import locationsMap from db
    // TODO - import locationsMap from db
    // TODO - import locationsMap from db
    // TODO - import locationsMap from db

    // const savedMaps = maps.docs.map(map => toJS(map.data.grid));
    // const testGrid = JSON.parse(savedMaps[0]);
    // console.log("testGrid - main", testGrid); // zzz

    const locationsMap = localStateStore.getActiveLocationsMap();

    const activeSceneName = activeScene.name;
    const endSceneName = locationsMap.endScene && locationsMap.endScene.name;

    if (activeSceneName === endSceneName) {
      this.setState({ showYouWin: true });
    }

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
    const locationsMap = localStateStore.getActiveLocationsMap();

    const activeSceneName = activeScene.name;

    const neighbors = [];
    const neighborsArray = [];

    // create a map of all the locations for future use
    locationsMap.grid.forEach((row, rowIndex) => {
      row.forEach((location, locationIndex) => {
        location = location || {};

        neighborsArray.push({
          name: location.name,
          position: { x: rowIndex, y: locationIndex }
        });
      });
    });

    const currentLocation = neighborsArray.find(item => {
      return item.name === activeSceneName;
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
    const smallMap = localStateStore.getsmallMap();
    localStateStore.setsmallMap(!smallMap);
  };

  toggleWorldBuilder = () => {
    const plot = localStateStore.getPlot();

    const showWorldBuilder = localStateStore.getShowWorldBuilder();
    const newShowWorldBuilder = !showWorldBuilder;

    localStateStore.setShowWorldBuilder(newShowWorldBuilder);
    if (newShowWorldBuilder === false) {
      this.updateActiveScene({ activeScene: plot.activeScene });
    }
  };

  closeYouWin = () => {
    console.log("close you win"); // zzz

    this.setState({ showYouWin: false });
    localStateStore.incrementActiveLocationsMapIndex();
    const locationsMap = localStateStore.getActiveLocationsMap();
    console.log("locationsMap", locationsMap); // zzz

    const { startScene } = locationsMap;
    console.log("startScene", startScene); // zzz

    this.updateActiveScene({ activeScene: startScene });
  };

  render() {
    const { className } = this.props;
    const { activeScene, pageNum } = this.state;

    if (!activeScene) {
      return null;
    }

    const page = localStateStore.getPage();

    const wordPageProps = { activeScene, pageNum };

    if (page === "intro1") {
      return (
        <IntroPage1 className={css.IntroPage1} onExitIntro={this.onExitIntro} />
      );
    }

    const changeCharacterButton = (
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

    const toggleWorldBuilderButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.toggleWorldBuilder}
      >
        <span> Toggle World Builder </span>
      </Button>
    );

    return (
      <div className={`${css.main} ${className}`}>
        {/* <MainHeader toggleFlashCards={this.toggleFlashCards} /> */}

        <div className={css.floatingButtons}>
          <div className={css.settingButtons}>
            {changeCharacterButton}
            {toggleMapButton}
            {toggleWorldBuilderButton}
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
        <Dialog
          isOpen={this.state.showYouWin}
          content={"test2"}
          isCloseButtonShown={true}
        >
          You Win!!!
          <Button onClick={this.closeYouWin}>GO</Button>
        </Dialog>
      </div>
    );
  }
}

export default observer(MainStory);
