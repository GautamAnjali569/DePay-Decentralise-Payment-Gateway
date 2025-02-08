import React, { useState , useEffect} from 'react'
// import {ethers} from 'ethers'
import { contractABI, ERC20ABI, ETHContractAddress } from '../Constants/Constants';
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
// import qr from "../images/qr.jpg";
import qr from "../images/graph.jpg";


function Analytics() {

    const [usdt, setUSDT] = useState("")
    const [shm, setSHM] = useState("")
    const [tfl, settfl] = useState("0")
    const [native, setNative] = useState("")
    const [totalOrders, setTotalOrders] = useState("")
    const [connectedChainId, setConnectedChainId] = useState("")

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantceUSDT = new ethers.Contract("0x5a1899faff22a2b3ea0294d86cd1be6269931ef1", ERC20ABI,provider)
    const contractInstantceSHM = new ethers.Contract("0x0F71B2a7898EE371b8D1fDc9352dC9cbBC18294e", ERC20ABI,provider)

    const getTurnOver = async ()=> {

    const nonNativeUSDT = await contractInstantceUSDT.balanceOf(ETHContractAddress)
    const nonNativeSHM = await contractInstantceSHM.balanceOf(ETHContractAddress)
    setUSDT(ethers.utils.formatEther(nonNativeUSDT.toString()))
    setSHM(ethers.utils.formatEther(nonNativeSHM.toString()))
    
    const contractInstantceNative = new ethers.Contract(ETHContractAddress, contractABI,provider)
    const m = await contractInstantceNative.receivedNative()
    setNative(ethers.utils.formatEther(m.toString()))

    const totalOrders = await contractInstantceNative.totalOrders()
    setTotalOrders(totalOrders.toString())
    
    const chainId = await provider.getNetwork()
    setConnectedChainId(chainId["name"])

  }

  useEffect(() => {
    getTurnOver()
  } )
  

  return (
    <div className="text-center h-screen pt-10 bg-black text-white font-semibold items-center justify-between ">
      <div className="">
        <h1 className="border-b-4 pb-3 justify-start items-start ml-[-10%] max-w-[55%] border-b-[#40f0f8] text-2xl ">
          Analytics
        </h1>

        <div className=" justify-center items-center text-black flex mt-10 mb-[40px] ">
          <div className="p-[40px] bg-[#ecf0f3] max-w-[900px] flex sm:w-full  sm:h-[378] md:grid grid-flow-col-dense shadow-lg  shadow-slate-500  rounded-3xl ">
            <div className=" max-w-[583.333px] max-h-[298px]">
              <div className=" w-full flex">
                <label className=" font-bold  " for="cars">
                  <p className=" rounded-lg font-inter font-bold border-x-2 border-y-2 cursor-pointer border-gray-600 text-black  p-2 px-[16px]">
                    Total Orders : {totalOrders}
                  </p>
                </label>
              </div>

              {/* Select the token */}
              <div className=" w-full mt-5 ">
                <label className=" mx-3 font-bold  " for="cars">
                  <p className=" rounded-lg font-inter font-bold border-x-2 border-y-2 cursor-pointer border-gray-600 text-black  p-2 px-[16px]">
                    Total Turnover :
                  </p>
                </label>
                <div className="flex">
                  <p className="mr-5">USDT : {usdt}</p>
                  <p className="mx-5">SHM : {shm}</p>
                  <p className="mx-5">TFIL : {tfl}</p>
                  <p className="mx-5">Native : {native}</p>
                </div>
              </div>

              {/* <div className="flex rounded-lg sm:ml-5 items-center w-full max-w-full"> */}
              <div className=" items-center w-full  ">
                <p className="text-base  text-gray-300 h-auto"></p>
              </div>
              <div className="flex pt-6 items-start justify-between text-start place-items-start w-full ">
                <div className="w-full h-full flex">
                <label className="mt-3 font-bold  " for="cars">
                  <p className=" rounded-lg font-inter font-bold border-x-2 border-y-2 cursor-pointer border-gray-600 text-black  p-2 px-[16px]">
                    Chain Transaction : { connectedChainId }
                  </p>
                </label>
                </div>
              </div>
            </div>
            <div className="ml-4 w-[400px] h-[400px]">
              <img src={qr} alt="/QR" className=" " />
            </div>
          </div>
        </div>
   
      </div>
    </div>
  );
}

export default Analytics;
