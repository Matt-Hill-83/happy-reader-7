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
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import { maps } from "../../Stores/InitStores"
import { worldNameStore } from "../../Stores/FrameSetStore"

import css from "./WorldPicker.module.scss"
import Utils from "../../Utils/Utils"

class WorldPicker extends Component {
  state = {}

  async componentWillMount() {}

  changeMap = ({ index }) => {
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    let world = savedMaps[index]
    let scenesGrid

    // new map
    if (index === -1) {
      scenesGrid = this.preAllocateArrays({})
      const name = "My New World"
      world = { scenesGrid, name }
    } else {
      scenesGrid = world.data.scenesGrid
    }

    // TODO:  I could just set the index to state
    this.setState({ scenesGrid, world })
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

  saveMap = async () => {
    const { scenesGrid } = this.state
    const previousMapName = toJS(worldNameStore.docs[0].data.previousMapName)

    const newName = previousMapName + 1
    await worldNameStore.docs[0].update({
      previousMapName: newName
    })

    const newMap = {
      name: newName,
      scenesGrid: scenesGrid,
      order: 0,
      ignore: false
    }

    maps.add(newMap)
  }

  renderMapPicker = () => {
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    if (!savedMaps[0]) {
      return null
    }

    const newMap = (
      <MenuItem text={"newMap"} onClick={() => this.changeMap({ index: -1 })} />
    )

    const mapList = savedMaps.map((map, index) => {
      const text = (
        <span
          className={css.mapPickerRow}
          onClick={() => this.changeMap({ index })}
        >
          {map.data.name}
          <span onClick={() => this.onDeleteMap({ map })}>
            <Icon icon={IconNames.TRASH} />
          </span>
        </span>
      )
      return <MenuItem text={text} />
    })

    mapList.push(newMap)

    const renderedMapList = <Menu>{mapList}</Menu>

    const worldPicker = (
      <Popover
        className={css.worldPickerDropdown}
        content={renderedMapList}
        position={Position.BOTTOM}
      >
        <Button icon="share" text="Load Map" />
      </Popover>
    )

    return worldPicker
  }

  render() {
    console.log("MP - render") // zzz

    return <div className={css.main}>{this.renderMapPicker()}</div>
  }
}
export default observer(WorldPicker)
