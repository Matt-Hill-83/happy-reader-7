import { observer } from "mobx-react"
import React, { Component } from "react"
import { toJS } from "mobx"

import Images from "../../images/images"

import css from "./ImageDisplay.module.scss"

class ImageDisplay extends Component {
  state = {}

  componentWillMount() {
    let { items = [] } = this.props
    this.setState({ items: [...items] })
    console.log("items", toJS(items)) // zzz
  }

  componentWillReceiveProps(newProps) {
    let { items = [] } = newProps
    this.setState({ items: [...items] })
  }

  render() {
    const {
      item: { name, id, index },
      showLabel,
      className,
    } = this.props
    console.log("name---------------------------------------------", name) // zzz

    const image = this.props.images || Images.all[name]
    console.log("image", toJS(image)) // zzz

    return (
      <div
        className={`${css.main} ${className ? className : ""}`}
        key={id || index}
      >
        <div className={css.imageContainer}>
          {image && <img className={css.image} src={image} alt={name} />}
          {showLabel && <span className={`${css.itemLabel}`}>{name}</span>}
        </div>
      </div>
    )
  }
}

export default observer(ImageDisplay)
