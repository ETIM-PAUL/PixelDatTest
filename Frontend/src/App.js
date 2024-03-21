import { useAccount } from 'wagmi';
import './App.css';
import TopNav from './components/TopNav';
import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

function App() {
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { address } = useAccount()
  const { open } = useWeb3Modal()

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
            <input className='h-10 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter ethereum address' />
          </div>
          <div className='inline-grid w-full mt-4'>
            <label className='text-white font-medium text-lg pb-1'>BUSD Amount</label>
            <input type="number" className='h-10 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter BUSD amount' />
          </div>
        </div>

        <div className='max-w-sm mx-auto mt-12'>
          {!!address ?
            <button disabled={disabled} className={`bg-blue-500 w-full h-12 text-white font-bold text-xl rounded-md disabled:cursor-not-allowed disabled bg-blue-800 disabled:opacity-50`}>{isLoading ? "Processing" : "Transfer BUSD"}</button>
            :
            <button onClick={() => open()} className={`bg-blue-500 w-full h-12 text-white font-bold text-xl rounded-md`}>Connect</button>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
