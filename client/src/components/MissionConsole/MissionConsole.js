import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"
import { TruncatedFormat, Cell, Column, Table } from "@blueprintjs/table"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./MissionConsole.module.scss"

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

  renderCell = (row, col) => {
    const value = tableData[row][col]
    console.log("value", value) // zzz

    return (
      <Cell>
        <TruncatedFormat>{value.toString()}</TruncatedFormat>
      </Cell>
    )
    // return <Cell>{value.toString()}</Cell>
  }

  render = () => {
    const { world } = this.props

    const columns = columnNames.map((name, index) => {
      return <Column key={index} cellRenderer={this.renderCell} name={name} />
    })
    console.log("columns", toJS(columns)) // zzz

    const numRows = tableData.length

    return (
      <div className={css.main}>
        <div className={css.header}>
          <div className={css.title}>Your Stuff</div>
        </div>
        <div className={css.body}>
          <div className={css.row}>
            <div className={css.left}>
              <Table numRows={numRows} enableFocusedCell={false}>
                {columns}
              </Table>
            </div>
            <div className={css.right}>
              {/* <Table numRows={numRows} enableFocusedCell={false}>
                {columns}
              </Table> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
