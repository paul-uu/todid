import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { IToDid } from './interfaces';
import ToDidForm from './components/ToDidForm';
import ToDidsList from './components/ToDidsList';

export const TABS = {
    NEW: 'NEW',
    OLD: 'OLD'
}

const getUniqueId = () => {
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}

const LS_KEY = 'ToDid_LS';

const getToDids = () => {
    let todids = {};
    let ids = Object.keys(window.localStorage).filter(key => key.includes(LS_KEY));
    console.log(ids);
    ids.forEach(id => {
        let todid = window.localStorage.getItem(id);
        if (todid) {
            todid = JSON.parse(todid);
        }
        // @ts-ignore
        todids[id] = todid;
    });
    return todids;
}


function App() {

    const [selectedTab, setSelectedTab] = useState<string>(TABS.NEW);
    const [savedToDids, setSavedToDids] = useState<Object | null>(null);
    useEffect(() => {}, []);

    // todo: look into indexedDb replacing localstorage

    useEffect(() => {
    }, [savedToDids]);

    useEffect(() => {
        if (selectedTab === TABS.OLD && savedToDids === null) 
            setSavedToDids(getToDids());
    }, [selectedTab]);

    const handleAddNewTodid = (todid: IToDid) => {
        const newTodidKey = `${LS_KEY}-${getUniqueId()}`;
        window.localStorage.setItem(newTodidKey, JSON.stringify(todid))

        // save to ui state
        setSavedToDids(todids => {
            if (todids) {
                return {
                    // @ts-ignore
                    ...todids,
                    [newTodidKey]: todid
                }
            }
            return todids;
        });
    }

    const handleDeleteTodid = (id: string) => {
        // remove from localstorage
        window.localStorage.removeItem(id);

        // remove from ui state
        setSavedToDids(todids => {
            // @ts-ignore
            let copy = {...todids};
            // @ts-ignore
            delete copy[id];
            return copy;
        });
    }

    return (
        <Container className="App">
            <Header 
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab} 
            />
            { selectedTab === TABS.NEW
                ? <ToDidForm addNewTodid={handleAddNewTodid} />
                : <ToDidsList 
                    todids={savedToDids}
                    deleteTodid={handleDeleteTodid} />
            }
        </Container>
    );
}

const Container = styled.div`
    padding: 16px 64px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

`;

export default App;
