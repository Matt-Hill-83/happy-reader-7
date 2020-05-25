import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./FrameSetUploader.module.scss"

import story010 from "../../Scripts/010-TrollSoSad"
import story013 from "../../Scripts/013-ChocolateMilk"
import story020 from "../../Scripts/020-RapBattles01"
import story050 from "../../Scripts/050-FindingScribbleScrabble"
import story100 from "../../Scripts/100-LizGoesCrazy"
import story110 from "../../Scripts/110-LizBloops"
import story014 from "../../Scripts/014-TruthBomb"
import story005 from "../../Scripts/005-Whambulance"
import story310 from "../../Scripts/310-MerlindaTheFairyPrincessPart2"
import testImport001 from "../../Scripts/000-aTestImport"
import template from "../../Scripts/000-ScriptTemplate.js"
import story011 from "../../Scripts/011-LizIsSlow"
// import importTest002 from "../../Scripts/020-RapBattles01-test"

class FrameSetUploader extends Component {
  // state = { text: JSON.stringify(importTest002) }
  // state = { text: JSON.stringify(story005) }
  state = { text: JSON.stringify(story011) }
  // state = { text: JSON.stringify(story010) }
  // state = { text: JSON.stringify(story013) }
  // state = { text: JSON.stringify(story014) }
  // state = { text: JSON.stringify(story020) }
  // state = { text: JSON.stringify(story050) }
  // state = { text: JSON.stringify(story110) }
  // state = { text: JSON.stringify(story310) }
  // state = { text: JSON.stringify(template) }
  // state = { text: JSON.stringify(template2) }
  // state = { text: JSON.stringify(testExport) }
  // state = { text: JSON.stringify(testImport001) }

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
