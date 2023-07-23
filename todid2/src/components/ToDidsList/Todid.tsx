import { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components';
import { IToDid } from '../../interfaces';
import { BsTrash } from 'react-icons/bs';
import Star from '../Shared/Star';

type ToDidProps = {
    todidId: string,
    todid: IToDid,
    deleteTodid: Function
}

const ToDid = (props: ToDidProps) => {
    const { todidId, todid, deleteTodid } = props;
    const { date, time, day, stuff, thoughts, food, starred, tags } = todid;
    const [deleteWarning, setDeleteWarning] = useState(false);

    const themeContext = useContext(ThemeContext);

    const handleDelete = (e: any) => {
        deleteTodid(todidId);
    }

    console.log(todid);

    return (
        <StyledToDid theme={themeContext}>
            <Header>
                <Date>{`${date} - ${time}`}</Date>
                { starred &&
                    <Star 
                        isStarred={starred}
                        setIsStarred={() => {}}
                        isDisabled={true}
                    />
                }
            </Header>

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

            { tags?.length &&
            <Entry>
                <span>Tags: </span>
                { tags.map(tag => <span>{tag}</span>) }
            </Entry>
            }

            <Delete className='todid__delete' theme={themeContext}>
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Date = styled.div`
    color: #888;
    margin-bottom: 8px;
`;

const Entry = styled.div`
    margin-bottom: 16px;
`;

const Delete = styled.div`
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    color: ${props => props.theme.secondary};
    visibility: hidden;

    &:hover {
        color: ${props => props.theme.main};
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