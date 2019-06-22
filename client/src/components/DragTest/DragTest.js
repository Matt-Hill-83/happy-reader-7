import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@blueprintjs/core";

import Images from "../../images/images";

import css from "./DragTest.module.scss";

const numRows = 8;
const numTargetsInRow = 5;
const COLUMN_WIDTH = 150;
const LOCATIONS_PREFIX = "locationsGrid";

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

    const test = {
      row1: {
        col1: ["obj1"],
        col2: ["obj2"]
      }
    };

    rows.map((row, rowIndex) => {
      const rowName = `row-${rowIndex}`;
      locationsMap[rowName] = {};
      columns.map((col, colIndex) => {
        const colName = `col-${colIndex}`;

        locationsMap[rowName][colName] = {
          row: rowIndex,
          col: colIndex,
          items: [`${rowName} ${colName}`]
        };
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

  createTargetArrayRows = ({ numTargetsInRow, numRows, prefix }) => {
    const targetArraysRows = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const newRow = this.createTargetArrayRow({
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

  createTargetArrayRow = ({ numTargetsInRow, rowIndex, prefix }) => {
    const targetArrays = [];
    const newStorageNames = [];
    for (let colIndex = 0; colIndex < numTargetsInRow; colIndex++) {
      const arrayName = this.createStoragePropertyName({
        rowIndex,
        colIndex,
        prefix
      });

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
    const { sourceCreatures } = this.state;
    console.log("sourceCreatures", sourceCreatures); // zzz

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
            {this.createTargetArrayRows({
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
