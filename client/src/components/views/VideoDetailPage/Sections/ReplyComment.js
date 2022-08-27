import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [childCommentNumber, setChildCommentNumber] = useState(0);
    const [openReplyComments, setOpenReplyComments] = useState(false);

    const onHandleClick=()=>{
        setOpenReplyComments(!openReplyComments);
    }
    useEffect(() => {
        let commentNumber = 0;
        props.commemtList.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber ++;
            }
            
        })
        setChildCommentNumber(commentNumber);
    }, [props.commemtList])
    const renderReplyComment =(parentCommentId) => {
        props.commentList.map((comment, index) => (
            /** 부모댓글의 id가 responseTo인 대댓글만 나오게 한다.. */
            (comment.responseTo === parentCommentId &&
            <div style={{width: '80%', marginLeft:'40px'  }}>  
                <SingleComment comment={comment} postId={props.videoId} refreshComment={props.refreshComment} />
                <ReplyComment commentList={props.commentList} postId={props.videoId} parentCommentId={comment._id} refreshComment={props.refreshComment}/>
            </div>)
        ))
    }
  return (
    <div>
        {childCommentNumber > 0 && 
            <p style={{ fontSize: '14px', margin: 0, color:'gray' }} onClick={onHandleClick}>
            대댓글 {childCommentNumber} 개 더보기
            </p>
        }
        
        {openReplyComments && 
            renderReplyComment(props.parentCommentId)
        }
        
    </div>
  )
}

export default ReplyComment