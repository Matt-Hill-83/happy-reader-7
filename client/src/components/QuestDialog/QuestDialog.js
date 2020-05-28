import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import Images from "../../images/images.js"
import cx from "classnames"

import { Button, Dialog, ButtonGroup } from "@blueprintjs/core"
import Utils from "../../Utils/Utils.js"

import { maps } from "../../Stores/InitStores.js"

import css from "./QuestDialog.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

class QuestDialog extends React.Component {
  state = {}

  constructor(props) {
    super(props)
    const showProdInitialValue = localStateStore.getIsProdRelease()
    this.state = { showProd: true }
    // this.state = { showProd: showProdInitialValue }
  }

  toggleShowProd = () => {
    this.setState({ showProd: !this.state.showProd })
  }

  render = () => {
    const { showYouWinModal, onChangeWorld } = this.props
    const { showProd } = this.state

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    let filteredMaps = []

    if (showProd) {
      filteredMaps = savedMaps.filter((map) => {
        return map.data.releasedToProd
      })
    } else {
      filteredMaps = savedMaps.filter((map) => {
        return map.data.released && !map.data.releasedToProd
      })
    }

    const sortedMaps = Utils.sortDataByNestedKey({
      data: filteredMaps,
      keys: ["data", "title"],
      order: "ASC",
    })

    const mapList = sortedMaps.map((map, index) => {
      const { title } = map.data

      const mapId = map.id
      const text = (
        <div className={css.questRow}>
          <div className={cx(css.tableCell, css.questName)}>{title}</div>
          <div className={cx(css.tableCell, css.dragonPoints)}>100 </div>
          <div className={cx(css.tableCell, css.questStatus)}>
            <span role="img">✅</span>
          </div>
        </div>
      )
      return <div onClick={() => onChangeWorld({ index, mapId })}>{text}</div>
    })

    const cloudImage = Images.backgrounds["splashScreen01"]

    const tableHeader = (
      <div className={cx(css.tableHeader)}>
        <div className={cx(css.tableCell, css.name)}>Name</div>
        <div className={cx(css.tableCell, css.gold)}>Gold</div>
        <div className={cx(css.tableCell, css.status)}>Completed</div>
      </div>
    )

    const showProdButtonLabel = this.state.showProd
      ? "New Quests"
      : "Old Quests"

    return (
      <Dialog
        isOpen={showYouWinModal}
        isCloseButtonShown={true}
        className={css.main}
      >
        <ButtonGroup className={css.buttonGroup} color="primary">
          <Button onClick={this.toggleShowProd}>{showProdButtonLabel}</Button>
        </ButtonGroup>
        <img className={css.backgroundImage} src={cloudImage} alt={"imagex"} />
        <div className={css.questPage}>
          <div className={css.header}>
            {/* <span className={css.gameTitle}>Fashion Slayer</span> */}
            <span className={css.gameTitle}>
              Learn to Read! (with Ricky the Rat)
            </span>
            {/* <span className={css.gameTitle}>Liz Goes Nuts</span> */}
          </div>
          <div className={css.playerStatsSection}>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Gold</span>
              <span className={css.playerStatsValue}>500</span>
            </div>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Trophies</span>
              <span className={css.playerStatsValue}>2</span>
            </div>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Dresses</span>
              <span className={css.playerStatsValue}>0</span>
            </div>
          </div>
          <div className={css.content}>
            <div className={css.questTable}>
              {tableHeader}
              <div className={css.scrollArea}>{mapList}</div>
            </div>
          </div>
        </div>

        {/* <Button className={css.playButton} onClick={closeYouWinModal}>
          PLAY
        </Button> */}
      </Dialog>
    )
  }
}

export default observer(QuestDialog)
