import styled from 'styled-components';
import { SORT_OPTIONS } from './constants';
import { IOption } from '../../interfaces';

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
    span {
        display: inline-block;
        margin-right: 5px;
    }
`;

export default StyledSort;