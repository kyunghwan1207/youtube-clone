import React from 'react'
import { Col } from 'antd';

function GridCard(props) {
    // console.log('GridCard/props: ', props);
    if(props.landingPage){
        return (
            <Col lg={6} md={8} xs={24}>
                {/* media query처럼 화면 크기에 따라 카드배치 다르게 하기위해 Col사용
                    한 가로사이즈가 24이니까 화면이 가장클때 즉, lage(lg)일대는 4개의 영화 card를 듸울것이니까 각각 6씩 차지하면 됨 
                    그리고 화면이 중간사이즈로 되면 3개만 듸울것이니까 각각 사이즈를 8로 설정한다
                    제일 작을 땐 하나의 사이즐르 24로 해서 하나의 col이 모든 화면을 차지할 수 있게 한다
                */}
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} src={`${props.image}`} alt={props.movieName} />
                    </a>
                </div>
            </Col>
            
            
          )

    } else{ // 배우 페이지
        return (
            <Col lg={6} md={8} xs={24}>
                {/* media query처럼 화면 크기에 따라 카드배치 다르게 하기위해 Col사용
                    한 가로사이즈가 24이니까 화면이 가장클때 즉, lage(lg)일대는 4개의 영화 card를 듸울것이니까 각각 6씩 차지하면 됨 
                    그리고 화면이 중간사이즈로 되면 3개만 듸울것이니까 각각 사이즈를 8로 설정한다
                    제일 작을 땐 하나의 사이즐르 24로 해서 하나의 col이 모든 화면을 차지할 수 있게 한다
                */}
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '320px' }} src={`${props.image}`} alt={props.characterName} />
                </div>
            </Col>
          )
    }
  
}

export default GridCard