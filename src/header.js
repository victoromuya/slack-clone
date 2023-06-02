import React from 'react'
import styled from 'styled-components'
import {Avatar} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { auth } from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
 
function Header() {

    const [user] = useAuthState(auth);

    return ( 
        <HeaderContainer>
           
            <HeaderLeft>
                <HeaderAvatar 
                onClick={() => auth.signOut()}
                alt={user?.displayName}
                src={user?.photoURL}
                />
                <AccessTimeIcon />
            </HeaderLeft>

            <HeaderSearch>
                <SearchIcon />
                <input type="text" placeholder='search vik' />
            </HeaderSearch>

            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>

        </HeaderContainer>
    );
}


export default Header;

const HeaderRight = styled.div`
    flex: 0.3;
    display : flex;
    align-items: flex-end;

    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 20px;
    }
`;

const HeaderSearch = styled.div`
    flex:0.4;
    border-radius:6px;
    opacity: 1;
    background-color: #421f44;
    text-align : center;
    display: flex;
    padding: 0 50px;
    border: 1px solid gray;
    color: gray;

    > input {
        background-color : transparent;
        border: none;
        text-align : center;
        min-width: 30vw;
        outline: 0;
        color : white;
        text-align : left
    }
`

const HeaderContainer = styled.div`
    display:flex;
    position: fixed;
    width : 100%;
    align-items:center;
    justify-content : space-between;
    padding: 10px 0;
    background-color : var(--slack-color);
    color:white;
`;
const HeaderLeft = styled.div`
    flex:0.3;
    display : flex; 
    align-items : center;
    margin-left:20px;

    > .MuiSvgIcon-root {
        margin-left:auto;
        margin-right:30px
    }
`;
const HeaderAvatar = styled(Avatar)`
    cursor:pointer;

    :hover{
        opacity:0.7;
    }
`