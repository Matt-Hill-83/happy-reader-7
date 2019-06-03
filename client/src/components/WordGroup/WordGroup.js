import React from "react";
import { observer } from "mobx-react";

import Sounds from "../../Sounds/Sounds";

import css from "./WordGroup.module.scss";

class WordGroup extends React.Component {
  state = {
    activeScene: undefined,
    pageNum: 0,
    sound: null
  };

  async componentWillMount() {
    const { story } = this.props;
    this.setState({ story });
  }

  componentWillReceiveProps(newProps) {
    const { story } = newProps;
    this.setState({ story });
  }

  playWordSound = (event, { word }) => {
    word = word.replace(/[.|,|/?]/, "");
    this.setState({ sound: Sounds[word] });
  };

  renderNarrative = () => {
    const { story } = this.state;

    // const renderedNarrative = story[0].map((sentence, sentenceIndex) => {
    const renderedNarrative = story.map((sentence, sentenceIndex) => {
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

  render() {
    return (
      <div className={css.main}>
        <audio src={this.state.sound} autoPlay />
        {this.renderNarrative()}
      </div>
    );
  }
}
export default observer(WordGroup);
