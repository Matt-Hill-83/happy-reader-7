import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"
import { TruncatedFormat, Cell, Column, Table } from "@blueprintjs/table"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./MissionConsole.module.scss"
import MiniTable from "../MiniTable/MiniTable"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import ImageDisplay from "../ImageDisplay/ImageDisplay"

class MissionConsole extends Component {
  state = {}

  renderPocketItems = ({ goldOnly = false }) => {
    const questStatus = localStateStore.getQuestStatus()
    console.log("questStatus-----FV---------------", toJS(questStatus)) // zzz

    const items = _get(questStatus, "pockets") || null

    const itemKeys = Object.keys(items)
    if (itemKeys.length === 0 || !items) {
      return null
    }

    let filteredItemKeys
    console.log("filteredItemKeys", toJS(filteredItemKeys)) // zzz
    console.log("goldOnly", goldOnly) // zzz

    const prizes = ["gold", "dress", "trophy"]
    if (goldOnly) {
      filteredItemKeys = itemKeys.filter((item) => prizes.includes(item))
    } else {
      filteredItemKeys = itemKeys.filter((item) => !prizes.includes(item))
    }

    const renderedItems = filteredItemKeys.map((key, index) => {
      const existingItem = items[key]
      const { amount } = existingItem
      console.log("existingItem------------------->>>", toJS(existingItem)) // zzz

      const newItem = { name: key, index }
      console.log("key================-=-=-=-", toJS(key)) // zzz

      return (
        <ImageDisplay
          className={css.itemContainer}
          item={newItem}
          showLabel={true}
          amount={amount}
        />
      )
    })

    return <div className={css.items}>{renderedItems}</div>
  }

  render = () => {
    console.log("render mission console----------------------------") // zzz

    const { showHeader = false } = this.props

    const questStatus = localStateStore.getQuestStatus()
    if (!questStatus.questConfig) {
      return null
    }
    const { missions } = questStatus.questConfig

    const columnNames = [
      "Mission",
      "Bring the...",
      "to the...",
      "Gold",
      "Complete",
    ]
    const tableProps = { columnWidths: [175, 80, 80, null, null] }
    if (!missions || missions.length === 0) {
      return null
    }
    const tableData = missions.map((mission) => {
      const { name, item, recipient, rewards, completed } = mission

      const rewardString = `${rewards[0].amount}`
      return [name, item.name, recipient.name, rewardString, completed]
    })

    return (
      <div className={css.main}>
        {showHeader && (
          <div className={css.header}>
            <div className={css.title}>Your Stuff</div>
          </div>
        )}
        <div className={css.body}>
          <div className={css.row}>
            <div className={css.left}>
              <MiniTable
                columnNames={columnNames}
                tableData={tableData}
                tableProps={tableProps}
              />
            </div>
            <div className={css.right}>
              <div className={css.itemsContainerBox}>
                <div className={css.itemsContainer}>
                  <div className={css.itemContainerTitle}>Your Pockets</div>
                  {this.renderPocketItems({ goldOnly: false })}
                </div>
                <div className={css.itemsContainer}>
                  <div className={css.itemContainerTitle}>Prizes</div>
                  {this.renderPocketItems({ goldOnly: true })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
