import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractWrite } from 'wagmi';

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AirdropClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReflectionDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reflectionAmount","type":"uint256"}],"name":"TokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const CONTRACT_ADDRESS = "0xaC6487fF5063bF4249594B150aB95E1867BEc9d3";

export default function Home() {
  const { isConnected } = useAccount();
  const { write: mint, isLoading } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'mint',
  });

  const mintToken = async () => {
    try {
      if (!isConnected) {
        document.getElementById('mintStatus').innerText = 'Lütfen önce cüzdanınızı bağlayın!';
        return;
      }

      document.getElementById('mintStatus').innerText = 'İşlem başlatılıyor...';
      await mint();
      document.getElementById('mintStatus').innerText = 'Mint işlemi başarılı!';
    } catch (error) {
      console.error('Mint hatası:', error);
      document.getElementById('mintStatus').innerText = 'Mint işlemi başarısız: ' + error.message;
    }
  };

  return (
    <div className="container">
      <img src="https://i.ibb.co/VvxBzzg/lfgen.png" alt="LFGEN Logo" className="logo" />
      <h1>LFGEN Token Mint</h1>
      <ConnectButton />
      <button 
        onClick={mintToken} 
        className="mint-button"
        disabled={isLoading}
      >
        {isLoading ? 'İşlem Devam Ediyor...' : 'Mint LFGEN'}
      </button>
      <div id="mintStatus"></div>

      <style jsx>{`
        body {
            background: #0a0a1f;
            color: #fff;
            font-family: 'Segoe UI', sans-serif;
        }

        .container {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 0 20px rgba(0, 255, 157, 0.1);
            margin: 50px auto;
        }

        .mint-button {
            background: linear-gradient(45deg, #00ff9d, #00d8ff);
            border: none;
            border-radius: 10px;
            color: #000;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            padding: 15px 40px;
            transition: all 0.3s ease;
            width: 200px;
        }

        .mint-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 157, 0.2);
        }

        .mint-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        #mintStatus {
            margin-top: 20px;
            color: #00ff9d;
        }

        .logo {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
            border-radius: 50%;
        }
      `}</style>
    </div>
  );
} 