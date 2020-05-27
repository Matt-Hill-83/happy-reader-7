import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
// import _pick from "lodash.pick"
import css from "./BuildEpic.module.scss"

class BuildEpic extends Component {
  state = { text: `{"dummyData":5}` }

  onChangeDialog = ({ event, lineIndex }) => {
    const text = event.target.value

    this.setState({ text })
  }

  renderButton = () => {
    return <Button className={cx(css.uploadButton)}>DOWNLOAD JSON</Button>
  }

  render = () => {
    const { scenesGrid } = this.props

    const test1 = toJS(scenesGrid)
    console.log({ test1 })
    const outputObj = {}
    test1.forEach((scene) => {
      const oldFrames = scene.frameSet.frames

      // convert the old frames into the new frames
      const newFrames = oldFrames.map((oldFrame) => {
        const newFrame = {
          frameConfig: {
            items: [],
            faces: oldFrame.faces,
            creatures: oldFrame.creatures,
          },
        }
        const newDialogs = oldFrame.dialog.map((item) => {
          return `{"${item.character}" : "${item.text}"}`
        })

        newFrame.dialogs = newDialogs
        return newFrame
      })

      const creatures = scene.characters.map((item) => item.name)

      const newOutput = {
        sceneConfig: {
          coordinates: scene.coordinates,
          creatures,
          isEndScene: scene.isEndScene,
          isStartScene: scene.isStartScene,
        },
        frames: newFrames,
        faces: scene.frameSet.faces,
      }

      if (scene.items && scene.items.length > 0) {
        newOutput.sceneConfig.items = scene.items
      }

      outputObj[scene.location.name] = newOutput
    })

    const output = {
      title: "title-zzz",
      scenes: outputObj,
    }

    const flatJson = JSON.stringify(output)

    return (
      <div className={css.main}>
        {this.renderButton()}
        {flatJson}
        <TextArea
          className={`${css.jsonPaster} }`}
          id="text-input"
          value={flatJson}
        />
      </div>
    )
  }
}

export default observer(BuildEpic)
