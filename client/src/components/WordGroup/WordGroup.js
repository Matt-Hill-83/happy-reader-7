import React from "react"
import { observer } from "mobx-react"

import Sounds from "../../Sounds/Sounds"

import css from "./WordGroup.module.scss"

class WordGroup extends React.Component {
  state = {
    activeScene: undefined,
    sound: null,
  }

  async componentWillMount() {
    const { story } = this.props
    this.setState({ story })
  }

  componentWillReceiveProps(newProps) {
    const { story } = newProps
    this.setState({ story })
  }

  playWordSound = (event, { word }) => {
    word = word.replace(/[.|,|/?]/, "")
    this.setState({ sound: Sounds[word] })
  }

  renderNarrative = () => {
    const { story } = this.state
    const { lineIndex } = this.props

    console.log("") // zzz
    console.log("") // zzz
    console.log("") // zzz
    console.log("lineIndex", lineIndex) // zzz

    const renderedNarrative = story.map((sentence, sentenceIndex) => {
      const parsedSentence = sentence.split(/\s/)

      const renderedSentence = parsedSentence.map((word, wordIndex) => {
        const tabIndex =
          1000 * lineIndex + 100 * sentenceIndex + (wordIndex + 1)
        console.log("sentenceIndex", sentenceIndex) // zzz
        console.log("wordIndex", wordIndex) // zzz

        console.log("tabIndex", tabIndex) // zzz

        // TODO - fix autofocus
        const autofocus = tabIndex === 1 ? { autoFocus: true } : { test: 3 }

        return (
          <span
            key={wordIndex}
            {...autofocus}
            autoFocus
            tabIndex={tabIndex}
            className={css.sentenceWord}
            // onClick={event => this.playWordSound(event, { word })}
            // onFocus={event => this.playWordSound(event, { word })}
          >
            {word}
          </span>
        )
      })

      return (
        <span key={sentenceIndex} className={css.sentence}>
          {renderedSentence}
        </span>
      )
    })

    return <div className={css.narrative}>{renderedNarrative}</div>
  }

  render() {
    const { className } = this.props

    return (
      <div className={`${css.main} ${className}`}>
        {/* <audio src={this.state.sound} autoPlay /> */}
        {this.renderNarrative()}
      </div>
    )
  }
}
export default observer(WordGroup)
