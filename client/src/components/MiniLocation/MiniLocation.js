import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  state = {};

  async componentWillMount() {}

  renderYou = () => {
    const plot = localStateStore.getPlot();
    const youImage = plot.you.creature;

    return (
      <img
        className={`${css.characterImage} ${css.character1}`}
        src={Images[youImage]}
        alt={youImage}
      />
    );
  };

  renderPicturePage = () => {
    const { location } = this.props;
    const miniLocation = Images[location];

    return (
      <div className={css.miniLocation}>
        <img className={css.miniLocation} src={miniLocation} alt={"imagex"} />
        {location}
      </div>
    );
  };

  render() {
    return this.renderPicturePage();
  }
}
export default observer(MiniLocation);
