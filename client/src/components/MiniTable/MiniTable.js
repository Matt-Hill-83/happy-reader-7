import React, { Component, useState } from "react"
import { TruncatedFormat, Cell, Column, Table } from "@blueprintjs/table"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./MiniTable.module.scss"
import images from "../../images/images"

class MiniTable extends Component {
  state = {}

  renderCell = (row, col) => {
    const { tableData } = this.props
    const value = tableData[row][col]

    let cellContent = null

    if (typeof value === "undefined") {
      cellContent = ""
    } else if (value === true) {
      cellContent = <span role="img">✅</span>
    } else if (value === false) {
      cellContent = <span role="img">❌</span>
    } else {
      cellContent = (
        <TruncatedFormat>{value ? value.toString() : ""}</TruncatedFormat>
      )
    }

    return (
      <Cell className={css.cellClass} tooltip={value ? value.toString() : ""}>
        {cellContent}
      </Cell>
    )
  }

  render = () => {
    const { columnNames, tableData, tableProps = {} } = this.props

    const columns = columnNames.map((name, index) => {
      return <Column key={index} cellRenderer={this.renderCell} name={name} />
    })

    const numRows = tableData.length

    return (
      <div className={css.main}>
        <Table
          minColumnWidth={5}
          numRows={numRows}
          enableRowHeader={false}
          {...tableProps}
        >
          {columns}
        </Table>
      </div>
    )
  }
}

export default observer(MiniTable)
