import React, { FC, useState, useEffect } from 'react';
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

const ToDidsList = (props: IToDidsListProps) => {

    const { todids, deleteTodid } = props;

    const [sort, setSort] = useState(SORT_OPTIONS.NEW.value);
    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log(props);
    }, []);


    useEffect(() => {
        if (!todids || !sort) {
            console.log('no todids');
            return;
        }
        renderToDids(todids);
    }, [sort]);


    useEffect(() => {
        console.log(props);
    }, [props.todids]);


    const renderToDids = (todids: any) => {

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

        return todidIds.map((todidId: string) => {
            return (
                <Todid 
                    key={todidId} 
                    todidId={todidId} 
                    todid={todids[todidId]} 
                    deleteTodid={deleteTodid} 
                />
            )
        });
    }

    return (
        <>
        <Sort sort={sort} setSort={setSort} />
        <Search search={search} setSearch={setSearch} />

        { !todids || isObjEmpty(todids)
            ? <div>Create your first To-Did</div>
            : renderToDids(todids)
        }
        </>
    )
}

const Search = ({search, setSearch}: { search: string, setSearch: Function }) => {
    return (
        <input 
            type='text' 
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
    )
}

const Sort = ({sort, setSort}: { sort: string, setSort: Function }) => {
    const handleSelect = (e: any) => {
        setSort(e.target.value);
    }
    return (

        <select value={sort} onChange={handleSelect}>
        { Object.values(SORT_OPTIONS).map((sort: IOption) => (
            <option key={sort.value} value={sort.value}>{sort.label}</option>
        ))}
        </select>
    )
}


export default ToDidsList;