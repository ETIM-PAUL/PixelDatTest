import { useAccount, useBalance, useWriteContract } from 'wagmi';
import './App.css';
import TopNav from './components/TopNav';
import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { BUSD, BUSDHandler } from './constant';
import { portalABI } from './ABI/portal';
import { isAddress, parseEther } from 'viem';
import { toast } from 'react-toastify';
import { busdAbi } from './ABI/busd_abi';

function App() {
  const { writeContract } = useWriteContract()
  const [ethAddress, setEthAddress] = useState("")
  const [amount, setAmount] = useState()
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { address, balance } = useAccount()
  const { open } = useWeb3Modal()
  const result = useBalance({
    address: address,
  })

  const transferBUSD = async () => {
    if (!isAddress(ethAddress)) {
      toast.error("Wrong Ethereum Address", 5000);
      return;
    }
    if (amount === undefined || amount === "") {
      toast.error("Enter Amount in BUSD", 5000);
      return;
    }
    if (Number(result.data.value) < Number(parseEther(amount.toString()))) {
      toast.error("Insufficent Amount", 5000);
      return;
    }
    setLoading(true);
    setDisabled(true);
    console.log(Number(parseEther(amount.toString())))
    writeContract({
      abi: busdAbi,
      address: BUSD,
      functionName: 'approve',
      args: [
        BUSD,
        Number(parseEther(amount.toString())),
      ],
    });
    writeContract({
      abi: portalABI,
      address: BUSDHandler,
      functionName: 'forwardBUSD',
      args: [
        ethAddress,
        Number(parseEther(amount.toString())),
      ],
    });
  }

  return (
    <div className="App">
      <TopNav />

      <div className='border-gray-200 bg-gray-900 w-full md:max-w-xl mx-auto mt-20 py-10'>
        <div className='px-4 pb-4'>
          <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>Transfer BUSD</span>
        </div>

        <div className='pt-4 max-w-sm mx-auto'>
          <div className='inline-grid w-full'>
            <label className='text-white font-medium text-lg pb-1'>Ethereum Address</label>
            <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-10 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter ethereum address' />
          </div>
          <div className='inline-grid w-full mt-4'>
            <label className='text-white font-medium text-lg pb-1'>BUSD Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-10 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter BUSD amount' />
          </div>
        </div>

        <div className='max-w-sm mx-auto mt-12'>
          {!!address ?
            <button onClick={transferBUSD} disabled={disabled} className={`bg-blue-500 w-full h-12 text-white font-bold text-xl rounded-md disabled:cursor-not-allowed disabled bg-blue-800 disabled:opacity-50`}>{isLoading ? "Processing" : "Transfer BUSD"}</button>
            :
            <button onClick={() => open()} className={`bg-blue-500 w-full h-12 text-white font-bold text-xl rounded-md`}>Connect</button>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
