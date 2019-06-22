import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@blueprintjs/core";

import Images from "../../images/images";

import css from "./DragTest.module.scss";

const numRows = 8;
const numTargetsInRow = 5;
const COLUMN_WIDTH = 150;
const LOCATIONS_PREFIX = "locationsGrid";

export default class DragTest extends Component {
  state = {
    destinationMatrix: {}
  };

  async componentWillMount() {
    const { locations, creatures } = this.props;
    const preAllocatedArrays = this.preAllocateArrays();

    // TODO: export and save maps
    // TODO: allow creature to be dropped into images
    const creatureObjects = creatures.map((creature, index) => {
      const { name } = creature;
      const miniLocationImage = Images.creatures[name];
      return {
        id: `creature-${index}`,
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

  preAllocateArrays = () => {
    const rows = Array(numRows).fill(0);
    const columns = Array(numTargetsInRow).fill(0);

    const newStateObject = {};
    const locationsMap = {};

    const prefix = LOCATIONS_PREFIX;

    rows.map((row, rowIndex) => {
      const rowName = `row-${rowIndex}`;
      locationsMap[rowName] = {};
      columns.map((col, colIndex) => {
        const colName = `col-${colIndex}`;

        locationsMap[rowName][colName] = [];
        const arrayName = this.createStoragePropertyName({
          rowIndex,
          colIndex,
          prefix
        });

        newStateObject[arrayName] = [];
        newStateObject.locationsMap = locationsMap;
      });
    });

    console.log("locationsMap", locationsMap); // zzz

    return newStateObject;
  };

  componentWillReceiveProps(newProps) {
    const { items } = newProps;
    this.setState({ items });
  }

  getList = ({ id }) => {
    console.log("id", id); // zzz

    if (id === "sourceItems") {
      console.log("id is sourceItems"); // zzz

      const list = this.state[id];
      return list;
    } else {
      const { row, col } = this.getStorageRowColFromId({ id });
      console.log("test2", row, col); // zzz

      const list2 = this.state.locationsMap[row][col];
      console.log("list2", list2); // zzz
      return list2;
    }
  };

  getStorageRowColFromId = ({ id }) => {
    // console.log("id", id); // zzz

    const regex = /.*(?<row>row-[0-9])-(?<col>col-[0-9])/;
    const test = id.match(regex);
    // console.log("test", test); // zzz

    // TODO - dragging from grid to main list is broken.
    // does not work for dragging back to source
    // if (test != null && test.groups) {
    return test.groups;
    // }
  };

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // for dragging within a single column
      const items = reorder(
        this.getList({ id: source.droppableId }),
        source.index,
        destination.index
      );

      let state = { items };

      this.setState(state);
    } else {
      const result = move(
        this.getList({ id: source.droppableId }),
        this.getList({ id: destination.droppableId }),
        source,
        destination
      );

      const regex = /.*(?<row>row-[0-9])-(?<col>col-[0-9])/;
      const test = destination.droppableId.match(regex);
      console.log("test", test); // zzz

      // TODO - dragging from grid to main list is broken.
      // does not work for dragging back to source
      if (test != null && test.groups) {
        const { row, col } = test.groups;
        console.log("row, col", row, col); // zzz

        const { locationsMap } = this.state;
        locationsMap[row][col] = result[destination.droppableId];

        this.setState({
          [source.droppableId]: result[source.droppableId],
          locationsMap
          // [destination.droppableId]: result[destination.droppableId]
        });
      }

      // this.setState({
      //   [source.droppableId]: result[source.droppableId],
      //   [destination.droppableId]: result[destination.droppableId]
      // });
    }
  };

  renderItems = ({ provided, snapshot, items }) => {
    console.log("items - render", items); // zzz

    return (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        {items &&
          items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
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
    console.log("renderList", items); // zzz

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
    // const newStorageNames = [];
    for (let colIndex = 0; colIndex < numTargetsInRow; colIndex++) {
      const arrayName = this.createStoragePropertyName({
        rowIndex,
        colIndex,
        prefix
      });

      // newStorageNames.push(arrayName);

      const { row, col } = this.getStorageRowColFromId({ id: arrayName });

      console.log("row,col", row, col); // zzz
      console.log(
        "this.state.locationsMap[row][col]",
        this.state.locationsMap[row][col]
      ); // zzz

      const newTargetArray = this.renderList({
        droppableId: arrayName,
        items: this.state.locationsMap[row][col],
        // items: this.state[arrayName],
        className: css.destination
      });

      targetArrays.push(newTargetArray);
    }

    // const stateObject = {};
    // newStorageNames.map(name => {
    //   stateObject[name] = [];
    // });
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
    const { locationsMap } = this.state;
    console.log("locationsMap", locationsMap); // zzz

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
            {/* {this.renderList({
              droppableId: "sourceCreatures",
              items: this.state["sourceCreatures"],
              className: css.source
            })} */}
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
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
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

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,
  margin: 0,

  // change background color if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 0,
  width: COLUMN_WIDTH
});
