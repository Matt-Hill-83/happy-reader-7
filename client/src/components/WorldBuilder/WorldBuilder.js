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

import { Checkbox } from "@material-ui/core"
import { IconNames } from "@blueprintjs/icons"

import { maps } from "../../Stores/InitStores"
import { worldNameStore } from "../../Stores/FrameSetStore"
import CrudMachine from "../CrudMachine/CrudMachine"
import FrameBuilder from "../FrameBuilder/FrameBuilder"
import ImageDisplay from "../ImageDisplay/ImageDisplay"
import images from "../../images/images"
import Utils from "../../Utils/Utils"

import css from "./WorldBuilder.module.scss"

const INITIAL_MAP_INDEX = 0
const NUM_ROWS_LOCATIONS_GRID = 5
const NUM_COLS_LOCATIONS_GRID = 9

class WorldBuilder extends Component {
  state = {
    world: {},
    sceneToEdit: null,
    showFrameBuilder: false,
  }

  async componentWillMount() {
    const initialMapIndex = INITIAL_MAP_INDEX
    this.changeMap({ index: initialMapIndex })
  }

  changeMap = ({ index }) => {
    console.log("changeMap") // zzz

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    let world = savedMaps[index]
    console.log("index", index) // zzz
    console.log("savedMaps", savedMaps) // zzz

    console.log("world", world) // zzz

    let scenesGrid

    // new map
    if (index === -1) {
      this.saveNewMap()
      return
    } else {
      scenesGrid = world.data.scenesGrid

      console.log("world - existing", world) // zzz

      this.setState({ scenesGrid, world })
    }

    // TODO:  I could just set the index to state
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
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    return savedMaps.find((map) => {
      return map.id === mapId
    })
  }

  updateIsReleasedProperty = ({ id }) => {
    const map = this.getMapById(id)
    const released = !map.data.released
    map.update({ released })
  }

  renderMapPicker = () => {
    console.log("renderMapPicker") // zzz

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    if (!savedMaps[0]) {
      return null
    }

    const mapList = savedMaps.map((map, index) => {
      const { id } = map
      const { name, title, released } = map.data

      const text = (
        <div className={css.mapPickerRow}>
          <span
            className={css.mapPickerRowTitle}
            onClick={() => this.changeMap({ index })}
          >
            {`${name} - ${title}`}
          </span>
          <div className={css.mapPickerRowButtons}>
            Released
            <Checkbox
              onClick={() => this.updateIsReleasedProperty({ id })}
              checked={released}
            />
            <span onClick={() => this.onDeleteMap({ map })}>
              <Icon icon={IconNames.TRASH} />
            </span>
          </div>
        </div>
      )
      return <MenuItem text={text} />
    })

    const renderedMapList = <Menu>{mapList}</Menu>

    const worldPicker = (
      <Popover
        className={css.worldPickerDropdown}
        portalClassName={css.worldPickerDropdownPopover}
        content={renderedMapList}
        position={Position.BOTTOM}
      >
        <Button icon="share" text="Load Map" />
      </Popover>
    )

    return worldPicker
  }

  renderStartScenePicker = () => {
    const map = this.state.world
    if (!map) return null

    if (!map.data) {
      return null
    }

    const { startScene, newGrid2 } = map.data

    const scenesList = Utils.getArrayOfScenes({ scenesGrid: newGrid2 }) || []

    const filteredScenesList = Utils.getNonBlankScenes({ scenesList })

    const renderedSceneNames = filteredScenesList.map((scene, index) => {
      const { name } = scene.location

      const changeScene = ({ name }) => {
        scenesList.forEach((scene) => (scene.isStartScene = false))
        scene.isStartScene = true
        map.data.startScene = name
        this.updateMap({ newProps: { ...map.data } })
      }

      const text = (
        <div className={css.mapPickerRow}>
          <span
            className={css.mapPickerRowTitle}
            onClick={() => changeScene({ name })}
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
        <Button icon="share" text={`${startScene || "Start Scene"}`} />
      </Popover>
    )

    return scenePicker
  }

  renderEndScenePicker = () => {
    const map = this.state.world
    if (!map) return null

    if (!map.data) {
      return null
    }

    const { endScene } = map.data

    const scenesList =
      Utils.getArrayOfScenes({ scenesGrid: map.data.newGrid2 }) || []

    const filteredScenesList = Utils.getNonBlankScenes({ scenesList })

    const renderedSceneNames = filteredScenesList.map((scene, index) => {
      const { name } = scene.location

      const changeScene = ({ name }) => {
        scenesList.forEach((scene) => (scene.isEndScene = false))
        scene.isEndScene = true
        map.data.endScene = name
        this.updateMap({ newProps: { ...map.data } })
      }

      const text = (
        <div className={css.mapPickerRow}>
          <span
            className={css.mapPickerRowTitle}
            onClick={() => changeScene({ name })}
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
        <Button icon="share" text={`${endScene || "End Scene"}`} />
      </Popover>
    )

    return scenePicker
  }

  saveNewMap = async () => {
    console.log("saveNewMap---------------------------------->>>>>>") // zzz

    const previousMapName = toJS(worldNameStore.docs[0].data.previousMapName)

    const newName = previousMapName + 1
    await worldNameStore.docs[0].update({
      previousMapName: newName,
    })

    const newGrid2 = this.flattenGridForSave({ grid: this.createNewGrid() })

    const newMap = {
      name: newName,
      title: "Test Map",
      newGrid2,
      released: true,
      ignore: false,
    }

    console.log("maps.docs.length", maps.docs.length) // zzz

    const newMapReturned = await maps.add(newMap)

    this.setState({ world: newMapReturned })
    console.log("maps.docs.length", maps.docs.length) // zzz
  }

  editFrame = ({ sceneToEdit }) => {
    this.setState({ sceneToEdit, showFrameBuilder: true })
  }

  onExitFrameBuilder = () => {
    this.setState({ sceneToEdit: "", showFrameBuilder: false })
  }

  // TODO - make this global Util
  updateMap = async ({ newProps }) => {
    const map = this.state.world

    Object.assign(map.data, toJS(newProps))
    delete map.data.grid
    await map.update(map.data)
  }

  onChangeTitle = async ({ event }) => {
    const { world } = this.state
    world.data.title = event.target.value
    this.setState({ world })
  }

  saveTitle = async ({ event }) => {
    const title = event.target.value
    await this.updateMap({ title })
  }

  createNewGrid = () => {
    console.log("createNewGrid+++++++++++++++++++++++++++++") // zzz

    const rows = Array(NUM_ROWS_LOCATIONS_GRID).fill(0)
    const columns = Array(NUM_COLS_LOCATIONS_GRID).fill(0)

    const newGrid = []

    rows.forEach((row, rowIndex) => {
      const gridRow = []
      columns.forEach((col, colIndex) => {
        const id = Utils.generateUuid()

        const dummyFrame = {
          creatures: ["kat", "liz2"],
          dialog: [
            {
              character: "kat",
              characterIndex: 0,
              text: "We can play.",
            },
            {
              character: "liz2",
              characterIndex: 1,
              text: "",
            },
            {
              character: "liz2",
              characterIndex: 0,
              text: "",
            },
            {
              character: "liz2",
              characterIndex: 1,
              text: "",
            },
          ],
          faces: [
            {
              character: "liz2",
              characterIndex: 1,
              face: "happy",
            },
            {
              character: "kat",
              characterIndex: 0,
              face: "kat-happy.9e02afab.png",
            },
          ],
          story: ["I am Kat"],
        }

        gridRow.push({
          id,
          location: { name: "blank" },
          doorRight: { name: "doorYellow" },
          doorBottom: { name: "doorGreen" },
          characters: [{ name: "kat" }, { name: "girl" }],
          items: [{ name: "hat" }, { name: "bat" }],
          frameSet: { frames: [dummyFrame] },
        })
      })
      newGrid.push(gridRow)
    })
    return newGrid
  }

  flattenGridForSave = ({ grid }) => {
    console.log("flattenGridForSave") // zzz

    const outputArray = []
    grid.forEach((row) => {
      const newRow = {}
      row.forEach((scene, index) => {
        newRow[index] = scene
      })
      outputArray.push(newRow)
    })
    return outputArray
  }

  // unFlattenGridAfterLoad = ({ grid }) => {}

  saveItems = async () => {
    console.log("saveItems+++++++++++++++++++++++++++++++++++++") // zzz

    await this.updateMap({})
    this.forceUpdateWorldBuilder()
  }

  forceUpdateWorldBuilder = () => {
    this.setState({ forceUpdate: new Date() })
  }

  renderNewGrid = () => {
    const { world } = this.state
    console.log("world    - rng", world) // zzz

    const grid = world.data && world.data.newGrid2

    const itemRenderer = ({ item }) => {
      return <ImageDisplay item={item} />
    }

    const gridRows = []
    const onSave = this.saveItems
    const buttons = { add: false, trash: false, edit: true }

    const characterImageSets = [images.creatures]
    const doorImageSets = [images.doors]
    const locationImageSets = [images.locations, images.vehicles, images.items]

    grid.forEach((row) => {
      const gridRow = []

      Object.values(row).forEach((scene) => {
        const locations = [scene.location]
        const doorsBottom = [scene.doorBottom]
        const doorsRight = [scene.doorRight]
        const characters = scene.characters
        const items = scene.items

        const hideScene = scene.location && scene.location.name === "blank"

        console.log("characters", toJS(characters)) // zzz

        gridRow.push(
          <div className={css.gridCell}>
            {!hideScene && (
              <Button
                className={css.scenePropsButton}
                onClick={() => this.editFrame({ sceneToEdit: scene })}
              >
                <Icon icon={IconNames.SETTINGS} />
              </Button>
            )}
            <div className={css.column1}>
              {
                <CrudMachine
                  forceUpdateWorldBuilder={this.forceUpdateWorldBuilder}
                  className={`${css.crudMachine} ${css.locationMachine}`}
                  items={locations}
                  buttons={buttons}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                  imageSets={locationImageSets}
                />
              }
              {!hideScene && (
                <CrudMachine
                  forceUpdateWorldBuilder={this.forceUpdateWorldBuilder}
                  className={`${css.crudMachine} ${css.itemBox} ${css.charactersMachine}`}
                  items={characters}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                  imageSets={characterImageSets}
                />
              )}
              {!hideScene && (
                <CrudMachine
                  forceUpdateWorldBuilder={this.forceUpdateWorldBuilder}
                  className={`${css.crudMachine} ${css.itemBox} ${css.itemsMachine}`}
                  items={items}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                />
              )}
              {!hideScene && (
                <CrudMachine
                  forceUpdateWorldBuilder={this.forceUpdateWorldBuilder}
                  className={`${css.crudMachine} ${css.doorsBottomMachine}`}
                  items={doorsBottom}
                  itemRenderer={itemRenderer}
                  saveItems={onSave}
                  imageSets={doorImageSets}
                />
              )}

              {!hideScene && (
                <CrudMachine
                  forceUpdateWorldBuilder={this.forceUpdateWorldBuilder}
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

  render() {
    const { world, sceneToEdit, showFrameBuilder } = this.state
    console.log("world", toJS(world)) // zzz

    // Record title for when map is copied
    this.previousTitle = (world.data && world.data.title) || this.previousTitle

    const title =
      (world.data && world.data.title) || this.previousTitle + " copy"

    return (
      <div className={css.main}>
        <InputGroup
          value={title}
          id="text-input"
          placeholder="Title"
          onChange={(event) => this.onChangeTitle({ event })}
          onBlur={(event) => this.saveTitle({ event })}
        />

        {!showFrameBuilder && (
          <div className={css.header}>
            <div className={css.titles}>
              <div className={css.title}>
                {`World Builder - world: ${world.data && world.data.name}`}
                {` --- ${world.id}`}
              </div>
              start:
              {this.renderStartScenePicker()}
              end:
              {this.renderEndScenePicker()}
              <div className={css.subTitle}>
                <div className={css.editWorldButtons}>
                  {this.renderMapPicker()}
                  <Button
                    text={"+ New Map"}
                    onClick={() => this.changeMap({ index: -1 })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={css.content}>
          {this.renderNewGrid()}
          {showFrameBuilder && (
            <FrameBuilder
              world={world}
              scene={sceneToEdit}
              onExitFrameBuilder={(frame) => this.onExitFrameBuilder({ frame })}
              updateMap={this.updateMap}
            />
          )}
        </div>
      </div>
    )
  }
}
export default observer(WorldBuilder)
