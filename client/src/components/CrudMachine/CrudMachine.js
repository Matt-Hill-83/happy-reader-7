import {
  Button,
  Icon,
  Position,
  InputGroup,
  FormGroup,
  Popover,
  PopoverInteractionKind
} from "@blueprintjs/core"

import { IconNames } from "@blueprintjs/icons"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React, { Component } from "react"

import images from "../../images/images"

import ImageDisplay from "../ImageDisplay/ImageDisplay"
import CharacterPicker from "../CharacterPicker/CharacterPicker"

import css from "./CrudMachine.module.scss"

const DEFAULT_BUTTONS = { trash: true, edit: true, add: true }

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

  getNewItem = () => {
    return { name: "empty" }
  }

  // cloneItem = async ({ index }) => {}

  addItemIfNone = ({ items }) => {
    if (items && !items.length) {
      items.push(this.getNewItem())
    }
    return items
  }

  ////////////////////////////
  /////////////     CRUD     ///////////////
  ////////////////////////////

  onDeleteItem = ({ index }) => {
    const { items } = this.state

    const part1 = items.slice(0, index)
    const part2 = items.slice(index + 1)
    const final = [...part1, ...part2]

    const statePropsToSave = { items: final }
    this.setStateAndSave({ statePropsToSave })
  }

  onAddItemBefore = ({ index }) => {
    const { items } = this.state

    const part1 = items.slice(0, index)
    const part2 = items.slice(index)
    const newItem = this.getNewItem()
    const final = [...part1, newItem, ...part2]

    const statePropsToSave = { items: final }
    this.setStateAndSave({ statePropsToSave })
  }

  onAddItemAfter = ({ index }) => {
    const { items } = this.state

    const part1 = items.slice(0, index + 1)
    const part2 = items.slice(index + 1)
    const newItem = this.getNewItem()
    const final = [...part1, newItem, ...part2]

    const statePropsToSave = { items: final }
    this.setStateAndSave({ statePropsToSave })
  }

  onEditItem = ({ index, item }) => {
    this.toggleItemPicker({ item, index })
  }

  setStateAndSave = ({ statePropsToSave }) => {
    this.setState({ ...statePropsToSave }, this.saveChanges)
  }

  //////////
  //////////
  //////////
  //////////

  // TODO
  // TODO
  // TODO - should crud machine double as viewer?  probably.
  // TODO
  // TODO - save this new items array to the db with the frame
  // TODO - show image for selected item
  // TODO - create a local id for use with each new object, before it is saved to the db

  onSelectItem = ({ name }) => {
    const { itemPickerItem } = this.state
    // I should probably ref this item by id
    itemPickerItem.name = name

    console.log("name", name) // zzz
    this.saveChanges()
    this.toggleItemPicker({})
  }

  saveChanges = () => {
    console.log("saveChanges") // zzz

    const { saveItems } = this.props
    const { items } = this.state
    saveItems && saveItems({ items })
  }

  toggleItemPicker = ({ index, item = null }) => {
    console.log("item", item) // zzz

    const showItemPicker = !this.state.showItemPicker
    this.setState({ showItemPicker, itemPickerItem: item })
  }

  renderItems = () => {
    const { items } = this.state

    const { buttons = DEFAULT_BUTTONS } = this.props
    const { edit, add, trash } = buttons

    const defaultItemRenderer = ({ item }) => <ImageDisplay item={item} />
    const itemRenderer = this.props.itemRenderer || defaultItemRenderer

    const renderedItems = items.map((item, index) => {
      const isLastItem = index === items.length - 1
      console.log("isLastItem", isLastItem) // zzz

      return (
        <div
          className={`${css.itemContainer}`}
          key={index}
          // onClick={() => this.onEditItem({ item, index })}
        >
          {itemRenderer({ item })}
          <Popover interactionKind={PopoverInteractionKind.HOVER}>
            <div>test</div>
            <div className={css.buttonsRow} key={index}>
              {add && (
                <Button
                  icon={IconNames.ADD}
                  className={css.itemButton}
                  onClick={() => this.onAddItemBefore({ item, index })}
                />
              )}
              {edit && (
                <Button
                  icon={IconNames.EDIT}
                  className={css.itemButton}
                  onClick={() => this.onEditItem({ item, index })}
                />
              )}
              {trash && (
                <Button
                  icon={IconNames.DELETE}
                  className={css.itemButton}
                  onClick={() => this.onDeleteItem({ item, index })}
                />
              )}
              {add && isLastItem && (
                <Button
                  icon={IconNames.ADD}
                  className={`${css.itemButton} ${css.addAfter} add-after`}
                  onClick={() => this.onAddItemAfter({ item, index })}
                />
              )}
            </div>
          </Popover>
        </div>
      )
    })

    return renderedItems || null
  }

  render() {
    const { showItemPicker } = this.state
    const { className, title = "" } = this.props

    const defaultImageSets = [
      images.creatures,
      images.locations,
      images.vehicles,
      images.items
    ]

    const imageSets = this.props.imageSets || defaultImageSets

    return (
      <div className={`${css.main} ${className ? className : ""}`}>
        {title}

        {/* TODO - pass in itemsContainer class, that can be used elsewhere without all the buttons? */}
        <div className={css.itemsContainer}>{this.renderItems()}</div>

        {showItemPicker && (
          <CharacterPicker
            isOpen={showItemPicker}
            imageSets={imageSets}
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
