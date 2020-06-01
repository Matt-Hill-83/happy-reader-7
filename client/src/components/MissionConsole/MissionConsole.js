import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"
import { TruncatedFormat, Cell, Column, Table } from "@blueprintjs/table"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./MissionConsole.module.scss"
import MiniTable from "../MiniTable/MiniTable"

const columnNames = ["Mission", "Status"]

const tableData = [
  ["talk on pretend phone", true],
  ["eat one apple", false],
  ["make 1 friend", false],
  ["get 5 gold", false],
  ["steal diamond from trolls", false],
  ["win rap battle", false],
]

class MissionConsole extends Component {
  state = {}

  render = () => {
    const { showHeader = false, world = {} } = this.props
    console.log("world.questConfig", toJS(world.questConfig)) // zzz
    console.log("world", toJS(world.questConfig)) // zzz

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
