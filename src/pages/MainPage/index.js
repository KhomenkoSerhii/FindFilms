import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { searchMoviesByInput, getGenres } from "../../api";
import CustomInput from "../../components/Input/index";
import MainPagination from "../../components/Pagination/index";

const useStyles = makeStyles({
  App: {
    display: "flex",
    flexDirection: "column",
  },
  mainComponent: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
});

const MainPageComponent = () => {
  const classes = useStyles();

  const [pageNum, setPageNum] = useState({ page_num: 1 });
  const [data, setData] = useState([]);
  const [genres, setGenresData] = useState([]);
  const [stateGenre, setStateGenre] = useState("");

  const sortedFilms = data.results?.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });

  const dataArray = [];
  if (sortedFilms) {
    const filteredGenres = [];

    const getGenress = data.results?.map(({ title, genre_ids }) => {
      const genreNames = genre_ids.map(
        (gid) => genres.genres.find(({ id }) => id === gid).name
      );
      return {
        title,
        genres: genreNames,
      };
    });
    filteredGenres.push(...getGenress);
    sortedFilms.forEach((i) => {
      const fGenres = filteredGenres.filter((m) => m.title === i.title);
      dataArray.push({ ...i, genres: fGenres });
    });
  }

  const nextPage = () => {
    if (data) {
      setPageNum({
        page_num: (pageNum.page_num += 1),
      });
      searchMoviesByInput(stateGenre, pageNum.page_num).then((res) => {
        setData(res);
      });
    }
  };

  const prevPage = () => {
    if (data && pageNum.page_num !== 1) {
      setPageNum({
        page_num: (pageNum.page_num -= 1),
      });
      searchMoviesByInput(stateGenre, pageNum.page_num).then((res) => {
        setData(res);
      });
    }
  };

  useEffect(() => {
    setPageNum({
      page_num: (pageNum.page_num = 1),
    });
    getGenres().then((res) => setGenresData(res));
    searchMoviesByInput(stateGenre, pageNum.page_num).then((res) => {
      setData(res);
    });
  }, [stateGenre]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={classes.App}>
      <CustomInput setStateGenre={setStateGenre} stateGenre={stateGenre} />
      {sortedFilms && (
        <div className={classes.mainComponent}>
          <MainPagination
            data={dataArray}
            prevPage={prevPage}
            nextPage={nextPage}
            pageNumm={pageNum.page_num}
          />
        </div>
      )}
    </div>
  );
};

export default MainPageComponent;
