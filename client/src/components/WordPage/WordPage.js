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
  state = {}

  async componentWillMount() {}

  componentWillReceiveProps(newProps) {}

  incrementFrameIndex = (reset) => {
    let newIndex

    if (reset) {
      newIndex = 0
    } else {
      newIndex = localStateStore.getActiveFrameIndex() + 1
    }

    localStateStore.setActiveFrameIndex(newIndex)
    // this.forceUpdate({ test: new Date() })
  }

  render() {
    console.log("render WP----------------------------->") // zzz
    console.log("") // zzz
    console.log("") // zzz
    const { activeScene, openYouWinModal } = this.props
    const activeFrameIndex = localStateStore.getActiveFrameIndex()
    // const activeFrameIndex2 = localStateStore.activeFrameIndex
    console.log("activeFrameIndex", toJS(activeFrameIndex)) // zzz
    // console.log("activeFrameIndex2", activeFrameIndex2) // zzz

    const frameSet = activeScene.frameSet
    const frame =
      frameSet && frameSet.frames && frameSet.frames[activeFrameIndex]

    let isLastFrame =
      frameSet.frames && activeFrameIndex >= frameSet.frames.length - 1
    if (!frameSet) {
      isLastFrame = true
    }

    return (
      <div className={css.textPage}>
        <FrameViewer
          frameIndex={activeFrameIndex}
          openYouWinModal={openYouWinModal}
          onClickNext={this.incrementFrameIndex}
          isLastFrame={isLastFrame}
          frame={frame}
          scene={activeScene}
          isEditMode={false}
          updateActiveScene={this.props.updateActiveScene}
        />
      </div>
    )
  }
}
export default observer(WordPage)
