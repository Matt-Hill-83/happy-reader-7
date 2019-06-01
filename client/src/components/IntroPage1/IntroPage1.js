import React from "react";
import { observer } from "mobx-react";
import _get from "lodash.get";

import Images from "../../images/images.js";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import css from "./IntroPage1.module.scss";

class IntroPage1 extends React.Component {
  state = {
    pageNum: 0,
    showYou: false
  };

  async componentWillMount() {
    this.setState({ ...this.props.params });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.params });
  }

  showYou = () => {
    this.setState({ showYou: true });
  };

  renderIntroText = () => {
    return (
      <div className={css.introText}>
        <div className={css.content}>hello</div>

        <TextField
          id="outlined-name"
          label="Name"
          autoFocus={true}
          // className={classes.textField}
          value={"Charlie"}
          // onChange={handleChange("name")}
          margin="normal"
          variant="outlined"
        />
        <div className={css.content}>you are a...</div>
        <Button onClick={this.showYou} variant="contained" color="primary">
          CLICK
        </Button>
      </div>
    );
  };
  render() {
    const { params } = this.props;

    const youImage = "unicorn";
    const backgroundImage2 = "forestRight";
    const backgroundImage1 = "forestLeft";
    const friendImage = "girl";

    return (
      <div className={css.introPage}>
        <div className={css.backGrounds}>
          <img
            className={`${css.backgroundImage} ${css.backgroundImage1}`}
            src={Images.backgrounds[backgroundImage1]}
            alt={backgroundImage1}
          />
          <img
            className={`${css.backgroundImage} ${css.backgroundImage2}`}
            src={Images.backgrounds[backgroundImage2]}
            alt={backgroundImage2}
          />
        </div>
        {this.renderIntroText()}
        <div className={css.characters}>
          <img
            className={`${css.characterImage} ${css.character1}`}
            src={Images[friendImage]}
            alt={friendImage}
          />
          <img
            className={`${css.characterImage} ${css.character1}`}
            src={Images[youImage]}
            alt={youImage}
          />
        </div>
      </div>
    );
  }
}
export default observer(IntroPage1);
