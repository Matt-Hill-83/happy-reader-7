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
    const map = localStateStore.getActiveMap()
    const scenesGrid = map.data.grid

    const miniLocationsGrid =
      scenesGrid &&
      scenesGrid.map((locationRow, rowIndex) => {
        return (
          <div key={rowIndex} className={css.miniLocationsRow}>
            {this.createSingleRow({ locationRow, rowIndex })}
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
    // console.log("") // zzz
    // console.log("renderMiniLocation-------------------------") // zzz

    // TODO - this should come from state
    const { activeScene } = this.props
    const sceneName = scene.location.name
    // const { name: sceneName } = scene
    let isActive
    console.log("activeScene - Picture Page", toJS(activeScene)) // zzz
    console.log("scene", toJS(scene)) // zzz

    // TODO - scene does not have the showCloud Prop
    // TODO - scene does not have the showCloud Prop
    // TODO - scene does not have the showCloud Prop
    // TODO - scene does not have the showCloud Prop
    // TODO - scene does not have the showCloud Prop
    // TODO - scene does not have the showCloud Prop

    isActive = sceneName === activeScene.location.name
    // scene.isActive = isActive
    console.log("isActive - PP_________________________________", isActive) // zzz
    console.log("sceneName", sceneName) // zzz

    // This prop is not being applied correctly in MainStory.js
    // scene.showCloud = !isActive

    const id = `${colIndex}-${rowIndex}`

    return (
      <MiniLocation id={id} key={sceneName} scene={scene} isActive={isActive} />
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
    const items = you.items.map(item => <div>{item}</div>)

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
