import {
  AnchorButton,
  Button,
  ButtonGroup,
  FormGroup,
  Icon,
  InputGroup,
  Position
} from "@blueprintjs/core"
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
  state = { frames: [], activeFrameSet: "" }

  componentWillMount() {
    console.log("frameSetStore.docs", frameSetStore.docs) // zzz
  }

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props

    const frames = [{ test: 5 }]
    onExitFrameBuilder && onExitFrameBuilder({ frames })
  }

  addFrameSet = ({}) => {
    const frameSet = this.newFrameSet
    frameSetStore.add(frameSet)
  }

  getFrameSets = () => {
    return frameSetStore.docs
  }

  setActiveFrameSet = ({ name }) => {
    this.setState({ activeFrameSet: name })
  }

  onChangeFrameSetTitle = async ({ frameSet, event }) => {
    const newTitle = event.target.value
    frameSet.data.title = newTitle
  }

  updateFrameSetTitle = async ({ frameSet, event }) => {
    console.log("frameSet", toJS(frameSet)) // zzz

    await frameSet.update({
      title: event.target.value
    })
  }

  updateFrameSetFrame = async ({ frame, event }) => {
    const frameSet = this.getActiveFrameSet()
    console.log("activeFrameSet --- before update", toJS(frameSet)) // zzz

    const frames = frameSet.data.frames
    console.log("toJS(frames)", toJS(frames)) // zzz

    await frameSet.update({
      frames: frames
    })
  }

  renderActiveFrameSetName = () => {
    const activeFrameSet = this.getActiveFrameSet()
    const title =
      activeFrameSet && activeFrameSet.data && activeFrameSet.data.title

    return (
      <div className={css.frameSetNameContainer}>
        <FormGroup label="Title" labelFor="text-input">
          <InputGroup
            value={title}
            id="text-input"
            placeholder="Placeholder text"
            onChange={event =>
              this.onChangeFrameSetTitle({ frameSet: activeFrameSet, event })
            }
            onBlur={event =>
              this.updateFrameSetTitle({ frameSet: activeFrameSet, event })
            }
          />
        </FormGroup>
      </div>
    )
  }

  renderFrameSetPicker = () => {
    const frameSets = this.getFrameSets()
    const renderedFrames = frameSets.map(frameSet => {
      const { name, title } = frameSet.data

      return (
        <div className={css.itemRow}>
          <Button
            icon="database"
            onClick={() => this.setActiveFrameSet({ name })}
            className={css.frameSetName}
          >
            name - {name}
            title - {title}
          </Button>
          <Button
            icon="cross"
            onClick={() => this.onPressDelete({ item: frameSet })}
            className={css.xxx}
          />
        </div>
      )
    })
    return (
      <div className={css.frameSetsList}>
        <Button className={css.addButton} onClick={this.addFrameSet}>
          + New
          {/* <Icon icon={IconNames.SAVED} /> */}
        </Button>
        {renderedFrames}
      </div>
    )
  }

  onPressDelete = async ({ item }) => {
    if (this._deleting) return
    this._deleting = true
    try {
      await item.delete()
      this._deleting = false
    } catch (err) {
      console.log("err", err) // zzz

      this._deleting = false
    }
  }

  getActiveFrameSet = () => {
    const frameSets = this.getFrameSets()

    let activeFrameSet = null

    console.log("this.state.activeFrameSet", this.state.activeFrameSet) // zzz

    // TODO - if there is no frameset selected, choose the first one
    if (this.state.activeFrameSet) {
      console.log("yes active frameset") // zzz
      activeFrameSet = frameSets.find(
        frameSet => frameSet.data.name === this.state.activeFrameSet
      )
    } else {
      if (!frameSets[0] || !frameSets[0].data) {
        return null
      }
      console.log("no active frameset") // zzz
      activeFrameSet = frameSets[0]
      const activeFrameSetName = activeFrameSet.data.name

      this.setActiveFrameSet({ name: activeFrameSetName })
    }

    if (!activeFrameSet) {
      return null
    }
    console.log("---------------------------activeFrameSet", activeFrameSet) // zzz
    return activeFrameSet
  }

  render() {
    const {
      sceneToEdit,
      sceneToEdit: { creatures = [] }
    } = this.props

    // const frames = [
    //   {
    //     creatures,
    //     story: [`Kat meets Liz.`, `Kat and Liz play.`],
    //     faces: [
    //       { character: "liz", face: "scared" },
    //       { character: "kat", face: "cry" }
    //     ],
    //     dialog: [
    //       { character: "liz", text: "TEST" },
    //       { character: "kat", text: "TEST" }
    //     ]
    //   }
    // ]

    console.log("creaturesn-nfrbuilder", creatures) // zzz

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

    this.newFrames = frames
    this.newFrameSet = { name: "new Name", title: "new title", frames }

    const activeFrameSet = this.getActiveFrameSet()
    // if (!activeFrameSet) {
    //   return null
    // }

    const renderedFrames =
      activeFrameSet &&
      activeFrameSet.data &&
      activeFrameSet.data.frames &&
      activeFrameSet.data.frames.map(frame => {
        console.log("frame", frame) // zzz
        return (
          <Frame
            frame={frame}
            sceneToEdit={sceneToEdit}
            updateFrameSetFrame={this.updateFrameSetFrame}
          />
        )
      })

    return (
      <div className={css.main}>
        {this.renderFrameSetPicker()}
        {this.renderActiveFrameSetName()}

        {renderedFrames}

        <div className={css.buttonContainer}>
          <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
            <Icon icon={IconNames.CLOSE} />
            Close
          </Button>
        </div>
      </div>
    )
  }
}

export default observer(FrameBuilder)
