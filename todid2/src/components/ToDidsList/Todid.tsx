import { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components';
import { IToDid } from '../../interfaces';
import { BsTrash } from 'react-icons/bs';
import Star from '../Shared/Star';

type ToDidProps = {
    todidId: string,
    todid: IToDid,
    deleteTodid: Function,
    updateTodid: Function
}

const ToDid = (props: ToDidProps) => {
    const { todidId, todid, deleteTodid, updateTodid } = props;
    const { date, time, day, stuff, thoughts, food, starred } = todid;
    const [deleteWarning, setDeleteWarning] = useState(false);

    const themeContext = useContext(ThemeContext);

    const handleDelete = (e: any) => {
        deleteTodid(todidId);
    }

    return (
        <StyledToDid theme={themeContext}>
            <div>
                <Date>{`${date} - ${time}`}</Date>
                <Star 
                    isStarred={starred}
                    setIsStarred={() => updateTodid(
                        todidId, 
                        {
                            ...todid,
                            starred: !starred
                        }
                    )}
                />
            </div>

            { day && 
            <>
                <label>My day was: </label>
                <Entry>{day}</Entry>
            </>
            }

            { stuff &&
            <>
                <label>I read/saw/heard:</label>
                <Entry>{stuff}</Entry>
            </>
            }

            { thoughts && 
            <>
                <label>I thought about:</label>
                <Entry>{thoughts}</Entry>
            </>
            }

            { food && 
            <>
                <label>I ate:</label>
                <Entry>{food}</Entry>
            </>
            }

            <Delete className='todid__delete'>
            { deleteWarning
                ? 
                <DeleteWarning>
                    Are you sure? 
                    <span onClick={handleDelete}>yes</span>/
                    <span onClick={() => setDeleteWarning(false)}>no</span>
                </DeleteWarning>
                : 
                <DeleteButton onClick={() => setDeleteWarning(true)}>delete <BsTrash /></DeleteButton>
            }
            </Delete>

        </StyledToDid>
    )
}

const StyledToDid = styled.div`
    margin-bottom: 20px;
    background-color: ${props => props.theme.backgroundSecondary};
    padding: 8px;
    font-size: 16px;

    label {
        color: #888;
        display: block;
    }

    &:hover {
        .todid__delete {
            visibility: visible;
        }
    }
`;

const Date = styled.div`
    color: #888;
    margin-bottom: 8px;
`;

const Entry = styled.div`
    margin-bottom: 16px;
`;

const Delete = styled.div`
    display: block;
    margin-top: 24px;
    cursor: pointer;
    font-size: 14px;
    color: #777;
    visibility: hidden;

    &:hover {
        color: #555;
    }
`;

const DeleteWarning = styled.div`
    color: tomato;
    span {
        margin: 0 4px;
        &:hover {
            color: red;
        }
    }
`;

const DeleteButton = styled.div`
    svg { 
        vertical-align: middle;
    }
`;


export default ToDid;