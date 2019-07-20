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
    frameIndex: 0
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
    const { activeScene, frameIndex } = this.state
    const frameSet = activeScene.frameSet

    let isLastFrame = frameIndex >= frameSet.frames.length - 1
    if (!frameSet) {
      isLastFrame = true
    }

    const frame = frameSet.frames[frameIndex]
    const actionButtons = isLastFrame ? this.renderButtons() : null

    return (
      <div className={css.textPage}>
        <Frame
          index={frameIndex}
          frame={frame}
          scene={activeScene}
          isEditMode={false}
          actionButtons={actionButtons}
        />
        {!isLastFrame && (
          <Button onClick={this.onClickNext} className={css.nextButton}>
            NEXT
          </Button>
        )}

        {/* {isLastFrame && this.renderButtons()} */}
      </div>
    )
  }
}
export default observer(WordPage)
