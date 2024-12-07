import { WebSocketServer,WebSocket } from "ws";
const webserver=new WebSocketServer({port:8080});

interface User{
    socket:WebSocket,
    roomId:string,
}

let allsokets:User[]=[];

webserver.on("connection",(socket)=>{
   
    socket.on("message",(message)=>{ //see this message will be string so first we have to convert it into js object
        //@ts-ignore
        const messageparseOrConvertItIntoObject=JSON.parse(message);
          
        if(messageparseOrConvertItIntoObject.type==="join"){
            allsokets.push({
                socket,
                roomId:messageparseOrConvertItIntoObject.payload.roomId
            })
        }

        if(messageparseOrConvertItIntoObject.type==="chat"){
            let CurrentUserChatRoom=null;
            for(let i=0;i<allsokets.length;i++){
                //@ts-ignore
                if(allsokets[i].socket===socket){
                    CurrentUserChatRoom=allsokets[i].roomId;
                }
            }

            for(let i=0;i<allsokets.length;i++){
                if(allsokets[i].roomId==CurrentUserChatRoom){
                    allsokets[i].socket.send(messageparseOrConvertItIntoObject.payload.message)
                }
            }
        }
    })
})


