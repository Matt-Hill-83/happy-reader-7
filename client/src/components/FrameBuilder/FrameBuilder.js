import { Button, Icon, Position } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React, { Component } from "react"
import Images from "../../images/images"

import css from "./FrameBuilder.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import Utils from "../../Utils/Utils"
import Frame from "../Frame/Frame"

class FrameBuilder extends Component {
  state = { frames: [] }

  componentWillMount() {
    this.setInitialFrames()
  }

  setInitialFrames = () => {
    const {
      sceneToEdit: { frames, creatures = [] }
    } = this.props

    let newFrames = [
      {
        creatures: ["liz"],
        story: ["the girl talks"],
        dialog: [{ character: "default", text: "Oh my gosh I can talk!" }]
      }
    ]

    if (frames) {
      newFrames = frames
    }

    this.setState({ frames: newFrames })
  }

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props

    const frames = [{ test: 5 }]
    onExitFrameBuilder && onExitFrameBuilder({ frames })
  }

  render() {
    const {
      sceneToEdit,
      sceneToEdit: { creatures = [] }
    } = this.props

    const frames = [
      {
        creatures,
        story: [`Kat meets Liz.`, `Kat and Liz play.`],
        faces: [
          { character: "liz", face: "ok" },
          { character: "kat", face: "ok" }
        ],
        dialog: [
          { character: "liz", text: "We can play!" },
          { character: "kat", text: "OK" }
        ]
      },
      {
        creatures,
        story: [`Liz lost Piggy.`, `Kat is sad.`],
        faces: [
          { character: "liz", face: "scared" },
          { character: "kat", face: "cry" }
        ],
        dialog: [
          { character: "kat", text: "oh noooo!" },
          { character: "liz", text: "I can help!" }
        ]
      },
      {
        creatures,
        story: [`Liz finds Piggy.`, `Liz is happy!`],
        faces: [
          { character: "kat", face: "joy" },
          { character: "liz", face: "joy" }
        ],
        dialog: [
          { character: "kat", text: "I love you Liz!" },
          { character: "liz", text: "I love you Kat!" }
        ]
      }
    ]

    const renderedFrames = frames.map(frame => {
      return <Frame frame={frame} sceneToEdit={sceneToEdit} />
    })

    return (
      <div className={css.main}>
        {renderedFrames}
        <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CROSS} />
        </Button>
      </div>
    )
  }
}

export default observer(FrameBuilder)
