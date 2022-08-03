import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Todid from './Todid';
import { IToDid } from '../interfaces';

type IToDidsListProps = {
    todids: Object | null,
    deleteTodid: Function
}

const isObjEmpty = (obj: any) => Object.keys(obj).length === 0;

type IOption = {
    value: string,
    label: string
}

const SORT_OPTIONS = {
    NEW: { value: 'new', label: 'New' },
    OLD: { value: 'old', label: 'Old' }
}

const ToDidsList:FC<IToDidsListProps> = (props) => {
    const { todids, deleteTodid } = props;
    const [sort, setSort] = useState(SORT_OPTIONS.NEW.value);
    const [search, setSearch] = useState('');
    return (
        <>
            {/* @ts-ignore */}
            <StyledSort sort={sort} setSort={setSort} />
            {/* @ts-ignore */}
            <StyledSearch search={search} setSearch={setSearch} />

            { (!todids || isObjEmpty(todids)) && <div>Create your first To-Did</div> }
            {/* @ts-ignore */}
            {todids && <StyledList todids={todids} search={search} sort={sort} deleteTodid={deleteTodid} />}
        </>
    )
}



const List = (
    { todids, search, sort, deleteTodid, className }: 
    { todids: any, search: string, sort: string, deleteTodid: Function, className: string }) => {
    
    
    let todidIds;
    if (search) {
        todidIds = Object.keys(todids).filter(todidId => { // debounce?
            let todid: IToDid = todids[todidId];
            const { day, food, stuff, thoughts } = todid;
            return day.includes(search) || food.includes(search) || stuff.includes(search) || thoughts.includes(search);
        });
    } else {
        todidIds = Object.keys(todids);
    }

    // Sort
    todidIds = todidIds.sort((a, b) => {
        const dateTimeA = todids[a].date_time;
        const dateTimeB = todids[b].date_time;
        if (sort === SORT_OPTIONS.NEW.value)
            return dateTimeB - dateTimeA;
        else if (sort === SORT_OPTIONS.OLD.value)
            return dateTimeA - dateTimeB;
        else
            return dateTimeB - dateTimeA;
    });
    return (
        <div className={className}>
            { todidIds.map((todidId: string) => {
                return (
                    <Todid 
                        key={todidId} 
                        todidId={todidId} 
                        todid={todids[todidId]} 
                        deleteTodid={deleteTodid} 
                    />
                )
            })}
        </div>
    )
}
const StyledList = styled(List)`
    margin-top: 10px;
`;



const Sort = ({sort, setSort, className}: { sort: string, setSort: Function, className: string }) => {
    const handleSelect = (e: any) => {
        setSort(e.target.value);
    }
    return (
        <div className={className}>
            <span>Sort</span>
            <select value={sort} onChange={handleSelect}>
            { Object.values(SORT_OPTIONS).map((sort: IOption) => (
                <option key={sort.value} value={sort.value}>{sort.label}</option>
            ))}
            </select>
        </div>
    )
}
const StyledSort = styled(Sort)`
    display: inline-block;
    margin-right: 10px;
`;



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
    display: inline-block;
    margin-right: 10px;
`;


export default ToDidsList;