import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
// import _pick from "lodash.pick"
import css from "./GetSceneConfig.module.scss"

class GetSceneConfig extends Component {
  state = { text: `{"dummyData":5}` }

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
        DOWNLOAD JSON
      </Button>
    )
  }

  render = () => {
    // const { text } = this.state
    const { scenesGrid } = this.props
    console.log("scenesGrid", toJS(scenesGrid)) // zzz

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
          },
        }
        const newDialogs = oldFrame.dialog.map((item) => {
          return `{"${item.character}" : "${item.text}"}`
        })

        newFrame.dialogs = newDialogs
        newFrame.faces = oldFrame.faces
        return newFrame
      })

      outputObj[scene.location.name] = {
        sceneConfig: {
          coordinates: scene.coordinates,
          creatures: scene.characters,
          isEndScene: scene.isEndScene,
          isStartScene: scene.isStartScene,
          items: scene.items,
        },
        frames: newFrames,
        faces: scene.frameSet.faces,
      }
    })
    console.log("outputObj", outputObj) // zzz

    const output = {
      title: "title",
      scenes: outputObj,
    }

    // const flatJson = output
    const flatJson = JSON.stringify(output)
    console.log("flatJson", toJS(flatJson)) // zzz

    return (
      <div className={css.main}>
        {this.renderButton()}
        {flatJson}
        <TextArea
          className={`${css.jsonPaster} }`}
          // onChange={(event) => this.onChangeDialog({ event })}
          id="text-input"
          value={flatJson}
          // value={text}
        />
      </div>
    )
  }
}

export default observer(GetSceneConfig)
