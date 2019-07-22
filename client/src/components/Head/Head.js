import React, { Component } from "react"

import css from "./Head.module.scss"
import { observer } from "mobx-react"
import { toJS } from "mobx"

class Head extends Component {
  render() {
    console.log("this.props", this.props) // zzz

    const {
      name,
      head: { image, mood, isEditMode },
      className = ""
    } = this.props

    let imageClassName = ""
    if (name === "kat" || name === "liz2") {
      imageClassName = css.girlHeadKat
    }

    // if (name === "liz2") {
    //   imageClassName = css.girlHeadAmber
    // }

    const imageClass = imageClassName || css.girlHeadAmber
    const containerClass = imageClassName || css.girlHeadAmberContainer

    return (
      <div
        className={`${css.girlHeadContainer} ${className}  ${containerClass}`}
      >
        <img
          className={`${css.girlHead} ${imageClass}`}
          src={image}
          alt={"mood"}
        />
        {isEditMode && <span className={css.moodLabel}>{mood}</span>}
      </div>
    )
  }
}

export default observer(Head)
