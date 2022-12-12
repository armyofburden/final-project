import React from "react";

import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, styled, Divider, Button } from '@mui/material'

function MarvelAttribution(props) {
    const goToMarvelSite = () => {
        // redirect the user to http://www.example.com
        window.open('https://developer.marvel.com/documentation/attribution', '_blank');
    };

    return (
        <div style={{ margin: 20 }}>
            <h1>Attribution</h1>
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
                        You understand and acknowledge that Marvel may be independently creating applications, content and other products or services that may be similar to or
                        competitive with your App, and nothing in these API Terms of Use will be construed as restricting or preventing Marvel from creating and fully
                        exploiting such applications, content and other products or services now or in the future, without any obligation to you.
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
                        You must attribute Marvel as the source of data whenever you display any results from the Marvel Comics API. Please use the following text on 
                        every application screen or web page which displays the API result:
                        "Data provided by Marvel. © 2014 Marvel"
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
                    Marvel Attribution
                </Button>
            </Card>
        </div>
    )
}

export default MarvelAttribution;