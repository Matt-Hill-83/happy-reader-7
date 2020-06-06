import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import Images from "../../images/images.js"
import cx from "classnames"

import { Button, Dialog, ButtonGroup } from "@blueprintjs/core"
import Utils from "../../Utils/Utils.js"

import { maps } from "../../Stores/InitStores.js"

import css from "./BookTableOfContents.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

class BookTableOfContents extends React.Component {
  state = {}

  constructor(props) {
    super(props)
    const showProdInitialValue = localStateStore.getIsProdRelease()
    this.state = { showProd: true, showToggle: !showProdInitialValue }
  }

  toggleShowProd = () => {
    this.setState({ showProd: !this.state.showProd })
  }

  render = () => {
    const { selectedBook, onChangeWorld } = this.props
    const {} = this.state

    console.log("selectedBook", toJS(selectedBook)) // zzz

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    let filteredMaps = []

    filteredMaps = savedMaps.filter((map) => {
      return (
        map.data.released &&
        map.data.releasedToProd &&
        selectedBook.chapters.includes(map.id)
      )
    })

    const sortedMaps = Utils.sortDataByNestedKey({
      data: filteredMaps,
      keys: ["data", "title"],
      order: "ASC",
    })

    const mapList = sortedMaps.map((map, index) => {
      const { title } = map.data

      const mapId = map.id
      console.log("mapId", mapId) // zzz

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

    const tableHeader = (
      <div className={cx(css.tableHeader)}>
        <div className={cx(css.tableCell, css.name)}>Name</div>
        <div className={cx(css.tableCell, css.gold)}>Gold</div>
        <div className={cx(css.tableCell, css.status)}>Completed</div>
      </div>
    )

    return (
      <div className={css.main}>
        <div className={css.questTable}>
          {tableHeader}
          <div className={css.scrollArea}>{mapList}</div>
        </div>
      </div>
    )
  }
}

export default observer(BookTableOfContents)
