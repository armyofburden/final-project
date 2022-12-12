import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom'
import { Button, CircularProgress } from "@mui/material";

import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, styled, Divider } from '@mui/material'

export const PB_API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function MarvelHeroStory(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const params = useParams()
    const [story, setStory] = useState([])
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        console.log("called api")
        let publicKey = PB_API_KEY;
        const storyRequest = `https://gateway.marvel.com:443/v1/public/comics/${params.queryStoryId}?apikey=${publicKey}`

        fetch(storyRequest)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((json) => {
                            console.log(json)
                            console.log("story", json.data)
                            console.log("story result", json.data.results)
                            setStory(json.data.results)
                            setLoading(false);
                        })
                }
            })
    }, [params.queryStoryId])


    return (
        <div className="comic-wall" style={{
            display: `flex`,
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {loading &&
                <div>
                    <CircularProgress />
                </div>}
            {Object.values(story).map((avatar) => (
                <Card sx={{ maxWidth: 1440 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "#ed1d24" }} aria-label="recipe">
                                {avatar.images.slice(0, 1).map((imageList) => (
                                    <Avatar alt={avatar.title} src={`${imageList.path}/portrait_small.${imageList.extension}`} />
                                ))}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <Button>Comic ID: {avatar.id}</Button>
                            </IconButton>
                        }
                        title={avatar.title}
                        subheader={avatar.modified}
                    />
                    {avatar.images.slice(0, 1).map((imageList) => (
                        <CardMedia
                            component="img"
                            height="500"
                            image={`${imageList.path}/detail.${imageList.extension}`}
                            alt={avatar.title}
                        />
                    ))}

                    <CardContent>
                        <Typography>
                            {avatar.prices.slice(0, 1).map((priceList) => (
                                <Typography
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                    variant="h2"
                                    color="text.primary">
                                    ${priceList.price}
                                </Typography>
                            ))}
                        </Typography>
                        <Typography
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                            variant="body2"
                            color="text.secondary">
                            ISBN NO : {avatar.isbn}
                        </Typography>
                        <Typography
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                            variant="body2"
                            color="text.secondary">
                            ISSN NO : {avatar.issn}
                        </Typography>
                        <Typography
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                            variant="body2"
                            color="text.secondary">
                            Page Count : {avatar.pageCount}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button>Add to Cart</Button>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <Button>#</Button>
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Plot:</Typography>
                            <Typography paragraph>
                                This is the plot of the comic. Public API unable to retrieve event.
                                This is to showcase the text in paragraph
                            </Typography>
                            <Typography paragraph>
                                This is the description of the comic
                            </Typography>
                            <Typography paragraph>
                                The Marvel Cinematic Universe (MCU) is an American media franchise and shared universe centered on a series of superhero films produced by Marvel Studios.
                                The films are based on characters that appear in American comic books published by Marvel Comics.
                                The franchise also includes television series, short films, digital series, and literature.
                                The shared universe, much like the original Marvel Universe in comic books, was established by crossing over common plot elements, settings, cast, and characters.
                            </Typography>
                            <Typography>
                                Data provided by Marvel. © 2014 Marvel
                            </Typography>
                        </CardContent>
                    </Collapse>
                    
                </Card>

            ))}

        </div>

    )
}

export default MarvelHeroStory