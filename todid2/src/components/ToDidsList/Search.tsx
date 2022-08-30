import { FC, useState } from 'react';
import styled from 'styled-components';

const Search = ({search, setSearch, className}: { search: string, setSearch: Function, className: string }) => {
    return (
        <div className={className}>
            <span>Search</span>
            <input 
                type='text' 
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    )
}
const StyledSearch = styled(Search)`
    span {
        margin-right: 5px;
    }
`;

export default StyledSearch;