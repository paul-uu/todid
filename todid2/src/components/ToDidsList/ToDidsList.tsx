import { FC, useState } from 'react';
import styled from 'styled-components';
import { SORT_OPTIONS } from './constants';
import Sort from './Sort';
import Search from './Search';
import List from './List';

type IToDidsListProps = {
    todids: Object | null,
    deleteTodid: Function,
    toggleStar: Function
}

const ToDidsList:FC<IToDidsListProps> = (props) => {
    const { todids, deleteTodid, toggleStar } = props;
    const [sort, setSort] = useState(SORT_OPTIONS.NEW.value);
    const [search, setSearch] = useState('');
    return (
        <>
            <Controls>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    className=''
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
                    deleteTodid={deleteTodid} 
                    toggleStar={toggleStar}
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