import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import React, { Component } from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import {
  Button,
  Dialog,
  Icon,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core"

import FrameBuilder from "../FrameBuilder/FrameBuilder"
import { IconNames } from "@blueprintjs/icons"
import Images from "../../images/images"
import MiniLocation from "../MiniLocation/MiniLocation"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import { maps } from "../../Stores/InitStores"
import { worldNameStore } from "../../Stores/FrameSetStore"

import css from "./WorldBuilder.module.scss"

const NUM_ROWS_LOCATIONS_GRID = 8
const NUM_COLS_LOCATIONS_GRID = 8
const COLUMN_WIDTH = 150

const LOCATIONS_PREFIX = "locationsGrid"

const LOCATIONS_TAG = "location"
const CREATURES_TAG = "creature"
const ITEMS_TAG = "item"

const SOURCE_CREATURES_PROP_NAME = "sourceCreatures"
const SOURCE_LOCATIONS_PROP_NAME = "sourceLocations"
const SOURCE_ITEMS_PROP_NAME = "sourceItems"

class WorldBuilder extends Component {
  state = {
    world: {},
    showFrameBuilder: false,
    [SOURCE_ITEMS_PROP_NAME]: [],
    [SOURCE_CREATURES_PROP_NAME]: [],
    [SOURCE_LOCATIONS_PROP_NAME]: [],
    editWorld: true
  }

  async componentWillMount() {
    this.initDraggableStuff()
    const initialMapIndex = 0
    this.changeMap({ index: initialMapIndex })
    this.editFrame({})
  }

  initDraggableStuff = async () => {
    const { allItems, allScenes } = localStateStore.getPlot()
    const allCreatures = localStateStore.getCreatures()

    const locations = allScenes.map((item, index) => {
      return {
        id: `${LOCATIONS_TAG}-${index}`,
        scene: item
      }
    })

    // const items = allItems.map((item, index) => {
    //   return {
    //     id: `${ITEMS_TAG}-${index}`,
    //     scene: item
    //   }
    // })

    // generate placeholders for output grid in state
    const locationsGrid = this.preAllocateArrays({})
    console.log("locationsGrid - saved", locationsGrid) // zzz

    // Instead of making different containers, why not dump all items together and sort them by tag?
    // And instead of removing from the list, just mark them as not visible.
    // And don't generate the content here, generate the content at render time.
    const creatureObjects = allCreatures.map((item, index) => {
      const { type, name } = item

      const image = Images.creatures[type]
      const id = `${CREATURES_TAG}-${index}`

      return {
        id,
        // save an object here, that stores all the object properties, separate from the content
        properties: item,
        type,
        name,
        content: (
          <div className={css.characterImage}>
            <img src={image} alt={`${CREATURES_TAG} image`} />
            <span className={css.characterLabel}>{type}</span>
          </div>
        )
      }
    })

    const itemObjects = allItems.map((item, index) => {
      const { type, name } = item

      const image = Images.items[type]
      const id = `${ITEMS_TAG}-${index}`

      return {
        id,
        type,
        name,
        content: (
          <div className={css.characterImage}>
            <img src={image} alt={"item"} />
            <span className={css.characterLabel}>{type}</span>
          </div>
        )
      }
    })

    this.setState({
      [SOURCE_ITEMS_PROP_NAME]: itemObjects,
      [SOURCE_LOCATIONS_PROP_NAME]: locations,
      [SOURCE_CREATURES_PROP_NAME]: creatureObjects,
      locationsGrid
    })
  }

  changeMap = ({ index }) => {
    console.log("index", index) // zzz

    const savedMaps = maps.docs.map(map => toJS(map.data))
    console.log("savedMaps[index]", savedMaps[index]["scenesGrid"]) // zzz

    const test = JSON.parse(savedMaps[index]["scenesGrid"])
    console.log("test", test) // zzz

    // const locationsGrid = this.preAllocateArrays({ savedGrid: test })
    // console.log("locationsGrid - loaded", locationsGrid) // zzz

    this.setState({ world: { grid: test } })
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
        <Button icon="share" text="Load World" />
      </Popover>
    )

    return worldPicker
  }

  // a little function to help us with reordering the result
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  /**
   * Moves an item from one list to another list.
   */
  move = ({ source, destination, droppableSource, droppableDestination }) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    const removedFromDest = destClone.splice(0, destClone.length, removed)
    sourceClone.push(...removedFromDest)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 0,
    margin: 0,

    // change background color if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  })

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 0,
    width: COLUMN_WIDTH
  })

  preAllocateArrays = ({ savedGrid }) => {
    const rows = Array(NUM_ROWS_LOCATIONS_GRID).fill(0)
    const columns = Array(NUM_COLS_LOCATIONS_GRID).fill(0)

    const locationsGrid = {}

    rows.map((row, rowIndex) => {
      const rowName = `row-${rowIndex}`
      locationsGrid[rowName] = {}
      columns.map((col, colIndex) => {
        const colName = `col-${colIndex}`

        locationsGrid[rowName][colName] = savedGrid
          ? { scene: savedGrid[rowIndex][colIndex] }
          : []

        if (savedGrid) {
          const savedScene = savedGrid[rowIndex][colIndex]
          if (savedScene) {
            locationsGrid[rowName][colName] = [
              {
                scene: savedScene,
                id: `location-${colIndex + 1}`
              }
            ]
          }
        } else {
          locationsGrid[rowName][colName] = []
        }
      })
    })

    return locationsGrid
  }

  getList = ({ id }) => {
    if (
      id === SOURCE_ITEMS_PROP_NAME ||
      id === SOURCE_LOCATIONS_PROP_NAME ||
      id === SOURCE_CREATURES_PROP_NAME
    ) {
      return this.state[id]
    } else {
      const { row, col, prefix } = this.getStorageRowColFromId({ id })

      if (prefix === LOCATIONS_PREFIX) {
        return this.state.locationsGrid[row][col]
      }
    }
  }

  getStorageRowColFromId = ({ id }) => {
    const regex = /(?<prefix>.*)-(?<row>row-[0-9])-(?<col>col-[0-9])/
    const idMatch = id.match(regex)

    if (idMatch != null && idMatch.groups) {
      return idMatch.groups
    }
  }

  dropInNewList = ({ source, destination, destinationId, sourceId }) => {
    let result = {}
    // dragging a creature to a different destination
    // TODO -  should specifically reference locationsGrid
    if (
      sourceId === SOURCE_CREATURES_PROP_NAME &&
      destinationId !== SOURCE_CREATURES_PROP_NAME
    ) {
      const sourceList = this.getList({ id: sourceId })
      const destinationList = this.getList({ id: destinationId })
      const droppableSource = source
      // const droppableDestination = destination;

      const sourceListClone = Array.from(sourceList)
      const destListClone = Array.from(destinationList)

      const [removed] = sourceListClone.splice(droppableSource.index, 1)
      if (!destListClone[0]) {
        return
      }

      // console.log("removed", removed); // zzz

      // There should be a separate object in the draggable object that preserves all the item props
      // separate from the renderd content
      destListClone[0].scene.creatures.push({ ...removed.properties })
      // destListClone[0].scene.creatures.push({ type: removed.type });

      // const removedFromDest = destListClone.splice(
      //   0,
      //   destListClone.length,
      //   removed
      // );
      // do this different
      // sourceListClone.push(...removedFromDest);

      result[sourceId] = sourceListClone
      result[destinationId] = destListClone

      const { row, col } = this.getStorageRowColFromId({
        id: destinationId
      })

      const { locationsGrid } = this.state
      locationsGrid[row][col] = result[destinationId]

      this.setState({
        [sourceId]: result[sourceId],
        locationsGrid
      })
    } else {
      result = this.move({
        source: this.getList({ id: sourceId }),
        destination: this.getList({ id: destinationId }),
        droppableSource: source,
        droppableDestination: destination
      })

      // TODO - dragging from grid to main list is broken.
      const { row, col } = this.getStorageRowColFromId({
        id: destinationId
      })

      if (row) {
        const { locationsGrid } = this.state
        locationsGrid[row][col] = result[destinationId]

        this.setState({
          [sourceId]: result[sourceId],
          locationsGrid
        })
      }
    }
  }

  onDragEnd = result => {
    const {
      source,
      source: { droppableId: sourceId },
      destination,
      destination: { droppableId: destinationId }
    } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    // for dragging within a single column
    if (sourceId === destinationId) {
      const items = this.reorder(
        this.getList({ id: sourceId }),
        source.index,
        destination.index
      )

      let state = { items }

      this.setState(state)
    } else {
      this.dropInNewList({ source, destination, destinationId, sourceId })
    }
  }

  createLocationsGridRows = ({ numTargetsInRow, numRows, prefix }) => {
    const targetArraysRows = []
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const newRow = this.createLocationsGridRow({
        numTargetsInRow,
        rowIndex,
        prefix
      })
      targetArraysRows.push(<div className={css.targetRow}>{newRow}</div>)
    }
    return <div className={css.targetGrid}>{targetArraysRows}</div>
  }

  createLocationsGridRow = ({ numTargetsInRow, rowIndex, prefix }) => {
    const targetArrays = []
    for (let colIndex = 0; colIndex < numTargetsInRow; colIndex++) {
      const arrayName = this.createStoragePropertyName({
        rowIndex,
        colIndex,
        prefix
      })

      const { row, col } = this.getStorageRowColFromId({ id: arrayName })

      const newTargetArray = this.renderList({
        droppableId: arrayName,
        items: this.state.locationsGrid[row][col],
        className: css.destination
      })

      targetArrays.push(newTargetArray)
    }

    return targetArrays
  }

  createStoragePropertyName = ({ rowIndex, colIndex, prefix = "item" }) => {
    return `${prefix}-row-${rowIndex}-col-${colIndex}`
  }

  saveWorld = async () => {
    const locationsMap = this.transformLocationsGridToLocationsMap()
    const flatArray = JSON.stringify(locationsMap)
    const previousMapName = toJS(worldNameStore.docs[0].data.previousMapName)

    const newName = previousMapName + 1
    await worldNameStore.docs[0].update({
      previousMapName: newName
    })

    const newMap = {
      name: newName,
      scenesGrid: flatArray,
      order: 0
      // These should be calculated dynamically, based on where the stars are placed.
      // startScene: "home",
      // endScene: "bog"
    }
    console.log("newMap", toJS(newMap)) // zzz

    // return
    maps.add(newMap)
  }

  renderSaveWorldButton = () => {
    return (
      <Button tabIndex={0} className={css.newStoryBtn} onClick={this.saveWorld}>
        <span> Save World </span>
        <Icon color={"purple"} icon={IconNames.SAVED} />
      </Button>
    )
  }

  transformLocationsGridToLocationsMap = () => {
    const { locationsGrid } = this.state
    console.log("locationsGrid-old", toJS(locationsGrid)) // zzz

    const locationsMap = []

    const rows = Array(NUM_ROWS_LOCATIONS_GRID).fill(0)
    const columns = Array(NUM_COLS_LOCATIONS_GRID).fill(0)

    rows.map((row, rowIndex) => {
      const newRow = []

      columns.map((col, colIndex) => {
        const rowName = `row-${rowIndex}`
        const colName = `col-${colIndex}`

        const newCell = locationsGrid[rowName][colName]
        const criticalData = (newCell[0] && toJS(newCell[0].scene)) || {}

        newRow.push(criticalData)
      })
      locationsMap.push(newRow)
    })

    return locationsMap
  }

  renderList = ({ droppableId, items, className }) => {
    return (
      <div className={className}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) =>
            this.renderItems({
              provided,
              snapshot,
              items
            })
          }
        </Droppable>
      </div>
    )
  }

  editFrame = ({ scene }) => {
    console.log("scene", scene) // zzz

    this.setState({ scene: scene, showFrameBuilder: true })
  }

  onExitFrameBuilder = ({ frames }) => {
    console.log("frames", frames) // zzz
    const scene = this.state.scene
    console.log("scene", scene) // zzz

    this.setState({ scene: "", showFrameBuilder: false })
  }

  renderLocation = ({ item }) => {
    const { scene, id, name = "" } = item

    const content = (
      <div className={css.locationGridContainer}>
        <MiniLocation
          id={id}
          key={name}
          location={scene}
          isEditMode={true}
          updateWorld={this.updateWorld}
        />
        <Button
          className={css.scenePropsButton}
          onClick={() => this.editFrame({ scene })}
        >
          <Icon icon={IconNames.SETTINGS} />
        </Button>
      </div>
    )

    return content
  }

  updateWorld = ({ newProps }) => {
    const world = this.state.world
    Object.assign(world, newProps)

    this.setState({ world })
  }

  renderItems = ({ provided, snapshot, items }) => {
    return (
      <div
        ref={provided.innerRef}
        style={this.getListStyle(snapshot.isDraggingOver)}
      >
        {items &&
          items.map((item, index) => {
            const { id } = item
            let content = <span>content missing</span>

            // define a render function in each item type
            if (id.includes(LOCATIONS_TAG)) {
              content = this.renderLocation({ item })
            } else {
              // this content should be generated on the fly.
              content = item.content
            }

            return (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={this.getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {content}
                  </div>
                )}
              </Draggable>
            )
          })}
        {provided.placeholder}
      </div>
    )
  }

  renderSimpleWorld = () => {
    const {
      world,
      world: { grid }
    } = this.state
    console.log("world", toJS(world)) // zzz

    if (!grid) {
      return null
    }

    const place = grid[0][0]
    const rows = grid.map((row, rowIndex) => {
      const renderedRow = row.map((col, colIndex) => {
        let test
        if (col.name) {
          test = this.renderLocation({ item: { scene: col } }) || null
        } else {
          test = null
        }
        return <div className={css.sizerDiv}>{test}</div>
      })
      return <div className={css.rowDiv}>{renderedRow}</div>
    })

    return <div className={css.test}>{rows}</div>
  }

  render() {
    const { scene, showFrameBuilder } = this.state

    const world = { name: "this world" }

    return (
      <div className={css.main}>
        <div className={css.header}>
          <div className={css.titles}>
            <div className={css.title}>World Builder</div>
            <div className={css.subTitle}>
              (drag items to create your world...)
              {this.renderSaveWorldButton()}
              <div className={css.editWorldButtons}>
                <Button
                  icon="share"
                  text="Edit World"
                  onClick={() =>
                    this.setState({ editWorld: !this.state.editWorld })
                  }
                />
                {this.state.editWorld && this.renderWorldPicker()}
              </div>
            </div>
          </div>
        </div>
        <div className={css.content}>
          {/* {true && ( */}
          {showFrameBuilder && (
            <FrameBuilder
              world={world}
              scene={scene}
              onExitFrameBuilder={frame => this.onExitFrameBuilder({ frame })}
            />
          )}
          {this.state.editWorld && this.renderSimpleWorld()}
          {!this.state.editWorld && (
            <DragDropContext className={css.main} onDragEnd={this.onDragEnd}>
              {/* Create these with .map() */}
              {this.renderList({
                droppableId: SOURCE_CREATURES_PROP_NAME,
                items: this.state[SOURCE_CREATURES_PROP_NAME],
                className: css.source
              })}
              {this.renderList({
                droppableId: SOURCE_LOCATIONS_PROP_NAME,
                items: this.state[SOURCE_LOCATIONS_PROP_NAME],
                className: css.source
              })}
              {/* {this.renderList({
              droppableId: SOURCE_ITEMS_PROP_NAME,
              items: this.state[SOURCE_ITEMS_PROP_NAME],
              className: css.source
            })} */}
              {this.createLocationsGridRows({
                numTargetsInRow: NUM_COLS_LOCATIONS_GRID,
                numRows: NUM_ROWS_LOCATIONS_GRID,
                prefix: LOCATIONS_PREFIX
              })}
              {/* {this.createLocationsGridRows({
              numTargetsInRow: NUM_COLS_LOCATIONS_GRID,
              numRows: NUM_ROWS_LOCATIONS_GRID,
              prefix: LOCATIONS_PREFIX
            })} */}
            </DragDropContext>
          )}
        </div>
      </div>
    )
  }
}
export default observer(WorldBuilder)
