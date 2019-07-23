import {
  Button,
  ButtonGroup,
  FormGroup,
  Icon,
  InputGroup,
  Position,
  Checkbox
} from "@blueprintjs/core"

import React, { Component } from "react"

import Frame from "../Frame/Frame"
import { IconNames } from "@blueprintjs/icons"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"

import css from "./FrameBuilder.module.scss"
import Utils from "../../Utils/Utils"

class FrameBuilder extends Component {
  state = {
    frames: [],
    frameSet: "",
    isStartScene: false,
    isEndScene: false
  }

  componentWillMount() {
    const { isStartScene, isEndScene, scene } = this.props
    this.setState({ isStartScene, isEndScene, scene })
  }

  componentWillReceiveProps(newProps) {
    const { isStartScene, isEndScene, scene } = newProps
    this.setState({ isStartScene, isEndScene, scene })
  }

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props

    const frames = [{ test: 5 }]
    onExitFrameBuilder && onExitFrameBuilder({ frames })
  }

  getNewFrame = () => {
    const {
      scene: { creatures = [] }
    } = this.state

    return Utils.getNewFrame({ characters: creatures })
  }

  onAddFrame = async () => {
    const {
      scene,
      scene: { frameSet }
    } = this.state
    const { updateMap } = this.props

    const newFrame = this.getNewFrame()
    frameSet.frames.push(newFrame)

    await updateMap({})
    // this.setState({ scene })
  }

  onChangeFrameSetTitle = async ({ event }) => {
    const frameSet = this.getFrameSet()
    frameSet.title = event.target.value
    this.setState({ frameSet })
  }

  updateFrameSetTitle = async ({ event }) => {
    const frameSet = this.getFrameSet()
    frameSet.title = event.target.value
    this.updateFrameSet({ frameSet })
  }

  updateFrameSet = async ({ newProps = {} }) => {
    const { updateMap } = this.props
    const frameSet = this.state

    updateMap({})
    this.setState({ frameSet })
  }

  deleteFrame = async ({ frameIndex }) => {
    const {
      scene,
      scene: {
        frameSet: { frames }
      }
    } = this.state

    const { updateMap } = this.props
    frames.splice(frameIndex, 1)

    await updateMap({})
    this.setState({ scene })
  }

  onPressDelete = async ({ item }) => {
    if (this._deleting) return
    this._deleting = true
    try {
      await item.delete()
      this._deleting = false
    } catch (err) {
      this._deleting = false
    }
  }

  getFrameSet = () => {
    return (this.state.scene && this.state.scene.frameSet) || {}
  }

  getNewFrameSet = () => {
    return {
      name: "test",
      title: "test",
      frames: [this.getNewFrame()]
    }
  }

  renderFrames = () => {
    const {
      scene,
      scene: { frameSet },
      updateMap
    } = this.props

    if (!frameSet) {
      this.getNewFrameSet()
      updateMap({})
    }

    let frames = frameSet.frames && frameSet.frames.length && frameSet.frames
    if (!frames) {
      frames = [this.getNewFrame()]
      updateMap({})
    }
    if (!frames) return []

    const renderedFrames = frames.map((frame, index) => {
      return (
        <Frame
          frame={frame}
          scene={scene}
          updateFrameSet={this.updateFrameSet}
          deleteFrame={this.deleteFrame}
          frameIndex={index}
          updateMap={updateMap}
        />
      )
    })

    return renderedFrames
  }

  render() {
    const { scene } = this.props

    return (
      <div className={css.main}>
        {scene && this.renderFrames()}

        {scene && (
          <div className={css.buttonContainer}>
            <Button
              className={css.closeButton}
              onClick={this.onExitFrameBuilder}
            >
              <Icon icon={IconNames.CLOSE} />
              Close
            </Button>
            <Button className={css.closeButton} onClick={this.onAddFrame}>
              <Icon icon={IconNames.CLOSE} />
              Add Frame
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default observer(FrameBuilder)
