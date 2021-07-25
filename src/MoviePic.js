import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        cursor: 'pointer',
    },
});

function MoviePic(props) {
    const classes = useStyles();
    const history = useHistory();
    const { Poster, Title, Year, imdbID } = props;

    const handleClick = (id) => {
        history.push(`/movies/${id}`);
    };

    return (
        <div className={classes.root}>
            <div
                className={classes.imageContainer}
                onClick={() => handleClick(imdbID)}>
                <img src={Poster} alt={Title} />
            </div>

            <div className={classes.movieInfo}>
                <h4 className={classes.title}>{Title}</h4>
                <span className={classes.year}>{Year}</span>
            </div>
        </div>
    );
}

export default MoviePic;
