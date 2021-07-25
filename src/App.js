import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useGlobalContext } from './context';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoviePic from './MoviePic';
import { Switch, Route, Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginBottom: '4rem',
        marginTop: '2rem',
    },
    movies: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 33.33%)',
        gap: '1rem',
    },
});

function App() {
    const classes = useStyles();
    const { data, handleMovieChange, isLoading, movieQuery } =
        useGlobalContext();
    // console.log(data);
    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path='/'>
                    <div className={classes.container}>
                        <form className={classes.form}>
                            <TextField
                                fullWidth
                                id='standard-basic'
                                label='Search Movie'
                                value={movieQuery}
                                onChange={(e) =>
                                    handleMovieChange(e.target.value)
                                }
                            />
                        </form>
                        {isLoading ? (
                            <CircularProgress color='secondary' />
                        ) : (
                            <div className={classes.movies}>
                                {data.Response === 'True' ? (
                                    data.Search.map((cur) => (
                                        <MoviePic key={cur.imdbID} {...cur} />
                                    ))
                                ) : (
                                    <h1
                                        style={{
                                            color: 'red',
                                            width: '90vw',
                                            textAlign: 'center',
                                            letterSpacing: '2px',
                                            marginTop: '3rem',
                                        }}>
                                        {data.Error}!
                                    </h1>
                                )}
                            </div>
                        )}
                    </div>
                </Route>

                <Route
                    exact
                    path='/movies/:id'
                    render={() => (
                        <div style={{ padding: '2rem' }}>
                            {<MovieDetails />}
                        </div>
                    )}></Route>
            </Switch>
        </div>
    );
}

export default App;
