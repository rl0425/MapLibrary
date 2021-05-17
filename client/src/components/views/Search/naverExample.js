import React from 'react'; 
import axios from 'axios';
//import SearchMovie from '../components/SearchMovie'; 

 class Search extends React.Component {
      state = {
           isLoading: true, 
           movies: [],
            value: "" 
        };
    getSearchMovie = async () => {
        const Search_clientid = 'nNbStoOsseZMMC6XXO4E'
        const Search_clientSecret = 'mdJpyuucnA'
          const search = this.state.value;
           try {
            if (search === "") { this.setState({movies: [], isLoading: false}) }

            else{
            const {data: {
            items
                }} = await axios.get('/v1/search/local.json',{
                    params:{
                        query:search,
                        display:5,
                        start:1
                        },
                        headers: {
                            'X-Naver-Client-Id': Search_clientid,
                            'X-Naver-Client-Secret': Search_clientSecret 
                        } 
                 });
                 console.log(items);
                
            this.setState({movies: items, isLoading: false});
                }
            } catch (error) { 
                console.log(error);
                } 
            };
            componentDidMount() {
            this.getSearchMovie();
            };
            handleChange = (e) => {
                this.setState({value: e.target.value});
                };
            handleSubmit = (e) => {
                e.preventDefault();
                this.getSearchMovie(); 
            };

            render() { 
                const {movies, isLoading} = this.state; 
                
                return (<section className="container">
                    { 
                        isLoading
                        ? (<div className="loader">
                            <span className="loader__text">Loading..</span>
                            </div>)
                            : (<form onSubmit={this.handleSubmit}>
                            <div> 
                                <div className="input_div">
                                    <h1>영화 검색</h1>
                                    <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="영화를 검색해 보세요."/>
                                </div>
                            
                            </div>
                        </form>) 
                    } 
                </section>);
                }
            } 
                
export default Search;

                        