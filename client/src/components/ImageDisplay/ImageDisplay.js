import { observer } from "mobx-react"
import React, { Component } from "react"

import images from "../../images/images"

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
      item: { name, id, index }
    } = this.props

    return (
      <div className={`${css.main}`} key={id || index}>
        {name}
      </div>
    )
  }
}

export default observer(ImageDisplay)
