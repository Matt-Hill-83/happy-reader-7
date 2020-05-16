import React, { Component } from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Popover,
  Position,
  InputGroup,
} from "@blueprintjs/core"

import { IconNames } from "@blueprintjs/icons"

import { maps } from "../../Stores/InitStores"
import { worldNameStore } from "../../Stores/FrameSetStore"
import CrudMachine from "../CrudMachine/CrudMachine"
import FrameBuilder from "../FrameBuilder/FrameBuilder"
import ImageDisplay from "../ImageDisplay/ImageDisplay"
import images from "../../images/images"
import Utils from "../../Utils/Utils"

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import css from "./WorldBuilder.module.scss"
import WorldPicker from "../WorldPicker/WorldPicker"
import FrameSetUploader from "../FrameSetUploader/FrameSetUploader"

const INITIAL_MAP_INDEX = 0
const NUM_ROWS_LOCATIONS_GRID = 2
const NUM_COLS_LOCATIONS_GRID = 3
// const NUM_ROWS_LOCATIONS_GRID = 5
// const NUM_COLS_LOCATIONS_GRID = 9

class WorldBuilder extends Component {
  state = {
    sceneToEdit: null,
    showFrameBuilder: false,
  }

  // Changing this to DidMount breaks things
  async componentWillMount() {
    this.onChangeWorld({ index: INITIAL_MAP_INDEX })
  }

  onChangeWorld = ({ mapId, newWorld }) => {
    // new map
    if (newWorld) {
      this.addNewWorld()
      return
    } else {
      const world = Utils.getMapFromId2({ id: mapId })

      const {
        data: { gridDimensions, newGrid5 },
      } = world

      const reCreatedScenesGrid = Utils.reCreateGridFromCondensedGrid({
        gridDimensions,
        newGrid5,
      })

      localStateStore.setWorldBuilderWorld(world)
      localStateStore.setWorldBuilderScenesGrid(reCreatedScenesGrid)
    }
  }

  onDeleteMap = async ({ map }) => {
    if (this._deleting) return
    this._deleting = true
    try {
      await map.delete()
      this._deleting = false
    } catch (err) {
      this._deleting = false
    }
  }

  getMapById = (mapId) => {
    const savedWorlds = Utils.getItemsFromDbObj({ dbList: maps })

    return savedWorlds.find((map) => {
      return map.id === mapId
    })
  }

  updateIsReleasedProperty = ({ id }) => {
    const map = this.getMapById(id)
    const released = !map.data.released
    map.update({ released })
  }

  updateReleasedToProd = ({ id }) => {
    const map = this.getMapById(id)
    const releasedToProd = !map.data.releasedToProd
    map.update({ releasedToProd })
  }

  changeTerminalScene = ({ name, scenesList, scene, map, isStartScene }) => {
    scenesList.forEach((scene) => {
      if (isStartScene) {
        scene.isStartScene = false
      } else {
        scene.isEndScene = false
      }
    })

    if (isStartScene) {
      scene.isStartScene = true
      map.data.startSceneId = scene.id
      map.data.startScene = name
    } else {
      scene.isEndScene = true
      map.data.endSceneId = scene.id
      map.data.endScene = name
    }

    this.updateMap({ newProps: { ...map.data } })
  }

  // turn this into a component
  renderTerminalScenePicker = ({ isStartScene }) => {
    const map = localStateStore.getWorldBuilderWorld()
    if (!map) return null

    if (!map.data) {
      return null
    }

    const { startScene, endScene, newGrid5 } = map.data

    const buttonText = isStartScene
      ? `${startScene || "Start Scene"}`
      : `${endScene || "End Scene"}`

    const renderedSceneNames = newGrid5.map((scene, index) => {
      const { name } = scene.location

      const text = (
        <div className={css.mapPickerRow}>
          <span
            className={css.mapPickerRowTitle}
            onClick={() =>
              this.changeTerminalScene({
                name,
                scenesList: newGrid5,
                scene,
                map,
                isStartScene,
              })
            }
          >
            {name}
          </span>
        </div>
      )
      return <MenuItem key={index} text={text} />
    })

    const renderedMapList = <Menu>{renderedSceneNames}</Menu>

    const scenePicker = (
      <Popover
        className={css.worldPickerDropdown}
        portalClassName={css.worldPickerDropdownPopover}
        content={renderedMapList}
        position={Position.BOTTOM}
      >
        <Button icon="share" text={buttonText} />
      </Popover>
    )

    return scenePicker
  }

  editFrameSet = ({ sceneToEdit }) => {
    this.setState({ sceneToEdit, showFrameBuilder: true })
  }

  onExitFrameBuilder = () => {
    this.setState({ sceneToEdit: "", showFrameBuilder: false })
  }

  addNewWorld = async () => {
    const previousMapName = toJS(worldNameStore.docs[0].data.previousMapName)

    const newName = previousMapName + 1
    await worldNameStore.docs[0].update({
      previousMapName: newName,
      // Transitioning to this new name
      previousWorld: newName,
    })
    const { grid, gridDimensions } = this.createNewGrid()

    const newGrid5 = []

    localStateStore.setWorldBuilderScenesGrid(grid)

    const newMap = {
      name: newName,
      title: "Test Map",
      newGrid5,
      released: true,
      releasedToProd: true,
      ignore: false,
      gridDimensions,
    }

    const newMapReturned = await maps.add(newMap)
    localStateStore.setWorldBuilderWorld(newMapReturned)
  }

  // TODO - make this global Util
  updateMap = async ({ newProps = {} }) => {
    const map = localStateStore.getWorldBuilderWorld()
    Object.assign(map.data, toJS(newProps))

    map.data.newGrid5 = Utils.createCondensedGridFromGrid()

    delete map.data.grid
    await map.update(map.data)
  }

  onChangeTitle = async ({ event }) => {
    const world = localStateStore.getWorldBuilderWorld()
    world.data.title = event.target.value
    localStateStore.setWorldBuilderWorld(world)
    this.setState({ world })
  }

  saveTitle = async ({ event }) => {
    const title = event.target.value
    await this.updateMap({ title })
  }

  createNewGrid = () => {
    const rows = Array(NUM_ROWS_LOCATIONS_GRID).fill(0)
    const columns = Array(NUM_COLS_LOCATIONS_GRID).fill(0)

    const gridDimensions = {
      numRows: NUM_ROWS_LOCATIONS_GRID,
      numCols: NUM_COLS_LOCATIONS_GRID,
    }

    const grid = []

    rows.forEach((row, rowIndex) => {
      const gridRow = []
      columns.forEach((col, colIndex) => {
        const id = Utils.generateUuid()

        const coordinates = {
          col: colIndex,
          row: rowIndex,
        }
        const isLastRow = rowIndex === NUM_ROWS_LOCATIONS_GRID - 1
        const isLastCol = colIndex === NUM_COLS_LOCATIONS_GRID - 1

        const props = {
          isLastRow,
          isLastCol,
          coordinates,
          id,
        }

        const blankScene = Utils.getBlankScene({ props })

        gridRow.push(blankScene)
      })
      grid.push(gridRow)
    })
    return { grid, gridDimensions }
  }

  saveItems = async () => {
    await this.updateMap({})
  }

  generateRandomLocation = ({ location, locationNames }) => {
    const randomName =
      locationNames[Math.floor(Math.random() * locationNames.length)]

    location.name = randomName
    this.updateMap({})
  }

  // TODO: on save, Crudmachine shoud return the mutated list and a callback should save it
  // in the appropriate place.
  // Right now, CrudMachine simply mutates a reference and calls a generic update.
  // Which is why you can change an item, but you can't add an item.
  renderScenesGrid = () => {
    const scenesGrid = localStateStore.getWorldBuilderScenesGrid()
    console.log("scenesGrid", toJS(scenesGrid)) // zzz

    const itemRenderer = ({ item }) => {
      return <ImageDisplay item={item} />
    }

    const gridRows = []
    const onSave = this.saveItems
    const buttons = { add: false, trash: false, edit: true }

    const characterImageSets = [images.creatures]
    const doorImageSets = [images.doors]
    const locationImageSets = [images.locations, images.vehicles, images.items]

    const locationNames = Object.keys(images.locations)

    scenesGrid.forEach((row) => {
      const gridRow = []

      row.forEach((scene) => {
        const locations = [scene.location]
        const doorsBottom = [scene.doorBottom]
        const doorsRight = [scene.doorRight]
        const characters = scene.characters
        const items = scene.items

        const hideScene = scene.location && scene.location.name === "blank"

        const locationCrudMachine = (
          <CrudMachine
            className={`${css.crudMachine} ${css.locationMachine}`}
            items={locations}
            onEditItem={this.onEditLocation}
            buttons={buttons}
            itemRenderer={itemRenderer}
            saveItems={onSave}
            imageSets={locationImageSets}
          />
        )

        const randomLocationGenerator = (
          <div
            className={`${css.crudMachine} ${css.locationMachine}`}
            onClick={() =>
              this.generateRandomLocation({
                location: scene.location,
                locationNames,
              })
            }
          />
        )

        const locationPicker =
          scene.location.name === "blank"
            ? // const locationPicker = this.state.generateRandomLocation
              randomLocationGenerator
            : locationCrudMachine

        gridRow.push(
          <div className={css.gridCell}>
            {!hideScene && (
              <Button
                className={css.scenePropsButton}
                onClick={() => this.editFrameSet({ sceneToEdit: scene })}
              >
                <Icon icon={IconNames.SETTINGS} />
              </Button>
            )}
            <div className={css.column1}>
              {locationPicker}
              {!hideScene && (
                <CrudMachine
                  className={`${css.crudMachine} ${css.itemBox} ${css.charactersMachine}`}
                  items={characters}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                  imageSets={characterImageSets}
                />
              )}
              {!hideScene && (
                <CrudMachine
                  className={`${css.crudMachine} ${css.itemBox} ${css.itemsMachine}`}
                  items={items}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                />
              )}
              {!hideScene && (
                <CrudMachine
                  className={`${css.crudMachine} ${css.doorsBottomMachine}`}
                  items={doorsBottom}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                  imageSets={doorImageSets}
                />
              )}

              {!hideScene && (
                <CrudMachine
                  className={`${css.crudMachine} ${css.doorsRightMachine}`}
                  items={doorsRight}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                  imageSets={doorImageSets}
                />
              )}
            </div>
          </div>
        )
      })
      gridRows.push(<div className={css.gridRow}>{gridRow}</div>)
    })

    return <div className={css.newGrid}>{gridRows}</div>
  }

  createNewDialogSets = ({ newScene }) => {
    const newDialogSets = []
    let tempDialogSet = []
    newScene.map((item) => {
      const itemObj = JSON.parse(item)

      const itemKey = Object.keys(itemObj)[0]
      const itemValue = itemObj[itemKey]

      if (itemKey === "xxx") {
        if (tempDialogSet.length > 0) {
          newDialogSets.push(tempDialogSet)
          tempDialogSet = []
        }
      } else {
        let characterIndex = 0

        if (itemKey === "liz2") {
          characterIndex = 1
        }

        const newDialog = {
          character: itemKey,
          text: itemValue,
          characterIndex,
        }

        tempDialogSet.push(newDialog)
      }
    })

    return newDialogSets
  }

  importFrameSet = ({ newFrameSet }) => {
    const scenesGrid = localStateStore.getWorldBuilderScenesGrid()
    const scene = scenesGrid[0][0]
    const newScene = newFrameSet.scenes[0]

    const newDialogSets = this.createNewDialogSets({ newScene })
    const newFrames = []

    // Create each of the new frames
    newDialogSets.forEach((item) => {
      const newFrame = Utils.getDummyFrame2()
      newFrame.dialog = item
      newFrames.push(newFrame)
    })

    // put the new frames in the scene
    scene.frameSet.frames = newFrames
    this.updateMap({})
  }

  render() {
    const { sceneToEdit, showFrameBuilder } = this.state
    const world = localStateStore.getWorldBuilderWorld()
    console.log("sceneToEdit", toJS(sceneToEdit)) // zzz

    // Record title for when map is copied
    this.previousTitle = (world.data && world.data.title) || this.previousTitle

    const title =
      (world.data && world.data.title) || this.previousTitle + " copy"

    return (
      <div className={css.main}>
        <FrameSetUploader
          className={css.frameSetUploaderBox}
          onSave={this.onChangeDialog}
          onImportJson={this.importFrameSet}
        />
        <InputGroup
          value={title}
          id="text-input"
          placeholder="Title"
          onChange={(event) => this.onChangeTitle({ event })}
          onBlur={(event) => this.saveTitle({ event })}
          className={css.titleInput}
        />

        {!showFrameBuilder && (
          <div className={css.header}>
            <div className={css.titles}>
              <div className={css.title}>
                {`World Builder - world: ${world.data && world.data.name}`}
                {` --- ${world.id}`}
              </div>
              start:
              {this.renderTerminalScenePicker({ isStartScene: true })}
              end:
              {this.renderTerminalScenePicker({ isStartScene: false })}
              <div className={css.subTitle}>
                <div className={css.editWorldButtons}>
                  <WorldPicker
                    showDelete={true}
                    showReleased={true}
                    showReleasedToProd={true}
                    updateIsReleasedProperty={this.updateIsReleasedProperty}
                    updateReleasedToProd={this.updateReleasedToProd}
                    onChangeWorld={this.onChangeWorld}
                  />

                  <Button
                    text={"+ New Map"}
                    onClick={() => this.onChangeWorld({ newWorld: true })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {!showFrameBuilder && (
          <div className={css.content}>{this.renderScenesGrid()}</div>
        )}
        {showFrameBuilder && (
          <div className={css.content2}>
            <FrameBuilder
              world={world}
              scene={sceneToEdit}
              onExitFrameBuilder={(frame) => this.onExitFrameBuilder({ frame })}
              updateMap={this.updateMap}
            />
          </div>
        )}
      </div>
    )
  }
}
export default observer(WorldBuilder)
