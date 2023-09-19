import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000/', { transports : ['websocket'] });

function App() {
  const [counter, setCounter]= useState(0);
  useEffect(()=>{
    socket.on('updateCounter',(newcounter)=>{
      console.log(newcounter);
      setCounter(newcounter);
    })

    // counter
    // return () =>{
    //   socket.disconnect();
    // }
  },[])

  const incrementCounter = ()=>{
    socket.emit('incrementCounter');
  }



  return (
    <>
    <div className='flex flex-col justify-center items-center pt-12'>
      <div>Counter: {counter}</div>

      <button className='px-4 py-2 border border-cyan-500 rounded' onClick={incrementCounter}>Increment</button>
    </div>
    </>
  )
}

export default App
