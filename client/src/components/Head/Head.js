import { observer } from "mobx-react"
import { toJS } from "mobx"
import React, { Component } from "react"

import css from "./Head.module.scss"

class Head extends Component {
  render() {
    const {
      head: { image, mood },
      className = "",
      imageClassName = ""
    } = this.props

    const imageClass = imageClassName || css.girlHeadAmber

    return (
      <div className={`${css.girlHeadContainer} ${className}`}>
        <img
          className={`${css.girlHead} ${imageClass}`}
          src={image}
          alt={`${"mood"}-image`}
        />
        <span className={css.moodLabel}>{mood}</span>
      </div>
    )
  }
}

export default observer(Head)
