import { Row } from 'antd';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import GridCard from '../commons/GridCard';
import MainImage from '../LandingPage/Sections/MainImage';
import Favorite from './Sections/Favorite';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
    let movieId = props.match.params.movieId; // App.js에서 param값으로 줄수 있음
    console.log('movieDeatil/ movieId: ', movieId);
    const [movie, setMovie] = useState([]);
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        let endpointCrew =  `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

      fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })

      fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })
    }, [])
    
  return (
    <div>
        {/* Header */}
        {movie && 
        <MainImage
            image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
            title = {movie.original_title}
            text={movie.overview}
        />}
        {/* Body */}
        <div style={{ width: '85%', margin: '1rem auto' }}>
            {/* Favoite Btn */}
            {movie && 
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite 
                        movieInfo = {movie}
                        movieId = {movieId}
                        userFrom = {localStorage.getItem('userId')}
                
                /> 
                </div>}
            
            {/* Moie Info */}
            {movie && 
                <MovieInfo
                movie = {movie}
            />}
            <br/>
            {/* Actor Grid */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <button onClick={() => setActorToggle(!actorToggle)} >Toggle Actor View</button>
            </div>
            
            { actorToggle && <Row gutter={[16, 16]}>
                    {casts && casts.map((cast, index) => (                        
                        <React.Fragment key={index}>
                            <GridCard
                                image = {cast.profile_path ?
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                characterName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>}
        </div>
    </div>
  )
}

export default MovieDetail