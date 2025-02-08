import { ethers } from "ethers";
import React, { useState } from "react";
import { contractABI, contractByteCode, ETHContractAddress, polygonContractAddress, ShardeumContractAddress} from "../Constants/Constants";

function Deploy() {
  const [name, setName] = useState("Payment Gateway");
  const [value, setValue] = useState();
  const m = [];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const deployContract = async () => {
    const factory = new ethers.ContractFactory(
      contractABI,
      contractByteCode,
      signer
    );
    const contract = await factory.deploy([
      "0x5a1899faff22a2b3ea0294d86cd1be6269931ef1",
      "0x0F71B2a7898EE371b8D1fDc9352dC9cbBC18294e",
    ] , name);
    
    // const contract = await factory.deploy();
    console.log("address- ", contract.address);
    window.alert(`contract depolyed at ${contract.address}`);
  };

  function GetName(e) {
    setName(e.target.value);
  }

  function getDropDown() {
    console.log(m);
  }

  const handleChange = (e) => {
    m.push(e.target.value);
    // setValue.push[e.target.value];
  };

  const getInitialState = () => {
    const value = "ETH";
    return value;
  };

  return (
    <div className="text-center h-screen bg-black pt-10 p-5  font-semibold items-center justify-between ">
      
      <p className=" pr-[20px] border-b-4 pb-3 border-b-[#40f0f8] w-40 text-2xl font-bold text-white ">Deploy</p>

      <div className="w-full flex justify-center items-center">
      <div className=" bg-[#ecf0f3] pb-5 pr-5 rounded-2xl border-spacing-4 border border-gray-400 border-x-2 border-y-4 w-[600px]">

        <br />
        <br />

        <div className=" w-full text-center items-center justify-center flex text-[18px]">
          <label className=" mx-3 "  for="cars">
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
          text-sm
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
            <option value="Shardeum">FVM</option>
            <option className="dropdown-item" value="ETH-Goerli">ETH-Goerli</option>
            <option value="Shardeum">Shardeum</option>
            <option value="Polygon">Polygon</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <br />
        <br />

        <div className="flex items-center gap-5 justify-center ">
          <label for="cars items-center text-center justify-center">
            Select Tokens:
          </label>

          <div class=" text-black">
            {/* <select
              id="select-role"
              name="roles[]"
              multiple
              placeholder="Select roles..."
              autocomplete="off"
              className=" form-multiselect rounded-sm cursor-pointer focus:outline-none"
            > */}
            {/* <option data-count="2" value="USDT">
                USDT
              </option>
              <option data-count="23" value="ETH">
                ETH
              </option>
              <option data-count="433" value="MATIC">
                MATIC
              </option>
              <option data-count="45" value="SHM">
                SHM
              </option>
              <option data-count="476" value="fETH">
                fETH
              </option>
              <option data-count="78" value="Other">
                Other
              </option>
            </select> */}
            <select onChange={handleChange}
              name="make"
              placeholder="Select Tokens"
              className="selectpicker"
              // multiple
              data-live="true"
            >
              <option data-count="1" value="TFIL">
                TFIL
              </option>
              <option data-count="2" value="USDT">
                USDT
              </option>
              <option data-count="23" value="ETH">
                ETH
              </option>
              <option data-count="433" value="MATIC">
                MATIC
              </option>
              <option data-count="45" value="SHM">
                SHM
              </option>
              <option data-count="78" value="Other">
                Other
              </option>
            </select>
          </div>
        </div>

        <div className="flex ml-[6%] justify-center gap-4 items-center mt-10">
          <h4 className="">Contract-Name: </h4>
          <input
            className=" rounded-lg p-1 border-gray-500"
            type="text"
            placeholder="Contract Name"
            onChange={GetName}
          />
        </div>

        <br />
        <br />

        <button
          className="-full p-4 bg-gradient-to-r bg-black hover:bg-gray-800 rounded-xl text-xl font-bold text-white mx-4"
          onClick={deployContract}
        >
          Deploy Contract
        </button>
        </div>
      </div>
    </div>
  );
}

export default Deploy;
