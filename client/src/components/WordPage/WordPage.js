import { Button } from "@blueprintjs/core"
import Frame from "../Frame/Frame.js"
import React from "react"
import WordGroup from "../WordGroup/WordGroup.js"
import _get from "lodash.get"
import css from "./WordPage.module.scss"
import { frameSetStore } from "../../Stores/FrameSetStore.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import { observer } from "mobx-react"

class WordPage extends React.Component {
  state = {
    activeScene: undefined,
    frameIndex: 0
  }

  async componentWillMount() {
    this.setState({ ...this.props.wordPageProps })
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.wordPageProps })
  }

  changeLocation = ({ sceneName }) => {
    this.setState({ frameIndex: 0 })
    const plot = localStateStore.getPlot()
    const { allScenes = {} } = plot

    const newScene = allScenes.find(scene => scene.name === sceneName)

    this.props.updateActiveScene({ activeScene: newScene })
  }

  renderButtons = () => {
    const { activeScene } = this.state
    const neighbors = activeScene.neighborNames

    const buttons = neighbors.map((neighbor, i) => {
      if (!neighbor) {
        return null
      }

      const onClick = () => this.changeLocation({ sceneName: neighbor })

      return (
        <Button key={i} onClick={onClick} className={css.choiceButton}>
          {neighbor}
        </Button>
      )
    })
    return <div className={css.decisionButtonRow}>{buttons}</div>
  }

  onClickNext = () => {
    this.setState({
      frameIndex: this.state.frameIndex + 1
    })
  }

  render() {
    const frameSets = frameSetStore.docs
    if (!frameSets.length) {
      return null
    }

    // TODO = generate narrative is breaking after dialog is finished.
    // TODO = generate narrative is breaking after dialog is finished.
    // TODO = generate narrative is breaking after dialog is finished.
    // TODO = generate narrative is breaking after dialog is finished.
    const myFrameSet = frameSets[0].data

    const { activeScene, frameIndex } = this.state

    const isLastFrame = frameIndex === myFrameSet.frames.length - 1

    const frame = myFrameSet.frames[frameIndex]

    console.log("frame", frame) // zzz
    console.log("isLastFrame", isLastFrame) // zzz

    return (
      <div className={css.textPage}>
        <Frame frame={frame} sceneToEdit={activeScene} isEditMode={false} />
        {!isLastFrame && (
          <Button onClick={this.onClickNext} className={css.nextButton}>
            NEXT
          </Button>
        )}

        {isLastFrame && this.renderButtons()}
      </div>
    )
  }
}
export default observer(WordPage)
