import React, { Component } from "react"

import Head from "../Head/Head"
import Images from "../../images/images"
import css from "./Character.module.scss"
import { observer } from "mobx-react"
import { toJS } from "mobx"

const girlImages = Images.posableGirls

class Character extends Component {
  render() {
    const { name, mood, isEditMode } = this.props

    const images = girlImages.find(girl => girl.name === name)

    const {
      images: { heads, body }
    } = images

    const head = heads.find(head => head.mood === mood)

    const className = `${css.headForBody} ${isEditMode ? "" : css.noBorder}`

    return (
      <div className={css.girlBodyContainer}>
        <img
          className={`${css.girlBodyImage}`}
          src={body.image}
          alt={`${name}-image`}
        />
        <span className={`${css.bodyLabel}`}>{name}</span>
        <Head
          name={name}
          head={head}
          className={className}
          isEditMode={isEditMode}
        />
      </div>
    )
  }
}

export default observer(Character)
