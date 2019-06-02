import React from "react";
import { observer } from "mobx-react";
import _get from "lodash.get";

import Images from "../../images/images.js";

// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";

import css from "./IntroPage1.module.scss";

class IntroPage1 extends React.Component {
  state = {
    value: "girl",
    youName: "Charlie"
  };

  async componentWillMount() {
    this.setState({ ...this.props.params });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps.params });
  }

  finishIntro = () => {
    localStateStore.setPage("intro2");
  };

  changeYouCreature = ({ event, test }) => {
    this.setState({
      youCreature: event.target.value,
      name: event.target.name,
      value: event.target.value
    });
  };

  changeYouName = event => {
    console.log("event", event); // zzz
    console.log("event.target.value", event.target.value); // zzz

    this.setState({
      youName: event.target.value
    });
  };

  createYouPickerOptions = () => {
    const youOptions = ["fairy", "unicorn", "girl", "elf"];

    const renderedMenuItems = youOptions.map(you => (
      <MenuItem key={you} value={you}>
        {you && you.toUpperCase()}
      </MenuItem>
    ));
    return renderedMenuItems;
  };

  renderIntroText = () => {
    const inputLabel = "test";
    const classes = "test";

    const { value, youName } = this.state;

    return (
      <div className={css.introText}>
        <div className={css.content}>Hi</div>

        <TextField
          id="outlined-name"
          label="Name"
          autoFocus={true}
          // className={classes.textField}
          value={youName}
          onChange={this.changeYouName}
          margin="normal"
          variant="outlined"
        />
        <div className={css.content}>you are a...</div>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            You
          </InputLabel>
          <Select
            value={value}
            onChange={event => {
              this.changeYouCreature({ event, test: { cat: 5 } });
            }}
            input={<OutlinedInput id="outlined-age-simple" />}
          >
            {this.createYouPickerOptions()}
          </Select>
        </FormControl>
        {this.renderYouImage()}
      </div>
    );
  };

  renderYouImage = () => {
    const { youCreature } = this.state;
    const youImage = youCreature && youCreature.toLowerCase();

    return (
      <img
        className={`${css.characterImage} ${css.character1}`}
        src={Images[youImage]}
        alt={youImage}
      />
    );
  };

  renderBackground = () => {
    const backgroundImage2 = "forestRight";
    const backgroundImage1 = "forestLeft";

    return (
      <div className={css.backgrounds}>
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
    );
  };

  render() {
    const { params } = this.props;

    return (
      <div className={css.introPage}>
        {this.renderBackground()}
        {this.renderIntroText()}
        <div className={css.characters} />
        <Button
          className={css.nextButton}
          onClick={this.finishIntro}
          variant="contained"
          color="primary"
        >
          NEXT
        </Button>
      </div>
    );
  }
}
export default observer(IntroPage1);
