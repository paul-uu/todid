import styled from 'styled-components';
import { IToDid } from '../../interfaces';
import { SORT_OPTIONS } from './constants';
import Todid from './Todid';

const List = (
    { todids, search, sort, starFilter, deleteTodid, updateTodid, className }: 
    { todids: any, search: string, sort: string, starFilter: boolean, deleteTodid: Function, updateTodid: Function, className: string }) => {
    
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

    // Star Filter
    if (starFilter) {
        todidIds = Object.keys(todids).filter(todidId => {
            let todid: IToDid = todids[todidId];
            return todid.starred;
        })
    }

    return (
        <div className={className}>
            { todidIds.map((todidId: string) => {
                return (
                    <Todid 
                        key={todidId} 
                        todidId={todidId} 
                        todid={todids[todidId]} 
                        deleteTodid={deleteTodid} 
                        updateTodid={updateTodid}
                    />
                )
            })}
        </div>
    )
}
const StyledList = styled(List)`
    margin-top: 10px;
`;

export default StyledList;