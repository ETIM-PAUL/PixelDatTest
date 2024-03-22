import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core'
import './App.css';
import TopNav from './components/TopNav';
import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { BUSD, BUSDHandler, config } from './constant';
import { portalABI } from './ABI/portal';
import { formatEther, isAddress, parseEther } from 'viem';
import { toast } from 'react-toastify';
import { busdAbi } from './ABI/busd_abi';

function App() {
  const { writeContract, writeContractAsync } = useWriteContract()
  const [ethAddress, setEthAddress] = useState("")
  const [amount, setAmount] = useState()
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { address, balance } = useAccount()
  const { open } = useWeb3Modal()
  const result = useReadContract({
    abi: busdAbi,
    address: BUSD,
    functionName: 'balanceOfUser',
    args: [address],
  })

  const transferBUSD = async () => {
    try {
      if (!isAddress(ethAddress)) {
        toast.error("Wrong Ethereum Address", 5000);
        return;
      }
      if (amount === undefined || amount === "") {
        toast.error("Enter Amount in BUSD", 5000);
        return;
      }
      if (Number(result.data) < Number(parseEther(amount.toString()))) {
        toast.error("Insufficent Amount", 5000);
        return;
      }
      setLoading(true);
      setDisabled(true);

      const result2 = writeContractAsync({
        abi: busdAbi,
        address: BUSD,
        functionName: 'approve',
        args: [
          BUSDHandler,
          parseEther(amount.toString()),
        ],
      });

      const approveResult = await waitForTransactionReceipt(config, {
        hash: await result2,
      })

      if (approveResult?.status === "success") {
        const result3 = writeContractAsync({
          address: BUSDHandler,
          abi: portalABI,
          functionName: 'forwardBUSD',
          args: [ethAddress, parseEther(amount.toString())],
        });
        const forwardResult = await waitForTransactionReceipt(config, {
          hash: await result3,
        })
        if (forwardResult.status === "success") {
          setLoading(false);
          setEthAddress("");
          setAmount();
          setDisabled(false);
          toast.success("Transaction completed", 5000)
        }
      }

    } catch (error) {
      console.log(error)
      if (error?.code === 4001) {
        toast.error(error.message, 5000);
      }
      setLoading(false);
      setDisabled(false);
    }
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
            <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter ethereum address' />
          </div>
          <div className='inline-grid w-full mt-4'>
            <label className='text-white font-medium text-lg pb-1'>BUSD Amount</label>

            <div className='flex relative'>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter BUSD amount' />
              <div onClick={() => setAmount(Number(formatEther(result.data)))} className="absolute inset-y-0 right-0 flex items-center bg-black text-white hover:cursor-pointer border border-l-2 border-dotted border-black">
                <span className='font-black text-sm px-3'>MAX</span>
              </div>
            </div>
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
