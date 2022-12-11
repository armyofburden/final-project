import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom'



function MarvelHeroStory(props){

    const params = useParams()

    return(
        <div>{params.queryStoryId}</div>
    )
}

export default MarvelHeroStory