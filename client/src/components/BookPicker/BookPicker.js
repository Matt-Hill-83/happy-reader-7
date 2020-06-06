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
import BookTableOfContents from "../BookTableOfContents/BookTableOfContents.js"

const bookList = [
  {
    name: "Liz Sees a Bird",
    imageName: "bookCover01BatOfDoom",
    chapters: ["yFhG3pGNtOVZKoQ7K5fG"],
  },
  {
    name: "The Scary Bat!!!",
    imageName: "bookCover01BatOfDoom",
    chapters: ["yFhG3pGNtOVZKoQ7K5fG", "Kx78cfHCkhpm2NQnmCp8"],
  },
  {
    name: "Run for the Hills!!!",
    imageName: "bookCover01BatOfDoom",
    chapters: [
      "yFhG3pGNtOVZKoQ7K5fG",
      "Kx78cfHCkhpm2NQnmCp8",
      "ZR0GOSFFqFPoWjSgvgOQ",
    ],
  },
]

class BookPicker extends React.Component {
  state = { showChapterView: false, selectedBook: bookList[0] }

  toggleChapterView = ({ index }) => {
    const selectedBook = bookList[index]
    console.log("selectedBook", toJS(selectedBook)) // zzz

    this.setState({
      showChapterView: !this.state.showChapterView,
      selectedBook,
    })
  }

  renderChapterView = () => {
    const { selectedBook } = this.state

    const bookImage = Images.backgrounds[selectedBook.imageName]
    const bookTableOfContents01 = Images.backgrounds["bookTableOfContents01"]

    return (
      <div className={css.chapterView}>
        <img
          className={cx(css.bookTableOfContents01)}
          src={bookTableOfContents01}
          alt={"imagex"}
        />
        <img
          className={cx(css.bookImage, css.bookImageChapterView)}
          src={bookImage}
          alt={"imagex"}
        />
        <BookTableOfContents
          selectedBook={selectedBook}
          onChangeWorld={this.props.onChangeWorld}
        />
        <Button className={css.playButton} onClick={this.toggleChapterView}>
          Back
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
          <div className={css.content}>
            <div className={css.questTable}>
              <div className={css.scrollArea}>{renderedBookList}</div>
            </div>
            {this.renderChapterView()}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default observer(BookPicker)
