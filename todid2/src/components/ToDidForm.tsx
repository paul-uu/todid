import { FC, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import { format } from 'date-fns';
import Star from './Shared/Star';
import { LS_TAGS_KEY } from '../constants';

type ToDidFormProps = {
    addNewTodid: Function
}

const tagsSelectCssPrefix = 'tags_select';
const SelectStyles = {
    control: (provided: any) => ({
        ...provided,
        borderRadius: 0,
        marginBottom: '20px'
    }),
}

const ToDidForm:FC<ToDidFormProps> = (props) => {

    const [day, setDay] = useState('');
    const [stuff, setStuff] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [food, setFood] = useState('');
    const [starred, setStarred] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const themeContext = useContext(ThemeContext);

    // @ts-ignore
    const tagOptions = JSON.parse(window.localStorage.getItem(LS_TAGS_KEY)) || [];

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
                food,
                starred,
                tags
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
        setTags([]);
    }

    const canSubmit = () => day || stuff || thoughts || food;

    return (
        <>
            <ToDidHeader>
                <div>{ format(new Date(), 'MMM, dd yyyy') }</div>
                <Star
                    isStarred={starred}
                    setIsStarred={setStarred}
                />
            </ToDidHeader>

            <form onSubmit={handleSubmit}>

                <StyledTextarea 
                    placeholder='How was your day?' 
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    rows={5}
                    theme={themeContext}
                />
                <StyledTextarea  
                    placeholder='Read, see, or listen to anything good?' 
                    value={stuff}
                    onChange={(e) => setStuff(e.target.value)}
                    rows={5}
                    theme={themeContext}
                />
                <StyledTextarea  
                    placeholder='Have any interesting thoughts or ideas?' 
                    value={thoughts}
                    onChange={(e) => setThoughts(e.target.value)}
                    rows={5}
                    theme={themeContext}
                />
                <StyledTextarea  
                    placeholder="What'd you eat today?"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    rows={5}
                    theme={themeContext}
                />

                <StyledSelect 
                    classNamePrefix={tagsSelectCssPrefix}
                    styles={SelectStyles}
                    placeholder='Tags'
                    isMulti
                    options={tagOptions.map((tag: string) => ({ value: tag, label: tag }))}
                    onChange={(val: any, action) => {
                        if (action.action === 'create-option') {
                            let newTag = val[0]['value'];
                            if (newTag) {
                                let tagsCopy: string[] = [...tags];
                                tagsCopy.push(newTag);
                                setTags(tagsCopy);
                            }
                        }
                    }}
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


const StyledTextarea = styled.textarea`
    resize: vertical;
    box-sizing: border-box; 
    display: block;
    margin-bottom: 20px;
    width: 100%;
    padding: 8px;

    color: ${props => props.theme.main};
    background-color: ${props => props.theme.backgroundSecondary};

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

const ToDidHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledSelect = styled(CreatableSelect)`
    [class^=${tagsSelectCssPrefix}] {
        color: ${props => props.theme.main};
        background-color: ${props => props.theme.backgroundSecondary};
    }
`;

export default ToDidForm;