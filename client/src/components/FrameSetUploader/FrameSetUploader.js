import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./FrameSetUploader.module.scss"

import story002 from "../../Scripts/002-BrightNewDay"
import story003 from "../../Scripts/003-KatGetsADress"
import story004 from "../../Scripts/004-KatGoesOffScript"
import story005 from "../../Scripts/005-Whambulance"
import story010 from "../../Scripts/010-TrollSoSad"
import story011 from "../../Scripts/011-LizIsSlow"
import story013 from "../../Scripts/013-ChocolateMilk"
import story014 from "../../Scripts/014-TruthBomb"
import story015 from "../../Scripts/015-KatAndLizSplitUp"
import story050 from "../../Scripts/050-FindingScribbleScrabble"
import story100 from "../../Scripts/100-LizGoesCrazy"
import story110 from "../../Scripts/110-LizBloops"
import story200 from "../../Scripts/200-DennisTheMenace"
import story310 from "../../Scripts/310-MerlindaTheFairyPrincessPart2"
import story020 from "../../Scripts/020-TrollCaveRapBattle"

class FrameSetUploader extends Component {
  // state = { text: JSON.stringify(story002) }
  // state = { text: JSON.stringify(story003) }
  // state = { text: JSON.stringify(story004) }
  // state = { text: JSON.stringify(story005) }
  // state = { text: JSON.stringify(story010) }
  // state = { text: JSON.stringify(story011) }
  // state = { text: JSON.stringify(story013) }
  // state = { text: JSON.stringify(story014) }
  // state = { text: JSON.stringify(story015) }
  // state = { text: JSON.stringify(story020) }
  // state = { text: JSON.stringify(story050) }
  // state = { text: JSON.stringify(story100) }
  state = { text: JSON.stringify(story110) }
  // state = { text: JSON.stringify(story200) }
  // state = { text: JSON.stringify(story310) }

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
