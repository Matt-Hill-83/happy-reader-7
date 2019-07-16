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

import MiniLocation from "../MiniLocation/MiniLocation"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"

import css from "./FrameBuilder.module.scss"

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
    // const {
    //   scene: { creatures = [] }
    // } = this.props

    const friendNames = creatures.map(creature => creature.type)
    const you = localStateStore.getYou()
    const yourName = you.name

    const allCharacters = [yourName, ...friendNames]

    const creatureName0 = allCharacters[0] || "creature0"
    const creatureName1 = allCharacters[1] || "creature 1"

    const newFrame = {
      creatures: allCharacters,
      story: [
        `${creatureName0} meets ${creatureName1}.`,
        `${creatureName0} and ${creatureName1} play.`
      ],
      faces: [
        { character: creatureName1, characterIndex: 1, face: "scared" },
        { character: creatureName0, characterIndex: 0, face: "cry" }
      ],
      dialog: [
        {
          character: creatureName1,
          characterIndex: 1,
          text: `${creatureName1}! ${creatureName1}!!`
        },
        {
          character: creatureName0,
          characterIndex: 0,
          text: `Hi ${creatureName0}.`
        },
        { character: creatureName1, characterIndex: 1, text: "Can you play?" },
        {
          character: creatureName0,
          characterIndex: 0,
          text: "No, I can not play."
        },
        { character: creatureName0, characterIndex: 0, text: "I lost Piggy!." },
        {
          character: creatureName1,
          characterIndex: 1,
          text: "You lost Piggy?"
        },
        { character: creatureName1, characterIndex: 1, text: "Nooooooooo!" }
      ]
    }

    return newFrame
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
    this.setState({ scene })
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

    console.log("frameSet", frameSet) // zzz
    Object.assign(frameSet, toJS(newProps))

    updateMap({})
    this.setState({ frameSet })
  }
  // updateFrameSet = async ({ frameSet }) => {
  //   this.setState({ frameSet })
  //   const { updateMap } = this.props

  //   updateMap && updateMap({ newProps: { frameSet: toJS(frameSet) } })
  // }

  renderActiveFrameSetName = () => {
    const frameSet = this.getFrameSet()
    const title = frameSet && frameSet.data && frameSet.title

    return (
      <div className={css.frameSetNameContainer}>
        <FormGroup label="Title" labelFor="text-input">
          <InputGroup
            value={title}
            id="text-input"
            placeholder="Placeholder text"
            onChange={event =>
              this.onChangeFrameSetTitle({ frameSet: frameSet, event })
            }
            onBlur={event => this.updateFrameSetTitle({ event })}
          />
        </FormGroup>
      </div>
    )
  }

  renderNarrativeEditor = () => {
    const frameSet = this.getFrameSet()
    const title = frameSet && frameSet.data && frameSet.title

    return (
      <div className={css.frameSetNameContainer}>
        <FormGroup label="Title" labelFor="text-input">
          <InputGroup
            value={title}
            id="text-input"
            placeholder="Placeholder text"
            onChange={event =>
              this.onChangeFrameSetTitle({ frameSet: frameSet, event })
            }
            onBlur={event => this.updateFrameSetTitle({ event })}
          />
        </FormGroup>
      </div>
    )
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

  checkIsStartScene = () => {
    const { scene, world } = this.props
    const { isStartScene } = this.state

    scene.test = "zzzzzzzz"
    // TODO
    // TODO
    // TODO
    // TODO
    // TODO
    // fix this logic
    world.data.startScene = !isStartScene
    this.setState({ isStartScene: !isStartScene })
    // should disable any other scenes with this checked
    return
  }

  renderLocation = ({ item }) => {
    const { scene, id, name = "" } = item

    const { updateMap } = this.props

    const content = (
      <div className={css.locationGridContainer}>
        <MiniLocation
          id={id}
          key={name}
          location={scene}
          isEditMode={true}
          updateMap={updateMap}
        />
        <Button
          className={css.scenePropsButton}
          onClick={() => this.editFrame({ scene })}
        >
          <Icon icon={IconNames.SETTINGS} />
        </Button>
      </div>
    )

    return content
  }

  getNewFrameSet = () => {
    return {
      name: "test",
      title: "test",
      frames: [this.getNewFrame()]
    }
  }

  renderFrames = () => {
    const { scene, updateMap } = this.props

    const frameSet = (scene && scene.frameSet) || this.getNewFrameSet()

    const frames =
      frameSet.frames && frameSet.frames.length
        ? frameSet.frames
        : [this.getNewFrame()]

    const renderedFrames = frames.map((frame, index) => {
      return (
        <Frame
          frame={frame}
          scene={scene}
          updateFrameSet={this.updateFrameSet}
          deleteFrame={this.deleteFrame}
          frameIndex={index}
          // updateMap={updateMap}
        />
      )
    })

    return renderedFrames
  }

  render() {
    const { scene } = this.props

    return (
      <div className={css.main}>
        {/* {this.renderLocation()} */}
        {scene && this.renderActiveFrameSetName()}

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
        {scene && <div className={css.buttonContainer} />}
      </div>
    )
  }
}

export default observer(FrameBuilder)
