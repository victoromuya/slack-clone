import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux/es/exports'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { db } from './Firebase';
import { selectRoomId } from './features/appSlice'
import ChatInput from './ChatInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import Message from './Message'

function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    );
    const [roomMessages, loading] = useCollection(
        roomId && db.collection("rooms").doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        );


   useEffect(() => {
        chatRef?.current?.scrollIntoView(
                {behavior:"smooth"}
    ); //scroll chats to bottom
   }, ([roomId, loading])); 
    

  return (
    <ChatContainer>
        {roomDetails && roomMessages && (
            <>
                <Header>
            <HeaderLeft>
                <h4><strong>#{roomDetails?.data().name}</strong></h4>
                <StarBorderOutlinedIcon />
            </HeaderLeft>
                

            <HeaderRight>
                <p>
                    <InfoOutlinedIcon /> Details
                </p>
            </HeaderRight>
      </Header>

      <ChatMessages>
        {roomMessages?.docs.map(doc => {
            const {message, timestamp, user, userImage} = doc.data();
            return(
                <Message 
                key= {doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
                />
            )
        })}
      </ChatMessages>

      <ChatInput
      chatRef={chatRef} 
      channelName={roomDetails?.data().name} 
      channelId={roomId}/>
    
        <ChatBottom ref={chatRef} />
            </>
        )}
      
    </ChatContainer>
  )
}


export default Chat

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow :1;
    overflow-y :scroll;
    margin-top:60px;
`

const Header = styled.div`
    display: flex;
    justify-content : space-between;
    padding: 20px;
    border: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
    display: flex;
    align-items:center;

    >h4{
        display: flex;
        text-transform: lowercase;
        margin-right:10px;
    }

    >h4 > .MuiSvgIcon-root{
        margin-left: 10px;
        font-size: 18px;
    }
`;
const HeaderRight = styled.div`
    > p{
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    >p > .MuiSvgIcon-root{
        margin-left: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div`
padding-bottom: 200px;
`;

const ChatBottom = styled.div``;