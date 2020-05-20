import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./FrameSetUploader.module.scss"

import story010 from "../../Scripts/010-TurnSix"
import story013 from "../../Scripts/013-ChocolateMilk"
import story020 from "../../Scripts/020-RapBattles01"
import story050 from "../../Scripts/050-FindingScribbleScrabble"
import story100 from "../../Scripts/100-LizGoesCrazy"
import story110 from "../../Scripts/110-LizBloops"

class FrameSetUploader extends Component {
  state = { text: JSON.stringify(story013) }
  // state = { text: JSON.stringify(story010) }
  // state = { text: JSON.stringify(story020) }
  // state = { text: JSON.stringify(story110) }
  // state = { text: JSON.stringify(story050) }
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
    const { text } = this.state

    return (
      <div className={css.main}>
        {this.renderButton()}
        <TextArea
          className={`${css.jsonPaster} }`}
          onChange={(event) => this.onChangeDialog({ event })}
          id="text-input"
          value={text}
        />
      </div>
    )
  }
}

export default observer(FrameSetUploader)
