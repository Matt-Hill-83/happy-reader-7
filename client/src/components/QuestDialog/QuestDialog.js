import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import Images from "../../images/images.js"
import cx from "classnames"

import { Button, Dialog } from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import css from "./QuestDialog.module.scss"
import Utils from "../../Utils/Utils.js"
import { Checkbox } from "material-ui"

class QuestDialog extends React.Component {
  state = {
    activeScene: undefined,
    showYouWinModal: true,
  }

  openYouWinModal = () => {
    this.setState({ showYouWinModal: true })
  }

  onChangeWorld = ({ mapId }) => {
    localStateStore.setActiveMapId(mapId)

    this.initWorld()
  }

  render = () => {
    const {
      closeYouWinModal,
      showReleased,
      showProd,
      showYouWinModal,
      onChangeWorld,
    } = this.props

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    const filteredMaps = showProd
      ? savedMaps
      : savedMaps.filter((map) => map.data.releasedToProd)

    // const filteredMaps = showReleased
    //   ? savedMaps
    //   : savedMaps.filter((map) => map.data.released)

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
          <div className={cx(css.tableCell, css.questStatus)}>X</div>
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

    return (
      <Dialog
        isOpen={showYouWinModal}
        isCloseButtonShown={true}
        className={css.main}
      >
        <img className={css.backgroundImage} src={cloudImage} alt={"imagex"} />
        <div className={css.questPage}>
          <div className={css.header}>
            <span className={css.gameTitle}>Troll Mash Up</span>
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
              <span className={css.playerStatsKey}>Quests Won</span>
              <span className={css.playerStatsValue}>0</span>
            </div>
          </div>
          <div className={css.content}>
            <div className={css.questTable}>
              {tableHeader}
              {mapList}
            </div>
          </div>
        </div>

        <Button className={css.playButton} onClick={closeYouWinModal}>
          PLAY
        </Button>
      </Dialog>
    )
  }
}

export default observer(QuestDialog)
