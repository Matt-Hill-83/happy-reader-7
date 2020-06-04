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
    if (missions.length === 0) {
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
            {/* <div className={css.right}></div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
