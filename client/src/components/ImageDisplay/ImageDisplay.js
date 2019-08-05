import { observer } from "mobx-react"
import React, { Component } from "react"

import Images from "../../images/images"

import css from "./ImageDisplay.module.scss"

class ImageDisplay extends Component {
  state = {}

  componentWillMount() {
    let { items = [] } = this.props
    this.setState({ items: [...items] })
  }

  componentWillReceiveProps(newProps) {
    let { items = [] } = newProps
    this.setState({ items: [...items] })
  }

  render() {
    const {
      item: { name, id, index },
      showLabel
    } = this.props

    const image = this.props.images || Images.all[name]
    console.log("image", image) // zzz

    return (
      <div className={`${css.main}`} key={id || index}>
        <div className={css.imageContainer}>
          <img className={css.image} src={image} alt={name} />
          {showLabel && <span className={`${css.itemLabel}`}>{name}</span>}
        </div>
      </div>
    )
  }
}

export default observer(ImageDisplay)
