import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React from "react"
import cx from "classnames"

import Images from "../../images/images.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import MiniLocation from "../MiniLocation/MiniLocation.js"

import css from "./WorldViewer.module.scss"
import MissionConsole from "../MissionConsole/MissionConsole.js"

class WorldViewer extends React.Component {
  renderSceneRows = () => {
    const map = localStateStore.getActiveWorld()
    const grid = map.data.grid

    const miniLocationsGrid =
      grid &&
      grid.map((locationRow, rowIndex) => {
        const singleRow = this.createSingleRow({ locationRow, rowIndex })

        return (
          <div key={rowIndex} className={css.miniLocationsRow}>
            {singleRow}
          </div>
        )
      })

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>
  }

  createSingleRow = ({ locationRow, rowIndex }) => {
    return locationRow.map((scene, colIndex) => {
      return this.renderMiniLocation({ scene, colIndex, rowIndex })
    })
  }

  renderMiniLocation = ({ colIndex = 0, rowIndex = 0, scene }) => {
    const { activeScene, updateActiveScene } = this.props
    const isActive = scene.id === activeScene.id ? true : false

    const id = `${colIndex}-${rowIndex}`
    let onClick = () => {}
    if (scene.location.name !== "blank") {
      onClick = () => {
        updateActiveScene({
          sceneId: scene.id,
        })
      }
    }
    return (
      // This wrapper div seems to be required to make things render withought ghost divs being included in the list.
      <div onClick={onClick} className={css.minilocationWrapper}>
        <MiniLocation id={id} key={id} scene={scene} isActive={isActive} />
      </div>
    )
  }

  scrollHorizontal = ({ reverse = false }) => {
    const container = document.querySelector(
      "[class*='WorldViewer_innerMapScroller']"
    )

    if (container) {
      container.scrollLeft += 135 * (reverse ? -1 : 1)
    }
  }

  render() {
    console.log("render World Viewer+++++++++++++++++++++++++") // zzz
    console.log("render World Viewer+++++++++++++++++++++++++") // zzz
    console.log("render World Viewer+++++++++++++++++++++++++") // zzz

    const map = localStateStore.getActiveWorld()
    const key = new Date()

    const leftArrow = Images.backgrounds["leftArrow"]
    const rightArrow = Images.backgrounds["rightArrow"]

    const mainBackground = Images.backgrounds["hill01"]
    const mainBackground2 = Images.backgrounds["planetGlorp03"]
    const bookCoil01 = Images.backgrounds["bookCoil01"]

    const mapBackground = Images.backgrounds["mapBackground11"]

    return (
      <>
        <img className={css.backgroundImage} src={mainBackground} alt={"bk"} />
        <img
          className={css.backgroundImage2}
          src={mainBackground2}
          alt={"bk"}
        />
        <div className={`${css.mapScroller}`}>
          <div className={`${css.missionConsoleBox}`}>
            <MissionConsole world={map} key={key} />
          </div>
          <div className={`${css.innerMapScroller}`}>
            <img
              className={css.mapBackground}
              src={mapBackground}
              alt={"imagex"}
            />

            {this.renderSceneRows()}
          </div>
          {false && (
            <div className={css.scrollButtons}>
              <Button
                className={cx(css.scrollButton, css.leftScrollButton)}
                onClick={() => this.scrollHorizontal({ reverse: true })}
              >
                <img
                  className={css.windowScrollButtonImage}
                  src={leftArrow}
                  alt={"bk"}
                />
              </Button>

              <Button
                className={cx(css.scrollButton, css.rightScrollButton)}
                onClick={() => this.scrollHorizontal({})}
              >
                <img
                  className={css.windowScrollButtonImage}
                  src={rightArrow}
                  alt={"bk"}
                />
              </Button>
            </div>
          )}
        </div>
        <img className={css.bookCoil01} src={bookCoil01} alt={"bk"} />
      </>
    )
  }
}
export default observer(WorldViewer)
