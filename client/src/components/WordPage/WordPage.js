import { Button } from "@blueprintjs/core"
import React from "react"
import _get from "lodash.get"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import FrameViewer from "../FrameViewer/FrameViewer.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import css from "./WordPage.module.scss"
import Utils from "../../Utils/Utils.js"

class WordPage extends React.Component {
  state = {
    activeScene: undefined,
    frameIndex: 0,
  }

  async componentWillMount() {
    const { activeScene } = this.props
    this.setState({ activeScene })
  }

  componentWillReceiveProps(newProps) {
    const { activeScene } = newProps
    this.setState({ activeScene })
  }

  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  changeLocation = ({ sceneName }) => {
    this.setState({ frameIndex: 0 })

    const grid = localStateStore.getActiveMapGrid()
    const newScene = grid.find((scene) => scene.location.name === sceneName)
    this.props.updateActiveScene({ activeScene: newScene })
  }

  openYouWinModal = () => {
    this.props.openYouWinModal()
  }

  renderButtons = () => {
    const {
      activeScene: { isEndScene, coordinates },
    } = this.state

    const neighbors = Utils.getNeighborNames({
      coordinates,
    })
    console.log("neighbors", toJS(neighbors)) // zzz

    const filteredNeighbors = neighbors.filter((item) => item !== "blank")

    if (isEndScene) {
      return (
        <Button onClick={this.openYouWinModal} className={css.newGameButton}>
          New Game
        </Button>
      )
    }

    const buttons = filteredNeighbors.map((neighbor, i) => {
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

    return <div className={css.decisionButtonRow}>GO TO{buttons}</div>
  }

  onClickNext = () => {
    this.setState({
      frameIndex: this.state.frameIndex + 1,
    })
  }

  render() {
    const { activeScene, frameIndex } = this.state
    const frameSet = activeScene.frameSet

    let isLastFrame =
      frameSet.frames && frameIndex >= frameSet.frames.length - 1
    if (!frameSet) {
      isLastFrame = true
    }

    return (
      <div className={css.textPage}>
        <FrameViewer
          frameIndex={frameIndex}
          scene={activeScene}
          isEditMode={false}
        />
        {/* <div className={css.buttonRow}>
          {!isLastFrame && (
            <Button onClick={this.onClickNext} className={css.choiceButton}>
              NEXT
            </Button>
          )}

          {isLastFrame && this.renderButtons()}
        </div> */}
      </div>
    )
  }
}
export default observer(WordPage)
