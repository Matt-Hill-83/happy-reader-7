import React from "react";
import { observer } from "mobx-react";

import mySentences from "../../Models/sentences.js";
import FlashCards from "../FlashCards/FlashCards";
import IntroPage1 from "../IntroPage1/IntroPage1.js";
import PicturePage from "../PicturePage/PicturePage";
import Utils from "../../Utils/Utils.js";
import WordPage from "../WordPage/WordPage.js";

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";

import css from "./MainStory.module.scss";
import MainHeader from "../MainHeader/MainHeader.js";

const { generateNewFriend, generatePlot, generateYou } = mySentences;

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

  toggleFlashCards = () => {
    this.setState({ showStory: !this.state.showStory });
  };

  render() {
    const page = localStateStore.getPage();

    const { activeScene, pageNum } = this.state;
    const wordPageProps = { activeScene, pageNum };

    if (page === "intro1") {
      return (
        <IntroPage1
          className={css.IntroPage1}
          // params={params}
          onExitIntro={this.onExitIntro}
        />
      );
    }

    return (
      <div className={css.main}>
        <MainHeader toggleFlashCards={this.toggleFlashCards} />

        <div className={css.body}>
          {!this.state.showStory && <FlashCards />}
          {this.state.showStory && (
            <div className={css.storyBox}>
              <PicturePage activeScene={activeScene} pageNum={pageNum} />
              <WordPage
                wordPageProps={wordPageProps}
                updateActiveScene={this.updateActiveScene}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default observer(MainStory);
