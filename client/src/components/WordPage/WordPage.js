import { Button } from "@blueprintjs/core"
import Frame from "../Frame/Frame.js"
import React from "react"
import _get from "lodash.get"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import { frameSetStore } from "../../Stores/FrameSetStore.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import css from "./WordPage.module.scss"

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

    const locationDetails = localStateStore.getLocationDetails()

    const activeLocationsMap = localStateStore.getActiveLocationsMap()

    console.log("activeLocationsMap", toJS(activeLocationsMap)) // zzz

    const regex = `(.+)-(.+)`

    const foundFrameSet = frameSets.find(fs => {
      // console.log("fs", toJS(fs)) // zzz

      const match = fs.data.title.match(regex)
      if (!match) {
        return false
      }
      // console.log("match", toJS(match)) // zzz
      const map = match[1]
      const scene = match[2]

      return (
        map === locationDetails.mapName && scene === locationDetails.sceneName
      )
    })

    console.log("foundFrameSet", toJS(foundFrameSet && foundFrameSet.data)) // zzz

    const myFrameSet = (foundFrameSet && foundFrameSet.data) || { frames: [] }
    console.log("myFrameSet", toJS(myFrameSet)) // zzz

    const { activeScene, frameIndex } = this.state

    let isLastFrame = frameIndex === myFrameSet.frames.length - 1
    if (!foundFrameSet) {
      isLastFrame = true
    }

    const frame = myFrameSet.frames[frameIndex]

    return (
      <div className={css.textPage}>
        <Frame frame={frame} scene={activeScene} isEditMode={false} />
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
