import React from 'react';
import Login from './Login';
import notesu from './notesu.jpeg'

function Home() {
    const style = {
        // background: "linear-gradient(-70deg, #fdcd3b 30%, rgba(0, 0, 0, 0) 30%)"
        // background: "-webkit-linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)",
//   background: "-o-linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)",
//   background: "-moz-linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)",
//   background: "linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)"

  background: "linear-gradient(110deg, #fff 55%, #fdcd3b 55%)"
    }
    return (
        
        <div className="flex h-screen" style={style}>
            <div className="text-center m-auto space-y-20 w-96 border-blue-700" >
                <h3>NotesU</h3>
                <p className="italic text-gray-700 text-xl">"Notes are an extension to the brain"</p>
                <Login />
            </div>
        </div>
    )
}

export default Home;