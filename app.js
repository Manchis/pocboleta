const net = require('net');

const server = net.createServer();


server.on('close',function(){
    console.log('Server closed !');
  });

server.on('connection',(socket)=>{
  
  socket.rawData="";
  socket.rawDataTokenLength=false;
  console.log('client connected from:'+socket.remoteAddress);
  //console.log(socket);
  socket.write(`oioi:\r\n`)

  socket.on('end', () => {
      console.log('client disconnected');
    });

  socket.on('drain',function(){
    console.log('write buffer is empty now .. u can resume the writable stream');
    socket.resume();
  });

  socket.setEncoding('utf8');
  socket.on('data',function(data){

      console.log('Bytes read : ' + socket.bytesRead);


      if(socket.rawData===""){
        socket.rawData=data;
        console.log(`${socket.rawData}`)
      }else{
        socket.rawData+=data;
        console.log(`${socket.rawData}`)
      }

      
      if(!socket.rawDataTokenLength && socket.bytesRead>=4){
        socket.rawDataTokenLength=parseInt(socket.rawData.substring(0,4));
      }

      if(typeof socket.rawDataTokenLength==='number' && socket.rawDataTokenLength+4===socket.bytesRead){
        socket.pause();
        console.log("PIMBA!");
      }
      
      //echo data
     /* var is_kernel_buffer_full = socket.write('Data :' + data);
      if(is_kernel_buffer_full){
        console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
      }else{
          
        socket.pause();
      }*/
  });
});




server.listen(1337, '127.0.0.1');

