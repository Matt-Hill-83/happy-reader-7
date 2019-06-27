import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@blueprintjs/core";

import Images from "../../images/images";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore";
import MiniLocation from "../MiniLocation/MiniLocation";

import css from "./DragTest.module.scss";

const NUM_ROWS_LOCATIONS_GRID = 8;
const NUM_COLS_LOCATIONS_GRID = 5;
const COLUMN_WIDTH = 150;
const LOCATIONS_PREFIX = "locationsGrid";
const LOCATIONS_TAG = "location";
const SOURCE_CREATURES_PROP_NAME = "sourceCreatures";

export default class DragTest extends Component {
  state = {
    [SOURCE_CREATURES_PROP_NAME]: [],
    sourceItems: []
  };

  async componentWillMount() {
    const { creatures } = this.props;

    // const creatures = Utils.getWordsByType({
    //   words: words,
    //   type: wordTypes.creature
    // });

    const plot = localStateStore.getPlot();

    const locations = plot.allScenes.map((scene, index) => {
      return {
        id: `${LOCATIONS_TAG}-${index}`,
        content: <span>test</span>,
        scene
      };
    });

    console.log("locations", locations); // zzz

    const preAllocatedArrays = this.preAllocateArrays();

    // TODO: export and save maps
    // TODO: allow creature to be dropped into images
    const creatureObjects = creatures.map((creature, index) => {
      const { name } = creature;
      const miniLocationImage = Images.creatures[name];
      const id = `creature-${index}`;

      return {
        id,
        name,
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
      [SOURCE_CREATURES_PROP_NAME]: creatureObjects,
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
  move = ({ source, destination, droppableSource, droppableDestination }) => {
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
    const rows = Array(NUM_ROWS_LOCATIONS_GRID).fill(0);
    const columns = Array(NUM_COLS_LOCATIONS_GRID).fill(0);

    const newStateObject = {};
    const locationsGrid = {};

    rows.map((row, rowIndex) => {
      const rowName = `row-${rowIndex}`;
      locationsGrid[rowName] = {};
      columns.map((col, colIndex) => {
        const colName = `col-${colIndex}`;

        locationsGrid[rowName][colName] = [];
        newStateObject.locationsGrid = locationsGrid;
      });
    });

    return newStateObject;
  };

  componentWillReceiveProps(newProps) {}

  getList = ({ id }) => {
    if (id === "sourceItems" || id === SOURCE_CREATURES_PROP_NAME) {
      return this.state[id];
    } else {
      const { row, col, prefix } = this.getStorageRowColFromId({ id });

      if (prefix === LOCATIONS_PREFIX) {
        return this.state.locationsGrid[row][col];
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
    const {
      source,
      source: { droppableId: sourceId },
      destination,
      destination: { droppableId: destinationId }
    } = result;

    console.log("sourceId", sourceId); // zzz
    console.log("destinationId", destinationId); // zzz

    // dropped outside the list
    if (!destination) {
      return;
    }

    // for dragging within a single column
    if (sourceId === destinationId) {
      const items = this.reorder(
        this.getList({ id: sourceId }),
        source.index,
        destination.index
      );

      let state = { items };

      this.setState(state);
    } else {
      // dragging to a different destination
      let result = {};
      // dragging a creature to a different destination
      if (
        sourceId === SOURCE_CREATURES_PROP_NAME &&
        // TODO -  should specifically reference locationsGrid
        destinationId !== SOURCE_CREATURES_PROP_NAME
      ) {
        console.log("SOURCE_CREATURES_PROP_NAME"); // zzz

        //////////////

        const sourceList = this.getList({ id: sourceId });
        const destinationList = this.getList({ id: destinationId });
        const droppableSource = source;
        const droppableDestination = destination;

        const sourceListClone = Array.from(sourceList);
        const destListClone = Array.from(destinationList);

        const [removed] = sourceListClone.splice(droppableSource.index, 1);
        destListClone[0].content.props.creatures.push(removed.name);

        // TODO - the locations need to be just definitions, not rendered, so I can add creates here and then render them.
        // TODO - the locations need to be just definitions, not rendered, so I can add creates here and then render them.
        // TODO - the locations need to be just definitions, not rendered, so I can add creates here and then render them.
        // TODO - the locations need to be just definitions, not rendered, so I can add creates here and then render them.
        // destListClone[0].content.props.creatures.push("elf");

        console.log("destListClone", destListClone); // zzz
        console.log("removed", removed); // zzz

        const removedFromDest = destListClone.splice(
          0,
          destListClone.length,
          removed
        );
        // do this different
        // sourceListClone.push(...removedFromDest);

        result[sourceId] = sourceListClone;
        result[destinationId] = destListClone;

        //////////////
      } else {
        result = this.move({
          source: this.getList({ id: sourceId }),
          destination: this.getList({ id: destinationId }),
          droppableSource: source,
          droppableDestination: destination
        });

        // TODO - dragging from grid to main list is broken.
        const { row, col } = this.getStorageRowColFromId({
          id: destinationId
        });

        if (row) {
          const { locationsGrid } = this.state;
          locationsGrid[row][col] = result[destinationId];

          this.setState({
            [sourceId]: result[sourceId],
            locationsGrid
          });
        }
      }
    }

    this.saveMap();
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
        items: this.state.locationsGrid[row][col],
        className: css.destination
      });

      targetArrays.push(newTargetArray);
    }

    return targetArrays;
  };

  saveMap = () => {
    console.log("saving map"); // zzz

    const plot = localStateStore.getPlot();
    plot.locationsMap = this.transformLocationsGridToLocationsMap();

    // This is where is should be stored
    const locationsMap = this.transformLocationsGridToLocationsMap();

    localStateStore.setPlot(plot);
    localStateStore.addNewLocationsMap({ grid: locationsMap });
    // localStateStore.setShowWorldBuilder(false);
  };

  // I need to reinstate this button.

  // renderSaveMapButton = () => {
  //   return (
  //     <Button tabIndex={0} className={css.newStoryBtn} onClick={this.saveMap}>
  //       <span> Save Map </span>
  //     </Button>
  //   );
  // };

  transformLocationsGridToLocationsMap = () => {
    const { locationsGrid } = this.state;
    const locationsMap = [];

    const rows = Array(NUM_ROWS_LOCATIONS_GRID).fill(0);
    const columns = Array(NUM_COLS_LOCATIONS_GRID).fill(0);

    rows.map((row, rowIndex) => {
      const newRow = [];

      columns.map((col, colIndex) => {
        const rowName = `row-${rowIndex}`;
        const colName = `col-${colIndex}`;

        const newCell = locationsGrid[rowName][colName];
        const criticalData =
          (newCell[0] && newCell[0].content.props.location) || {};
        newRow.push(criticalData);
      });
      locationsMap.push(newRow);
    });
    console.log("locationsMap", locationsMap); // zzz

    return locationsMap;
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

  renderItems = ({ provided, snapshot, items }) => {
    return (
      <div
        ref={provided.innerRef}
        style={this.getListStyle(snapshot.isDraggingOver)}
      >
        {items &&
          items.map((item, index) => {
            const { scene, id, characters, name = "" } = item;
            let content = item.content;

            if (id.includes(LOCATIONS_TAG)) {
              console.log("id", id); // zzz

              content = (
                <MiniLocation
                  id={id}
                  key={name}
                  location={scene}
                  characters={characters}
                />
              );
            }

            return (
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
                    {content}
                  </div>
                )}
              </Draggable>
            );
          })}
        {provided.placeholder}
      </div>
    );
  };

  render() {
    return (
      <div className={css.main}>
        <div className={css.header}>
          <div className={css.titles}>
            <div className={css.title}>World Builder</div>
            <div className={css.subTitle}>
              (drag items to create your world...)
              {/* {this.renderSaveMapButton()} */}
            </div>
          </div>
        </div>
        <div className={css.content}>
          <DragDropContext className={css.main} onDragEnd={this.onDragEnd}>
            {this.renderList({
              droppableId: SOURCE_CREATURES_PROP_NAME,
              items: this.state[SOURCE_CREATURES_PROP_NAME],
              className: css.source
            })}
            {this.renderList({
              droppableId: "sourceItems",
              items: this.state["sourceItems"],
              className: css.source
            })}
            {/* {this.createLocationsGridRows({
              numTargetsInRow: NUM_COLS_LOCATIONS_GRID,
              numRows: NUM_ROWS_LOCATIONS_GRID,
              prefix: LOCATIONS_PREFIX
            })} */}
          </DragDropContext>
        </div>
      </div>
    );
  }
}
