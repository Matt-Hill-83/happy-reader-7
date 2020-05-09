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

  onChangeMap = ({ mapId }) => {
    localStateStore.setActiveMapId(mapId)

    this.initWorld()
  }

  render = () => {
    const {
      closeYouWinModal,
      showReleased,
      showYouWinModal,
      onChangeMap,
    } = this.props
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    const filteredMaps = showReleased
      ? savedMaps
      : savedMaps.filter((map) => map.data.released)

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
          <div className={cx(css.tableCell, css.dragonPoints)}>100 gold</div>
          <div className={cx(css.tableCell, css.questStatus)}>X</div>
        </div>
      )
      return <div onClick={() => onChangeMap({ index, mapId })}>{text}</div>
    })

    const cloudImage = Images.backgrounds["splashScreen01"]

    return (
      <Dialog
        isOpen={showYouWinModal}
        isCloseButtonShown={true}
        className={css.main}
      >
        <img className={css.backgroundImage} src={cloudImage} alt={"imagex"} />
        <div className={css.questPage}>
          <div className={css.header}>
            <span className={css.gameTitle}>Troll Bones</span>
          </div>
          <div className={css.playerStatsSection}>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Gold Coins</span>
              <span className={css.playerStatsValue}>500</span>
            </div>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Trophies</span>
              <span className={css.playerStatsValue}>500</span>
            </div>
          </div>
          <div className={css.content}>
            <div className={css.questTable}>
              <div className={css.tableHeader}>
                <div className={cx(css.tableCell, css.name)}>name</div>
                <div className={cx(css.tableCell, css.status)}>completed</div>
                <div className={cx(css.tableCell, css.gold)}>Prize</div>
              </div>
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
