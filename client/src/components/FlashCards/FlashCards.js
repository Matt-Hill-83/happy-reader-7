import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Button, Icon, Tab, Tabs } from "@blueprintjs/core";
import { observer } from "mobx-react";

import myWords from "../../Models/words.js";
import Utils from "../../Utils/Utils.js";

import css from "./FlashCards.module.css";

import { words2 } from "../../Stores/WordStore";
const { wordTypes, wordFamilies } = myWords;
const words = words2.docs;

class FlashCards extends React.Component {
  state = {
    words: []
  };

  async componentDidMount() {
    this.setState({ words });
  }

  favoriteWord = async ({ word }) => {
    await word.update({
      isFavorite: !word.data.isFavorite
    });
  };

  renderFlashCards = ({ words }) => {
    const renderedFlashCards = words.map((word, i) => {
      const iconColor = word.data.isFavorite ? "purple" : "pink";

      return (
        <div key={i} className={css.wordToolsContainer}>
          <Button
            className={css.favoriteButton}
            onClick={() => this.favoriteWord({ word })}
          >
            <Icon color={iconColor} icon={IconNames.STAR} />
          </Button>

          <div className={css.wordContainer}>
            <span className={css.word}>{word.data.name}</span>
            {/* <span className={css.word}>{word.data.type}</span> */}
          </div>
        </div>
      );
    });

    return renderedFlashCards;
  };

  render() {
    const words = words2.docs;

    if (!words) {
      return null;
    }

    const renderedPanels = Object.keys(wordTypes).map((type, i) => {
      const wordsNoFavorites = Utils.removeFavorites(
        Utils.getWordsByType({ words, type })
      );

      return (
        <Tab
          key={i}
          id={type}
          title={type}
          panel={this.renderFlashCards({ words: wordsNoFavorites })}
        />
      );
    });

    const renderedPanels2 = Object.keys(wordFamilies).map((family, i) => {
      const wordsNoFavorites = Utils.removeFavorites(
        Utils.getWordsByFamily({ words, family })
      );

      return (
        <Tab
          key={i}
          id={`${family}-family`}
          title={`${family}-family`}
          panel={this.renderFlashCards({ words: wordsNoFavorites })}
        />
      );
    });

    return (
      <div className={css.main}>
        <div className={css.left}>
          <span className={css.header}>Flash Cards</span>
          <Tabs className={css.tabs} id="TabsExample">
            {renderedPanels}
            {renderedPanels2}
          </Tabs>
        </div>
        <div className={css.right}>
          <span className={css.header}>
            {`Words I Can Read --- ${
              Utils.getWordsByFavorite({ words }).length
            }`}
          </span>

          {this.renderFlashCards({
            words: Utils.getWordsByFavorite({ words })
          })}
        </div>
      </div>
    );
  }
}
export default (FlashCards = observer(FlashCards));
