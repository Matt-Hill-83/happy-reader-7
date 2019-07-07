import React, { Component } from "react"

import css from "./Head.module.scss"
import { observer } from "mobx-react"
import { toJS } from "mobx"

class Head extends Component {
  render() {
    const {
      name,
      head: { image, mood, isEditMode },
      className = ""
    } = this.props

    let imageClassName = ""
    if (name === "kat") {
      imageClassName = css.girlHeadKat
    }

    const imageClass = imageClassName || css.girlHeadAmber

    return (
      <div className={`${css.girlHeadContainer} ${className}`}>
        <img
          className={`${css.girlHead} ${imageClass}`}
          src={image}
          alt={`${"mood"}-image`}
        />
        {isEditMode && <span className={css.moodLabel}>{mood}</span>}
      </div>
    )
  }
}

export default observer(Head)
