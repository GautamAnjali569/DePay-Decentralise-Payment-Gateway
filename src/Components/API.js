import React, { useState, useEffect} from "react";
import unity from "../images/unity.png";
import solidity from "../images/solidity.png";
import qr from "../images/qr.jpg";

import * as ethers from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { Chat } from "@pushprotocol/uiweb";
import { contractABI, ERC20ABI, ETHContractAddress } from '../Constants/Constants';

// import * as dotenv from 'dotenv'
// dotenv.config();

function API() {
  const [btnClicked, setBtnClicked] = useState(false)
    
    const [isWalletInstalled, setIsWalletInstalled] = useState(false)
    const [account, setAccount] = useState(null)

    const WeiToEther = ethers.utils.parseUnits("10","ether")
    
    const connectWallet = async() =>{
        window.ethereum.request( {method: "eth_requestAccounts"})
        .then((accounts) => {
          setAccount(accounts[0]);
        }).catch( (e) => {
          alert(e)
        })
    }

    useEffect(() => {
      
        connectWallet()
    })
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(ETHContractAddress, contractABI,signer)

    function btnclicks( ) {
        setBtnClicked(!btnClicked)
    }

    const placeOrder = async() => {


        // const ERC20contractInstance = new ethers.Contract('0x5a1899faff22a2b3ea0294d86cd1be6269931ef1',ERC20ABI,signer); // USDT
        const ERC20contractInstance = new ethers.Contract('0x0F71B2a7898EE371b8D1fDc9352dC9cbBC18294e',ERC20ABI,signer); // SHM
        // const getApprove = await ERC20contractInstance.approve(P2PCONTRACTADDRESS, utils.parseUnits(amountB));// amout B will taken from the smart contract.
        const getApprove = await ERC20contractInstance.approve(ETHContractAddress,WeiToEther);// amout B will taken from the smart contract.
        await getApprove.wait();

        window.alert("Approved")
        // const tx = await contractInstantce.deposite(WeiToEther,"0x5a1899faff22a2b3ea0294d86cd1be6269931ef1")// USDT token
        const tx = await contractInstantce.deposite(WeiToEther,"0x0F71B2a7898EE371b8D1fDc9352dC9cbBC18294e")// SHM token
        await tx.wait()
        alert("Transaction Successful!")
        sendTelMsg()
        sendNotification()
    }

    const sendNotification = async() => {
        const PK = process.env.PRIVATE_KEY; // channel private key
        const Pkey = `0x${PK}`;
        const signer = new ethers.Wallet(Pkey);
  
    try {
            const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3, // target
            identityType: 2, // direct payload
            notification: {
            title: ` Succesfully received ${WeiToEther} USDT`,
            body: `Succesfully received ${WeiToEther} USDT Payment received from Address`
        },
            payload: {
            title: `Succesfully received ${WeiToEther} USDT`,
            body: `Succesfully received ${WeiToEther} USDT Payment received from Address`,
            cta: '',
            img: ''
        },
            // recipients: `eip155:5:${account}`, // recipient address
            recipients: `eip155:5:0x971dD8F6cd1c7c713d2557455Cb14c71AD12C350`, // recipient address
            channel: 'eip155:5:0x92382c1EC09a72cd4a6bA024C4553a16a2250C2F', // your channel address
            env: 'staging'
      });
      
      // apiResponse?.status === 204, if sent successfully!
            console.log('API repsonse: ', apiResponse);
    } catch (err) {
      
          console.error('Error: ', err);
        }
  
    }

    // ########################### Telegram Bot starts here ###################

    async function sendTelMsg() {
        const link = await fetch(`https://api.telegram.org/bot5974247608:AAG0BjQW3j6KZQUD1FpbCXUro8fzCEKavhE/sendMessage?chat_id=785696317&text=Payment%20received%From%20${account}%20$10%20USDT`)
        
    }


  if (btnClicked) {
    return (
      <>
        {/*  Below this should be popped up after user click on Buy-now function */}
        <div className="w-full bg-[#ecf0f3] h-auto pt-11">
          {/* Select the chain */}
          <div className=" justify-center items-center flex mb-[40px] ">
            <div className="p-[40px] max-w-[600px] flex sm:w-full  sm:h-[378] md:grid grid-flow-col-dense shadow-lg  shadow-slate-500  rounded-3xl ">
              <div className=" max-w-[583.333px] max-h-[298px]">
                <div className=" w-full flex">
                  <label className=" mx-3 font-bold  " for="cars">
                    Select Blockchain:
                  </label>

                  <select
                    className="  dropdown-toggle
          px-6
          py-2.5
          hover:cursor-pointer
          bg-[#00ADB5]
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          active:bg-[#175f64df] active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
                    name="chains"
                    id="chains"
                    size="1"
                  >
                    <option className="dropdown-item" value="ETH-Goerli">FVM</option>
                    <option className="dropdown-item" value="ETH-Goerli">ETH-Goerli</option>
                    <option value="Shardeum">Shardeum</option>
                    <option value="Polygon">Polygon</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Select the token */}
                <div className=" w-full mt-5 flex">
                  <label className=" mx-3 font-bold  " for="cars">
                    Select Tokens:
                  </label>

                  <select
                    className="  dropdown-toggle
          px-6
          py-2.5
          hover:cursor-pointer
          bg-[#00ADB5]
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          active:bg-[#175f64df] active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
                    name="chains"
                    id="chains"
                    size="1"
                  >
                    <option value="ETH-Goerli">USDT</option>
                    <option value="Shardeum">SHM</option>
                    <option value="Polygon">ETH</option>
                    <option value="FVM">FVM</option>
                    <option value="Other">MATIC</option>
                  </select>
                </div>

                {/* <div className="flex rounded-lg sm:ml-5 items-center w-full max-w-full"> */}
                <div className=" items-center w-full  ">
                  <p className="text-base  text-gray-300 h-auto"></p>
                </div>
                <div className="flex pt-6 items-start justify-between text-start place-items-start w-full ">
                  <div className="w-full h-full flex">
                    <button
                      onClick={placeOrder}
                      className=" rounded-lg font-inter font-extrabold bg-[#5627FF] text-gray-200 pl-308px p-2 px-[16px]"
                    >
                      Place Order
                    </button>
                    <button
                      className=" ml-2 rounded-lg font-inter font-bold border-x-2 border-y-2 cursor-pointer border-gray-600 text-black pl-308px p-2 px-[16px]"
                    >
                      Price - $10 /-
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-4 w-[150px] h-[150px]">
                <img src={qr} alt="/QR" className=" " />
              </div>
            </div>
          </div>
          <br /> <br />
          <br /> <br />
          <div></div>
        </div>
        <Chat
                    account={account} //user address 
                    supportAddress="0x92382c1EC09a72cd4a6bA024C4553a16a2250C2F" //support address
                    // apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                    apiKey="vzOQa8Hda3.lD6Yvrij1T4qHrE07Mp7XcE3mRWu8Yl6WAmOzLSfI63xWuGSoNkXsHeBDVvG63Hs"
                        env="staging"
        />
        <button onClick={sendNotification}>Check Noti</button>
      </>
    );
  } else {
    return (
      <div className="text-center h-full pt-10 bg-black text-white font-semibold items-center justify-between ">
        <div className="">
          <h1 className="border-b-4 pb-3 justify-start items-start ml-[-10%] max-w-[35%] border-b-[#40f0f8] text-2xl ">
            API Screen
          </h1>

          <br />
          <br />

          {/* card 1  */}

          <div className="flex">
            <div className="flex gap-5 flex-col-2 pl-10 ">
              <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
                <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
                  <div className="flex justify-center"></div>
                  <div className="flex justify-center w-[400px] text-6xl font-extrabold leading-none dark:text-black">
                    <img
                      src={unity}
                      alt="/unity_image"
                      className="rounded-xl h-[200px]"
                    />
                  </div>
                </div>
                <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
                  <ul>
                    <li className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-500"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                        Complete{" "}
                        <span className="font-extrabold text-black underline-offset-1 underline">
                          Unity Course
                        </span>
                      </p>
                    </li>
                    <li className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-500"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                        12 projects
                      </p>
                    </li>
                    <li className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-500"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                        $10/- only
                      </p>
                    </li>
                  </ul>
                  <div className="mt-6 rounded-md shadow">
                    <button
                      className="flex w-full items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-black border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                      onClick={btnclicks}
                      type="button"
                      data-modal-toggle="popup-modal"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* card2 */}
            <div className="flex gap-5 flex-col-2 pl-10 ">
              <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
                <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
                  <div className="flex justify-center"></div>
                  <div className="flex justify-center w-[400px] text-6xl font-extrabold leading-none dark:text-black">
                    <img
                      src={solidity}
                      alt="/solidity_image"
                      className="rounded-xl h-[200px]"
                    />
                  </div>
                </div>
                <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
                  <ul>
                    <li className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-500"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                        <span className="font-extrabold text-black underline-offset-1 underline">
                          Solidity Course
                        </span>{" "}
                        for Professionals
                      </p>
                    </li>
                    <li className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-500"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                        35 hours of content
                      </p>
                    </li>
                    <li className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-500"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                        $15/- only
                      </p>
                    </li>
                  </ul>
                  <div className="mt-6 rounded-md shadow">
                    <button
                      className="flex w-full items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-black border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                      onClick={btnclicks}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Chat
                    account={account} //user address 
                    supportAddress="0x92382c1EC09a72cd4a6bA024C4553a16a2250C2F" //support address
                    apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                        env="staging"
          />
      
      
      </div>
    );
  }
}

export default API;
