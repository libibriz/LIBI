import React from 'react';
import logo from './logo.svg';
import './App.css';
import userModel from './Model/userModel'; 
import UserList from './components/UserList/UserList'
import MyModal from './components/My_Modal/My_Modal';

function App() {

  function a(){
      alert("hi it works!")
  }
  return <div>
    <UserList></UserList>
 {/* <MyModal modalTitle='hi libi!'onApproveClick={a} onCancelClick={a} ><p>have a nice day!</p> </MyModal> */}
  </div>
}

export default App;
