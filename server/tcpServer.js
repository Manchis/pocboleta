const net = require('net');

const server = net.createServer();

function createServer(port, rsCallback){
  const server = net.createServer();

  server.on('close',function(){
    console.log('Server closed !');
  });

  server.on('close',function(){
    console.log('Server closed !');
  });  

  server.on('connection',(socket)=>{
    console.log(`received new conection from: ${socket.remoteAddress}:${socket.remotePort}`);
  
    //socket.write(`oioi:\r\n`)
  
    socket.on('end', () => {
      console.log(`client disconnected from: ${socket.remoteAddress}:${socket.remotePort}`);
    });
  
    socket.on('drain',function(){
  
      console.log('response sent to client');
  
      //socket.resume();
    });
  
    socket.rawData="";
    socket.rawDataTokenLength=false;

    socket.setEncoding('utf8');
    socket.on('data',function(data){
  
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
  })

  server.listen(port, '127.0.0.1');

}


;





//module.exports

