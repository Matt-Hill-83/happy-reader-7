import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
// import _pick from "lodash.pick"
import css from "./MissionConsole.module.scss"
import { Cell, Column, Table } from "@blueprintjs/table"

const columnNames = ["Mission", "Status"]

const tableData = [
  ["get 5 gold", "not complete"],
  ["make 1 friend", "complete"],
  ["eat one apple", "not complete"],
]

class MissionConsole extends Component {
  state = {}

  onChangeDialog = ({ event, lineIndex }) => {
    const text = event.target.value

    this.setState({ text })
  }

  renderButton = () => {
    return <Button className={cx(css.uploadButton)}>DOWNLOAD JSON</Button>
  }

  renderCell = (row, col) => {
    const value = tableData[row][col]
    return <Cell value={value.toString()} />
  }

  render = () => {
    const { world } = this.props

    const columns = columnNames.map((name, index) => {
      return <Column key={index} cellRenderer={this.renderCell} name={name} />
    })
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
              <Table numRows={numRows} enableFocusedCell={false}>
                {columns}
              </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
