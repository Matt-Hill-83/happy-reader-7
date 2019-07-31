import {
  Button,
  Icon,
  Position,
  InputGroup,
  FormGroup
} from "@blueprintjs/core"
import { FormControl, MenuItem, OutlinedInput, Select } from "@blueprintjs/core"

import { IconNames } from "@blueprintjs/icons"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React, { Component } from "react"

import Images from "../../images/images"
import images from "../../images/images"

import CharacterPicker from "../CharacterPicker/CharacterPicker"

import css from "./CrudMachine.module.scss"

class CrudMachine extends Component {
  state = {
    items: []
  }

  componentWillMount() {
    let { items = [] } = this.props
    items = this.addItemIfNone({ items })
    this.setState({ items: [...items] })
  }

  componentWillReceiveProps(newProps) {
    let { items = [] } = newProps
    items = this.addItemIfNone({ items })
    this.setState({ items: [...items] })
  }

  onDeleteItem = async ({ index }) => {}

  onEditItem = async ({ index, id, item }) => {
    this.toggleItemPicker({ item, index })
  }

  getNewItem = () => {
    return { name: "blank item" }
  }

  cloneItem = async ({ index }) => {}

  addItemIfNone = ({ items }) => {
    if (items && !items.length) {
      items.push(this.getNewItem())
    }
    return items
  }

  onAddItemBefore = ({ index }) => {
    const { items } = this.state

    const part1 = items.slice(0, index)
    const part2 = items.slice(index)
    const newItem = this.getNewItem()
    const part3 = [...part1, newItem, ...part2]

    this.setState({ items: part3 })
  }

  onAddItemAfter = ({ index }) => {
    const { items } = this.state

    const part1 = items.slice(0, index + 1)
    const part2 = items.slice(index + 1)
    const newItem = this.getNewItem()
    const part3 = [...part1, newItem, ...part2]

    this.setState({ items: part3 })
  }

  onSelectItem = ({ name }) => {
    console.log("name", name) // zzz

    this.toggleItemPicker({})
  }

  toggleItemPicker = ({ item = null }) => {
    console.log("item", item) // zzz

    const showItemPicker = !this.state.showItemPicker
    this.setState({ showItemPicker, itemPickerItem: item })
  }

  renderFrame = () => {
    const { items } = this.state

    const renderedItems = items.map((item, index) => {
      const { name } = item

      return (
        <div className={`${css.itemContainer}`} key={index}>
          <div className={`${css.item}`} key={index}>
            {name}
          </div>
          <div className={css.buttonsRow} key={index}>
            <Button
              // icon={IconNames.ADD}
              className={css.itemButton}
              onClick={() => this.onAddItemBefore({ item, index })}
            >
              Before
            </Button>
            <Button
              icon={IconNames.EDIT}
              className={css.itemButton}
              onClick={() => this.onEditItem({ item, index })}
            />
            <Button
              icon={IconNames.DELETE}
              className={css.itemButton}
              onClick={() => this.onDeleteItem({ item, index })}
            />
            <Button
              // icon={IconNames.ADD}
              className={css.itemButton}
              onClick={() => this.onAddItemAfter({ item, index })}
            >
              After
            </Button>
          </div>
        </div>
      )
    })

    return renderedItems || null
  }

  render() {
    const { showItemPicker } = this.state

    return (
      <div className={`${css.main}`}>
        <div className={css.itemsContainer}>{this.renderFrame()}</div>

        {showItemPicker && (
          <CharacterPicker
            imageSets={[
              images.creatures,
              images.locations,
              images.vehicles,
              images.items
            ]}
            className={css.test}
            onClose={this.toggleItemPicker}
            onSelectItem={this.onSelectItem}
          />
        )}
      </div>
    )
  }
}

export default observer(CrudMachine)
