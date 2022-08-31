import { FC, useState } from 'react';
import styled from 'styled-components';
import { SORT_OPTIONS } from './constants';
import Sort from './Sort';
import Search from './Search';
import StartFilter from './StarFilter';
import List from './List';

type IToDidsListProps = {
    todids: Object | null,
    deleteTodid: Function,
    updateTodid: Function
}

const ToDidsList:FC<IToDidsListProps> = (props) => {
    const { todids, deleteTodid, updateTodid } = props;
    const [sort, setSort] = useState(SORT_OPTIONS.NEW.value);
    const [search, setSearch] = useState('');
    const [starFilter, setStarFilter] = useState(false);

    // todo: move search/sort/filter logic from List to here
    
    return (
        <>
            <Controls>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    className=''
                />
                <StartFilter 
                    starFilter={starFilter}
                    setStarFilter={setStarFilter}
                />
                <Sort 
                    sort={sort} 
                    setSort={setSort} 
                    className=''
                />
            </Controls>

            { !todids || Object.keys(todids).length === 0
                ? <div>Create your first To-Did</div>
                : <List 
                    todids={todids} 
                    search={search} 
                    sort={sort}
                    starFilter={starFilter}
                    deleteTodid={deleteTodid} 
                    updateTodid={updateTodid}
                    className='' />
            }
        </>
    )
}

const Controls = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default ToDidsList;