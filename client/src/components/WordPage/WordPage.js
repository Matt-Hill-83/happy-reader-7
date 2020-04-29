import { Button } from "@blueprintjs/core"
import React from "react"
import _get from "lodash.get"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import Frame from "../Frame/Frame.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import css from "./WordPage.module.scss"

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

  changeLocation = ({ sceneName }) => {
    this.setState({ frameIndex: 0 })

    const map = localStateStore.getActiveMap()
    const grid = _get(map, "data.grid") || []
    const allScenes = grid.flat()
    let newScene

    newScene = allScenes.find((scene) => scene.location.name === sceneName)

    this.props.updateActiveScene({ activeScene: newScene })
  }

  openYouWinModal = () => {
    this.props.openYouWinModal()
  }

  renderButtons = () => {
    const { activeScene } = this.state

    const neighbors = activeScene.neighborNames

    const filteredNeighbors = neighbors.filter((item) => item !== "blank")

    const { isEndScene } = activeScene

    let buttons
    if (isEndScene) {
      return (
        <Button onClick={this.openYouWinModal} className={css.newGameButton}>
          New Game
        </Button>
      )
    } else {
      buttons = filteredNeighbors.map((neighbor, i) => {
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
    }

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
    console.log("activeScene", toJS(activeScene)) // zzz

    let isLastFrame =
      frameSet.frames && frameIndex >= frameSet.frames.length - 1
    if (!frameSet) {
      isLastFrame = true
    }

    // const frame = frameSet.frames && frameSet.frames[frameIndex]

    return (
      <div className={css.textPage}>
        <Frame
          frameIndex={frameIndex}
          // frame={frame}
          scene={activeScene}
          isEditMode={false}
        />
        <div className={css.buttonRow}>
          {!isLastFrame && (
            <Button onClick={this.onClickNext} className={css.choiceButton}>
              NEXT--
            </Button>
          )}

          {/* TODO - put NEW GAME button here */}
          {isLastFrame && this.renderButtons()}
        </div>
      </div>
    )
  }
}
export default observer(WordPage)
