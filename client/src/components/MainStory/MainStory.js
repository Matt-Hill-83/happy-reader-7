import React from "react";
import { observer } from "mobx-react";
import { IconNames } from "@blueprintjs/icons";
import { Button, Icon, Position, Tooltip } from "@blueprintjs/core";

import myWords from "../../Models/words.js";
import mySentences from "../../Models/sentences.js";

import FlashCards from "../FlashCards/FlashCards";
import IntroPage1 from "../IntroPage1/IntroPage1.js";
import PicturePage from "../PicturePage/PicturePage";
import Utils from "../../Utils/Utils.js";
import WordPage from "../WordPage/WordPage.js";
import Images from "../../images/images.js";

import css from "./MainStory.module.scss";

// import { UserConfigStore } from "../../Stores/UserConfigStore.js";

const { plot, generateNewFriend } = mySentences;
const { wordTypes } = myWords;

class MainStory extends React.Component {
  state = {
    activeTab: wordTypes.name,
    // showStory: false,
    showStory: true,
    activeScene: undefined,
    pageNum: 0
  };

  async componentWillMount() {
    this.updateActiveScene({ activeScene: plot.activeScene });
  }

  updateActiveScene = ({ activeScene }) => {
    const { you, scenes = [], narrativeGenerators } = plot;
    const narrative =
      activeScene.builtInNarrativeGenerator ||
      Utils.getRandomItem({ items: narrativeGenerators });

    Utils.unreserveItems({ items: scenes });

    // TODO
    // TODO
    // TODO
    // generate the new friend here and pass it to the scene generator,
    // and attach it to the plot
    const newFriend = generateNewFriend();
    activeScene.newFriend = newFriend;

    activeScene.sceneOptionA = Utils.reserveRandomItem({ items: scenes });
    activeScene.sceneOptionB = Utils.reserveRandomItem({ items: scenes });
    activeScene.generatedNarrative = narrative({ you, activeScene });
    activeScene.isUsed = true;

    this.setState({ activeScene, pageNum: this.state.pageNum + 1 });
  };

  render() {
    const showIntro = true;
    // const shoWIntro = false

    const { activeScene, pageNum } = this.state;
    const wordPageProps = { activeScene, pageNum };

    const params = { cat: 5 };

    if (showIntro) {
      return <IntroPage1 className={css.IntroPage1} params={params} />;
    }

    return (
      <div className={css.main}>
        {/* todo - fix this */}
        {/* <span>{UserConfigStore.docs[0]}</span> */}
        {this.renderHeader()}

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

  // turn into a Component, it is just in the way.
  renderHeader = () => {
    const goodAtList = [
      "math",
      "reading",
      "jokes",
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

  toggleFlashCards = () => {
    this.setState({ showStory: !this.state.showStory });
  };
}

export default observer(MainStory);
