import { Typography, Card, Icon, Avatar, Col, Row } from 'antd'
import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {FaCode} from 'react-icons/fa';

const {Title} = Typography
const {Meta} = Card;

function VideoListPage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success){
                    console.log('VideoListPage/response.data: ', response.data);
                    setVideos(response.data.videos);

                } else {
                    alert('비디오 리스트를 가져오는데 실패했습니다')
                }
            })
    }, [])
    const renderCards = videos.map((video, index) => {
        
        return <Col lg={6} md={8} xs={24}>
                <a href={`/video/${video._id}`}>
                    <div style={{ position: 'relative' }}>
                    <div className='duration'>
                        <span>xx</span>
                    </div>
                </div>
                </a>
                <br/>
                <Meta
                    avatar={
                        <Avatar src={video.writter.image}/>
                    }
                    title={video.title}
                    description={video.description}
                />
                <span>{video.writter.name}</span><br/>
                <span style={{ marginLeft: '3rem' }}>{video.views}</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            </Col>
    })
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2}> Recommended </Title>
        <hr/>
        <Row gutter={[32, 16]}>
            {renderCards}
            
        </Row>

    </div>
  )
}

export default VideoListPage