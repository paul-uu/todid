import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { TABS } from '../constants';

import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const ToggleButton = require('react-toggle-button');

type HeaderProps = {
    selectedTab: string,
    setSelectedTab: Function,
    isDayMode: boolean,
    setIsDayMode: Function
}

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledTabs = styled.div`
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.secondary};

    .selected {
        //color: tomato;
        color: #62929a;
        font-weight: bold;
    }

    > div {
        cursor: pointer;
        &:hover {
            color: ${props => props.theme.selected};
        }
    }
`;

const Header = (props: HeaderProps) => {

    const themeContext = useContext(ThemeContext);

    return (
        <>
            <FlexDiv>
                <h3>to-did</h3>
                <ToggleButton
                    value={ props.isDayMode }
                    inactiveLabel={<BsFillMoonStarsFill />}
                    activeLabel={<BsFillSunFill />}
                    onToggle={(value: any) => props.setIsDayMode(!value)} 
                />
            </FlexDiv>
            <StyledTabs theme={themeContext}>
                <div 
                    className={props.selectedTab === TABS.NEW ? 'selected' : ''} 
                    onClick={() => props.setSelectedTab(TABS.NEW)}
                >
                    New
                </div>

                <div 
                    className={props.selectedTab === TABS.OLD ? 'selected' : ''} 
                    onClick={() => props.setSelectedTab(TABS.OLD)}
                >
                    Old
                </div>
            </StyledTabs>

            <hr />
        </>
    )
}

export default Header;