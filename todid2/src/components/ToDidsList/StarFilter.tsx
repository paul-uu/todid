import { FC } from 'react';

type IStarFilterProps = {
    starFilter: boolean,
    setStarFilter: Function
}

const StarFilter:FC<IStarFilterProps> = (props) => {

    return (
        <div>
            <input 
                type='checkbox' 
                id='StarredCheckbox' 
                name='StarredCheckbox' 
                checked={props.starFilter}
                onChange={() => props.setStarFilter(!props.starFilter)}
            />
            <label htmlFor='StarredCheckbox'>Starred to-dids</label>
        </div>
    )
}

export default StarFilter;