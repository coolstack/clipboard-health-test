import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setKeyword, searchJobs } from '../store/jobs.action'
import { Filters, Jobs } from '../components';
import api from '../ApiConfig';

const Home = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)  
  const { query } = state.jobs
  
  const [ filters, setFilters ] = useState([]);
  useEffect(() => {        
      fetch('/api/filters', { method: 'GET' }).then(async res => {
        setFilters(await res.json());
      });
      dispatch(setKeyword(""));
  }, [setFilters]);


  return (
    <div>
      <div className="flex flex-col m-5">
          <input type="search" className="bg-white shadow border-0 search-input" name="search" placeholder="Search for any job, title, keywords or company" value={query.keyword} onChange={(e)=>dispatch(setKeyword(e.target.value))}/>
          <div className="search-icon">
              <svg version="1.1" className="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 52.966 52.966" style={{enableBackground:"new 0 0 52.966 52.966"}} >
                  <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                  c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                  C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
                  S32.459,40,21.983,40z"/>
              </svg>
          </div>
      </div>
      <div className="flex sidebarContainer m-5 lg:space-x-4">
          <Filters filters={filters} />
          <Jobs />
      </div>
    </div>
  )
}

export default Home;