import _get from "lodash.get"
import { Button, Menu, MenuItem, Popover, Position } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import LineTo from "react-lineto"
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

  renderYouMini = () => {
    const you = localStateStore.getYou()

    const youImage = you.creature

    return (
      <img
        className={`${css.characterImageMini} ${css.characterYouMini}`}
        src={Images.creatures[youImage]}
        alt={youImage}
      />
    )
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
    return locationRow.map((location, colIndex) => {
      return this.renderMiniLocation({ location, colIndex, rowIndex })
    })
  }

  renderMiniLocation = ({
    colIndex = 0,
    rowIndex = 0,
    location: scene,
    className = ""
  }) => {
    console.log("renderMiniLocation") // zzz
    // TODO - this should come from state
    const { activeScene, version2 } = this.props
    const { name: sceneName } = scene
    let isActive

    if (version2) {
      isActive = sceneName === activeScene.location.name
    } else {
      isActive = sceneName === activeScene.name
    }

    const id = `${colIndex}-${rowIndex}`
    console.log("scene", toJS(scene)) // zzz

    return (
      <MiniLocation
        id={id}
        key={sceneName}
        location={scene}
        isActive={isActive}
        className={className}
        version2={version2}
      />
    )
  }

  createArrows = ({ locationName }) => {
    const { activeScene } = this.props

    if (!activeScene) {
      return null
    }
    const neighborNames = activeScene.neighbors || []

    const arrows = neighborNames.map(location => {
      return <LineTo className={css.lineTo} from={locationName} to={location} />
    })

    return arrows
  }

  renderStoryPage = () => {
    const {
      activeScene,
      updateActiveScene,
      openYouWinModal,
      version2
    } = this.props

    return (
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <WordPage
          updateActiveScene={updateActiveScene}
          activeScene={activeScene}
          openYouWinModal={openYouWinModal}
          version2={version2}
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
