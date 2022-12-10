import { useState, useEffect } from "react";
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.css';

//class 
import MarvelHeroDetails from "./MarvelHeroDetails";

export const PB_API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY

function Main(props) {

    const [thumbnail, setThumbnail] = useState([])

    return <div>
        <BrowserRouter>
            <h1>Marvel</h1>
            <Routes>
                <Route path="/" element={<SearchPage />}></Route>
                <Route path="/details/:queryId/" element={<MarvelHeroDetails />}></Route>
                <Route path="/search" element={<SearchPage />}>
                    <Route path="/search/:queryText/" element={<SearchResult />} />
                </Route>
                <Route path="/detail/:info" element={<MarvelHeroDetails />}></Route>
                <Route path="*" element={<p>Page not found</p>} />
            </Routes>
        </BrowserRouter>
    </div>
}


function SearchPage(props) {
    const params = useParams()
    const [query, setQuery] = useState(params.queryText ? params.queryText : '')

    const navigate = useNavigate()

    const onQueryChanged = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`/search/${query}`);
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <TextField
                id="search"
                label="Search"
                variant="outlined"
                size="small"
                value={query}
                onChange={onQueryChanged}
            ></TextField>{' '}
            <Button onClick={handleSubmit} variant="contained" size="large">Search</Button>
        </form>
        <Outlet />
    </div>
}

function SearchResult(props) {

    const params = useParams()
    const [thumbnail, setThumbnail] = useState([])

    const navigate = useNavigate()

    const onClickHero = (x) => {
        console.log("tapped hero:"+x)
        navigate(`/details/${x}`);
    }

    useEffect(() => {

        console.log("called api")
        const baseURL = 'http://gateway.marvel.com/'
        let ts = Date.now().toString;
        let publicKey = PB_API_KEY;
        const test = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${params.queryText}&limit=20${params.queryText}&apikey=${publicKey}`

        fetch(test)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((json) => {
                            console.log(json)
                            console.log("thumbnail", json.data)
                            console.log("thumbnail", json.data.results)
                            setThumbnail(json.data.results)
                        })
                }
            })
    }, [params.queryText])

    return (
        <div>
            <ImageList cols={3} rowHeight={720}>
                {Object.values(thumbnail).map((item) => (
                    <ImageListItem key={item.id} onClick={() => onClickHero(item.id)}>
                        <img
                            // src={`http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_xlarge.jpg`}
                            // srcSet={`http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_xlarge.jpg`}
                            src={`${item.thumbnail.path}/detail.${item.thumbnail.extension}`}
                            srcSet={`${item.thumbnail.path}/detail.${item.thumbnail.extension}`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}

export default Main