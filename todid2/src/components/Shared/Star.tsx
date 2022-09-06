import { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { AiOutlineStar, AiFillStar, } from 'react-icons/ai';

type StarProps = {
    isStarred: boolean,
    setIsStarred: Function,
    className?: string,
    isDisabled?: boolean
}

const Star:FC<StarProps> = (props) => {
    const { isStarred, setIsStarred, className } = props;
    const isDisabled = typeof props.isDisabled === 'boolean' && props.isDisabled;
    const themeContext = useContext(ThemeContext);

    return (
        <StarEl 
            className={`
                ${className} 
                ${isDisabled ? 'disabled' : ''}
                ${isStarred ? 'starred' : ''}
            `} 
            title='Star this todid'
            theme={themeContext}
        >
        { isStarred
            ? <AiFillStar onClick={() => setIsStarred(false)} /> 
            : <AiOutlineStar onClick={() => setIsStarred(true)} /> 
        }
        </StarEl>
    )
}

const StarEl = styled.div`
    cursor: pointer;

    &.disabled {
        pointer-events: none;
        color: #999;
    }
    &.starred {
        color: ${props => props.theme.selected};
    }
`;

export default Star;