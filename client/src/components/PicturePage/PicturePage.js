import { Button, Menu, MenuItem, Popover, Position } from "@blueprintjs/core"

import Frame from "../Frame/Frame.js"
import FrameBuilder from "../FrameBuilder/FrameBuilder.js"
import Images from "../../images/images.js"
import LineTo from "react-lineto"
import MiniLocation from "../MiniLocation/MiniLocation.js"
import React from "react"
import WordPage from "../WordPage/WordPage.js"
import WorldBuilder from "../WorldBuilder/WorldBuilder.js"
import _get from "lodash.get"
import css from "./PicturePage.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import { maps } from "../../Stores/InitStores"
import { observer } from "mobx-react"
import { toJS } from "mobx"

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

  renderLocationRows = () => {
    const savedMaps = maps.docs.map(map => toJS(map.data))
    console.log("savedMaps", savedMaps) // zzz

    if (!savedMaps[0]) {
      return null
    }
    // TODO
    // TODO
    // TODO
    // TODO
    const testGrid = JSON.parse(savedMaps[0].grid)

    const miniLocationsGrid = testGrid.map((locationRow, rowIndex) => {
      return (
        <div key={rowIndex} className={css.miniLocationsRow}>
          {this.createSingleRow({ locationRow, rowIndex })}
        </div>
      )
    })

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>
  }

  getLocationsForDragger = () => {
    const plot = localStateStore.getPlot()

    return plot.allScenes.map((location, colIndex) => {
      return {
        id: `location-${colIndex}`,
        creatures: [],
        // This should be rendered in the WorldBuilder component, based on what creatures have been added.
        content: this.renderMiniLocation({ location })
      }
    })
  }

  renderCharacters = ({ isActive, creatures }) => {
    const creatureType = creatures.length > 0 && creatures[0].type

    const image = Images.creatures[creatureType] || null

    const friend = (
      <img
        className={`${css.characterImageMini} ${css.character1Mini}`}
        src={image}
        alt={creatureType}
      />
    )

    const you = isActive ? this.renderYouMini() : null
    const characters = [you, friend]

    return characters
  }

  createSingleRow = ({ locationRow, rowIndex }) => {
    return locationRow.map((location, colIndex) => {
      return this.renderMiniLocation({ location, colIndex, rowIndex })
    })
  }

  renderMiniLocation = ({
    colIndex = 0,
    rowIndex = 0,
    location,
    className = ""
  }) => {
    const { activeScene } = this.props
    const { name: locationName, creatures = [] } = location

    const isActive = locationName === activeScene.name

    const characters = this.renderCharacters({
      creatures,
      isActive
    })

    const id = `${colIndex}-${rowIndex}`

    return (
      <MiniLocation
        id={id}
        key={locationName}
        location={location}
        characters={characters}
        isActive={isActive}
        className={className}
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

  changeLocation = ({ sceneName }) => {
    const plot = localStateStore.getPlot()
    const { scenes = {} } = plot

    const newScene = scenes.find(scene => scene.name === sceneName)

    this.props.updateActiveScene({ activeScene: newScene })
  }

  renderStoryPage = () => {
    const { activeScene, wordPageProps, updateActiveScene } = this.props

    const activeLocationName = activeScene.name

    return (
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <WordPage
          wordPageProps={wordPageProps}
          updateActiveScene={updateActiveScene}
        />
        <div className={css.locationHeader}>{`${activeLocationName}`}</div>
        <div className={css.pageNumber}>{`Page ${this.props.pageNum}`}</div>
      </div>
    )
  }

  renderMapPage = ({}) => {
    const mapImage = Images.backgrounds["map"]

    return (
      <div className={`${css.halfPage} ${css.rightHalf}`}>
        <div className={`${css.mapScroller}`}>
          <img
            className={css.backgroundImage}
            src={mapImage}
            alt={"bk image"}
          />
          {this.renderLocationRows()}
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
    const smallMap = localStateStore.getsmallMap()
    const storyClass = smallMap ? css.smallMap : ""

    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    console.log("showWorldBuilder", showWorldBuilder) // zzz

    if (showWorldBuilder) {
      return <WorldBuilder />
    } else {
      return (
        <div className={`${css.main} ${storyClass}`}>
          {this.renderStoryPage()}

          {this.renderMapPage({})}
          {this.renderYourItems({})}
        </div>
      )
    }
  }
}
export default observer(PicturePage)
