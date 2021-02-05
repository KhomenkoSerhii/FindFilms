import React, { useEffect, useState } from "react";
import CardComponent from "../../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import cn from "classnames";
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
  pageNumSelected: {
    border: "1px solid red",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pageNum: {},
});

const MainPagination = ({ data, prevPage, nextPage, pageNumm }) => {
  const classes = useStyles();

  const [dataCount, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPostIndex = postsPerPage * currentPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = dataCount.slice(firstPostIndex, lastPostIndex);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.floor(dataCount.length / postsPerPage); i++) {
  //   pageNumbers.push({id:i});
  // }

  const detPagesFunc = (id) => {
    changePage(id);
    if (id === 1) {
      nextPage();
    } else {
      prevPage();
    }
  };

  useEffect(() => {
    setPosts(data);
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      {currentPosts?.map((i) => (
        <React.Fragment key={i.overview + i.id + i.original_title}>
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
          disabled={pageNumm <= 1}
          className={classes.btn}
          startIcon={<DoubleArrowIcon className={classes.rotated} />}
          variant="outlined"
          color="primary"
          href="#outlined-buttons"
          onClick={() => {
            detPagesFunc(2);
          }}
        >
          {pageNumm === 1 ? pageNumm - 1 : pageNumm + pageNumm - 2}
        </Button>
        <Button
          onClick={() => {
            changePage(1);
          }}
        >
          <a
            href="#"
            className={cn(classes.pageNum, {
              [classes.pageNumSelected]: 1 === currentPage,
            })}
          >
            {pageNumm + pageNumm - 1}
          </a>
        </Button>
        <Button
          disabled={data.length < 10}
          onClick={() => {
            changePage(2);
          }}
        >
          <a
            href="#"
            className={cn(classes.pageNum, {
              [classes.pageNumSelected]: 2 === currentPage,
            })}
          >
            {pageNumm + pageNumm}
          </a>
        </Button>

        <Button
          disabled={data.length < 20}
          className={classes.btn}
          startIcon={<DoubleArrowIcon />}
          variant="outlined"
          color="primary"
          href="#outlined-buttons"
          onClick={() => {
            detPagesFunc(1);
          }}
        >
          {(pageNumm += pageNumm + 1)}
        </Button>
      </div>
    </>
  );
};

MainPagination.propTypes = {
  data: PropTypes.array.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  pageNumm: PropTypes.number.isRequired,
};

export default MainPagination;
