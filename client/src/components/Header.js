import React, { useState } from "react";
import "../css/Header.scss";
import logo from "../statics/metamask.png";
import Web3 from "web3";
import ethereum from "../statics/ethereum.png";
import closeButton from "../statics/close-button.png";
import contractABI from "../contracts/contractABI.json";

const Header = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const [network, setNetwork] = useState("");
  const [toggle, setToggle] = useState(false);
  const [nameNetwork, setNameNetwork] = useState("");
  var web3 = new Web3(Web3.givenProvider);
  async function connect() {
    if (window.ethereum) {
      try {
        const walletAddress = window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => setAddress(res));

        const chainId = await window.ethereum
          .request({
            method: "eth_chainId",
          })
          .then((res) => setNetwork(res));

        window.ethereum.on("chainChanged", window.location.reload);
        const realAcc = address[0];
        const balance1 = web3.eth.getBalance(realAcc).then((res) => {
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Install Metamask");
    }
  }

  function checkNetwork(network) {
    if (network == "0x1") {
      setNameNetwork("Ethereum Network");
    } else if (network == "0x89") {
      setNameNetwork("Polygoin Mumbai");
    } else if (network == "0x3") {
      setNameNetwork("Ropsten Test Network");
    } else if (network == "0x38") {
      setNameNetwork("Binance Smart Chain Mainnet");
    } else if (network == "0x2a") {
      setNameNetwork("Kovan Test Network");
    } else if (network == "0x4") {
      setNameNetwork("Rinkeby Test Network");
    } else {
      console.log("No network");
    }
  }

  async function getBalance() {
    var contractAddress = "0x3845badAde8e6dFF049820680d1F14bD3903a5d0";
    const sandboxAddress = "0x3845badAde8e6dFF049820680d1F14bD3903a5d0";
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    var tokenContract = new web3.eth.Contract(contractABI, sandboxAddress);
    // var decimal = tokenContract.methods.decimals();
    var balance = await tokenContract.methods
      .balanceOf("0x2354Bf8708199FcF272D97095236332D116351C3")
      .call()
      .then((res) => console.log(web3.utils.fromWei(res)));

    //  var adjustedBalance = balance / Math.pow(10, decimal);
    // var tokenName = tokenContract.methods.
    // .name()
    // .call()
    // .then((res) => {
    //   console.log(res);
    // });
    // console.log(tokenName);
    var tokenSymbol = await tokenContract.methods().name().call();
    console.log(tokenSymbol);
  }

  return (
    <div className="displaying">
      <div className="container">
        <div className="logo" onClick={getBalance}>
          Web3 Social Media
        </div>
        <div className="balance">
          <div onClick={() => setToggle(true)}>Show balances</div>
        </div>
        <div className="network-container">
          <div className="network" onClick={() => checkNetwork(network)}>
            Network: {nameNetwork}
          </div>
          <button className="metamask-button" onClick={() => connect()}>
            <img src={logo} className="metamask" alt="metamask" />
            <span>{!address ? "Connect Wallet" : address}</span>
          </button>
        </div>
      </div>
      {toggle === true && (
        <div className="toggle-container">
          <img
            className="close-button"
            src={closeButton}
            alt="close-button"
            onClick={() => setToggle(false)}
          />
          <div className="token-container">
            <div className="token-name">Ethereum</div>
            <div className="price-container">
              <span className="price">11</span>
              <div className="ethereum-wrapper">
                <img src={ethereum} alt="ethereum" className="ethereum-image" />
              </div>
            </div>
          </div>
          <div className="token-container">
            <div className="token-name">USDC</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
