import React, { Component } from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import css from "./CharacterPicker.module.scss"

import { Button, Dialog } from "@blueprintjs/core"

class CharacterPicker extends Component {
  state = {
    showFacePicker: false,
    showNarrativeEditor: true,
    showDialogEditor: true
  }

  componentWillMount() {
    const { imageSets } = this.props
    this.setState({ imageSets })
  }

  componentWillReceiveProps(newProps) {
    const { imageSets } = newProps
    this.setState({ imageSets })
  }

  selectItem = ({ itemId }) => {
    const { onSelectItem } = this.props
    onSelectItem({ itemId })
    // this.props.selectItem({ itemId })
  }

  renderItemPicker = ({ imageSet }) => {
    if (!imageSet) return null

    const renderedImages = Object.keys(imageSet).map((key, index) => {
      const image = imageSet[key]

      return (
        <div
          className={css.itemImageContainer}
          key={index}
          onClick={() => this.selectItem({})}
        >
          <span className={css.itemLabel}>{key}</span>
          <img className={css.itemImage} src={image} alt={"imagex"} />
        </div>
      )
    })

    return (
      <div className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{renderedImages}</div>
      </div>
    )
  }

  render() {
    const { imageSets } = this.state
    const { onClose } = this.props

    const renderedImageSets = imageSets.map((imageSet, index) => {
      return this.renderItemPicker({ imageSet, index })
    })

    return (
      <Dialog isOpen={true} isCloseButtonShown={true} className={css.main}>
        {renderedImageSets}
        <Button onClick={() => onClose({})}>Close</Button>
      </Dialog>
    )
  }
}

export default observer(CharacterPicker)
