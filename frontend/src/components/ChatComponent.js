import React, { useEffect, useState ,useRef} from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const socket=io('https://lancer-app-praveen.onrender.com')



const ChatComponent = ({senderId,receiverId,closeChat,receiverName}) => {
    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState('');
    const messagesEndRef = useRef(null);

    useEffect(()=>{
        socket.emit("join",senderId);
        socket.on("receiveMessage",(data)=>{
            setMessages(prev=>[...prev,data])
        })


        const fetch=async()=>{
          try{
            const res =await axios.get(`https://lancer-app-praveen.onrender.com/api/chat/${receiverId}`,{
            
              headers:
              { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            console.log(res.data.content)
             setMessages(prev=>[...res.data.map(msg => ({ senderId: msg.sender_id, message: msg.content }))]);

          }
          catch(err){
            console.log(err);
          }
         
        }

        fetch();
        return () => {
            socket.off("receiveMessage");
        };

       
        




    },[senderId])

    useEffect(() => {
      // Scroll to the bottom whenever messages change
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  


    const sendMessage=async()=>{
        if(message.trim()){
            socket.emit("sendMessage",{senderId,receiverId,message});
            setMessages(prev=>[...prev,{senderId,message}]);
            
            await axios.post(`https://lancer-app-praveen.onrender.com/api/chat/send/${receiverId}`,{message},{

              headers:
                { Authorization: `Bearer ${localStorage.getItem("token")}` }
              
            })
            setMessage('');
           
        }



    }




    return(
    <div className="fixed right-0 top-14 h-full w-full md:w-80 bg-gray-900 text-white p-2 shadow-lg">
<div className='flex justify-between'>
<h2 className="text-lg font-bold mb-2">Chat with <span className='text-lg font-bold mb-2 text-blue-500'>{receiverName}</span></h2>
<button className="text-red-500" onClick={closeChat}>X</button>

</div>
    <div className="h-3/4 overflow-y-auto border p-2">
      {messages.map((msg, index) => (
        <div key={index} className={msg.senderId === senderId ? "text-right" : "text-left"}>
          <p className="p-2 bg-gray-800 rounded-md inline-block m-2">{msg.message}</p>
        </div>
      ))}
        <div ref={messagesEndRef}></div>
    </div>
    <div className="mt-4 flex">
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="ml-2 bg-blue-500 px-4 py-2 rounded" onClick={sendMessage}>
        Send
      </button>
    </div>
  </div>
);
}

export default ChatComponent
