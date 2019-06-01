import React from "react";
import { observer } from "mobx-react";
import { Button } from "@blueprintjs/core";
import _get from "lodash.get";

import WordGroup from "../WordGroup/WordGroup.js";

import css from "./WordPage.module.scss";

class WordPage extends React.Component {
  state = {
    activeScene: undefined,
    pageNum: 0
  };

  async componentWillMount() {
    this.setState({ ...this.props.wordPageProps });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.wordPageProps });
  }

  changeLocation = ({ scene }) => {
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

  render() {
    const generatedNarrative = _get(
      this.state,
      "activeScene.generatedNarrative"
    );

    if (!generatedNarrative) {
      return null;
    }

    return (
      <div className={css.textPage}>
        <div className={css.story}>
          {/* pass in adder for setting tab order */}
          <WordGroup story={generatedNarrative.story} />;
          -------------------------------------------------------------------------------------------------------------
          <WordGroup story={generatedNarrative.proposition} />;
          -------------------------------------------------------------------------------------------------------------
          <WordGroup story={generatedNarrative.mission} />
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}
export default observer(WordPage);
