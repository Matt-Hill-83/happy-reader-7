import React from "react";
import { observer } from "mobx-react";
import { Button } from "@blueprintjs/core";
import _get from "lodash.get";

import WordGroup from "../WordGroup/WordGroup.js";

import css from "./WordPage.module.scss";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";

class WordPage extends React.Component {
  state = {
    activeScene: undefined,
    activeParagraphIndex: 0
  };

  async componentWillMount() {
    this.setState({ ...this.props.wordPageProps });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.wordPageProps });
  }

  changeLocation = ({ sceneName }) => {
    this.setState({ activeParagraphIndex: 0 });
    const plot = localStateStore.getPlot();
    const { scenes = {} } = plot;

    console.log("scenes", scenes); // zzz

    const newScene = scenes[sceneName];
    console.log("newScene", newScene); // zzz

    this.props.updateActiveScene({ activeScene: newScene });
  };

  renderButtons = () => {
    const { activeScene } = this.state;

    const neighborNames = activeScene.neighbors;
    // const neighborNames = activeScene.neighborObjects;
    console.log("neighborNames", neighborNames); // zzz

    // const neighborNames = [activeScene.sceneOptionA, activeScene.sceneOptionB];
    const buttons = neighborNames.map((scene, i) => {
      if (!scene) {
        return null;
      }

      const onClick = () => this.changeLocation({ sceneName: scene });

      return (
        <Button key={i} onClick={onClick} className={css.choiceButton}>
          {scene}
        </Button>
      );
    });
    return <div className={css.decisionButtonRow}>{buttons}</div>;
  };

  onClickNext = () => {
    this.setState({
      activeParagraphIndex: this.state.activeParagraphIndex + 1
    });
  };

  render() {
    const generatedNarrative = _get(
      this.state,
      "activeScene.generatedNarrative"
    );

    if (!generatedNarrative) {
      return null;
    }

    const paragraphs = generatedNarrative.story;
    const activeParagraph = paragraphs[this.state.activeParagraphIndex];

    const isLastParagraph =
      this.state.activeParagraphIndex === generatedNarrative.story.length - 1;

    return (
      <div className={css.textPage}>
        {/* pass in adder for setting tab order */}
        <WordGroup story={activeParagraph} />
        {!isLastParagraph && (
          <Button onClick={this.onClickNext} className={css.nextButton}>
            NEXT
          </Button>
        )}
        {/* {isLastParagraph && (
          <WordGroup story={generatedNarrative.proposition} />
        )} */}
        {/* <WordGroup story={generatedNarrative.mission} /> */}
        {isLastParagraph && this.renderButtons()}
      </div>
    );
  }
}
export default observer(WordPage);
