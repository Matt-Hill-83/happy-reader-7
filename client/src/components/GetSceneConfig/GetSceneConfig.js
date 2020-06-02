import { Button, TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
// import _pick from "lodash.pick"
import css from "./GetSceneConfig.module.scss"

class GetSceneConfig extends Component {
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
    if (!world) {
      return null
    }
    // const { scenesGrid, world } = this.props
    const scenesGrid = world.newGrid5
    const { questConfig } = world
    console.log("world", toJS(world)) // zzz

    const test1 = toJS(scenesGrid)
    console.log({ test1 })
    const newScenesList = []
    test1.forEach((scene) => {
      const oldFrames = scene.frameSet.frames

      // convert the old frames into the new frames
      const newFrames = oldFrames.map((oldFrame) => {
        const newFrame = {
          frameConfig: {
            items: [],
            id: oldFrame.id,
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

      const newBornScene = {
        title: scene.location.name,
        sceneConfig: {
          id: scene.location.id,
          worldId: world.id,
          worldTitle: world.title,
          coordinates: scene.coordinates,
          creatures,
          isEndScene: scene.isEndScene,
          isStartScene: scene.isStartScene,
        },
        frames: newFrames,
        faces: scene.frameSet.faces,
      }

      if (scene.items && scene.items.length > 0) {
        newBornScene.sceneConfig.items = scene.items
      }

      newScenesList.push(newBornScene)
    })

    const output = {
      title: "story output",
      scenes: newScenesList,
      questConfig,
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

export default observer(GetSceneConfig)
