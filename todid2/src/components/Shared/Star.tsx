import { FC } from 'react';
import styled from 'styled-components';
import { AiOutlineStar, AiFillStar, } from 'react-icons/ai';

type StarProps = {
    isStarred: boolean,
    setIsStarred: Function
}

const StarEl = styled.div`
    cursor: pointer;
    &:hover {

    }
`;

const Star:FC<StarProps> = (props) => {
    const { isStarred, setIsStarred } = props;
    return (
        <StarEl title='Star this todid'>
        { isStarred
            ? <AiFillStar onClick={() => setIsStarred(false)} /> 
            : <AiOutlineStar onClick={() => setIsStarred(true)} /> 
        }
        </StarEl>
    )
}

export default Star;