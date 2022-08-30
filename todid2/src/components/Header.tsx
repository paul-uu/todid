import React from 'react';
import styled from 'styled-components';
import { TABS } from '../App';

type HeaderProps = {
    selectedTab: string,
    setSelectedTab: Function
}

const StyledTabs = styled.div`
    display: flex;
    justify-content: space-between;
    color: #555;

    .selected {
        color: tomato;
    }

    > div {
        cursor: pointer;
        &:hover {
            color: tomato;
        }
    }
`;

const Header = (props: HeaderProps) => {

    return (
        <>
            <h3>to-did</h3>

            <StyledTabs>
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