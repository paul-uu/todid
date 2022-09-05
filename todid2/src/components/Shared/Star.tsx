import { FC } from 'react';
import styled from 'styled-components';
import { AiOutlineStar, AiFillStar, } from 'react-icons/ai';

type StarProps = {
    isStarred: boolean,
    setIsStarred: Function,
    className?: string
}

const StarEl = styled.div`
    cursor: pointer;
    &:hover {

    }
`;

const Star:FC<StarProps> = (props) => {
    const { isStarred, setIsStarred, className } = props;
    return (
        <StarEl className={className} title='Star this todid'>
        { isStarred
            ? <AiFillStar onClick={() => setIsStarred(false)} /> 
            : <AiOutlineStar onClick={() => setIsStarred(true)} /> 
        }
        </StarEl>
    )
}

export default Star;