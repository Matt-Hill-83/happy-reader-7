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
    const { showHeader = false } = this.props
    const world = localStateStore.getActiveWorld()
    const missions = _get(world, "data.questConfig.missions") || []

    const questStatus = localStateStore.getQuestStatus()

    const columnNames = ["Mission", "Gold", ""]
    // const tableProps = { columnWidths: [175, 40, 40] }
    const tableProps = {}
    if (missions.length === 0) {
      return null
    }
    const tableData = missions.map((mission) => {
      const { item, recipient, rewards } = mission

      const missionString = `Bring the ${item.name} to the ${recipient.name}`
      const rewardString = `${rewards[0].amount}`
      return [missionString, rewardString, true]
    })

    const columnNames2 = ["Loot", ""]
    const tableProps2 = {}
    // const tableProps2 = { columnWidths: [150, 60] }
    const rewards = localStateStore.getQuestRewards()

    const tableDataRewards = rewards.map((reward) => {
      const { name, amount } = reward
      return [name, amount]
    })

    const columnNames3 = ["Pockets", ""]
    const tableProps3 = { columnWidths: [150, 60] }
    const tableData3 = questStatus.questConfig.pockets.map((item) => {
      const { name, amount } = item
      return [name, amount]
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
              <MiniTable
                tableProps={tableProps2}
                columnNames={columnNames2}
                tableData={tableDataRewards}
              />
              <MiniTable
                tableProps={tableProps3}
                columnNames={columnNames3}
                tableData={tableData3}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
