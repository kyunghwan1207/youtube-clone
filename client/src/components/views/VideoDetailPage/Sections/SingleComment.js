import React, { useState } from 'react'
import {Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';

function SingleComment(props) {
    console.log('SingleCommment/props: ', props);
    const [openReply , setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    
    const actions = [
        <span onClick={() => setOpenReply(!openReply)} key="comment-basic-reply-to">Reply to</span>
    ]
    const onSubmit = (e) => {
        e.preventDefault();
        let veariables = {
            content: commentValue,
            writter: localStorage.getItem('userId'),
            postId: props.videoId,
            responseTo: props.comment._id
        }
        Axios.post('/api/comment/saveComment', veariables)
            .then(response => {
                if(response.data.success){
                    console.log('singleComment.js/saveComment/response.data: ', response.data)
                    setCommentValue("")
                    setOpenReply(!openReply)
                    props.refreshComment(response.data.result)

                } else {
                    alert('댓글 작성에 실패했ㅅ브니다.')
                }
            })
    }
  return (
    <div>
        <Comment
            actions={actions}
            author={props.comment.writter.name}
            avatar={<Avatar src={props.comment.writter.image} alt/>}
            content={<p>{props.comment.content}</p>}
        />
        {openReply && 
        <form style={{ display: 'flex'}}  onSubmit={onSubmit}>
            <textarea
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={(e) => {setCommentValue(e.target.value)}}
                value={commentValue}
                palcehodler="댓글 작성해주세요"
            />
            <br/>
            <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>작성</button>

        </form>
        }   
    </div>
  )
}

export default SingleComment