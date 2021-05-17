import React, {useEffect, maps} from 'react';
const {kakao} = window;


const MapContainer = ({searchPlace}) => {
        useEffect(() => {
            let infowindow = new kakao.maps.InfoWindow({
                zIndex: 1
            });
            const container = document.getElementById('myMap'); // 내가 고쳐쓸 수 있는 곳
            const options = { center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3 }; 
            const map = new kakao.maps.Map(container, options); // 키워드로 검색하기
            const ps = new kakao.maps.services.Places();
            ps.keywordSearch(searchPlace, placesSearchCB); //searchPlace는 props값. 내가 수정할 수 있는 곳 
            // 아래코드 그대로 사용해야함 
            function placesSearchCB(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
                    let bounds = new kakao.maps.LatLngBounds();
                    for (let i = 0; i < data.length; i++) {
                        displayMarker(data[i]);
                        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    }
                    map.setBounds(bounds);
                }
            } // 아래코드는 그대로 사용해야함
            function displayMarker(place) {
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x)
                });
                kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
                });
            }
        }, [searchPlace]);
        return (
             <div id='myMap' style = {{
                        width: '500px',
                        height: '500px'
                }} ></div> 
                ); 
        } 
 export default MapContainer;