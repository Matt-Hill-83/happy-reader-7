import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@blueprintjs/core";

import Images from "../../images/images";

import css from "./DragTest.module.scss";

const numRows = 8;
const numTargetsInRow = 5;
const COLUMN_WIDTH = 150;
const LOCATIONS_PREFIX = "locationsMap";
// const LOCATIONS_PREFIX = "locationsGrid";

export default class DragTest extends Component {
  state = {
    sourceCreatures: [],
    sourceItems: []
  };

  async componentWillMount() {
    const { locations, creatures } = this.props;
    const preAllocatedArrays = this.preAllocateArrays();

    // TODO: export and save maps
    // TODO: allow creature to be dropped into images
    const creatureObjects = creatures.map((creature, index) => {
      const { name } = creature;
      const miniLocationImage = Images.creatures[name];
      const id = `creature-${index}`;

      return {
        id,
        content: (
          <div className={css.characterImage}>
            <img src={miniLocationImage} alt={"imagex"} />
            <span className={css.characterLabel}>{name}</span>
          </div>
        )
      };
    });

    this.setState({
      sourceItems: locations,
      sourceCreatures: creatureObjects,
      ...preAllocatedArrays
    });
  }

  // a little function to help us with reordering the result
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    const removedFromDest = destClone.splice(0, destClone.length, removed);
    sourceClone.push(...removedFromDest);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 0,
    margin: 0,

    // change background color if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 0,
    width: COLUMN_WIDTH
  });

  preAllocateArrays = () => {
    const rows = Array(numRows).fill(0);
    const columns = Array(numTargetsInRow).fill(0);

    const newStateObject = {};
    const locationsMap = {};

    rows.map((row, rowIndex) => {
      const rowName = `row-${rowIndex}`;
      locationsMap[rowName] = {};
      columns.map((col, colIndex) => {
        const colName = `col-${colIndex}`;

        locationsMap[rowName][colName] = [];
        newStateObject.locationsMap = locationsMap;
      });
    });

    return newStateObject;
  };

  componentWillReceiveProps(newProps) {
    // const { items } = newProps;
  }

  getList = ({ id }) => {
    if (id === "sourceItems") {
      return this.state[id];
    } else {
      const { row, col, prefix } = this.getStorageRowColFromId({ id });

      console.log("prefix", prefix); // zzz
      if (prefix === LOCATIONS_PREFIX) {
        return this.state.locationsMap[row][col];
      }
    }
  };

  getStorageRowColFromId = ({ id }) => {
    const regex = /(?<prefix>.*)-(?<row>row-[0-9])-(?<col>col-[0-9])/;
    const idMatch = id.match(regex);

    if (idMatch != null && idMatch.groups) {
      return idMatch.groups;
    }
  };

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // for dragging within a single column
      const items = this.reorder(
        this.getList({ id: source.droppableId }),
        source.index,
        destination.index
      );

      let state = { items };

      this.setState(state);
    } else {
      const result = this.move(
        this.getList({ id: source.droppableId }),
        this.getList({ id: destination.droppableId }),
        source,
        destination
      );

      // TODO - dragging from grid to main list is broken.
      const { row, col } = this.getStorageRowColFromId({
        id: destination.droppableId
      });

      if (row) {
        const { locationsMap } = this.state;
        locationsMap[row][col] = result[destination.droppableId];

        this.setState({
          [source.droppableId]: result[source.droppableId],
          locationsMap
        });
      }
    }
  };

  renderItems = ({ provided, snapshot, items }) => {
    return (
      <div
        ref={provided.innerRef}
        style={this.getListStyle(snapshot.isDraggingOver)}
      >
        {items &&
          items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={this.getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </div>
    );
  };

  renderList = ({ droppableId, items, className }) => {
    return (
      <div className={className}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) =>
            this.renderItems({
              provided,
              snapshot,
              items
            })
          }
        </Droppable>
      </div>
    );
  };

  createLocationsGridRows = ({ numTargetsInRow, numRows, prefix }) => {
    const targetArraysRows = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const newRow = this.createLocationsGridRow({
        numTargetsInRow,
        rowIndex,
        prefix
      });
      targetArraysRows.push(<div className={css.targetRow}>{newRow}</div>);
    }
    return <div className={css.targetGrid}>{targetArraysRows}</div>;
  };

  createStoragePropertyName = ({ rowIndex, colIndex, prefix = "item" }) => {
    return `${prefix}-row-${rowIndex}-col-${colIndex}`;
  };

  createLocationsGridRow = ({ numTargetsInRow, rowIndex, prefix }) => {
    const targetArrays = [];
    for (let colIndex = 0; colIndex < numTargetsInRow; colIndex++) {
      const arrayName = this.createStoragePropertyName({
        rowIndex,
        colIndex,
        prefix
      });

      const { row, col } = this.getStorageRowColFromId({ id: arrayName });

      const newTargetArray = this.renderList({
        droppableId: arrayName,
        items: this.state.locationsMap[row][col],
        className: css.destination
      });

      targetArrays.push(newTargetArray);
    }

    return targetArrays;
  };

  saveMap = () => {
    console.log("saving map"); // zzz
    console.log("this.state", this.state); // zzz
  };

  renderSaveMapButton = () => {
    return (
      <Button tabIndex={0} className={css.newStoryBtn} onClick={this.saveMap}>
        <span> Save Map </span>
      </Button>
    );
  };

  render() {
    console.log("this.state.locationsMap", this.state.locationsMap); // zzz
    return (
      <div className={css.main}>
        <div className={css.header}>
          <div className={css.titles}>
            <div className={css.title}>World Builder</div>
            <div className={css.subTitle}>
              (drag items to create your world...)
              {this.renderSaveMapButton()}
            </div>
          </div>
        </div>
        <div className={css.content}>
          <DragDropContext className={css.main} onDragEnd={this.onDragEnd}>
            {this.renderList({
              droppableId: "sourceCreatures",
              items: this.state["sourceCreatures"],
              className: css.source
            })}
            {this.renderList({
              droppableId: "sourceItems",
              items: this.state["sourceItems"],
              className: css.source
            })}
            {this.createLocationsGridRows({
              numTargetsInRow,
              numRows,
              prefix: LOCATIONS_PREFIX
            })}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

// functions
///////////////////////
///////////////////////
///////////////////////
///////////////////////
// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };
