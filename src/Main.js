import { useState, useEffect } from "react";
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Outlet, NavLink, Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//class 
import MarvelHeroDetails from "./MarvelHeroDetails";
import MarvelHeroStory from "./MarvelHeroStory";
import MarvelAbout from "./MarvelAbout";
import MarvelAttribution from "./MarvelAttribution";

export const PB_API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY

function Main(props) {

    const [thumbnail, setThumbnail] = useState([])

    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />}></Route>
                <Route path="/search" element={<SearchPage />}>
                    <Route path="/search/:queryText/" element={<SearchResult />} />
                </Route>
                <Route path="/details/:queryId/" element={<MarvelHeroDetails />}></Route>
                <Route path="/story/:queryStoryId/" element={<MarvelHeroStory />}></Route>
                <Route path="/about/:aboutId/" element={<MarvelAbout />}></Route>
                <Route path="/attribution/:attributionId/" element={<MarvelAttribution />}></Route>
                <Route path="*" element={<p>Page not found</p>} />
            </Routes>
        </BrowserRouter>
    </div>
}


function SearchPage(props) {
    const params = useParams()
    const [query, setQuery] = useState(params.queryText ? params.queryText : '')
    const [randomString, setRandomString] = useState('');

    const navigate = useNavigate()

    const onQueryChanged = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`/search/${query}`);
    }

    const goToAboutPage = (event) => {
        event.preventDefault()
        navigate(`/about/about`)
    }

    const goToAttributionPage = (event) => {
        event.preventDefault()
        navigate(`/attribution/attribution`)
    }

    const searchWithRandomString = (event) => {
        const values = ['thor', 'captain', 'hulk', 'loki', 'iron man', 'green', 'thanos', 'black panther', 'dr', 'silver',
            'red', 'dark', 'black widow', 'jessica', 'ant', 'captain marvel','al','dare','dead', 'emma',
        'star', 'hawk', 'magneto', 'night', 'cyclops', 'nick', 'ice', 'mr', 'jean', 'scarlet'];
        const index = Math.floor(Math.random() * 30);
        const randomString = values[index];
        setRandomString(randomString);
        event.preventDefault()
        navigate(`/search/${randomString}`)
    }

    return (
        <div className="search-wall">
            <form style={{
                padding: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} align="left" onSubmit={handleSubmit}>
                <TextField
                    id="search"
                    label="Input Character Name"
                    variant="outlined"
                    size="small"
                    value={query}
                    onChange={onQueryChanged}
                ></TextField>{' '}
                <Button style={{ backgroundColor: "#ed1d24", marginInlineStart: 8 }} onClick={handleSubmit} variant="contained" size="large">Search</Button>
                <Button style={{ backgroundColor: "#A020F0", marginInlineStart: 8 }} onClick={goToAboutPage} variant="contained" size="large">About</Button>
                <Button style={{ backgroundColor: "#000042", marginInlineStart: 8 }} onClick={goToAttributionPage} variant="contained" size="large">Attribution</Button>
                <Button style={{ backgroundColor: "#023020", marginInlineStart: 8 }} onClick={searchWithRandomString} variant="contained" size="large">Feeling Lucky</Button>
            </form>
            <Outlet />
        </div>
    )
}

function SearchResult(props) {

    const params = useParams()
    const [thumbnail, setThumbnail] = useState([])

    const navigate = useNavigate()

    const onClickHero = (x) => {
        console.log("tapped hero:" + x)
        navigate(`/details/${x}`);
    }

    useEffect(() => {
        console.log("called api")
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
            <ImageList style={{ margin: 12 }} cols={3} rowHeight={720}>
                {Object.values(thumbnail).map((item) => (
                    <ImageListItem key={item.id} onClick={() => onClickHero(item.id)}>
                        <img
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