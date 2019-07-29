import React, { Component } from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Popover,
  Position
} from "@blueprintjs/core"

import { IconNames } from "@blueprintjs/icons"
import { maps } from "../../Stores/InitStores"
import Utils from "../../Utils/Utils"

import css from "./WorldPicker.module.scss"

class WorldPicker extends Component {
  state = { selectedMap: "Get new Map" }

  async componentWillMount() {}

  changeMap = ({ index, mapId }) => {
    const { onChangeMap } = this.props
    const map = Utils.getMapFromId({ id: mapId })
    const mapName = map ? map.data && map.data.title : ""

    onChangeMap && onChangeMap({ index, mapId })
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
    const { showDelete } = this.props
    const { selectedMap } = this.state

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    const filteredMaps = savedMaps.filter(map => map.data.released)

    if (!filteredMaps[0]) {
      return null
    }

    const sortedMaps = Utils.sortDataByNestedKey({
      data: filteredMaps,
      keys: ["data", "order"],
      order: "ASC"
    })

    const mapList = sortedMaps.map((map, index) => {
      const { title, order } = map.data

      const mapId = map.id
      const text = (
        <span className={css.mapPickerRow}>
          {`map ${order}: ${title}`}
          {showDelete && (
            <span onClick={() => this.onDeleteMap({ map })}>
              <Icon icon={IconNames.TRASH} />
            </span>
          )}
        </span>
      )
      return (
        <MenuItem
          onClick={() => this.changeMap({ index, mapId })}
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
          {`${selectedMap}    `}
          <Icon icon="caret-down" />
        </Button>
      </Popover>
    )

    return worldPicker
  }
}
export default observer(WorldPicker)
