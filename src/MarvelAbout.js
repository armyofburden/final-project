import React from "react";
import { useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, styled, Divider, Button } from '@mui/material'

function MarvelAbout(props) {

    const goToMarvelSite = () => {
        // redirect the user to http://www.example.com
        window.open('https://developer.marvel.com/', '_blank');
    };

    return (
        <div style={{ margin: 20 }}>
            <h1>About</h1>
            <h4> Data provided by Marvel. © 2014 Marvel</h4>
            <Card sx={{ maxWidth: 1000 }}>

                <CardContent>
                    <Typography
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        variant="body2"
                        color="text.primary"
                        paragraph>
                        Marvel Infinity Comics are an all-new way to experience Marvel comics created specifically with your mobile device in mind.
                        Enjoy reading with continuous vertical scroll featuring stories from top creators such as Jonathan Hickman and Skottie Young. New issues are added every week.
                        Please note that Marvel Infinity Comics are designed for your phone and tablet and are available exclusively on the Marvel Unlimited app.
                        We do not currently support Marvel Infinity Comics on the web.
                    </Typography>
                    <Typography
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        variant="body2"
                        color="text.primary"
                        paragraph>
                        In addition to searching by topic or keyword(s) within the search tab, you can search for a specific series, character and/or creator.
                        You can also browse reading guides, which are specifically curated by Marvel editors.
                        The reading guides can be filtered by several different categories, such as Character Close-Up, Storylines, Events and more!
                    </Typography>
                    <Typography
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 25
                        }}
                        variant="caption"
                        color="text.primary"
                        paragraph>
                        If you would like to provide us with feedback, please reach out to Marvel Customer Support at help.marvel.com.
                    </Typography>
                </CardContent>

                <Button style={{
                    backgroundColor: "#ed1d24",
                    display: 'flex',
                    margin: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} onClick={goToMarvelSite}
                    variant="contained"
                    size="medium">
                    About Marvel API
                </Button>
            </Card>
        </div>
    )
}

export default MarvelAbout;