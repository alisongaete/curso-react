import React from 'react'

const Search = ({search, searchInput, handleSearch}) => {
    return (
        <div>
            <input  className="search" type="text" placeholder="Search..." value={search} ref={searchInput} onChange={handleSearch}/>
        </div>
    )
}

export default Search
