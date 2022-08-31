import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { IToDid } from './interfaces';
import ToDidForm from './components/ToDidForm';
import ToDidsList from './components/ToDidsList/ToDidsList';

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

    const handleDeleteTodid = (id: string) => {
        window.localStorage.removeItem(id);
        setSavedToDids(todids => {
            let copy: { [key: string]: any } = {...todids};
            delete copy[id];
            return copy;
        });
    }

    const handleToggleStar = (id: string, isStarred: boolean) => {
        let todid = window.localStorage.getItem(id);
        if (todid) {
            let todidObj = JSON.parse(todid);
            todidObj.starred = isStarred;
            window.localStorage.setItem(id, JSON.stringify(todidObj));
            setSavedToDids(todids => {
                let copy: { [key: string]: any } = {...todids};
                copy[id] = todidObj;
                return copy;
            });
        }
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
                    deleteTodid={handleDeleteTodid}
                    toggleStar={handleToggleStar} />
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
