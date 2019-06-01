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
    return (
      <div className={css.main}>
        <div className={css.content}>CATS!</div>
      </div>
    );
  }
}
export default observer(IntroPage1);
