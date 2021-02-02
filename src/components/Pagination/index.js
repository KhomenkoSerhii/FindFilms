import React, { useEffect, useState } from "react";
import CardComponent from "../../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import PropTypes from "prop-types";

const useStyles = makeStyles({
  navBtns: {
    width: "300px",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0 auto",
    padding: "10px 0",
  },
  btn: {
    width: "100px",
    height: "30px",
  },
  rotated: {
    transform: "rotate(180deg)",
  },
  MuiButton: {
    margin: 0,
  },
  dot: {
    fontSize: "8px",
    color: "blue",
  },
});

const MainPagination = ({ data, prevPage, nextPage }) => {
  const classes = useStyles();
  const [dataCount, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setPosts(data);
  }, [data]);

  const lastPostIndex = postsPerPage * currentPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = dataCount.slice(firstPostIndex, lastPostIndex);
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.floor(dataCount.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      {currentPosts?.map((i) => (
        <React.Fragment key={i.title}>
          <CardComponent
            genres={i.genres}
            img={i.poster_path}
            title={i.title}
            year={i.release_date}
          />
        </React.Fragment>
      ))}
      <div className={classes.navBtns}>
        <Button
          className={classes.btn}
          startIcon={<DoubleArrowIcon className={classes.rotated} />}
          variant="outlined"
          color="primary"
          href="#outlined-buttons"
          onClick={() => prevPage()}
        ></Button>
        {pageNumbers.map((number) => {
          return (
            <React.Fragment key={number}>
              <a href="#" onClick={() => changePage(number)}>
                <FiberManualRecordIcon className={classes.dot} />
              </a>
            </React.Fragment>
          );
        })}
        <Button
          className={classes.btn}
          startIcon={<DoubleArrowIcon />}
          variant="outlined"
          color="primary"
          href="#outlined-buttons"
          onClick={() => {
            nextPage();
            changePage(1);
          }}
        ></Button>
      </div>
    </>
  );
};

MainPagination.propTypes = {
  data: PropTypes.array.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default MainPagination;
