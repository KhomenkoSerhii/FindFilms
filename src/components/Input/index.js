import React, { useEffect, useState } from "react";
import { MenuItem, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  customInput: {
    width: 250,
    margin: 10,
    alignSelf: "flex-end",
  },
  filterSection: {
    display: "flex",
  },
  closebtnSection: {
    display: "flex",
    alignItems: "center",
    margin: "0 5px",
  },
  closeBtn: {
    height: "20px",
    width: "20px",
    display: "flex",
    justifyContent: "center",
  },
  closeBtnIcon: {
    fontSize: "15px",
  },
});

const CustomInput = ({ setStateGenre, stateGenre }) => {
  const classes = useStyles();

  const [genres, setGenres] = useState([
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
  ]);

  const [filmId, setFilmId] = useState([]);
  const [names, setName] = useState([]);

  const genresValue = names.map((i) => i.id);

  const changeInputValue = (callback) => (e) => {
    callback(e.target.value);
  };

  const addFilterToFilms = (id) => {
    const newFilter = [...genresValue, { id }];
    setFilmId(newFilter);
  };

  const removeFilteredGenre = (id) => {
    const newNames = [...names];
    newNames.splice(id, 1);
    setName(newNames);
  };

  const filteredValues = () => {
    filmId.forEach((t) => {
      const res = genres.filter((i) => i.id === t.id);
      setName([...names, ...res]);
    });
  };

  const filteredFilmsGenre = () => {
    filmId.forEach((t) => {
      const res = genres.filter((i) => i.id !== t.id);
      setGenres([...res]);
    });
  };

  const sortedGenres = () => {
    genres.sort((a, b) => {
      return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
    });
  };

  useEffect(() => {
    filteredValues();
    filteredFilmsGenre();
  }, [filmId]);

  useEffect(() => {
    sortedGenres();
    setStateGenre(genresValue);
  }, [names]);

  return (
    <>
      <TextField
        className={classes.customInput}
        id="standard-select-currency"
        select
        value={stateGenre ? "" : stateGenre}
        onChange={changeInputValue(addFilterToFilms)}
        ext="Select genre"
      >
        {genres.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <div className={classes.filterSection}>
        {names.map((i, index) => (
          <div className={classes.closebtnSection} key={i.id}>
            <Typography component="p">{i.name}</Typography>
            <button
              className={classes.closeBtn}
              onClick={() => {
                removeFilteredGenre(index);
                setGenres([...genres, { ...i }]);
              }}
            >
              <CloseIcon className={classes.closeBtnIcon} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

CustomInput.propTypes = {
  setStateGenre: PropTypes.func.isRequired,
};

export default CustomInput;
