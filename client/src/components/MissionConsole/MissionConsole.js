import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
// import _pick from "lodash.pick"
import css from "./MissionConsole.module.scss"

class MissionConsole extends Component {
  state = { text: `{"dumm":5}` }

  onChangeDialog = ({ event, lineIndex }) => {
    const text = event.target.value

    this.setState({ text })
  }

  renderButton = () => {
    return <Button className={cx(css.uploadButton)}>DOWNLOAD JSON</Button>
  }

  render = () => {
    const { world } = this.props

    return (
      <div className={css.main}>
        <div className={css.header}>
          <div className={css.title}>Your Stuff</div>
        </div>
        <div className={css.row}>
          <div className={css.left}>left</div>
          <table>test</table>
          <div className={css.right}>right</div>
        </div>
      </div>
    )
  }
}

export default observer(MissionConsole)
