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

import { IconNames } from "@blueprintjs/icons"
import { maps } from "../../Stores/InitStores"

import css from "./WorldPicker.module.scss"
import Utils from "../../Utils/Utils"

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
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    if (!savedMaps[0]) {
      return null
    }

    const mapList = savedMaps.map((map, index) => {
      const mapId = map.id
      const text = (
        <span
          className={css.mapPickerRow}
          onClick={() => this.changeMap({ index, mapId })}
        >
          {map.data.name}
          <span onClick={() => this.onDeleteMap({ map })}>
            <Icon icon={IconNames.TRASH} />
          </span>
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
