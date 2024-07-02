const socket=io("http://localhost:8000");

const form= document.getElementById('send-container')
const mesinp=document.getElementById('messageinp')
const messcont=document.querySelector(".container")
var audio=new Audio('ring.mp3');

const append=(message,position)=>{
      const newmess=document.createElement('div');
      newmess.innerText=message;
      newmess.classList.add(position);
      newmess.classList.add('message');
      messcont.append(newmess);
      if(position=='left')
      audio.play();
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value;
    append('You: '+message,'right');
    socket.emit('send',message);
    messageinp.value='';
})

const name=prompt("enter you name");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
 append(name+ ' joined the chat','right');
})
socket.on('receive', data=>{
    append(data.name+': '+ data.message,'left'); 
});



socket.on('left',name=>{
   if(name!=null)
    append(name+ ' left the chat','left');

   })
