import React, { Component } from "react"

import Head from "../Head/Head"
import Images from "../../images/images"
import css from "./Character.module.scss"
import { observer } from "mobx-react"
import { toJS } from "mobx"

const girlImages = Images.posableGirls

// TODO - the else logic should be placed where this component is called?

class Character extends Component {
  render() {
    const { headClassName, showHeadOnly, name, mood, isEditMode } = this.props

    const images = girlImages.find((girl) => girl.name === name)

    // if there are no posable images
    if (!images) {
      const image = Images.all[name]
      // const image = Images.creatures[name]
      if (!image) return null
      return (
        <div className={css.characterContainer}>
          <img className={css.characterImage} src={image} alt={"imagex"} />
        </div>
      )
    }

    // else...
    const {
      images: { heads, body },
    } = images

    const head = heads.find((head) => head.mood === mood) || heads[0]

    const className = showHeadOnly
      ? css.headOnly
      : `${css.headForBody} ${isEditMode ? "" : css.noBorder}`

    const headOnly = (
      <Head
        name={name}
        head={head}
        className={headClassName || className}
        isEditMode={isEditMode}
      />
    )

    if (showHeadOnly) {
      return headOnly
    }

    return (
      <div className={css.girlBodyContainer}>
        <img className={`${css.girlBodyImage}`} src={body.image} alt={`name`} />
        <span className={`${css.bodyLabel}`}>{name}</span>
        {headOnly}
      </div>
    )
  }
}

export default observer(Character)
