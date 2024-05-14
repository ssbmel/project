/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

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
      title : "TIL작성",
      text : "블로그 작성하기",
      isDone: true,
    }
  ])

  const [title, setTitle] = useState("");
  const [text, setText] = useState(""); 

  const addTextHandler = () => {
    const newContent = {
      id : new Date().getTime(),
      title: title,
      text: text,
      isDone: false,
    };
    setContents([...contents, newContent]);
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
        <h1>To Do List</h1>
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
          onClick={addTextHandler}>추가</button>
      </div>

      <div className="styleBox">
        <h2>진행중</h2>
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
      <div className="styleBox">
        <h2>완료</h2>
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
    </>
  );
}

export default App;

const Content = ({content, deleteTextHandler, toggleIsDone}) => {

  const miniBox = {
    width: "200px",
    height: "150px",
    border: "1px solid black",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    textAlign: "center",
  }

  const {title, text, id, isDone} = content;

  return (
        <div style={miniBox}>
          <h1>{title}</h1>
          <p>{text}</p>
          <button onClick={() => deleteTextHandler(id)}>삭제</button>
          <button onClick={() => toggleIsDone(id)}>{isDone ? "취소" : "완료"}</button>
        </div>
  );

};
