import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import css from "./DragTest.module.scss";
import Images from "../../images/images";

const numRows = 6;
const numTargetsInRow = 10;
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

export default class DragTest extends Component {
  state = {
    items: [],
    selected: [],
    destinationMatrix: {}
  };

  async componentWillMount() {
    const { locations, creatures } = this.props;
    const preAllocatedArrays = this.preAllocateArrays();

    // TODO: put creatures into objects and get images.
    const creatureObjects = creatures.map((creature, index) => {
      const { name } = creature;
      const miniLocationImage = Images.creatures[name];
      return {
        id: `creature-${index}`,
        content: (
          <div>
            <img src={miniLocationImage} alt={"imagex"} />
            {name}
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
    const list = this.state[id];
    return list;
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
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      // TODO - dragging from grid to main list is broken.
      this.setState({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId]
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

      newStorageNames.push(arrayName);
      const newTargetArray = this.renderList({
        droppableId: arrayName,
        items: this.state[arrayName],
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
    const { sourceCreatures } = this.state;
    console.log("sourceCreatures", sourceCreatures); // zzz

    return (
      <div className={css.main}>
        <div className={css.title}>World Builder</div>
        <div className={css.subTitle}>(drag items to create your world...)</div>
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
            {this.createTargetArrayRows({ numTargetsInRow, numRows })}
          </DragDropContext>
        </div>
      </div>
    );
  }
}
