import React, {useRef} from 'react'
import './index.scss'

export default function Searching(props) {
    const {getTags} = props;
    const insertSec = useRef();

    function goSearch() {
        let {value} = insertSec.current;
        insertSec.current.value = '';
        getTags(value.trim());
    }

    return (
        <div className='searching input-group pt-3'>
            <input ref={insertSec} type="text" className="form-control" placeholder='Tags'/>
            <button onClick={goSearch} className="btn search-btn">
                Search
            </button>
        </div>
    )
}
