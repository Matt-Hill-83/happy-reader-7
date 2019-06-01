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

  showYou = () => {
    this.setState({ showYou: true });
  };

  useStyles = () => {
    return {};
  };

  // useStyles = makeStyles(theme => ({
  //   root: {
  //     display: "flex",
  //     flexWrap: "wrap"
  //   },
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2)
  //   }
  // }));

  renderIntroText = () => {
    const { showYou } = this.state;
    const inputLabel = "test";
    const classes = "test";
    const values = { age: 5 };

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

    // function handleChange(event) {
    //   setValues(oldValues => ({
    //     ...oldValues,
    //     [event.target.name]: event.target.value
    //   }));
    // }

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
            Age
          </InputLabel>
          <Select
            value={values.age}
            // onChange={handleChange}
            input={
              <OutlinedInput
                // labelWidth={labelWidth}
                name="age"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>GIRL</MenuItem>
            <MenuItem value={20}>CAT</MenuItem>
            <MenuItem value={30}>UNICORN</MenuItem>
          </Select>
        </FormControl>
        {showYou && <span>GIRL</span>}
        {!showYou && (
          <Button onClick={this.showYou} variant="contained" color="primary">
            CLICK
          </Button>
        )}
      </div>
    );
  };

  render() {
    const { params } = this.props;
    const { showYou } = this.state;

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
          {showYou && (
            <img
              className={`${css.characterImage} ${css.character1}`}
              src={Images[friendImage]}
              alt={friendImage}
            />
          )}
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
