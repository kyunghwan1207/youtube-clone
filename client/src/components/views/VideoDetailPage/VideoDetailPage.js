import React, {useEffect, useState} from 'react'
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {
    const [videoDetail, setVideoDetail] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let variable = {
            videoId: props.match.params.videoId
        }
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    console.log('VideoDetailPage/response.data: ', response.data);
                    setVideoDetail(response.data.videoDetail);

                } else {
                    alert('비디오 가져오는데 실패했습니다.')
                }
            })
        Axios.post('/api/comment/getComments', variable)
          .then(response => {
            if(response.data.success){
                console.log('VideoDetailPage/response.data: ', response.data);
                setComments(response.data.comments);

            } else {
                alert('비디오 가져오는데 실패했습니다.')
            }})
    }, [])
    const refreshComment = (newComments) => {
        setComments(comments.concat(newComments)); // 하위컴포넌트에서 댓글 작성됫을때 newComment로 전달해준 것을 엽디에트해준다

    }
    // 자기자신은 구독할 수 없으므로 , 로그인한 유저와 작성자가 다를때만 구독버튼 나오게함
    let subscribeButton;
    {videoDetail.writter && (subscribeButton = videoDetail.writter._id !== localStorage.getItem('userId') && <Subscribe userTo={videoDetail.writter._id} />)}
  return (
    <div>
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{ width: '100%', padding: '3rem 4rem'}}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls />
                    <List.Item
                        actions={[subscribeButton]}
                    >
                        { videoDetail.writter && 
                         <List.Item.Meta 
                            avatar = {<Avatar src={videoDetail.writter.image}/>}
                            title = {videoDetail.writter.name}
                            description = {videoDetail.description}
                        />}
                    </List.Item>
                    {/* Comments */}
                    {videoDetail && comments &&
                    <Comment commentList={comments} videoId={videoDetail._id} refreshComment={refreshComment}/>
                    }
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo/>
            </Col>
        </Row>

    </div>
  )
}

export default VideoDetailPage