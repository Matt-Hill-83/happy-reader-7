import {
  AnchorButton,
  Button,
  ButtonGroup,
  Icon,
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
  state = { frames: [], activeFrameSet: "small" }

  componentWillMount() {
    this.setInitialFrames()
  }

  componentDidMount() {
    this.setInitialFrames()
  }

  setInitialFrames = () => {}

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props

    const frames = [{ test: 5 }]
    onExitFrameBuilder && onExitFrameBuilder({ frames })
  }

  addFrameSet = ({}) => {
    const frameSet = { name: "small 2", frames: this.test }
    frameSetStore.add(frameSet)
  }

  getFrameSets = () => {
    return frameSetStore.docs.map(frameSet => frameSet.data && frameSet.data)
  }

  updateActiveFrameSet = ({ name }) => {
    console.log("name - update", name) // zzz

    this.setState({ activeFrameSet: name })
  }

  renderFrameSets = () => {
    const frameSets = this.getFrameSets()
    const renderedFrames = frameSets.map(frameSet => {
      console.log("toJS(frameSet)", toJS(frameSet)) // zzz

      const name = frameSet.name
      console.log("name-render", name) // zzz

      return (
        <div className={css.itemRow}>
          <Button
            icon="database"
            onClick={() => this.updateActiveFrameSet({ name })}
            className={css.frameSetName}
          >
            {name}
          </Button>
          <Button
            icon="cross"
            onClick={() => this.updateActiveFrameSet({ name })}
            className={css.xxx}
          />
        </div>
      )
    })
    return (
      <div className={css.frameSetsList}>
        {renderedFrames}
        {/* <ButtonGroup>{renderedFrames}</ButtonGroup> */}
      </div>
    )
  }

  onPressDelete = async () => {
    const { todo } = this.props
    if (this._deleting) return
    this._deleting = true
    try {
      await todo.delete()
      this._deleting = false
    } catch (err) {
      this._deleting = false
    }
  }

  getActiveFrameSet = () => {
    const frameSets = this.getFrameSets()

    const activeFrameSet = frameSets.find(
      frameSet => frameSet.name === this.state.activeFrameSet
    )

    if (!activeFrameSet) {
      return null
    }
    return activeFrameSet
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
          { character: "liz", face: "scared" },
          { character: "kat", face: "cry" }
        ],
        dialog: [
          { character: "liz", text: "TEST" },
          { character: "kat", text: "TEST" }
        ]
      }
    ]

    // const frames = [
    //   {
    //     creatures,
    //     story: [`Kat meets Liz.`, `Kat and Liz play.`],
    //     faces: [
    //       { character: "liz", face: "scared" },
    //       { character: "kat", face: "cry" }
    //     ],
    //     dialog: [
    //       { character: "liz", text: "Liz! Liz!!" },
    //       { character: "kat", text: "Hi Kat." },
    //       { character: "liz", text: "Do you want to play?" },
    //       { character: "kat", text: "No, I can not play." },
    //       { character: "kat", text: "I lost Piggy!." },
    //       { character: "liz", text: "You lost Piggy?" },
    //       { character: "liz", text: "Nooooooooo!" }
    //     ]
    //   },
    //   {
    //     creatures,
    //     story: [`Liz lost Piggy.`, `Kat is sad.`],
    //     faces: [
    //       { character: "liz", face: "scared" },
    //       { character: "kat", face: "cry" }
    //     ],
    //     dialog: [
    //       { character: "kat", text: "oh noooo!" },
    //       { character: "liz", text: "I can help!" }
    //     ]
    //   },
    //   {
    //     creatures,
    //     story: [`Liz finds Piggy.`, `Liz is happy!`],
    //     faces: [
    //       { character: "kat", face: "joy" },
    //       { character: "liz", face: "joy" }
    //     ],
    //     dialog: [
    //       { character: "kat", text: "I love you Liz!" },
    //       { character: "liz", text: "I love you Kat!" }
    //     ]
    //   }
    // ]

    console.log("this.state.activeFrameSet", this.state.activeFrameSet) // zzz
    console.log("this.getActiveFrameSet()", this.getActiveFrameSet()) // zzz

    this.test = frames

    const testFrameSet = this.getActiveFrameSet()
    if (!testFrameSet) {
      return null
    }

    // const renderedFrames = frames.map(frame => {
    const renderedFrames = testFrameSet.frames.map(frame => {
      return <Frame frame={frame} sceneToEdit={sceneToEdit} />
    })

    // TODO - let user click on the activeframeset name and make that change the
    // activenameset name in state.
    // TODO - let user click on the activeframeset name and make that change the
    // activenameset name in state.
    // TODO - let user click on the activeframeset name and make that change the
    // activenameset name in state.
    // TODO - let user click on the activeframeset name and make that change the
    // activenameset name in state.

    return (
      <div className={css.main}>
        {this.renderFrameSets()}

        {renderedFrames}

        <div className={css.buttonContainer}>
          <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
            <Icon icon={IconNames.CLOSE} />
            Close
          </Button>
          <Button className={css.addButton} onClick={this.addFrameSet}>
            Add
            <Icon icon={IconNames.SAVED} />
          </Button>
        </div>
      </div>
    )
  }
}

export default observer(FrameBuilder)
