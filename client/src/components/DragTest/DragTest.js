import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import css from "./DragTest.module.scss";

// // fake data generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k + offset}`,
//     content: `item ${k + offset}`
//   }));

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

const grid = 8;

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
  width: 250
});

export default class DragTest extends Component {
  state = {
    items: [],
    selected: []
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  async componentWillMount() {
    const { items } = this.props;
    this.setState({ items });
  }

  componentWillReceiveProps(newProps) {
    const { items } = newProps;
    this.setState({ items });
  }

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

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

      if (source.droppableId === "droppable2") {
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
        selected: result.droppable2
      });
    }
  };

  renderItems1 = ({ provided, snapshot, items }) => {
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
    console.log("items", items); // zzz

    return (
      <div className={className}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) =>
            this.renderItems1({
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
      const newRow = this.createTargetArrays({ numTargetsInRow, rowIndex });
      targetArraysRows.push(<div>{newRow}</div>);
    }
    return targetArraysRows;
  };

  createTargetArrays = ({ numTargetsInRow, rowIndex }) => {
    const targetArrays = [];
    for (let colIndex = 2; colIndex < numTargetsInRow; colIndex++) {
      const arrayName = `droppable${colIndex}`;
      console.log("arrayName", arrayName); // zzz

      // TODO - add these to idTable
      // const arrayName = `droppable${colIndex}-${rowIndex}`;

      const newTargetArray = this.renderList({
        droppableId: arrayName,
        // items: this.state[arrayName],
        items: this.state["selected"],
        className: css.destination
      });

      targetArrays.push(newTargetArray);
    }

    return targetArrays;
  };

  render() {
    const numTargetsInRow = 5;
    const numRows = 5;

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
