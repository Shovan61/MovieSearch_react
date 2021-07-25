import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        marginTop: '3rem',
        alignSelf: 'center',
    },
    detailContainer: {
        padding: '2rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    details: {
        width: '50%',
    },
});

const mainUrl = `http://www.omdbapi.com/?apikey=1f6760cd&i=`;

function MovieDetails() {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [detailsData, setdetailsData] = useState({});
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        let url = `${mainUrl}${id}`;
        try {
            const response = await fetch(url);
            const getData = await response.json();
            setdetailsData(getData);
            setisLoading(false);
        } catch (error) {
            throw new Error('API URL error');
        }
    };

    const handleClick = () => {
        history.push('/');
    };

    return (
        <div className={classes.root}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Card className={classes.detailContainer}>
                    <div className={classes.imageContainer}>
                        <img src={detailsData.Poster} alt={detailsData.Title} />
                    </div>
                    <div className={classes.details}>
                        <h1 style={{ marginBottom: '2rem' }}>
                            {detailsData.Title}
                        </h1>
                        <p>{detailsData.Plot}</p>
                        <h4 style={{ marginBottom: '4rem', marginTop: '1rem' }}>
                            {detailsData.Year}
                        </h4>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={handleClick}>
                            Go Back
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default MovieDetails;
