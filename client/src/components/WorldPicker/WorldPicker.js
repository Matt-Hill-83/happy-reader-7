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
  state = {}

  async componentWillMount() {}

  changeMap = ({ index, mapId }) => {
    const { onChangeMap } = this.props
    onChangeMap && onChangeMap({ index, mapId })
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

  renderMapPicker = () => {
    const { showDelete } = this.props
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
        <span
          className={css.mapPickerRow}
          onClick={() => this.changeMap({ index, mapId })}
        >
          {`map ${order}: ${title}`}
          {showDelete && (
            <span onClick={() => this.onDeleteMap({ map })}>
              <Icon icon={IconNames.TRASH} />
            </span>
          )}
        </span>
      )
      return <MenuItem text={text} />
    })

    const renderedMapList = <Menu>{mapList}</Menu>

    const worldPicker = (
      <Popover
        className={css.worldPickerDropdown}
        content={renderedMapList}
        position={Position.BOTTOM}
      >
        <Button text="All Maps" />
      </Popover>
    )

    return worldPicker
  }

  render() {
    return <div className={css.main}>{this.renderMapPicker()}</div>
  }
}
export default observer(WorldPicker)
