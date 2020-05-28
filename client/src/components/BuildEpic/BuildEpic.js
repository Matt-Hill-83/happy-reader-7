import { Button } from "@blueprintjs/core"
import React, { Component } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./BuildEpic.module.scss"

import story002 from "../../Scripts/002-BrightNewDay"
import story003 from "../../Scripts/003-KatGetsADress"
import story004 from "../../Scripts/004-KatGoesOffScript"
import story005 from "../../Scripts/005-Whambulance"
import story010 from "../../Scripts/010-TrollSoSad"
import story011 from "../../Scripts/011-LizIsSlow"
import story013 from "../../Scripts/013-ChocolateMilk"
import story014 from "../../Scripts/014-TruthBomb"
import story015 from "../../Scripts/015-KatAndLizSplitUp"
import story020 from "../../Scripts/020-TrollCaveRapBattle"
import story050 from "../../Scripts/050-FindingScribbleScrabble"
import story100 from "../../Scripts/100-LizGoesCrazy"
import story110 from "../../Scripts/110-LizBloops"
import story200 from "../../Scripts/200-DennisTheMenace"
import story310 from "../../Scripts/310-MerlindaTheFairyPrincessPart2"

const epicName = "000 - Epic test - 105"
const storyList = [
  story002,
  story003,
  story004,
  story005,
  story010,
  story011,
  story013,
  story014,
  story015,
  story020,
  story050,
  story100,
  // story110,
  // story200,
  // story310,
]

class BuildEpic extends Component {
  onClickBuildEpic = () => {
    const { onImportJson } = this.props
    console.log("onClickBuildEpic") // zzz

    const epicStory = {
      title: epicName,
      description: epicName,
      scenes: {},
      scenes2: [],
    }
    console.log("epicStory", toJS(epicStory)) // zzz

    let column = 0

    const scenes2 = []

    storyList.forEach((story, storyIndex) => {
      console.log("story", toJS(story)) // zzz

      const clonedStory = JSON.parse(JSON.stringify(story))
      console.log("clonedStory.scenes", toJS(clonedStory.scenes)) // zzz

      const { scenes } = clonedStory

      scenes.forEach((scene) => {
        const coords = { row: storyIndex, col: column }
        console.log("coords", coords) // zzz

        scene.sceneConfig.storyIndex = storyIndex
        scene.sceneConfig.coordinates = coords
        scenes2.push(scene)
        column += 1
      })

      // nudge colum to the left after each story, so the start of the next story is
      // directly under the finish of the last story
      column -= 1
    })

    epicStory.scenes2 = scenes2
    console.log("epicStory", toJS(epicStory)) // zzz

    onImportJson({ newFrameSet: epicStory })
  }

  render = () => {
    return (
      <div className={css.main}>
        <Button
          onClick={this.onClickBuildEpic}
          className={cx(css.uploadButton)}
        >
          BUILD EPIC
        </Button>
      </div>
    )
  }
}

export default observer(BuildEpic)
