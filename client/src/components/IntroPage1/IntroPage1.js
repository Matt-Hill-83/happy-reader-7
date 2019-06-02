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

  handleChange = ({ event, test }) => {
    console.log("test", test); // zzz

    console.log("event", event); // zzz
    // /* eslint-disable */ debugger /* eslint-ensable */ /* zzz */
    this.setState({
      youCreature: event.target.value,
      name: event.target.name,
      value: event.target.value
    });
  };

  createYouPickerOptions = () => {
    const youOptions = ["fairy", "unicorn", "girl", "elf", "mermaid"];

    const renderedMenuItems = youOptions.map(you => (
      <MenuItem value={you}>{you && you.toUpperCase()}</MenuItem>
    ));
    return renderedMenuItems;
  };

  renderIntroText = () => {
    const { showYou } = this.state;
    const inputLabel = "test";
    const classes = "test";

    // const classes = this.useStyles();
    // const [values, setValues] = React.useState({
    //   age: "",
    //   name: "hai"
    // });

    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //   setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

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

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            You
          </InputLabel>
          <Select
            value={this.state.value}
            onChange={event => {
              this.handleChange({ event, test: { cat: 5 } });
            }}
            input={<OutlinedInput id="outlined-age-simple" />}
          >
            {this.createYouPickerOptions()}
          </Select>
        </FormControl>
      </div>
    );
  };

  renderYouImage = () => {
    const { youCreature } = this.state;
    const friendImage = youCreature && youCreature.toLowerCase();
    console.log("friendImage", friendImage); // zzz

    return (
      <img
        className={`${css.characterImage} ${css.character1}`}
        src={Images[friendImage]}
        alt={friendImage}
      />
    );
  };

  render() {
    const { params } = this.props;

    console.log("this.state", this.state); // zzz

    const youImage = "unicorn";
    const backgroundImage2 = "forestRight";
    const backgroundImage1 = "forestLeft";

    return (
      <div className={css.introPage}>
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
        {this.renderIntroText()}
        <div className={css.characters}>
          {this.renderYouImage()}
          <img
            className={`${css.characterImage} ${css.character1}`}
            src={Images[youImage]}
            alt={youImage}
          />
        </div>
        {true && (
          <Button
            className={css.nextButton}
            onClick={this.showYou}
            variant="contained"
            color="primary"
          >
            NEXT
          </Button>
        )}
      </div>
    );
  }
}
export default observer(IntroPage1);
