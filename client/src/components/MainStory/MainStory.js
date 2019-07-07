import {
  Button,
  Dialog,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core"

// import MainHeader from "../MainHeader/MainHeader.js";
import FlashCards from "../FlashCards/FlashCards"
import IntroPage1 from "../IntroPage1/IntroPage1.js"
import PicturePage from "../PicturePage/PicturePage"
import React from "react"
import Utils from "../../Utils/Utils.js"
import css from "./MainStory.module.scss"
import { frameSetStore } from "../../Stores/FrameSetStore"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import { maps } from "../../Stores/InitStores.js"
import mySentences from "../../Models/sentences.js"
import { observer } from "mobx-react"
import { toJS } from "mobx"

class MainStory extends React.Component {
  state = {
    // showStory: false,
    showStory: true,
    activeScene: undefined,
    pageNum: 0,
    pages: {},
    showIntro: false
  }

  async componentWillMount() {
    console.log("mySentences", mySentences) // zzz

    localStateStore.setsmallMap(false)
    if (this.state.showIntro) {
      localStateStore.setPage("intro1")
    } else {
      localStateStore.setPage("intro2")
      this.onExitIntro({ you: { name: "Luna", creature: "kat" } })
    }
  }

  onExitIntro = async ({ you }) => {
    maps.fetch().then(({ docs }) => {
      this.setState({ test: "got data" })

      const savedMaps = maps.docs.map(map => toJS(map.data))

      console.log("savedMaps - main", savedMaps) // zzz
      const plot = localStateStore.getPlot()

      // console.log("plot.activeScene", toJS(plot.activeScene)) // zzz

      localStateStore.setLocationsMaps(savedMaps)
      this.updateActiveScene({ activeScene: plot.activeScene })

      // docs.forEach(
      //   doc => console.log("doc", toJS(doc)) // zzz
      // )
    })
  }

  updateActiveScene = ({ activeScene }) => {
    const locationsMap = localStateStore.getActiveLocationsMap()
    // console.log("locationsMap", locationsMap) // zzz

    const activeSceneName = activeScene.name
    const endSceneName = locationsMap && locationsMap.endScene
    console.log("endSceneName", endSceneName) // zzz
    console.log("activeSceneName", activeSceneName) // zzz

    if (activeSceneName === endSceneName) {
      this.setState({ showYouWin: true })
    }

    activeScene.neighborNames = this.getNeighbors({ activeScene })

    this.setState({ activeScene, pageNum: this.state.pageNum + 1 })
  }

  getNeighbors = ({ activeScene }) => {
    // console.log("activeScene", activeScene) // zzz

    const locationsMap = localStateStore.getActiveLocationsMap()

    const activeSceneName = activeScene.name

    const neighbors = []
    const neighborsArray = []

    // create a map of all the locations for future use
    // console.log("locationsMap", toJS(locationsMap)) // zzz

    const grid = JSON.parse(locationsMap.grid)

    grid.forEach((row, rowIndex) => {
      row.forEach((location, locationIndex) => {
        location = location || {}

        neighborsArray.push({
          name: location.name,
          position: { x: rowIndex, y: locationIndex }
        })
      })
    })

    const currentLocation = neighborsArray.find(item => {
      return item.name === activeSceneName
    })

    const currentPosition = currentLocation.position

    neighbors.push({ x: currentPosition.x - 1, y: currentPosition.y })
    neighbors.push({ x: currentPosition.x + 1, y: currentPosition.y })
    neighbors.push({ x: currentPosition.x, y: currentPosition.y + 1 })
    neighbors.push({ x: currentPosition.x, y: currentPosition.y - 1 })

    const neighborNames = []

    neighbors.forEach(neighbor => {
      neighborsArray.forEach(item => {
        if (item.position.x === neighbor.x && item.position.y === neighbor.y) {
          neighborNames.push(item.name)
        }
      })
    })

    return neighborNames
  }

  toggleFlashCards = () => {
    this.setState({ showStory: !this.state.showStory })
  }

  changeCharacter = () => {
    localStateStore.setPage("intro1")
  }

  toggleMap = () => {
    const smallMap = localStateStore.getsmallMap()
    localStateStore.setsmallMap(!smallMap)
  }

  toggleWorldBuilder = () => {
    const plot = localStateStore.getPlot()

    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    const newShowWorldBuilder = !showWorldBuilder

    localStateStore.setShowWorldBuilder(newShowWorldBuilder)
    if (newShowWorldBuilder === false) {
      this.updateActiveScene({ activeScene: plot.activeScene })
    }
  }

  closeYouWin = () => {
    this.setState({ showYouWin: false })
    localStateStore.incrementActiveLocationsMapIndex()
    const locationsMap = localStateStore.getActiveLocationsMap()

    const { startScene } = locationsMap

    this.updateActiveScene({ activeScene: startScene })
  }

  renderWorldPicker = () => {
    const savedMaps = maps.docs.map(map => toJS(map.data))

    if (!savedMaps[0]) {
      return null
    }

    const mapList = savedMaps.map((map, index) => {
      return (
        <MenuItem text={map.name} onClick={() => this.changeMap({ index })} />
      )
    })

    const renderedMapList = <Menu>{mapList}</Menu>

    const worldPicker = (
      <Popover
        className={css.worldPickerDropdown}
        content={renderedMapList}
        position={Position.RIGHT_TOP}
      >
        <Button icon="share" text="Load Map" />
      </Popover>
    )

    return worldPicker
  }

  changeMap = ({ index }) => {
    console.log("index", index) // zzz
    localStateStore.setActiveLocationsMapIndex(index)
  }

  render() {
    const { className } = this.props
    const { activeScene, pageNum, test } = this.state

    const index = localStateStore.getActiveLocationsMapIndex()
    console.log("index", index) // zzz
    console.log("render main") // zzz
    // console.log("test", test) // zzz

    if (!activeScene) {
      return null
    }

    const page = localStateStore.getPage()

    const wordPageProps = { activeScene, pageNum }

    if (page === "intro1") {
      return (
        <IntroPage1 className={css.IntroPage1} onExitIntro={this.onExitIntro} />
      )
    }

    const changeCharacterButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.changeCharacter}
      >
        <span> Change Character </span>
      </Button>
    )

    const toggleMapButton = (
      <Button tabIndex={0} className={css.newStoryBtn} onClick={this.toggleMap}>
        <span> Toggle Map </span>
      </Button>
    )

    const toggleWorldBuilderButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.toggleWorldBuilder}
      >
        <span> Toggle World Builder </span>
      </Button>
    )

    return (
      <div className={`${css.main} ${className}`}>
        {/* <MainHeader toggleFlashCards={this.toggleFlashCards} /> */}
        {test}
        {this.renderWorldPicker()}
        <div className={css.floatingButtons}>
          <div className={css.settingButtons}>
            {changeCharacterButton}
            {toggleMapButton}
            {toggleWorldBuilderButton}
          </div>
        </div>
        <div className={css.body}>
          {!this.state.showStory && <FlashCards />}
          {this.state.showStory && (
            <div className={css.storyBox}>
              <PicturePage
                wordPageProps={wordPageProps}
                updateActiveScene={this.updateActiveScene}
                activeScene={activeScene}
                pageNum={pageNum}
              />
            </div>
          )}
        </div>
        <Dialog
          isOpen={this.state.showYouWin}
          content={"test2"}
          isCloseButtonShown={true}
        >
          You Win!!!
          <Button onClick={this.closeYouWin}>GO</Button>
        </Dialog>
      </div>
    )
  }
}

export default observer(MainStory)
