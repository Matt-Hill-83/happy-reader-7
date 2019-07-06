import { Button } from "@blueprintjs/core"
import Frame from "../Frame/Frame.js"
import React from "react"
import WordGroup from "../WordGroup/WordGroup.js"
import _get from "lodash.get"
import css from "./WordPage.module.scss"
import { frameSetStore } from "../../Stores/FrameSetStore.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import { observer } from "mobx-react"

class WordPage extends React.Component {
  state = {
    activeScene: undefined,
    activeParagraphIndex: 0
  }

  async componentWillMount() {
    this.setState({ ...this.props.wordPageProps })
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.wordPageProps })
  }

  changeLocation = ({ sceneName }) => {
    this.setState({ activeParagraphIndex: 0 })
    const plot = localStateStore.getPlot()
    const { allScenes = {} } = plot

    const newScene = allScenes.find(scene => scene.name === sceneName)

    this.props.updateActiveScene({ activeScene: newScene })
  }

  renderButtons = () => {
    const { activeScene } = this.state
    const neighbors = activeScene.neighborNames

    const buttons = neighbors.map((neighbor, i) => {
      if (!neighbor) {
        return null
      }

      const onClick = () => this.changeLocation({ sceneName: neighbor })

      return (
        <Button key={i} onClick={onClick} className={css.choiceButton}>
          {neighbor}
        </Button>
      )
    })
    return <div className={css.decisionButtonRow}>{buttons}</div>
  }

  onClickNext = () => {
    this.setState({
      activeParagraphIndex: this.state.activeParagraphIndex + 1
    })
  }

  render() {
    const generatedNarrative = _get(
      this.state,
      "activeScene.generatedNarrative"
    )

    const { activeScene } = this.state

    if (!generatedNarrative) {
      return null
    }

    const paragraphs = generatedNarrative.story
    const activeParagraph = paragraphs[this.state.activeParagraphIndex]

    const isLastParagraph =
      this.state.activeParagraphIndex === generatedNarrative.story.length - 1

    const frameSets = frameSetStore.docs

    if (!frameSets.length) {
      return null
    }

    const myFrameSet = frameSets[0].data
    console.log("myFrameSet", myFrameSet) // zzz
    const frame = myFrameSet.frames[0]
    // frame.creatures = ["kat", "liz"]

    console.log("frame", frame) // zzz

    return (
      <div className={css.textPage}>
        <Frame
          frame={frame}
          sceneToEdit={activeScene}
          // updateFrameSet={this.updateFrameSet}
        />
        {/* pass in adder for setting tab order */}
        {/* <WordGroup story={activeParagraph} /> */}
        {!isLastParagraph && (
          <Button onClick={this.onClickNext} className={css.nextButton}>
            NEXT
          </Button>
        )}

        {isLastParagraph && this.renderButtons()}
      </div>
    )

    return (
      <div className={css.textPage}>
        {/* pass in adder for setting tab order */}
        <WordGroup story={activeParagraph} />
        {!isLastParagraph && (
          <Button onClick={this.onClickNext} className={css.nextButton}>
            NEXT
          </Button>
        )}
        {/* {isLastParagraph && (
          <WordGroup story={generatedNarrative.proposition} />
        )} */}
        {/* <WordGroup story={generatedNarrative.mission} /> */}
        {isLastParagraph && this.renderButtons()}
      </div>
    )
  }
}
export default observer(WordPage)
