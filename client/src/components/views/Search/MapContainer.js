import React, {useEffect, useState, Component} from 'react';
import Favorite from './Sections/Favorite';


import './style.css';
//import Fa from './Sections/Fa';

const {kakao} = window;
var el = document.createElement('li');

const MapContainer = ({searchPlace}) => {
    const [latitude, setlatitude] = useState("36.633535");
    const [longitude, setlongitude] = useState("127.425882");
        useEffect(() => {
            let infowindow = new kakao.maps.InfoWindow({
                zIndex: 1
            });
            let markers = [];
            const status = document.querySelector('#status');
            function success(position) {
                setlatitude(position.coords.latitude);
                setlongitude(position.coords.longitude);
                
            }

            function error() {
            status.textContent = 'Unable to retrieve your location';
            }
            if(!navigator.geolocation) {
                alert('Geolocation is not supported by your browser');
              } else {
                //status.textContent = 'Locating…';
                navigator.geolocation.getCurrentPosition(success, error);
            }

            function App1(){
                return <Favorite/>;
            }

            const container = document.getElementById('myMap'); // 내가 고쳐쓸 수 있는 곳
            const options = { center: new kakao.maps.LatLng(latitude, longitude), level: 4 };
            const map = new kakao.maps.Map(container, options); // 키워드로 검색하기
            const ps = new kakao.maps.services.Places();
            ps.keywordSearch(searchPlace, placesSearchCB); //searchPlace는 props값. 내가 수정할 수 있는 곳 
            
            
            function placesSearchCB(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
            
                    displayPlaces(data);
            
                    displayPagination(pagination);
            
                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            
                    alert('검색 결과가 존재하지 않습니다.');
                    return;
            
                } else if (status === kakao.maps.services.Status.ERROR) {
            
                    alert('검색 결과 중 오류가 발생했습니다.');
                    return;
            
                }
            } 
            function displayPlaces(places) {

                var listEl = document.getElementById('placesList'), 
                menuEl = document.getElementById('menu_wrap'),
                fragment = document.createDocumentFragment(), 
                bounds = new kakao.maps.LatLngBounds(), 
                listStr = '';
                
             
                removeAllChildNods(listEl);
            
     
                removeMarker();
                
                for ( var i=0; i<places.length; i++ ) {
            
              
                    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                        marker = addMarker(placePosition, i), 
                        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
                        //console.log("itemEl = " , itemEl);
            
                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    bounds.extend(placePosition);
 
                    (function(marker, title) {
                        kakao.maps.event.addListener(marker, 'mouseover', function() {
                            displayInfowindow(marker, title);
                        });
            
                        kakao.maps.event.addListener(marker, 'mouseout', function() {
                            infowindow.close();
                        });
            
                        itemEl.onmouseover =  function () {
                            displayInfowindow(marker, title);
                        };
            
                        itemEl.onmouseout =  function () {
                            infowindow.close();
                        };
                    })(marker, places[i].place_name);
            
                    fragment.appendChild(itemEl);
                }
            
                // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
                listEl.appendChild(fragment);
                //console.log("listEl : ", listEl);
                menuEl.scrollTop = 0;
            
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            }
    
            // 검색결과 항목을 Element로 반환하는 함수입니다
            function getListItem(index, places) {

                
                var el = document.createElement('li'),
               
                itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                            '<div class="info">'+ 
                              '<h5>' + places.place_name + '</h5>';
            
                if (places.road_address_name) {
                    itemStr += '    <span>' + places.road_address_name + '</span>' +
                                '   <span class="jibun gray">' +  places.address_name  + '</span>';
                } else {
                    itemStr += '    <span>' +  places.address_name  + '</span>'; 
                }
                             
                  itemStr += '  <span class="tel">' + places.phone  + '</span>' + '</div>' +
                         '<a href=' + places.place_url + ' target="_blank" > 해당 사이트 방문하기 </a>';

                el.innerHTML = itemStr;
                
               
                
                el.className = 'item';


                el.setAttribute("onClick", <Favorite/>);
                //el.setAttribute("onClick", {newPage(urlname)});
               // console.log("el = " , el);
               // console.log(places.place_url);
                
                //<Favorite placesInfo={places} userFrom={localStorage.getItem('userId')} />
                return(
                     el //+ <button onClick={button1_click} >버튼1</button>
                )
            }
            //<Fa placeInfo={places}/>

            // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
            function addMarker(position, idx, title) {
                var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                    imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                    imgOptions =  {
                        spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                        spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                        offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                    },
                    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                        marker = new kakao.maps.Marker({
                        position: position, // 마커의 위치
                        image: markerImage 
                    });
            
                marker.setMap(map); // 지도 위에 마커를 표출합니다
                markers.push(marker);  // 배열에 생성된 마커를 추가합니다
            
                return marker;
            }
            
            // 지도 위에 표시되고 있는 마커를 모두 제거합니다
            function removeMarker() {
                for ( var i = 0; i < markers.length; i++ ) {
                    markers[i].setMap(null);
                }   
                markers = [];
            }
            
            // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
            function displayPagination(pagination) {
                var paginationEl = document.getElementById('pagination'),
                    fragment = document.createDocumentFragment(),
                    i; 
            
                // 기존에 추가된 페이지번호를 삭제합니다
                while (paginationEl.hasChildNodes()) {
                    paginationEl.removeChild (paginationEl.lastChild);
                }
            
                for (i=1; i<=pagination.last; i++) {
                    var el = document.createElement('a');
                    el.href = "#";
                    el.innerHTML = i;
                    
                    if (i===pagination.current) {
                        el.className = 'on';
                    } else {
                        el.onclick = (function(i) {
                            return function() {
                                pagination.gotoPage(i);
                            }
                        })(i);
                    }
            
                    fragment.appendChild(el);
                }
                paginationEl.appendChild(fragment);
            }

            function displayInfowindow(marker, title) {
                var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
            
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
            
             // 검색결과 목록의 자식 Element를 제거하는 함수입니다
            function removeAllChildNods(el) {   
                while (el.hasChildNodes()) {
                    el.removeChild(el.lastChild);
                }
            }

        }, [searchPlace]);
        
        return (
            <div>
             <div id='myMap' style = {{
                        width: '500px',
                        height: '500px'
                }} >
             </div>
             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite  />
            </div>
            {/*<div id='exa'>
                <Favorite/>
          
            </div>*/}

            </div>
                
            ); 
        } 
 export default MapContainer;
