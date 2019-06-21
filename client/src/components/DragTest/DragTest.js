import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import css from "./DragTest.module.scss";

const numRows = 2;
const numTargetsInRow = 3;
const COLUMN_WIDTH = 150;

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

  // destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: COLUMN_WIDTH
});

export default class DragTest extends Component {
  state = {
    items: [],
    selected: [],
    destinationMatrix: {}
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable0: "selected"
  };

  async componentWillMount() {
    const { items } = this.props;
    const preAllocatedArrays = this.preAllocateArrays();
    this.setState({ items, ...preAllocatedArrays });
  }

  preAllocateArrays = () => {
    const rows = Array(numRows).fill(0);
    const columns = Array(numTargetsInRow).fill(0);

    const newStateObject = {};

    rows.map((row, rowIndex) => {
      columns.map((col, colIndex) => {
        const arrayName = this.createStoragePropertyName({
          rowIndex,
          colIndex
        });

        newStateObject[arrayName] = [];
      });
    });
    return newStateObject;
  };

  componentWillReceiveProps(newProps) {
    const { items } = newProps;
    this.setState({ items });
  }

  getList = id => {
    if (id === "droppable") {
      return this.state[this.id2List[id]];
    } else {
      return this.state[id];
      // return this.state.destinationMatrix[id];
    }
  };

  onDragEnd = result => {
    console.log("result", result); // zzz

    const { source, destination } = result;

    console.log("source.droppableId", source.droppableId); // zzz
    console.log("destination.droppableId", destination.droppableId); // zzz

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable0") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable0
      });
    }
  };

  renderItems = ({ provided, snapshot, items }) => {
    return (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        {items.map((item, index) => (
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

  createTargetArrayRows = ({ numTargetsInRow, numRows }) => {
    const targetArraysRows = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const newRow = this.createTargetArrayRow({ numTargetsInRow, rowIndex });
      targetArraysRows.push(<div className={css.targetRow}>{newRow}</div>);
    }
    return <div className={css.targetGrid}>{targetArraysRows}</div>;
  };

  createStoragePropertyName = ({ rowIndex, colIndex }) => {
    return `droppable-${colIndex}-${rowIndex}`;
  };

  createTargetArrayRow = ({ numTargetsInRow, rowIndex }) => {
    const targetArrays = [];
    const newStorageNames = [];
    for (let colIndex = 0; colIndex < numTargetsInRow; colIndex++) {
      const arrayName = this.createStoragePropertyName({ rowIndex, colIndex });

      const storageArray = [];

      newStorageNames.push(arrayName);
      const newTargetArray = this.renderList({
        droppableId: arrayName,
        items: storageArray,
        className: css.destination
      });

      targetArrays.push(newTargetArray);
    }

    const stateObject = {};
    newStorageNames.map(name => {
      stateObject[name] = [];
    });
    return targetArrays;
  };

  render() {
    // const numRows = 2;
    // const numTargetsInRow = 3;

    console.log("this.state", this.state); // zzz
    // console.log("this.state.destinationMatrix", this.state.destinationMatrix); // zzz

    return (
      <div className={css.main}>
        <DragDropContext className={css.main} onDragEnd={this.onDragEnd}>
          {this.renderList({
            droppableId: "droppable",
            items: this.state.items,
            className: css.source
          })}
          {this.createTargetArrayRows({ numTargetsInRow, numRows })}
        </DragDropContext>
      </div>
    );
  }
}
