import { FC } from 'react';
import styled from 'styled-components';
import Star from '../Shared/Star';

type IStarFilterProps = {
    starFilter: boolean,
    setStarFilter: Function,
    className: string
}

const StarFilter:FC<IStarFilterProps> = (props) => {
    return (
        <div 
            className={props.className}
            onClick={() => props.setStarFilter(!props.starFilter)}>

            <Star 
                className={'star--filter'}
                isStarred={props.starFilter}
                setIsStarred={() => {}}
            />

            <label>only show Starred</label>
        </div>
    )
}

const StyledStarFilter = styled(StarFilter)`
    display: flex;
    .star--filter, label {
        margin-top: 4px;
    }
    .star--filter {
        font-size: 16px;
        margin-right: 4px;
    }
    label {
        cursor: pointer;
    }
    &:hover {
        label {
            color: #777;
        }
    }
`;

export default StyledStarFilter;