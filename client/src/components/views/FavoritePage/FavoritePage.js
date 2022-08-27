import React, { useEffect, useState } from 'react'
import './favorite.css';
import axios from 'axios';
import { Popover } from 'antd';
import {IMAGE_BASE_URL} from '../../Config';

function FavoritePage() {
    const [favorites, setFavorites] = useState([]);


    const onClickRemove = (movieId, userFrom) => {
        const variables ={
            movieId: movieId,
            userFrom: userFrom
        }
        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    console.log('FavoritePage/removeFromFaovorite: ', response.data);
                    fetchFavoriteMovies();
                } else {
                    alert('좋아요를 제거하는데 실패했습니다.')
                }
            })
    }
    const renderCards = favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"
                }
                
            </div>
        )

        return (
            <tr key = {index}>
                <Popover content={content} title={`${favorite.movieTitle}}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                
                <td>{favorite.movieRunTime} mins</td>
                <td><button onClick={() => onClickRemove(favorite.movieId, favorite.userFrom)}>Remove</button></td>
            </tr>
        )
    })

    const fetchFavoriteMovies = () => {
        axios.post('/api/favorite/getFavoriteMovies', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if(response.data.success) {
                    setFavorites(response.data.favorites);
                } else{ 
                    alert('좋아하는 영화정보를 가져오는데 실패했습니다.');
                }
            })
    }
    useEffect(() => {
        fetchFavoriteMovies();
    }, [])
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
        <h2> Favorite Movies</h2>
        <hr/>
        <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <td>Remove from favorites</td>
                </tr>
            </thead>
            <tbody>
                {renderCards}
            </tbody>
        </table>
    </div>
  )
}

export default FavoritePage