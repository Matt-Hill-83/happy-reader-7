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
  [
    "get 5 goldgoldgoldgoldgoldgoldgoldgoldgoldgoldgoldgoldgoldgoldgold",
    "not complete",
  ],
  ["make 1 friend", "complete"],
  ["eat one apple", "not complete"],
]

class MissionConsole extends Component {
  state = {}

  render = () => {
    const { world } = this.props

    return (
      <div className={css.main}>
        <div className={css.header}>
          <div className={css.title}>Your Stuff</div>
        </div>
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
