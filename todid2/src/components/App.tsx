import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { IToDid } from '../interfaces';
import ToDidForm from './ToDidForm';
import ToDidsList from './ToDidsList/ToDidsList';
import { TABS, LS_KEY } from '../constants';
import { getUniqueId } from '../utils';

// todo: look into indexedDb replacing localstorage

const readTodids = () => {
    let todids:{ [key: string]: any } = {};
    let ids = Object.keys(window.localStorage).filter(key => key.includes(LS_KEY));
    ids.forEach(id => {
        let todid = window.localStorage.getItem(id);
        if (todid) {
            todid = JSON.parse(todid);
        }
        todids[id] = todid;
    });
    return todids;
}

function App() {

    const [selectedTab, setSelectedTab] = useState<string>(TABS.NEW);
    const [savedToDids, setSavedToDids] = useState<Object | null>(null);

    useEffect(() => {
        if (selectedTab === TABS.OLD && savedToDids === null) 
            setSavedToDids(readTodids());
    }, [selectedTab]);

    const createTodid = (todid: IToDid) => {
        const newTodidKey = `${LS_KEY}-${getUniqueId()}`;
        window.localStorage.setItem(newTodidKey, JSON.stringify(todid))
        setSavedToDids(todids => {
            if (todids) {
                return {
                    ...todids,
                    [newTodidKey]: todid
                }
            }
            return todids;
        });
    }

    const updateTodid = (id: string, todid: IToDid) => {
        if (window.localStorage.getItem(id)) {
            window.localStorage.setItem(id, JSON.stringify(todid));
            setSavedToDids(todids => {
                let copy: { [key: string]: any } = {...todids};
                copy[id] = todid;
                return copy;
            });
        }
    }

    const deleteTodid = (id: string) => {
        window.localStorage.removeItem(id);
        setSavedToDids(todids => {
            let copy: { [key: string]: any } = {...todids};
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
                ? <ToDidForm addNewTodid={createTodid} />
                : <ToDidsList 
                    todids={savedToDids}
                    deleteTodid={deleteTodid}
                    updateTodid={updateTodid} />
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
