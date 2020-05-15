import { Button, TextArea } from "@blueprintjs/core"
import React, { Component } from "react"
import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import Images from "../../images/images"
import css from "./FrameSetUploader.module.scss"
import Utils from "../../Utils/Utils"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"

class FrameSetUploader extends Component {
  state = { text: `{"cat":5}` }

  onChangeDialog = ({ event, lineIndex }) => {
    const { text } = this.state
    const newText = event.target.value

    this.setState({ text: newText })
  }

  render = () => {
    const {} = this.props
    const { text } = this.state

    let test = {}

    if (text) {
      test = JSON.parse(text)
    }
    console.log("test", test) // zzz

    return (
      <div className={css.main}>
        <TextArea
          className={`${css.jsonPaster} }`}
          onChange={(event) => this.onChangeDialog({ event })}
          id="text-input"
          value={text}
          // onBlur={(event) => this.saveDialog({ event })}
        />
      </div>
    )
  }
}

export default observer(FrameSetUploader)
