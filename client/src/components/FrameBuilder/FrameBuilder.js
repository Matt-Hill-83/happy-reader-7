import { Button, Icon, Position } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";
import Images from "../../images/images";
import WordGroup from "../WordGroup/WordGroup";
import Character from "../Character/Character";
import Head from "../Head/Head";

import css from "./FrameBuilder.module.scss";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore";
import Utils from "../../Utils/Utils";
import Frame from "../Frame/Frame";

class FrameBuilder extends Component {
  state = { frames: [] };

  componentWillMount() {
    this.setInitialFrames();
  }

  setInitialFrames = () => {
    const {
      sceneToEdit: { frames, creatures = [] }
    } = this.props;

    let newFrames = [
      {
        creatures: ["jan"],
        story: ["the girl talks"],
        dialog: [{ character: "default", text: "Oh my gosh I can talk!" }]
      }
    ];

    if (frames) {
      newFrames = frames;
    }

    this.setState({ frames: newFrames });
  };

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props;

    const frames = [{ test: 5 }];
    onExitFrameBuilder && onExitFrameBuilder({ frames });
  };

  render() {
    const {
      sceneToEdit,
      sceneToEdit: { creatures = [] }
    } = this.props;

    const story1 = [`Liz and Kat are girls.`];

    const story2 = [`Now Liz is sad.`];

    const frames = [
      {
        creatures,
        story: story1,
        dialog: [{ character: "default", text: "Oh my gosh I can talk!" }]
      },
      {
        creatures,
        story: story2,
        dialog: [{ character: "default", text: "Oh my gosh I can talk!" }]
      }
    ];

    const renderedFrames = frames.map(frame => {
      return <Frame frame={frame} sceneToEdit={sceneToEdit} />;
    });

    return (
      <div className={css.main}>
        {renderedFrames}
        <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CROSS} />
        </Button>
      </div>
    );
  }
}

export default observer(FrameBuilder);
