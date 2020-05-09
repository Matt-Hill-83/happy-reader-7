import React from "react"
import _get from "lodash.get"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import FrameViewer from "../FrameViewer/FrameViewer.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import css from "./WordPage.module.scss"
import Utils from "../../Utils/Utils.js"

class WordPage extends React.Component {
  render() {
    const { activeScene, openYouWinModal, updateActiveScene } = this.props
    const activeFrameIndex = localStateStore.getActiveFrameIndex()

    const frameSet = activeScene.frameSet
    const frame =
      frameSet && frameSet.frames && frameSet.frames[activeFrameIndex]

    let isLastFrame =
      frameSet.frames && activeFrameIndex >= frameSet.frames.length - 1

    return (
      <div className={css.textPage}>
        <FrameViewer
          frame={frame}
          isLastFrame={isLastFrame}
          onClickNext={this.incrementFrameIndex}
          openYouWinModal={openYouWinModal}
          scene={activeScene}
          updateActiveScene={updateActiveScene}
        />
      </div>
    )
  }
}
export default observer(WordPage)
