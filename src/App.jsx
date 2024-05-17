/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import Content from './Content';

function App() {
  const [contents, setContents] = useState([
    {
      id : new Date().getTime(),
      title : "리액트 공부",
      text : "리액트 강의 시청하기",
      isDone: false,
    },
    {
      id : new Date().getTime() + 1,
      title : "알고리즘",
      text : "코드카타 풀기",
      isDone: true,
    }
  ])

  const [title, setTitle] = useState("");
  const [text, setText] = useState(""); 

    const addTextHandler = () => {
      if(title === "" || text === "") {
        alert("빈칸을 채워주세요!");
        return;
      }
    const newContent = {
      id : new Date().getTime(),
      title: title,
      text: text,
      isDone: false,
    };
    setContents([...contents, newContent]);
    setText
    setTitle("");
  }

    const deleteTextHandler = (id) => {
      const deleteContents = contents.filter((content) => {
        return content.id != id
      });

      setContents(deleteContents);
    }

    const toggleIsDone = (id) => {
      const newContents = contents.map((content) =>
        content.id === id
        ? {
            ...content,
            isDone: !content.isDone,
          }
        : content
        );
        setContents(newContents);
    };

  return (
    <>
      <div className='inputText'>
        <p style={{fontSize: "60px"}}>To Do List</p>
        <div>
          할일
          <input 
          type="text" 
          value={title} 
          onChange={(e) => {setTitle(e.target.value);}}
          />
          </div>

        <div>
          내용 
          <input 
          type="text" 
          value={text}
          onChange={(e) => {setText(e.target.value);}}
          />
          </div>
        <button
          className="createBtn"
          onClick={addTextHandler}>추가</button>
      </div>

      <div className="styleBox">     
        <h2>WORKING</h2>
          <div className='scrollBox'>
            <div style={{display: "flex"}}>
            {contents.filter((content) => !content.isDone).map(function (content) {
              return (
                <Content 
                key={content.id} 
                content={content}
                deleteTextHandler={deleteTextHandler}
                toggleIsDone={toggleIsDone} 
                />);
              })}
            </div>
          </div>
      </div>
      <div className="styleBox">
        <h2>DONE</h2>
          <div className='scrollBox'>
            <div style={{display: "flex"}} >
            {contents.filter((content) => content.isDone).map(function (content) {
              return (
                <Content 
                key={content.id} 
                content={content}
                deleteTextHandler={deleteTextHandler}
                toggleIsDone={toggleIsDone}
                /> );
              })}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;

