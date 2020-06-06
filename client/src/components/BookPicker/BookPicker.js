import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import Images from "../../images/images.js"
import cx from "classnames"

import { Button, Dialog, ButtonGroup } from "@blueprintjs/core"
import Utils from "../../Utils/Utils.js"

import css from "./BookPicker.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

const bookList = [
  { name: "Liz Sees a Bird", imageName: "bookCover01BatOfDoom" },
  { name: "The Scary Bat!!!", imageName: "bookCover01BatOfDoom" },
  { name: "Run for the Hills!!!", imageName: "bookCover01BatOfDoom" },
]

class BookPicker extends React.Component {
  state = { showChapterView: false }

  // constructor(props) {
  //   super(props)
  //   const showProdInitialValue = localStateStore.getIsProdRelease()
  //   this.state = { showProd: true, showToggle: !showProdInitialValue }
  // }

  toggleChapterView = ({ index }) => {
    const selectedBook = bookList[index]
    console.log("selectedBook", toJS(selectedBook)) // zzz

    this.setState({
      showChapterView: !this.state.showChapterView,
      selectedBook,
    })
  }

  renderChapterView = () => {
    return (
      <div className={css.chatperView}>
        test
        <Button className={css.playButton} onClick={this.toggleChapterView}>
          Back to Book View
        </Button>
      </div>
    )
  }

  render = () => {
    const {} = this.props
    const { showChapterView, showToggle } = this.state

    const renderedBookList = bookList.map((book, index) => {
      const title = book.name

      const mapId = book.id
      const bookImage = Images.backgrounds[book.imageName]

      const text = (
        <div
          onClick={() => this.toggleChapterView({ index, mapId })}
          className={css.questRow}
        >
          <div className={cx(css.tableCell)}>
            <div className={cx(css.questName)}>{title}</div>
            <img className={css.bookImage} src={bookImage} alt={"imagex"} />
          </div>
        </div>
      )
      return text
    })

    const backgroundImage = Images.backgrounds["meadow"]

    const showProdButtonLabel = "Back To Book LIst"
    console.log("showChapterView", showChapterView) // zzz

    return (
      <Dialog isOpen={true} isCloseButtonShown={true} className={css.main}>
        {showToggle && (
          <ButtonGroup className={css.buttonGroup} color="primary">
            <Button onClick={this.toggleShowProd}>{showProdButtonLabel}</Button>
          </ButtonGroup>
        )}
        <img
          className={css.backgroundImage}
          src={backgroundImage}
          alt={"imagex"}
        />
        <div className={css.questPage}>
          <div className={css.header}>
            <span className={css.gameTitle}>Dress Quest IV</span>
          </div>
          <div className={css.playerStatsSection}>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Gold</span>
              <span className={css.playerStatsValue}>500</span>
            </div>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Trophies</span>
              <span className={css.playerStatsValue}>2</span>
            </div>
            <div className={css.playerStatsRow}>
              <span className={css.playerStatsKey}>Dresses</span>
              <span className={css.playerStatsValue}>0</span>
            </div>
          </div>
          {showChapterView && this.renderChapterView()}
          <div className={css.content}>
            {!showChapterView && (
              <div className={css.questTable}>
                <div className={css.scrollArea}>{renderedBookList}</div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default observer(BookPicker)
