import React, { useState } from "react";
import "../css/Header.scss";
import logo from "../statics/metamask.png";
import Web3 from "web3";
// import { ethers } from "ethers";

const Header = () => {
  const [address, setAddress] = useState("");
  // const [balance, setBalance] = useState("");
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
        console.log(web3.utils.isAddress(address[0]));
        // const balance2 = web3.utils.toChecksumAddress(address[0]);
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
    console.log(network);
  }

  //   function getBalance(address) {
  //     const balance = window.ethereum
  //       .request({
  //         method: "eth_getBalance",
  //         params: ["latest", address],
  //       })
  //       .then((balance) => {
  //         setBalance(balance);
  //         console.log(ethers.utils.formatEther(balance));
  //       });
  //   }

  return (
    <div className="displaying">
      <div className="container">
        <div className="logo">Company Name</div>
        <div className="network-container">
          <div className="network" onClick={() => checkNetwork(network)}>
            Network: {nameNetwork}
          </div>
          <button className="metamask-button" onClick={() => connect()}>
            <img src={logo} className="metamask" alt="metamask" />
            <span>{!address ? "Connect Wallet" : address}</span>
          </button>
        </div>
        <div>
          <div onClick={() => setToggle(true)}>Show balances</div>
        </div>
      </div>
      {toggle === true && <div className="toggle-container">Hello</div>}
    </div>
  );
};

export default Header;
