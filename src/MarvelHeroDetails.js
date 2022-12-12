import { useState, useEffect } from "react";
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { CircularProgress, IconButton, Box, Link } from "@mui/material";

export const PB_API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY

function MarvelHeroDetails(props) {
    const [loading, setLoading] = useState(true);

    const params = useParams()
    const [comic, setComic] = useState([])

    const navigate = useNavigate()

    const onClickHero = (x) => {
        console.log("tapped hero:" + x)
        navigate(`/story/${x}`);
    }

    useEffect(() => {

        console.log("called api")
        let publicKey = PB_API_KEY;
        console.log("id" + params.queryId)
        console.log("key" + publicKey)
        const url = `https://gateway.marvel.com:443/v1/public/characters/${params.queryId}/comics?apikey=${publicKey}`

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((json) => {
                            console.log(json)
                            console.log("comic", json.data)
                            console.log("comic result", json.data.results)
                            setComic(json.data.results)
                            setLoading(false);
                        })
                }
            })
    }, [params.queryText])



    return (
        <div>
            <h1 style={{margin:16,color:'#ed1d24'}}>Comic Titles</h1>
            <div>
                {loading &&
                    <div>
                        <CircularProgress style={{margin:16}}/>
                    </div>}
            </div>
            <List className="card-view">
                {Object.values(comic).map((avatar) => (
                    <ListItem alignItems="flex-start" divider={true} onClick={() => onClickHero(avatar.id)}>
                        <ListItemAvatar>
                            <div>
                                {avatar.images.slice(0, 1).map((imageList) => (
                                    <Avatar alt={avatar.title} src={`${imageList.path}/portrait_small.${imageList.extension}`} />
                                ))}
                            </div>
                        </ListItemAvatar>
                        <ListItemText
                            primary={avatar.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary">

                                        Date Updated: {avatar.modified}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>
            <h1 style={{padding:16,color:'#ed1d24'}}>Comic Covers</h1>
            <ImageList style={{margin:12}} cols={4} >
                {Object.values(comic).map((item) => (
                    <div>
                        {item.images.slice(0, 1).map((imageList) => (
                            <ImageListItem onClick={() => onClickHero(item.id)}>
                                <img
                                    src={`${imageList.path}/detail.${imageList.extension}`}
                                    srcSet={`${imageList.path}/detail.${imageList.extension}`}
                                    alt={imageList.title}
                                    loading="lazy"
                                    title={`${item.title}`}
                                />
                            </ImageListItem>
                        ))}
                    </div>
                ))}

            </ImageList>
        </div>
    )
}

export default MarvelHeroDetails