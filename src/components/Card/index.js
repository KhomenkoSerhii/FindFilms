import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { IMG_API } from "../../constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "10px 0",
  },
  img: {
    width: 100,
  },
  activePart: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

const CardComponent = ({ img, title, year, genres }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.activePart}>
        <CardMedia
          component="img"
          image={`${IMG_API}/${img}`}
          className={classes.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="p">
            {year}
          </Typography>

          {genres.map((i) => (
            <div key={i.title}>{i.genres + ""}</div>
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CardComponent.propTypes = {
  genres: PropTypes.array,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string,
};
export default CardComponent;
