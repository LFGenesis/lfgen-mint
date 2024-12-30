'use client';

import * as React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AirdropClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReflectionDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reflectionAmount","type":"uint256"}],"name":"TokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;
const CONTRACT_ADDRESS = "0xaC6487fF5063bF4249594B150aB95E1867BEc9d3";

export default function Home() {
  const { isConnected } = useAccount();
  const { writeAsync: mint, isLoading } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'mint',
  });

  const mintToken = async () => {
    try {
      if (!isConnected) {
        document.getElementById('mintStatus')!.innerText = 'Lütfen önce cüzdanınızı bağlayın!';
        return;
      }

      document.getElementById('mintStatus')!.innerText = 'İşlem başlatılıyor...';
      const tx = await mint();
      await tx.wait();
      document.getElementById('mintStatus')!.innerText = 'Mint işlemi başarılı!';
    } catch (error: any) {
      console.error('Mint hatası:', error);
      document.getElementById('mintStatus')!.innerText = 'Mint işlemi başarısız: ' + error.message;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white flex items-center justify-center p-4">
      <div className="bg-white/5 rounded-xl p-8 text-center max-w-md w-full shadow-lg shadow-[#00ff9d]/10">
        <img src="https://i.ibb.co/VvxBzzg/lfgen.png" alt="LFGEN Logo" className="w-24 h-24 mx-auto mb-6 rounded-full" />
        <h1 className="text-2xl font-bold mb-8">LFGEN Token Mint</h1>
        <div className="mb-6">
          <ConnectButton />
        </div>
        <button 
          onClick={mintToken} 
          className="w-full bg-gradient-to-r from-[#00ff9d] to-[#00d8ff] text-black font-bold py-4 px-8 rounded-lg 
                   transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00ff9d]/20
                   disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          disabled={isLoading}
        >
          {isLoading ? 'İşlem Devam Ediyor...' : 'Mint LFGEN'}
        </button>
        <div id="mintStatus" className="mt-6 text-[#00ff9d]"></div>
      </div>
    </div>
  );
} 