import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import { NativeError } from 'mongoose';
import './style.css';


import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps'; // 패키지 불러오기

function NaverMapAPI() {
    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '30%', // 네이버지도 가로 길이
          height: '40vh' // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
        defaultZoom={13} // 지도 초기 확대 배율
      />
    );
  }


let Client_id = 'gmm1qrjlur';



let client_id = 'gmm1qrjlur';
let client_secret = 'oS6wvEtaPKSJ9D4hHNK0gALmuQrnr6vcSzFdLAU3';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, []);


    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }

    return (
       
        <div id="Landingbox">
        <RenderAfterNavermapsLoaded
            ncpClientId={'gmm1qrjlur'} // 자신의 네이버 계정에서 발급받은 Client ID
            error={<p>Maps Load Error</p>}
            loading={<p>Maps Loading...</p>}
        >
            <NaverMapAPI />
        </RenderAfterNavermapsLoaded>
            <h2>시작 페이지 지지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
