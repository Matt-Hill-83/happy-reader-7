import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toJS } from "mobx";

import { IconNames } from "@blueprintjs/icons";
import { Button, Icon, Position } from "@blueprintjs/core";

import Images from "../../images/images";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore";
import MiniLocation from "../MiniLocation/MiniLocation";
import { todos } from "../../Stores/InitStores";

import css from "./WorldBuilder.module.scss";
import Todos from "../Todos/Todos";

const NUM_ROWS_LOCATIONS_GRID = 8;
const NUM_COLS_LOCATIONS_GRID = 5;
const COLUMN_WIDTH = 150;

const LOCATIONS_PREFIX = "locationsGrid";

const LOCATIONS_TAG = "location";
const CREATURES_TAG = "creature";
const ITEMS_TAG = "item";

const SOURCE_CREATURES_PROP_NAME = "sourceCreatures";
const SOURCE_LOCATIONS_PROP_NAME = "sourceLocations";
const SOURCE_ITEMS_PROP_NAME = "sourceItems";

export default class WorldBuilder extends Component {
  state = {
    [SOURCE_ITEMS_PROP_NAME]: [],
    [SOURCE_CREATURES_PROP_NAME]: [],
    [SOURCE_LOCATIONS_PROP_NAME]: []
  };

  async componentWillMount() {
    const { allItems, allScenes, allCreatures } = localStateStore.getPlot();

    console.log("allCreatures", allCreatures); // zzz

    const locations = allScenes.map((item, index) => {
      return {
        id: `${LOCATIONS_TAG}-${index}`,
        scene: item
      };
    });

    const items = allItems.map((item, index) => {
      return {
        id: `${ITEMS_TAG}-${index}`,
        scene: item
      };
    });

    // generate placeholders for output grid in state
    const preAllocatedArrays = this.preAllocateArrays();

    // Instead of making different containers, why not dump all items together and sort them by tag?
    // And instead of removing from the list, just mark them as not visible.
    // And don't generate the content here, generate the content at render time.
    const creatureObjects = allCreatures.map((item, index) => {
      const { type, name } = item;

      const image = Images.creatures[type];
      const id = `${CREATURES_TAG}-${index}`;

      return {
        id,
        // save an object here, that stores all the object properties, separate from the content
        properties: item,
        type,
        name,
        content: (
          <div className={css.characterImage}>
            <img src={image} alt={`${CREATURES_TAG} image`} />
            <span className={css.characterLabel}>{type}</span>
          </div>
        )
      };
    });

    const itemObjects = allItems.map((item, index) => {
      const { type, name } = item;

      const image = Images.items[type];
      const id = `${ITEMS_TAG}-${index}`;

      return {
        id,
        type,
        name,
        content: (
          <div className={css.characterImage}>
            <img src={image} alt={"item image"} />
            <span className={css.characterLabel}>{type}</span>
          </div>
        )
      };
    });

    this.setState({
      [SOURCE_ITEMS_PROP_NAME]: itemObjects,
      [SOURCE_LOCATIONS_PROP_NAME]: locations,
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
    if (
      id === SOURCE_ITEMS_PROP_NAME ||
      id === SOURCE_LOCATIONS_PROP_NAME ||
      id === SOURCE_CREATURES_PROP_NAME
    ) {
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

  dropInNewList = ({ source, destination, destinationId, sourceId }) => {
    let result = {};
    // dragging a creature to a different destination
    // TODO -  should specifically reference locationsGrid
    if (
      sourceId === SOURCE_CREATURES_PROP_NAME &&
      destinationId !== SOURCE_CREATURES_PROP_NAME
    ) {
      const sourceList = this.getList({ id: sourceId });
      const destinationList = this.getList({ id: destinationId });
      const droppableSource = source;
      // const droppableDestination = destination;

      const sourceListClone = Array.from(sourceList);
      const destListClone = Array.from(destinationList);

      const [removed] = sourceListClone.splice(droppableSource.index, 1);
      if (!destListClone[0]) {
        return;
      }

      console.log("removed", removed); // zzz

      // There should be a separate object in the draggable object that preserves all the item props
      // separate from the renderd content
      destListClone[0].scene.creatures.push({ ...removed.properties });
      // destListClone[0].scene.creatures.push({ type: removed.type });

      // const removedFromDest = destListClone.splice(
      //   0,
      //   destListClone.length,
      //   removed
      // );
      // do this different
      // sourceListClone.push(...removedFromDest);

      result[sourceId] = sourceListClone;
      result[destinationId] = destListClone;

      const { row, col } = this.getStorageRowColFromId({
        id: destinationId
      });

      const { locationsGrid } = this.state;
      locationsGrid[row][col] = result[destinationId];

      this.setState({
        [sourceId]: result[sourceId],
        locationsGrid
      });

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
  };

  onDragEnd = result => {
    const {
      source,
      source: { droppableId: sourceId },
      destination,
      destination: { droppableId: destinationId }
    } = result;

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
      this.dropInNewList({ source, destination, destinationId, sourceId });
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
    const plot = localStateStore.getPlot();

    console.log("plot", plot); // zzz
    console.log("this.state", this.state); // zzz

    const test = this.transformLocationsGridToLocationsMap();

    const test2 = toJS(test);
    console.log("test2", test2[0][0]); // zzz

    // This is where is should be stored
    // const locationsMap = this.transformLocationsGridToLocationsMap();

    // localStateStore.setPlot(plot);
    // localStateStore.addNewLocationsMap({ grid: locationsMap });
    // localStateStore.setShowWorldBuilder(false);
  };

  renderSaveMapButton = () => {
    return (
      <Button tabIndex={0} className={css.newStoryBtn} onClick={this.saveMap}>
        <span> Save Map </span>
        <Icon color={"purple"} icon={IconNames.SAVED} />
      </Button>
    );
  };

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
        const criticalData = (newCell[0] && toJS(newCell[0].scene)) || {};

        newRow.push(criticalData);
      });
      locationsMap.push(newRow);
    });

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

  editLocation = ({ id }) => {
    console.log("id", id); // zzz
  };

  renderItems = ({ provided, snapshot, items }) => {
    return (
      <div
        ref={provided.innerRef}
        style={this.getListStyle(snapshot.isDraggingOver)}
      >
        {items &&
          items.map((item, index) => {
            const { scene, id, name = "" } = item;
            let content = <span>content missing</span>;

            // define a render function in each item type
            if (id.includes(LOCATIONS_TAG)) {
              const creatures = scene && scene.creatures;

              content = (
                <div className={css.locationGridContainer}>
                  <MiniLocation
                    id={id}
                    key={name}
                    location={scene}
                    characters={creatures}
                  />
                  <Button
                    className={css.scenePropsButton}
                    onClick={() => this.editLocation({ id })}
                  >
                    <Icon icon={IconNames.SETTINGS} />
                  </Button>
                </div>
              );
            } else {
              // this content should be generated on the fly.
              content = item.content;
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
        <Todos>test</Todos>
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
            {/* Create these with .map() */}
            {this.renderList({
              droppableId: SOURCE_CREATURES_PROP_NAME,
              items: this.state[SOURCE_CREATURES_PROP_NAME],
              className: css.source
            })}
            {this.renderList({
              droppableId: SOURCE_LOCATIONS_PROP_NAME,
              items: this.state[SOURCE_LOCATIONS_PROP_NAME],
              className: css.source
            })}
            {this.renderList({
              droppableId: SOURCE_ITEMS_PROP_NAME,
              items: this.state[SOURCE_ITEMS_PROP_NAME],
              className: css.source
            })}
            {this.createLocationsGridRows({
              numTargetsInRow: NUM_COLS_LOCATIONS_GRID,
              numRows: NUM_ROWS_LOCATIONS_GRID,
              prefix: LOCATIONS_PREFIX
            })}
          </DragDropContext>
        </div>
      </div>
    );
  }
}