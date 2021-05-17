import React, {useState,useRef} from 'react';
import MapContainer from './MapContainer';
import './style.css';
import './style.css';

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
        return (
          
            
            
            <div class="header">
                <div class="inner-header flex">
                    <div id='Bigbox2'>
                
                    <MapContainer searchPlace={place} />
                    <form className = "inputForm" onSubmit = {onSubmit} > 
                    <input placeholder = "검색할 장소를 입력해주세요."onChange = {onChange}value = {inputText}ref = {elInput}/>
                    <button type="submit">검색</button >
                    </form>
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
      
            
    
  
            );
     }; 
export default SearchPlace;