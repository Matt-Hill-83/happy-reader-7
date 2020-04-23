import _get from "lodash.get"
import { Button, Menu, MenuItem, Popover, Position } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React from "react"

import Images from "../../images/images.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import MiniLocation from "../MiniLocation/MiniLocation.js"
import Utils from "../../Utils/Utils.js"
import WordPage from "../WordPage/WordPage.js"

import css from "./PicturePage.module.scss"

class PicturePage extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  renderSceneRows = () => {
    console.log("renderSceneRows") // zzz

    const map = localStateStore.getActiveMap()
    const scenesGrid = map.data.grid
    console.log("scenesGrid", toJS(scenesGrid)) // zzz

    const miniLocationsGrid =
      scenesGrid &&
      scenesGrid.map((locationRow, rowIndex) => {
        const singleRow = this.createSingleRow({ locationRow, rowIndex })
        console.log("singleRow", singleRow) // zzz

        return (
          <div key={rowIndex} className={css.miniLocationsRow}>
            {singleRow}
          </div>
        )
      })

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>
  }

  createSingleRow = ({ locationRow, rowIndex }) => {
    console.log("createSingleRow") // zzz

    return locationRow.map((scene, colIndex) => {
      console.log("colIndex", colIndex) // zzz

      return this.renderMiniLocation({ scene, colIndex, rowIndex })
    })
  }

  renderMiniLocation = ({ colIndex = 0, rowIndex = 0, scene }) => {
    // TODO - this should come from state
    const { activeScene } = this.props
    const sceneName = scene.location.name
    // const { name: sceneName } = scene
    let isActive

    isActive = sceneName === activeScene.location.name

    // This prop is not being applied correctly in MainStory.js
    // scene.showCloud = !isActive

    const id = `${colIndex}-${rowIndex}`
    console.log("id", id) // zzz

    return (
      // This wrapper div seems to be required to make things render withought ghost divs being included in the list.
      <div>
        {/* {`${id}`} */}
        <MiniLocation
          id={id}
          key={sceneName}
          scene={scene}
          isActive={isActive}
        />
      </div>
    )
  }

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

  renderMapPage = ({}) => {
    const mapImage = Images.backgrounds["map"]

    return (
      <div className={`${css.halfPage} ${css.rightHalf}`}>
        <div className={`${css.mapScroller}`}>
          <img className={css.backgroundImage} src={mapImage} alt={"bk"} />
          {this.renderSceneRows()}
        </div>
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
    const showWorldBuilder = localStateStore.getShowWorldBuilder()

    if (showWorldBuilder) {
    } else {
      return (
        <div className={`${css.main}`}>
          {this.renderStoryPage()}

          {this.renderMapPage({})}
          {false && this.renderYourItems({})}
        </div>
      )
    }
  }
}
export default observer(PicturePage)
