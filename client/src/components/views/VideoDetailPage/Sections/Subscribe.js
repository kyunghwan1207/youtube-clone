import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {
    const [subscribeNumber, setSubscribeNumber] = useState(0);
    const [subscribed, setSubscribed] = useState(false);
    useEffect(() => {
        let variable = {
            userTo: props.userTo
        }
        /** 현재 동영상 제작자의 구독자 수를 가져오자 */
        Axios.get('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if(response.data.success){  
                    setSubscribeNumber(response.data.subscribeNumber);
                } else{ 
                    alert('구독자 정보 불러오는데 실패')
                }
            })
        // 현재 접속한 유저의 구독정보
        let subScribedVariable = {
            userTo: props.userTo,
            userFrom: localStorage.getItem('userId')
        }
        Axios.post('/api/subscribe/subscribed', subScribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribed(response.data.result);

                } else {
                    alert('구독자 정보 받아오기 실패')
                }
            })

    }, [])

const onSubscribe = () => {
    let variable = {
        userTo: props.userTo,
        userFrom: localStorage.getItem('userId')
    }
    if(subscribed) { // 이미 구독 중이라면

        Axios.post('/api/subscribe/unSubscribe', variable)
            .then(response => {
                setSubscribeNumber(subscribeNumber-1)
                setSubscribed(!subscribed)
            })

    } else {
        Axios.post('/api/subscribe/subscribe', variable)
            .then(response => {
                setSubscribeNumber(subscribeNumber+1)
                setSubscribed(!subscribed)
            })

    }
}
  return (
    <div>
        <button
            style={{ backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}` , borderRadius: '4px',
                     color: 'white', padding: '10px 16px',
                     fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
             }}
             onClick={onSubscribe}
        >
            {subscribeNumber} {subscribed ? '구독 중' : '구독 하기'}
        </button>
    </div>
  )
}

export default Subscribe