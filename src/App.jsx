import React, { useEffect, useState } from "react";

const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
};

const App = () => {
  const [stage, setStage] = useState("init");
  const [nums, setNums] = useState(getNums());
  const [opened, setOpened] = useState([]);
  const [solvedList, setSolvedList] = useState([]);

  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  };

  const handleStart = () => {
    setStage("start");
    setNums(randomNums());
    setSolvedList([])
  };

  const handleClick = (num, i) => {
    if (opened.length === 2) {
      return;
    }
    setOpened((prev) => [...prev, i]);
  };

  useEffect(() => {
    if(opened.length === 2) {
      setTimeout(() => {
        const id1 = opened[0]
        const id2 = opened[1]

        if(nums[id1] === nums[id2]) {
          setSolvedList((prev) => [...prev, nums[id1]])
        }
        setOpened([])
      }, 1000);
    }
  }, [opened])


  const getClassName = (num,i) => {
    if(solvedList.includes(num)) {
      return 'remove'
    } else if (opened.includes(i)) {
      return 'show'
    } else {
      return 'hide'
    }
  }

  useEffect(() => {
    if(solvedList.length === 8) {
      setStage('win')

    }
  },[solvedList])

  return (
    <div className="app">
      <h1>Memory Game</h1>
      {stage === "init" && <button onClick={handleStart}>Play Game</button>}

      {stage === "start" && (
        <div className="game">
          <div className="cards">
            {nums.map((num, i) => (
              <div className={`card ${getClassName(num,i)}`} key={i} onClick={() => handleClick(num, i)}>
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === "win" && (
        <div>
          <h1>You Won the Game</h1>
          <button onClick={handleStart}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
