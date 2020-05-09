import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

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
      changeMap,
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
      const { id } = map
      const { name, title } = map.data

      const mapId = map.id
      const text = (
        <div className={css.questRow}>
          <div className={css.questName}>{title}</div>
          <div className={css.questStatus}> not complete</div>
          <div className={css.dragonPoints}>100 gold</div>
        </div>
      )
      return <div onClick={() => changeMap({ index, mapId })}>{text}</div>
    })

    return (
      <Dialog
        isOpen={showYouWinModal}
        isCloseButtonShown={true}
        className={css.main}
      >
        <div className={css.questPage}>
          <div className={css.header}>
            <span className={css.gameTitle}>Troll Bones</span>
            <span className={css.playerStats}>Your Trophys</span>
          </div>
          <div className={css.content}>
            <div className={css.questTable}>
              <div className={css.tableHeader}>
                <div className={css.name}></div>
                <div className={css.status}></div>
                <div className={css.gold}></div>
              </div>
              {mapList}
            </div>
          </div>
        </div>
        {/*
        <Button className={css.playButton} onClick={closeYouWinModal}>
          PLAY
        </Button> */}
      </Dialog>
    )
  }
}

export default observer(QuestDialog)
