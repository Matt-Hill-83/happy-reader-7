import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import Images from "../../images/images"
import css from "./FrameSetUploader.module.scss"
import Utils from "../../Utils/Utils"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import test100 from "../../Scripts/050-FindingScribbleScrabble"

const scenes = [`{"kat": "Oh no! look at that baby dragon over there."}`]
const dummyText = test100
// const dummyText = {
//   title: "Title Goes Here",
//   scenes: [scenes],
// }

class FrameSetUploader extends Component {
  state = { text: JSON.stringify(dummyText) }
  // state = { text: `{"dummyData":5}` }

  onChangeDialog = ({ event, lineIndex }) => {
    const text = event.target.value

    this.setState({ text })
  }

  renderButton = () => {
    const { onImportJson } = this.props
    const text = this.state.text

    let newFrameSet = { noData: 5 }

    if (text) {
      newFrameSet = JSON.parse(text)
    }

    return (
      <Button
        onClick={() => onImportJson({ newFrameSet })}
        className={cx(css.uploadButton)}
      >
        Upload JSON
      </Button>
    )
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
        {this.renderButton()}
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
