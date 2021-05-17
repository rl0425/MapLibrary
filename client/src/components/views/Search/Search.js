import React, {useState,useRef, Link} from 'react';
import MapContainer from './MapContainer';
import './style.css';
import './style.css';
import placeLists from './placesList'
import Favorite from './Sections/Favorite';






const SearchPlace = () => {
        const [inputText, setInputText] = useState("");
        const elInput = useRef();
        const onChange = (e) => {
            setInputText(e.target.value);
        };
        const [place, setPlace] = useState("");
        const onSubmit = (e) => {
            e.preventDefault();
            setPlace(inputText);
            setInputText("");
            elInput.current.focus();
        };

        function button1_click() {
            //console.log("click check");
        }

        return (
            
           
            <div id='smallbox'>
            <placeLists />
            <div className="header">
                
                <div className="inner-header flex">
                    
                    <div id='Bigbox2'>                        
                        <div className="map_wrap">
                            <div id="menu_wrap" class="bg_white">
                                <div className="option">
                                    <MapContainer searchPlace={place} />
                                    <a href='https://google.com'></a>
                                    <form className = "inputForm" onSubmit = {onSubmit} > 
                                    <input placeholder = "검색할 장소를 입력해주세요."onChange = {onChange}value = {inputText}ref = {elInput}/>
                                    <button type="submit">검색</button >
                                    <a href={"https://google.com"}>LinkedIn handle</a>
                                    </form>
                                <button onClick={button1_click}>버튼1</button>
                            </div>
                    </div>
                    
                    <ul id="placesList" ></ul>
                    
                    <div id="pagination"></div>
                    <placeLists />
                    </div>
                    </div>
                </div>
                <div>
                    <svg class="waves2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="14" fill="rgba(255,255,255,0.7" />
                    <use xlinkHref="#gentle-wave" x="48" y="18" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="20" fill="rgba(255,255,255,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="24" fill="#fff" />
                    </g>
                    </svg>
                </div>
                
            </div>
          
      
            
            </div>
  
            );
     }; 
export default SearchPlace;