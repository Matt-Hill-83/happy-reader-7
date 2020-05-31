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

    const rockImageVertical = images.backgrounds["checkMarkGreen01"]
    if (value === true) {
      cellContent = <span role="img">✅</span>
    } else if (value === false) {
      cellContent = <span role="img">❌</span>
    } else {
      cellContent = <TruncatedFormat>{value.toString()}</TruncatedFormat>
    }

    return <Cell tooltip={value.toString()}>{cellContent}</Cell>
  }

  render = () => {
    const { columnNames, tableData, tableProps = {} } = this.props
    console.log("tableProps", toJS(tableProps)) // zzz

    const columns = columnNames.map((name, index) => {
      return <Column key={index} cellRenderer={this.renderCell} name={name} />
    })

    const numRows = tableData.length

    return (
      <div className={css.main}>
        <Table numRows={numRows} enableRowHeader={false} {...tableProps}>
          {columns}
        </Table>
      </div>
    )
  }
}

export default observer(MiniTable)
