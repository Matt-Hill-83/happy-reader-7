import { Button } from "@blueprintjs/core"
import React, { Component } from "react"
import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import Images from "../../images/images"
import css from "./ArrowNavigator.module.scss"
import Utils from "../../Utils/Utils"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"

class ArrowNavigator extends Component {
  changeLocation = ({ sceneId }) => {
    localStateStore.incrementActiveFrameIndex(true)
    this.props.updateActiveScene({ sceneId })
  }

  render = () => {
    const { activeScene } = this.props
    const { coordinates } = activeScene

    const neighbors = Utils.getNeighbors({
      coordinates,
    })

    const buttons = Object.keys(neighbors).map((neighborKey, i) => {
      const neighbor = neighbors[neighborKey]

      const neighborName = _get(neighbor, "location.name") || ""

      const onClick = neighbor
        ? () =>
            this.changeLocation({
              sceneId: neighbor.id,
            })
        : null

      const classNames = {
        left: css.sceneLeft,
        right: css.sceneRight,
        top: css.sceneTop,
        bottom: css.sceneBottom,
      }

      const className = classNames[neighborKey]

      return (
        <Button
          key={i}
          onClick={onClick}
          className={cx(css.choiceButton, className)}
        >
          {neighborName}
        </Button>
      )
    })

    const fourArrows = Images.backgrounds["four_arrows"]
    const diamond2 = Images.backgrounds["diamond2"]
    return (
      <div className={css.arrowNavigatorContainer}>
        <img className={css.diamond2Image} src={diamond2} alt={"imagex"} />
        <img className={css.fourArrowsImage} src={fourArrows} alt={"imagex"} />
        {buttons}
      </div>
    )
  }
}

export default observer(ArrowNavigator)
