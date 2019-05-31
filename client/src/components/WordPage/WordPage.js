import React from "react";
import { observer } from "mobx-react";
import { Button } from "@blueprintjs/core";
import _get from "lodash.get";

import mySentences from "../../Models/sentences.js";
import Sounds from "../../Sounds/Sounds";
import WordGroup from "../WordGroup/WordGroup.js";

import css from "./WordPage.module.scss";

const { generateNarrative, plot } = mySentences;

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

  renderNarrativeOptions = () => {
    const { activeScene } = this.state;

    if (!activeScene) {
      return null;
    }

    const narrative = generateNarrative({
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

  renderMission = () => {
    const { activeScene } = this.state;

    if (!activeScene) {
      return null;
    }

    const narrative = generateNarrative({
      plot,
      activeScene
    });

    const renderedNarrative =
      narrative &&
      narrative.mission &&
      narrative.mission.map((sentence, sentenceIndex) => {
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

    const mainStory = _get(
      this.state,
      "activeScene.generatedNarrative.story",
      []
    );

    const userDecisions = _get(
      this.state,
      "activeScene.generatedNarrative.proposition",
      []
    );

    const mission = _get(
      this.state,
      "activeScene.generatedNarrative.mission",
      []
    );

    return (
      <div className={css.textPage}>
        <audio src={this.state.sound} autoPlay />
        <div className={css.story}>
          <WordGroup story={mainStory} />;
          -------------------------------------------------------------------------------------------------------------
          <WordGroup story={userDecisions} />;
          -------------------------------------------------------------------------------------------------------------
          <WordGroup story={mission} />
          {this.renderButtons({ activeScene })}
        </div>
      </div>
    );
  }
}
export default observer(WordPage);
