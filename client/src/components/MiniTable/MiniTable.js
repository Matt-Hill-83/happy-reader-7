import React, { Component, useState } from "react"
import { TruncatedFormat, Cell, Column, Table } from "@blueprintjs/table"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./MiniTable.module.scss"

class MiniTable extends Component {
  state = {}

  renderCell = (row, col) => {
    const { tableData } = this.props
    const value = tableData[row][col]

    return (
      <Cell>
        <TruncatedFormat>{value.toString()}</TruncatedFormat>
      </Cell>
    )
  }

  render = () => {
    const { columnNames, tableData } = this.props

    const columns = columnNames.map((name, index) => {
      return <Column key={index} cellRenderer={this.renderCell} name={name} />
    })

    const numRows = tableData.length

    return (
      <div className={css.main}>
        <Table numRows={numRows} enableRowHeader={false}>
          {columns}
        </Table>
      </div>
    )
  }
}

export default observer(MiniTable)
