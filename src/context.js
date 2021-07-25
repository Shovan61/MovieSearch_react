import React, { useEffect, useContext, useState } from 'react';

// 1f6760cd
const mainUrl = `http://www.omdbapi.com/?apikey=1f6760cd`;
export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [data, setdata] = useState([]);
    const [movieQuery, setmovieQuery] = useState('batman');
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [movieQuery]);

    const fetchData = async () => {
        let url = `${mainUrl}&s=${movieQuery}`;
        try {
            const response = await fetch(url);
            const getData = await response.json();
            setdata(getData);
            setisLoading(false);
        } catch (error) {
            throw new Error('API URL error');
        }
    };

    const handleMovieChange = (newName) => {
        setmovieQuery(newName);
    };

    return (
        <AppContext.Provider
            value={{ movieQuery, data, handleMovieChange, isLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
