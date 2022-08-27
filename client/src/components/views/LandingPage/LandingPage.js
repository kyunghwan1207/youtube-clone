import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCard from '../commons/GridCard';
import { Row } from 'antd';

function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const loadMoreItems = () => {
        console.log('onClikced! load more btn');
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        fetchMovies(endpoint);

    };
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...movies, ...response.results]);
            console.log('response.results[0]: ', response.results[0]);
            console.log("response.results[0].backdrop_path: ", response.results[0].backdrop_path);
            setMainMovieImage(response.results[0]);
            setCurrentPage(response.page);
        });
    }
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, [])
    return (
        <>
          <div style={{ width: '100%', margin: '0'}}>
            {/* Main Image */}
            {mainMovieImage &&

            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
                title = {mainMovieImage.original_title}
                text={mainMovieImage.overview}
                 />

            }
            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movie by latest</h2>
                <hr/>
                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {movies && movies.map((movie, index) => (                        
                        <React.Fragment key={index}>
                            <GridCard
                                landingPage
                                image = {movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId = {movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
          </div>  
        </>
    )
}

export default LandingPage
