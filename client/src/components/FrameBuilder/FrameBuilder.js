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

import css from "./FrameBuilder.module.scss"
import MiniLocation from "../MiniLocation/MiniLocation"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"

class FrameBuilder extends Component {
  state = {
    frames: [],
    activeFrameSet: "",
    isStartScene: false,
    isEndScene: false
  }

  componentWillMount() {
    const { isStartScene, isEndScene } = this.props

    console.log("this.props", this.props) // zzz

    this.setState({ isStartScene, isEndScene })
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
    console.log("creatures", toJS(creatures)) // zzz

    const friendNames = creatures.map(creature => creature.type)
    const you = localStateStore.getYou()
    const yourName = you.name

    const allCharacters = [yourName, ...friendNames]

    const creatureName0 = allCharacters[0].type
    // const creatureName1 = creatures[1].type
    console.log("creatureName0", toJS(creatureName0)) // zzz
    // console.log("creatureName1", toJS(creatureName1)) // zzz

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
    const activeFrameSet = this.getActiveFrameSet().data
    console.log("activeFrameSet", toJS(activeFrameSet)) // zzz

    const newFrame = this.getNewFrame()
    activeFrameSet.frames.push(newFrame)
    this.updateFrameSet()
  }

  // TODO - frameset should be attached to World
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
    await frameSet.update({
      title: event.target.value
    })
  }

  updateFrameSet = async () => {
    const frameSet = this.getActiveFrameSet()

    const { updateWorld } = this.props
    updateWorld && updateWorld({ newProps: frameSet })

    // await frameSet.update({
    //   ...frameSet.data
    // })
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

  renderNarrativeEditor = () => {
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

  // renderFrameSetPicker = () => {
  //   const frameSets = this.getFrameSets()
  //   const renderedFrames = frameSets.map(frameSet => {
  //     const { name, title } = frameSet.data

  //     return (
  //       <div className={css.itemRow}>
  //         <Button
  //           icon="database"
  //           onClick={() => this.setActiveFrameSet({ name })}
  //           className={css.frameSetName}
  //         >
  //           {`name - ${name} title -   ${title}`}
  //         </Button>
  //         <Button
  //           icon="cross"
  //           onClick={() => this.onPressDelete({ item: frameSet })}
  //           className={css.xxx}
  //         />
  //       </div>
  //     )
  //   })
  //   return (
  //     <div className={css.frameSetsList}>
  //       <Button className={css.addButton} onClick={this.addFrameSet}>
  //         + New
  //         {/* <Icon icon={IconNames.SAVED} /> */}
  //       </Button>
  //       {renderedFrames}
  //     </div>
  //   )
  // }

  deleteFrame = ({ id }) => {
    console.log("deleting Frame") // zzz
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

  getActiveFrameSet = () => {
    const frameSets = this.getFrameSets()

    let activeFrameSet = null

    // TODO - if there is no frameset selected, choose the first one
    if (this.state.activeFrameSet) {
      activeFrameSet = frameSets.find(
        frameSet => frameSet.data.name === this.state.activeFrameSet
      )
    } else {
      if (!frameSets[0] || !frameSets[0].data) {
        return null
      }
      activeFrameSet = frameSets[0]
      const activeFrameSetName = activeFrameSet.data.name

      this.setActiveFrameSet({ name: activeFrameSetName })
    }

    if (!activeFrameSet) {
      return null
    }
    return activeFrameSet
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
    console.log("scene.isStartScene", scene.isStartScene) // zzz

    const { updateWorld } = this.props

    // const creatures = scene && scene.creatures

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

  render() {
    const { scene } = this.props

    // const newFrame = this.getNewFrame()
    // const frames = [newFrame]

    // this.newFrames = frames
    // this.newFrameSet = { name: "new Name", title: "new title", frames }

    // const activeFrameSet = this.getActiveFrameSet()
    const activeFrameSet = scene.frameSet || this.getNewFrameSet()

    const renderedFrames = activeFrameSet.frames.map(frame => {
      // activeFrameSet &&
      // activeFrameSet.data &&
      // activeFrameSet.data.frames &&
      // activeFrameSet.data.frames.map(frame => {
      return (
        <Frame
          frame={frame}
          scene={scene}
          updateFrameSet={this.updateFrameSet}
        />
      )
    })

    return (
      <div className={css.main}>
        {/* {this.renderLocation()} */}
        {/* {this.renderFrameSetPicker()} */}
        {this.renderActiveFrameSetName()}

        {renderedFrames}

        <div className={css.buttonContainer}>
          <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
            <Icon icon={IconNames.CLOSE} />
            Close
          </Button>
        </div>
        <div className={css.buttonContainer}>
          <Button className={css.closeButton} onClick={this.onAddFrame}>
            <Icon icon={IconNames.CLOSE} />
            Add Frame
          </Button>
        </div>
      </div>
    )
  }
}

export default observer(FrameBuilder)
