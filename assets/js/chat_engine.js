class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect("http://localhost:5000");
        if(this.userEmail){
            console.log("----->", this.userEmail)
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this

        this.socket.on("connect",function(){
            console.log("Connection established using sockets...!")

            self.socket.emit("join_room",{
                user_email:self.userEmail,
                chatroom:"Codeial"
            })

            self.socket.on("user_joined",function(data){
                console.log("An user joined", data);
            })
        })

        $("#send-message").click(function(){
            let msg = $('#chat-message-input').val();

            if(msg!= ""){
                console.log("Arun",msg)
                self.socket.emit("send_message",{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:"Codeial"
                })
            }
        })

        self.socket.on("receive_message", (data)=>{
            console.log("Message received!", data.message);

            let newMessage = $("<li>");
            let messageType = "other-message";
            if(data.user_email==self.userEmail){
                messageType = "self-message";
            }

            newMessage.append($("<sub>",{
                "html":data.user_email
            }))

            newMessage.append($("<span>",{
                "html":data.message
            }))

            newMessage.addClass(messageType)

            $("#chat-message-list").append(newMessage)
        })
    }
}

