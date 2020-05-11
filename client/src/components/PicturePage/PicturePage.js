import _get from "lodash.get"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React from "react"
import cx from "classnames"

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import WordPage from "../WordPage/WordPage.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"

import css from "./PicturePage.module.scss"

class PicturePage extends React.Component {
  renderStoryPage = () => {
    const { activeScene, updateActiveScene, openYouWinModal } = this.props

    return (
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <WordPage
          updateActiveScene={updateActiveScene}
          activeScene={activeScene}
          openYouWinModal={openYouWinModal}
        />
      </div>
    )
  }

  renderYourItems = () => {
    const you = localStateStore.getYou()
    const items = you.items.map((item) => <div>{item}</div>)

    return (
      <div className={css.yourItems}>
        <span>My Stuff</span>
        {items}
      </div>
    )
  }

  render() {
    const { activeScene, updateActiveScene } = this.props
    const activeWorld = localStateStore.getActiveWorld()

    if (!activeWorld || !activeWorld.data || !activeWorld.data.title) {
      return null
    }

    const renderWorldName = (
      <div tabIndex={0} className={css.worldTitle}>
        <span> {activeWorld.data.title} </span>
      </div>
    )

    return (
      <div className={`${css.main}`}>
        {renderWorldName}
        {this.renderStoryPage()}

        <WorldViewer
          updateActiveScene={updateActiveScene}
          activeScene={activeScene}
        ></WorldViewer>
        {false && this.renderYourItems({})}
      </div>
    )
  }
}
export default observer(PicturePage)
