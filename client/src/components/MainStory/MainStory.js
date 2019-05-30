import React from "react";
import { observer } from "mobx-react";
import { IconNames } from "@blueprintjs/icons";
import { Button, Icon, Position, Tooltip } from "@blueprintjs/core";

import myWords from "../../Models/words.js";
import mySentences from "../../Models/sentences.js";

import FlashCards from "../FlashCards/FlashCards";
import PicturePage from "../PicturePage/PicturePage";
import Utils from "../../Utils/Utils.js";
import WordPage from "../WordPage/WordPage.js";

import css from "./MainStory.module.scss";

// import { UserConfigStore } from "../../Stores/UserConfigStore.js";
// import { words2 } from "../../Stores/WordStore.js";

const { plot } = mySentences;
const { wordTypes } = myWords;

class MainStory extends React.Component {
  state = {
    activeTab: wordTypes.name,
    // showStory: false,
    showStory: true,
    activeScene: undefined,
    pageNum: 0,
    sound: null
  };

  async componentWillMount() {
    const activeScene = plot.activeScene;

    this.updateActiveScene({ activeScene });
  }

  updateActiveScene = ({ activeScene }) => {
    // TODO
    // TODO
    // TODO
    // TODO
    // When scene is updated, generate the following and pack them into the active scene:
    // sceneOptions
    // narrative
    // random narrative components

    activeScene.isUsed = true;

    const scenes = plot.scenes;
    const scenesList = Object.values(scenes) || [];

    Utils.unreserveItems({ items: scenesList });

    activeScene.sceneOptionA = Utils.reserveRandomItem({ items: scenesList });
    activeScene.sceneOptionB = Utils.reserveRandomItem({ items: scenesList });
    activeScene.narrative = Utils.getRandomItem({ items: plot.narratives });

    activeScene = Utils.generateActiveScene({ activeScene });
    console.log("activeScene", activeScene); // zzz

    this.setState({ activeScene, pageNum: this.state.pageNum + 1 });
  };

  toggleFlashCards = () => {
    this.setState({ showStory: !this.state.showStory });
  };

  renderHeader = () => {
    const goodAtList = [
      "math",
      "reading",
      "art",
      "sports",
      "school",
      "jumping"
    ];

    const goodAt = Utils.getRandomItem({ items: goodAtList });

    const toggleButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.toggleFlashCards}
      >
        Flash Cards
      </Button>
    );

    return (
      <span className={`${css.header} ${css.banner}`}>
        {`Girls are good at...    ${goodAt}!`}
        {toggleButton}

        <Tooltip content="Toggle Word Reader" position={Position.RIGHT}>
          <Icon color={"purple"} icon={IconNames.VOLUME_UP} />
        </Tooltip>
      </span>
    );
  };

  render() {
    const { activeScene, pageNum } = this.state;
    const wordPageProps = { activeScene, pageNum };

    return (
      <div className={css.main}>
        {/* todo - fix this */}
        {/* todo - fix this */}
        {/* todo - fix this */}
        {/* todo - fix this */}
        {/* <span>{UserConfigStore.docs[0]}</span> */}
        {this.renderHeader()}
        <audio src={this.state.sound} autoPlay />

        <div className={css.body}>
          {!this.state.showStory && <FlashCards />}
          {this.state.showStory && (
            <div className={css.storyBox}>
              <WordPage
                wordPageProps={wordPageProps}
                updateActiveScene={this.updateActiveScene}
              />
              <PicturePage activeScene={activeScene} pageNum={pageNum} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default observer(MainStory);
