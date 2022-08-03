import React from 'react'
import styled from 'styled-components';
import { IToDid } from '../interfaces';
import { BsTrash } from 'react-icons/bs';

type ToDidProps = {
    todidId: string,
    todid: IToDid,
    deleteTodid: Function
}

const StyledToDid = styled.div`
    margin-bottom: 20px;
    background-color: #eee;
    padding: 8px;

    label {
        color: #888;
        display: block;
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
    display: inline-block;
    cursor: pointer;
`;

const ToDid = (props: ToDidProps) => {
    const { todidId, todid, deleteTodid } = props;
    const { date, time, day, stuff, thoughts, food } = todid;

    const handleDelete = (e: any) => {
        deleteTodid(todidId);
    }

    //console.log(todid);

    return (
        <StyledToDid>
            <Date>{`${date} - ${time}`}</Date>

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

            <Delete onClick={handleDelete}>
                delete <BsTrash />
            </Delete>

        </StyledToDid>
    )
}

export default ToDid;