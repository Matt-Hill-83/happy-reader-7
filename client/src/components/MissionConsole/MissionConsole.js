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
    const world = localStateStore.getActiveWorld()

    console.log("world", toJS(world)) // zzz

    console.log("world.data.questConfig", toJS(world.data.questConfig)) // zzz
    const missions = _get(world, "data.questConfig.missions") || []
    const pockets = _get(world, "data.questConfig.pockets") || []
    const missionNames = missions.map((item) => item.name)
    const pocketNames = pockets.map((item) => item.name)
    console.log("missionNames", toJS(missionNames)) // zzz
    console.log("pocketNames", toJS(pocketNames)) // zzz

    const { showHeader = false } = this.props

    const columnNames = ["Mission", "Status"]

    const tableData = missions.map((mission) => {
      const { item, recipient, name, rewards } = mission

      const missionString = `${name}:  find the ${item.name} and give it to ${recipient.name} to get ${rewards[0].name}`
      return [missionString, true]
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
              <MiniTable columnNames={columnNames} tableData={tableData} />
            </div>
            <div className={css.right}>{`GOLD:     0`}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
