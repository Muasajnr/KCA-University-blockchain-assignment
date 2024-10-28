import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Web3 } from "web3";

const ADDRESS = "0xc14b7a094348829C201f43560D5aF0373413172f";
const ABI = [{"type":"constructor","inputs":[{"name":"_startingPoint","type":"uint256","internalType":"uint256"},{"name":"_startingMessage","type":"string","internalType":"string"}],"stateMutability":"nonpayable"},{"name":"decreaseNumber","type":"function","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"name":"getNumber","type":"function","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"name":"increaseNumber","type":"function","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"name":"message","type":"function","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"name":"setMessage","type":"function","inputs":[{"name":"newMessage","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"}];

function App() {
  const [number, setNumber] = useState("none");
  const [currentMessage, setCurrentMessage] = useState("none");
  const [newMessage, setNewMessage] = useState("");

  const web3 = new Web3(window.ethereum);
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  async function getNumber() {
    const result = await myContract.methods.getNumber().call();
    setNumber(result.toString());
  }

  async function getMessage() {
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
  }

  async function increaseNumber() {
    const accountsConnected = await web3.eth.requestAccounts();
    await myContract.methods.increaseNumber().send({
      from: accountsConnected[0],
      gasPrice: await web3.eth.getGasPrice(),
    });
    getNumber();
  }

  async function decreaseNumber() {
    const accountsPresent = await web3.eth.requestAccounts();
    await myContract.methods.decreaseNumber().send({
      from: accountsPresent[0],
      gasPrice: await web3.eth.getGasPrice(),
    });
    getNumber();
  }

  async function updateMessage() {
    const connectedAccounts = await web3.eth.requestAccounts();
    await myContract.methods.setMessage(newMessage).send({
      from: connectedAccounts[0],
      gasPrice: await web3.eth.getGasPrice(),
    });
    getMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Daniel Muasa 21/04739 <br></br> BBIT KCA University Blockchain</h3> 

        <button onClick={getNumber}>Get Number</button>
        <p>Number: {number}</p>

        <button onClick={increaseNumber}>Increase Number</button>
        <button onClick={decreaseNumber}>Decrease Number</button>

        <button onClick={getMessage}>Get Message</button>
        <p>Message: {currentMessage}</p>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter new Message"
        />
        <button onClick={updateMessage}>Update Message</button>
      </header>
    </div>
  );
}

export default App;
