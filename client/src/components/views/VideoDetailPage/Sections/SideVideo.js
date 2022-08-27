import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function SideVideo() {
    const [sideVideos, setSideVideos] = useState([])
    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success){
                    console.log('VideoListPage/response.data: ', response.data);
                    setSideVideos(response.data.videos);

                } else {
                    alert('비디오 리스트를 가져오는데 실패했습니다')
                }
            })
    }, [])
//  const renderSideVideo = sideVideos.map((video, index) => {
//     return <div style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem' }}>
//     <div style={{ width: '40%', marginBottom: '1rem' }}>
//         <a >
//             <img  style={{ width: '100%' }} />
//         </a>

//     </div>
//     <div style={{ width: '50%' }} >
//         <a>
//             <span style={{ fontSize: '1rem', color:'black'}}>{video.title}</span><br/>
//             <span >{video.writter.name}</span><br/>

//         </a>
//     </div>
// </div>
//  })
  return (
    
    <>
        {/* {renderSideVideo} */}
    </>

    
  )
}

export default SideVideo