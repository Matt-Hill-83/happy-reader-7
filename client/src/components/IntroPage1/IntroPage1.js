import React from "react";
import { observer } from "mobx-react";
import _get from "lodash.get";

import css from "./IntroPage1.module.scss";

class IntroPage1 extends React.Component {
  state = {
    pageNum: 0
  };

  async componentWillMount() {
    this.setState({ ...this.props.params });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.params });
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`${css.main} ${className}`}>
        <div className={css.content}>hello</div>
        <input
          autoFocus={true}
          type="text"
          value="CHARLIE"
          className={css.content}
        />
        {/* <div className={css.content}>CLICK</div> */}
        <div className={css.content}>You are a...</div>
        <button className={css.content}>CLICK</button>
        {/* <div className={css.content}>Goblin image</div> */}
      </div>
    );
  }
}
export default observer(IntroPage1);
