

module.exports.chatSockets = (socketServer)=>{
    let io = require("socket.io")(socketServer);
    io.sockets.on("connection",(socket)=>{
        console.log("new connection received", socket.id)

        socket.on("disconnect",()=>{
            console.log("Socket disconnected!")
        })

        socket.on("join_room",function(data){
            console.log("Joining request received...", data)
            socket.join(data.chatroom) //it will search for a chatroom with the name data.chatroom and let the user join there and if no such room if found, then it will create a chatroom with that name and then let the user join there.

            io.in(data.chatroom).emit("user_joined", data) // This is to show the all the user a notification when someone joins the chatroom
        })

        socket.on("send_message",(data)=>{
            io.in(data.chatroom).emit("receive_message",data);
        })
    });
}