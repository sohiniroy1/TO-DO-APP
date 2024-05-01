import React, { useState } from 'react';
import TaskTrackerApp from './Component/TaskTrackerApp';



function App() {

const [Count, setCount] = useState(0)
  return (
    <div>
      <TaskTrackerApp/>

    </div>
  );
}

export default App;
