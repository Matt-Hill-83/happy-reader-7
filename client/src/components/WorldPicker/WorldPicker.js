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
} from "@blueprintjs/core"

import { IconNames } from "@blueprintjs/icons"
import { maps } from "../../Stores/InitStores"
import Utils from "../../Utils/Utils"

import css from "./WorldPicker.module.scss"
import { Checkbox } from "material-ui"

class WorldPicker extends Component {
  state = { selectedMap: "Select Map" }

  changeMap = ({ index, mapId }) => {
    const { onChangeWorld } = this.props
    const map = Utils.getMapFromId({ id: mapId })
    console.log("map-------------------WP---", toJS(map)) // zzz

    const mapName = map ? map.data && map.data.title : ""
    console.log("mapId", mapId) // zzz

    onChangeWorld({ index, mapId })
    this.setState({ selectedMap: mapName })
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

  render() {
    const { showReleasedToProd, showReleased, showDelete } = this.props
    const { selectedMap } = this.state
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    const filteredMaps = showReleased
      ? savedMaps
      : savedMaps.filter((map) => map.data.released)

    if (!filteredMaps[0]) {
      return null
    }

    console.log("filteredMaps", toJS(filteredMaps)) // zzz

    const sortedMaps = Utils.sortDataByNestedKey({
      data: filteredMaps,
      keys: ["data", "title"],
      order: "ASC",
    })

    const mapList = sortedMaps.map((map, index) => {
      const { id } = map
      const { name, title, released, releasedToProd } = map.data
      const {
        updateIsReleasedProperty,
        updateReleasedToProdProperty,
      } = this.props

      console.log("id", id) // zzz

      const text = (
        <span className={css.mapPickerRow}>
          {`map ${name}: ${title}`}
          {`id: ${id}`}
          <div className={css.mapPickerRowButtons}>
            {showReleased && (
              <span className={"test"}>
                Released
                <Checkbox
                  onClick={() => updateIsReleasedProperty({ id })}
                  checked={released}
                />
              </span>
            )}
            {showReleasedToProd && (
              <span className={"test"}>
                To Prod
                <Checkbox
                  onClick={() => updateReleasedToProdProperty({ id })}
                  checked={releasedToProd}
                />
              </span>
            )}
            {showDelete && (
              <span onClick={() => this.onDeleteMap({ map })}>
                <Icon icon={IconNames.TRASH} />
              </span>
            )}
          </div>
        </span>
      )
      return (
        <MenuItem
          onClick={() => this.changeMap({ index, mapId: id })}
          text={text}
        />
      )
    })

    const renderedMapList = <Menu>{mapList}</Menu>

    const worldPicker = (
      <Popover
        className={css.main}
        content={renderedMapList}
        position={Position.BOTTOM}
      >
        <Button className={css.worldPickerButton}>
          {selectedMap}
          <Icon icon="caret-down" />
        </Button>
      </Popover>
    )

    return worldPicker
  }
}
export default observer(WorldPicker)
