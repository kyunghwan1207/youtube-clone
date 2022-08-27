import Axios from 'axios';
import React, { useState } from 'react'
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const [commentValue, setCommentValue] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        let veariables = {
            content: commentValue,
            writter: localStorage.getItem('userId'),
            postId: props.videoId
        }
        Axios.post('/api/comment/saveComment', veariables)
            .then(response => {
                if(response.data.success){
                    console.log('response.data: ', response.data)
                    setCommentValue("")
                    
                    props.refreshComment(response.data.result)
                } else {
                    alert('댓글 작성에 실패했ㅅ브니다.')
                }
            })
    }
  return (
    <div>
        <br/>
        <p>Replies</p>
        <hr/>
        {/* Comment List */}
        {/* responseTo가 없는애들 즉, 부모댓글만 보여줌 */}
        {props.commentList && props.commentList.map((comment, index) => (
            (!comment.responseTo &&
                <>  
                    <SingleComment comment={comment} postId={props.videoId} refreshComment={props.refreshComment} />
                    <ReplyComment parentCommentId={comment._id} commentList={props.commentList} postId={props.videoId} refreshComment={props.refreshComment}/>
                </>
            )
        ))}
        
        {/* Root Comment Form */}
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
    </div>
  )
}

export default Comment