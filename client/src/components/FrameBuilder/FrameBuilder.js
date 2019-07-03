import { Button, Icon, Position } from "@blueprintjs/core"
import React, { Component } from "react"

import Frame from "../Frame/Frame"
import { IconNames } from "@blueprintjs/icons"
import Images from "../../images/images"
import Utils from "../../Utils/Utils"
import css from "./FrameBuilder.module.scss"
import { frameSetStore } from "../../Stores/FrameSetStore"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import { observer } from "mobx-react"
import { toJS } from "mobx"

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

  saveFrameSet = ({}) => {
    // saveFrameSet = ({ frameSet = { name: 5 } }) => {

    const frameSet = { name: "test", frames: this.test }
    frameSetStore.add(frameSet)
  }

  getFrameSets = () => {
    const frameSets = frameSetStore.docs.map(frameSet =>
      toJS(frameSet.data && frameSet.data.name)
    )
    console.log("frameSets", toJS(frameSets)) //
    return frameSets
  }

  renderFrameSets = () => {
    const frameSets = this.getFrameSets()
    return <div>test{frameSets}</div>
  }

  render() {
    const frameSets = this.getFrameSets()

    const {
      sceneToEdit,
      sceneToEdit: { creatures = [] }
    } = this.props

    const frames = [
      {
        creatures,
        story: [`Kat meets Liz.`, `Kat and Liz play.`],
        faces: [
          { character: "liz", face: "scared" },
          { character: "kat", face: "cry" }
        ],
        dialog: [
          { character: "liz", text: "Liz! Liz!!" },
          { character: "kat", text: "Hi Kat." },
          { character: "liz", text: "Do you want to play?" },
          { character: "kat", text: "No, I can not play." },
          { character: "kat", text: "I lost Piggy!." },
          { character: "liz", text: "You lost Piggy?" },
          { character: "liz", text: "Nooooooooo!" }
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

    this.test = frames
    const renderedFrames = frames.map(frame => {
      return <Frame frame={frame} sceneToEdit={sceneToEdit} />
    })

    return (
      <div className={css.main}>
        {this.renderFrameSets()}
        {/* {renderedFrames} */}
        <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CLOSE} />
        </Button>
        <Button className={css.addButton} onClick={this.saveFrameSet}>
          <Icon icon={IconNames.ADD} />
          Save
        </Button>
      </div>
    )
  }
}

export default observer(FrameBuilder)
