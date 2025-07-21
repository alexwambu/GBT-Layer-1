import { useState } from 'react';

export default function Home() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [tx, setTx] = useState('');
  const [response, setResponse] = useState(null);

  const fetchBalance = async () => {
    const res = await fetch(`/api/get-balance?address=${address}`);
    const data = await res.json();
    setBalance(data.balance || data.error);
  };

  const sendTx = async () => {
    const res = await fetch(`/api/send-tx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signedTx: tx })
    });
    const data = await res.json();
    setResponse(data.tx_hash || data.error);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>GBTNetwork Layer 1 (Vercel Deployed)</h1>
      <div>
        <h2>Check Balance</h2>
        <input
          type="text"
          placeholder="Wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '400px', padding: '8px' }}
        />
        <button onClick={fetchBalance} style={{ marginLeft: '10px' }}>Fetch</button>
        {balance && <p>Balance: {balance} GBT</p>}
      </div>

      <hr />

      <div>
        <h2>Send Raw Transaction</h2>
        <textarea
          rows="5"
          cols="60"
          placeholder="0x signed transaction"
          value={tx}
          onChange={(e) => setTx(e.target.value)}
        />
        <br />
        <button onClick={sendTx}>Send TX</button>
        {response && <p>Result: {response}</p>}
      </div>
    </div>
  );
}
