import React from "react";
import { observer } from "mobx-react";
import { Button } from "@blueprintjs/core";

import mySentences from "../../Models/sentences.js";
import Sounds from "../../Sounds/Sounds";

import css from "./WordPage.module.scss";

const { getNarrative, plot } = mySentences;

class WordPage extends React.Component {
  state = {
    activeScene: undefined,
    pageNum: 0,
    sound: null
  };

  async componentWillMount() {
    this.setState({ ...this.props.wordPageProps });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.wordPageProps });
  }

  playWordSound = (event, { word }) => {
    word = word.replace(/[.|,|/?]/, "");
    this.setState({ sound: Sounds[word] });
  };

  renderNarrative = () => {
    const { activeScene } = this.state;

    if (!activeScene) {
      return null;
    }

    const narrative = getNarrative({
      plot,
      activeScene
    });

    const renderedNarrative =
      narrative &&
      narrative.story &&
      narrative.story.map((sentence, sentenceIndex) => {
        const parsedSentence = sentence.split(/\s/);

        const renderedSentence = parsedSentence.map((word, wordIndex) => {
          const tabIndex = 100 * sentenceIndex + (wordIndex + 1);

          // TODO - fix autofocus
          const autofocus = tabIndex === 1 ? { autoFocus: true } : { test: 3 };

          return (
            <span
              key={wordIndex}
              {...autofocus}
              autoFocus
              tabIndex={tabIndex}
              className={css.sentenceWord}
              onClick={event => this.playWordSound(event, { word })}
              onFocus={event => this.playWordSound(event, { word })}
            >
              {word}
            </span>
          );
        });

        return (
          <span key={sentenceIndex} className={css.sentence}>
            {renderedSentence}
          </span>
        );
      });

    return <div className={css.narrative}>{renderedNarrative}</div>;
  };

  renderNarrativeOptions = () => {
    const { activeScene } = this.state;

    if (!activeScene) {
      return null;
    }

    const narrative = getNarrative({
      plot,
      activeScene
    });

    const renderedNarrative =
      narrative &&
      narrative.proposition &&
      narrative.proposition.map((sentence, sentenceIndex) => {
        const parsedSentence = sentence.split(/\s/);

        const renderedSentence = parsedSentence.map((word, wordIndex) => {
          const tabIndex = 100 * sentenceIndex + (wordIndex + 1);

          // TODO - fix autofocus
          const autofocus = tabIndex === 1 ? { autoFocus: true } : { test: 3 };

          return (
            <span
              key={wordIndex}
              {...autofocus}
              autoFocus
              tabIndex={tabIndex}
              className={css.sentenceWord}
              onClick={event => this.playWordSound(event, { word })}
              onFocus={event => this.playWordSound(event, { word })}
            >
              {word}
            </span>
          );
        });

        return (
          <span key={sentenceIndex} className={css.sentence}>
            {renderedSentence}
          </span>
        );
      });

    return <div className={css.narrative}>{renderedNarrative}</div>;
  };

  changeLocation = ({ scene }) => {
    this.props.updateActiveScene({ activeScene: scene });
  };

  renderButtons = () => {
    const { activeScene } = this.state;

    if (!activeScene) {
      return null;
    }

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

  render() {
    const { activeScene } = this.state;

    return (
      <div className={css.textPage}>
        <audio src={this.state.sound} autoPlay />
        <div className={css.story}>
          {this.renderNarrative()}
          ---------------------------------------------------------------------------
          {this.renderNarrativeOptions()}
          {this.renderButtons({ activeScene })}
        </div>
      </div>
    );
  }
}
export default observer(WordPage);
