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

class MissionConsole extends Component {
  state = {}

  render = () => {
    console.log("render mission console----------------------------") // zzz
    console.log("render mission console----------------------------") // zzz
    console.log("render mission console----------------------------") // zzz

    const { showHeader = false } = this.props

    const questStatus = localStateStore.getQuestStatus()
    if (!questStatus.questConfig) {
      return null
    }
    const { missions, pockets } = questStatus.questConfig

    const columnNames = ["Mission", "Bring the", "to the", "Gold", "Complete"]
    const tableProps = { columnWidths: [175, 40, 40, null, null] }
    if (missions.length === 0) {
      return null
    }
    const tableData = missions.map((mission) => {
      const { name, item, recipient, rewards, completed } = mission

      const rewardString = `${rewards[0].amount}`
      return [name, item.name, recipient.name, rewardString, completed]
    })

    const columnNamesRewards = ["Loot", ""]
    const tableProps2 = {}
    // const tableProps2 = { columnWidths: [150, 60] }
    const rewards = localStateStore.getQuestRewards()

    const tableDataRewards = rewards.map((reward) => {
      const { name, amount } = reward
      return [name, amount]
    })

    const columnNames3 = ["Pockets", ""]
    const tableProps3 = {}

    const tableDataPockets = []
    for (const itemName in pockets) {
      const { amount } = pockets[itemName]
      tableDataPockets.push([itemName, amount])
    }

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
              {/* <MiniTable
                tableProps={tableProps2}
                columnNames={columnNamesRewards}
                tableData={tableDataRewards}
              /> */}
              <MiniTable
                tableProps={tableProps3}
                columnNames={columnNames3}
                tableData={tableDataPockets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
