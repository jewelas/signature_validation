import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi/abi.json'

function App() {
  let contractAddress = '0xA4148334667F4f2A78164Db5Df491b3e691DCc7B'
  const [purpose, setPurpose] = useState('')
  const [amount, setAmount] = useState(0)
  const [jsonInput, setJsonInput] = useState("")
  
  const callWeb3 = async () => {
    await window.ethereum.request({method: 'eth_requestAccounts'})
    console.log(purpose)
    console.log(amount)
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    const abiCoder= new ethers.utils.AbiCoder();
    let signMessage = abiCoder.encode(['string', 'uint'], [purpose, amount]);
    let hashMessage = ethers.utils.keccak256(signMessage);
    let arrayify = ethers.utils.arrayify(hashMessage)

    let signature = await signer.signMessage(arrayify)
    console.log(signMessage)
    console.log(signature)
    let Contract = new ethers.Contract(contractAddress, abi, signer);

    let ret = await Contract.isValidSignature(signMessage, signature)
    alert(ret)
  }

  const handleChangeJsonInput = (e) => {
    setJsonInput(e.target.value)
    try {
      const _json = JSON.parse(e.target.value)
      setPurpose(_json.purpose)
      setAmount(_json.amount)
    } catch (e) {
      console.log(e)    
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>Input JSON: </label>
          <input placeholder='Input JSON' value={jsonInput} onChange={handleChangeJsonInput}></input>
        </div>
        <button onClick={callWeb3}>Sign</button>
      </header>
    </div>
  );
}

export default App;
