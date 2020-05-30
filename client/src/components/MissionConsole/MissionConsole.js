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
  ["get 5 gold", "not started"],
  ["eat one apple", "started"],
  ["make 1 friend", "complete"],
  ["steal diamond from trolls", "failed"],
]

class MissionConsole extends Component {
  state = {}

  render = () => {
    const { showHeader = false } = this.props

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
            <div className={css.right}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)