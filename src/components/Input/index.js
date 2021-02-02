import React from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  customInput: {
    width: 250,
    margin: 10,
    alignSelf: "flex-end",
  },
});

const CustomInput = ({ setStateGenre, stateGenre }) => {
  const classes = useStyles();
  const genres = [
    { id: 35, name: "Comedy" },
    { id: 53, name: "Thriller" },
    { id: 80, name: "Crime" },
    { id: 10752, name: "War" },
  ];
  const changeInputValue = (callback) => (e) => {
    callback(e.target.value);
  };

  return (
    <>
      <TextField
        className={classes.customInput}
        id="standard-select-currency"
        select
        value={stateGenre}
        onChange={changeInputValue(setStateGenre)}
        helperText="Select genre"
      >
        {genres.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

CustomInput.propTypes = {
  setStateGenre: PropTypes.func.isRequired,
};

export default CustomInput;
