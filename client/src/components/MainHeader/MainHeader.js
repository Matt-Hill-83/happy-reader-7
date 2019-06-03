import React from "react";
import { observer } from "mobx-react";
import { IconNames } from "@blueprintjs/icons";
import { Button, Icon, Position, Tooltip } from "@blueprintjs/core";

import Utils from "../../Utils/Utils.js";

import css from "./MainHeader.module.scss";

class MainHeader extends React.Component {
  state = {};

  async componentWillMount() {}

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
        onClick={this.props.toggleFlashCards}
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

  render() {
    return <div className={css.main}>{this.renderHeader()}</div>;
  }
}

export default observer(MainHeader);
