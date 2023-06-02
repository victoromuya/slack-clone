import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Header from './header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import styled from 'styled-components'
import { auth } from './Firebase';
import Login from './Login';
import { useAuthState } from 'react-firebase-hooks/auth'
import Spinner from "react-spinkit";

function App() {

  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" 
          alt=""/>

          <Spinner name="ball-spin-fade-loader" color="purple" 
          fadeIn="none" />

        </AppLoadingContents>
    </AppLoading>
    );
  }

  return (
    <>
    <div className='mobile'>
      <h2>Kindly use a larger device or download our mobile app!</h2>
    </div>
    <div className='app'>
      <Router>
      {!user ? (
        <Login />
      ) : (
        <>
        <Header />
        <Appbody>
        <Sidebar />
            <Routes>
              <Route path="/" element={<Chat/>} exact/>
            </Routes>
        </Appbody>
        </>
      )}
      </Router>
   </div>
    </>
  );
}

export default App;

const Appbody = styled.div`
  display:flex;
  height: 100vh;

`
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  } 
`;
