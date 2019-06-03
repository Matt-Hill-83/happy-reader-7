import React from "react";
import { observer } from "mobx-react";
import { Button } from "@blueprintjs/core";
import _get from "lodash.get";

import WordGroup from "../WordGroup/WordGroup.js";

import css from "./WordPage.module.scss";

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

  changeLocation = ({ scene }) => {
    this.setState({ activeParagraphIndex: 0 });
    this.props.updateActiveScene({ activeScene: scene });
  };

  renderButtons = () => {
    const { activeScene } = this.state;

    const options = [activeScene.sceneOptionA, activeScene.sceneOptionB];
    const buttons = options.map((scene, i) => {
      if (!scene) {
        return null;
      }

      const onClick = () => this.changeLocation({ scene });

      return (
        <Button key={i} onClick={onClick} className={css.choiceButton}>
          {scene.location}
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
        {isLastParagraph && (
          <WordGroup story={generatedNarrative.proposition} />
        )}
        {/* <WordGroup story={generatedNarrative.mission} /> */}
        {isLastParagraph && this.renderButtons()}
      </div>
    );
  }
}
export default observer(WordPage);
