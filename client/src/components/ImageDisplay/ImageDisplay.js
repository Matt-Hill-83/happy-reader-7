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

  renderImage = ({ name }) => {
    const image = this.props.images || Images.all[name]

    return (
      <div className={css.imageContainer}>
        <img className={css.image} src={image} alt={name} />
        <span className={`${css.itemLabel}`}>{name}</span>
      </div>
    )
  }

  render() {
    const {
      item: { name, id, index, image }
    } = this.props

    console.log("image", image) // zzz

    return (
      <div className={`${css.main}`} key={id || index}>
        {this.renderImage({ name })}
        {/* {name} */}
      </div>
    )
  }
}

export default observer(ImageDisplay)
