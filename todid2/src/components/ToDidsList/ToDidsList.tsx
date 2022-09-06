import { FC, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { SORT_OPTIONS } from './constants';
import Sort from './Sort';
import Search from './Search';
import StartFilter from './StarFilter';
import List from './List';

type IToDidsListProps = {
    todids: Object | null,
    deleteTodid: Function
}

const ToDidsList:FC<IToDidsListProps> = (props) => {
    const { todids, deleteTodid } = props;
    const [sort, setSort] = useState(SORT_OPTIONS.NEW.value);
    const [search, setSearch] = useState('');
    const [starFilter, setStarFilter] = useState(false);

    const themeContext = useContext(ThemeContext);

    // todo: move search/sort/filter logic from List to here
    
    return (
        <>
            <Controls theme={themeContext}>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    className=''
                />
                <StartFilter 
                    starFilter={starFilter}
                    setStarFilter={setStarFilter}
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
                    starFilter={starFilter}
                    deleteTodid={deleteTodid}
                    className='' />
            }
        </>
    )
}

const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: ${props => props.theme.secondary};
    padding: 0 0 5px 0;
`;

export default ToDidsList;