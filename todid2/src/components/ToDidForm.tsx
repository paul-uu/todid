import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

type ToDidFormProps = {
    addNewTodid: Function
}

const StyledTextarea = styled.textarea`
    resize: vertical;
    box-sizing: border-box; 
    display: block;
    margin-bottom: 20px;
    width: 100%;
    padding: 8px;

    &:focus {
        outline-width: 0;
    }
`;

const Buttons = styled.div`
    text-align: right;
`;

const Button = styled.button`
    padding: 4px 8px;
    background-color: white;
    color: #666;
    border-radius: 0;
    border: 1px solid #666;
    outline: none;
    margin-left: 8px;
    cursor: pointer;

    &:disabled {
        color: #aaa;
        cursor: default;
        opacity: 0.5;
        pointer-events: none;
    }
    
    &:hover {
        background-color: #efefef;
    }

    &[type='submit'] {
        background-color: #668ba4;
        border: 1px solid #668ba4;
        color: white;
        &:hover {
            background-color: #39749c;
        }
    }
`;

const ToDidForm:FC<ToDidFormProps> = (props) => {

    const [day, setDay] = useState('');
    const [stuff, setStuff] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [food, setFood] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (day || stuff || thoughts || food) {
            let date = format(new Date(), 'MMM, dd yyyy');
            let time = format(new Date(), 'h:mm aaa');
            let date_time = (new Date()).getTime();
            props.addNewTodid({
                date, 
                time, 
                date_time,
                day, 
                stuff, 
                thoughts, 
                food
            });
            handleReset();
        }
        else {
            alert('But what did you do?!');
        }
    }

    const handleReset = (e?: any) => {
        e && e.preventDefault();
        setDay('');
        setStuff('');
        setThoughts('');
        setFood('');
    }

    const canSubmit = () => day || stuff || thoughts || food;

    return (
        <>
            <div>{ format(new Date(), 'MMM, dd yyyy') }</div>
            <form onSubmit={handleSubmit}>

                <StyledTextarea 
                    placeholder='How was your day?' 
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    rows={5}
                />
                <StyledTextarea  
                    placeholder='Read, see, or listen to anything good?' 
                    value={stuff}
                    onChange={(e) => setStuff(e.target.value)}
                    rows={5}
                />
                <StyledTextarea  
                    placeholder='Have any interesting thoughts or ideas?' 
                    value={thoughts}
                    onChange={(e) => setThoughts(e.target.value)}
                    rows={5}
                />
                <StyledTextarea  
                    placeholder="What'd you eat today?"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    rows={5}
                />

                <Buttons>
                    <Button 
                        onClick={handleReset}
                        disabled={!canSubmit()}
                    >
                        Reset
                    </Button>
                    <Button 
                        type='submit'
                        disabled={!canSubmit()}
                    >
                        Save
                    </Button>
                </Buttons>

            </form>
        </>
    )
}

export default ToDidForm;