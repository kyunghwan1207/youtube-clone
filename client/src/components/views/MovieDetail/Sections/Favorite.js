import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Button} from 'antd';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);
    console.log('Favorite/props.userFrom: ', userFrom);
    console.log('Favorite/props.movieTitle: ', movieTitle)
    console.log('Favorite/props.moviePost: ', moviePost)
    console.log('Favorite/props.movieRunTime: ', movieRunTime)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const onClickFavorite = () => {

        if(favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(favoriteNumber - 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스ㅡ에서 지우는 걸 실패했습니다.')
                    }
                })
        } else {
            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(favoriteNumber + 1)
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                    }
                })

        }
    }

    useEffect(() => {
        console.log('Favorite/variables: ', variables);
        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                console.log('response.data: ', response.data);
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber);
                } else{
                    alert('숫자 정보를 가져온ㄴ데 실패했습니다.')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                console.log('response.data: ', response.data);
                if(response.data.success){
                    setFavorited(response.data.favorited);
                } else{
                    alert(' 좋아요 정보 가져오는데 실패했습니다.')
                }
            })
    }, [])
  return (
    <div>
        <Button onClick={onClickFavorite} >{favorited ? "Not Favoirte" : "Add to Favoite "} {favoriteNumber}</Button>
    </div>
  )
}

export default Favorite
