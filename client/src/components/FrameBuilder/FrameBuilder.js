import {
  AnchorButton,
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
import { frameSetStore } from "../../Stores/FrameSetStore"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import MiniLocation from "../MiniLocation/MiniLocation"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"

import css from "./FrameBuilder.module.scss"

class FrameBuilder extends Component {
  state = {
    frames: [],
    activeFrameSet: "",
    isStartScene: false,
    isEndScene: false
  }

  componentWillMount() {
    const { isStartScene, isEndScene, scene } = this.props
    console.log("scene- fb - will mount", toJS(scene)) // zzz

    this.setState({ isStartScene, isEndScene, scene })
  }

  componentWillReceiveProps(newProps) {
    console.log("scene- fb - new props", toJS(scene)) // zzz
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
    } = this.props

    const friendNames = creatures.map(creature => creature.type)
    const you = localStateStore.getYou()
    const yourName = you.name

    const allCharacters = [yourName, ...friendNames]

    const creatureName0 = allCharacters[0].type
    // const creatureName1 = creatures[1].type

    const newFrame = {
      creatures: allCharacters,
      story: [
        `${creatureName0} meets ${"creatureName1"}.`,
        `${creatureName0} and ${"creatureName1"} play.`
      ],
      faces: [
        { character: "creatureName1", face: "scared" },
        { character: creatureName0, face: "cry" }
      ],
      dialog: [
        {
          character: "creatureName1",
          text: `${"creatureName1"}! ${"creatureName1"}!!`
        },
        { character: creatureName0, text: `Hi ${creatureName0}.` },
        { character: "creatureName1", text: "Can you play?" },
        { character: creatureName0, text: "No, I can not play." },
        { character: creatureName0, text: "I lost Piggy!." },
        { character: "creatureName1", text: "You lost Piggy?" },
        { character: "creatureName1", text: "Nooooooooo!" }
      ]
    }

    return newFrame
  }

  onAddFrame = () => {
    const activeFrameSet = this.getFrameSet()

    const newFrame = this.getNewFrame()
    activeFrameSet.frames.push(newFrame)
    this.updateFrameSet()
  }

  // TODO - frameset should be attached to World
  addFrameSet = ({}) => {
    const frameSet = this.newFrameSet

    frameSetStore.add(frameSet)
  }

  setActiveFrameSet = ({ name }) => {
    this.setState({ activeFrameSet: name })
  }

  onChangeFrameSetTitle = async ({ frameSet, event }) => {
    const newTitle = event.target.value
    frameSet.titlele = newTitle
  }

  updateFrameSetTitle = async ({ frameSet, event }) => {
    await frameSet.update({
      title: event.target.value
    })
  }

  updateFrameSet = async () => {
    const frameSet = this.getFrameSet()

    const { updateWorld } = this.props
    updateWorld && updateWorld({ newProps: frameSet })

    // await frameSet.update({
    //   ...frameSet.data
    // })
  }

  renderActiveFrameSetName = () => {
    const activeFrameSet = this.getFrameSet()
    const title =
      activeFrameSet && activeFrameSet.data && activeFrameSet.titlele

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

  renderNarrativeEditor = () => {
    const activeFrameSet = this.getFrameSet()
    const title =
      activeFrameSet && activeFrameSet.data && activeFrameSet.titlele

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

  deleteFrame = ({ id }) => {}

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
    console.log("this.state.scene", toJS(this.state.scene)) // zzz

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
    world.startScene = !isStartScene
    this.setState({ isStartScene: !isStartScene })
    // should disable any other scenes with this checked
    return
  }

  renderLocation = ({ item }) => {
    const { scene, id, name = "" } = item

    const { updateWorld } = this.props

    const content = (
      <div className={css.locationGridContainer}>
        <MiniLocation
          id={id}
          key={name}
          location={scene}
          isEditMode={true}
          updateWorld={updateWorld}
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
    const { scene } = this.props

    const activeFrameSet = (scene && scene.frameSet) || this.getNewFrameSet()

    const renderedFrames =
      activeFrameSet &&
      activeFrameSet.frames.map(frame => {
        return (
          <Frame
            frame={frame}
            scene={scene}
            updateFrameSet={this.updateFrameSet}
          />
        )
      })

    return renderedFrames
  }

  render() {
    const { scene } = this.props
    console.log("scene - render - FB", toJS(scene)) // zzz

    return (
      <div className={css.main}>
        {/* {this.renderLocation()} */}
        {/* {this.renderFrameSetPicker()} */}
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
          </div>
        )}
        {scene && (
          <div className={css.buttonContainer}>
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
