from web3 import Web3
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

# Replace with your deployed Layer 1 RPC URL
w3 = Web3(Web3.HTTPProvider("https://GBTNetwork"))

@app.get("/api/get-balance")
def get_balance(address: str):
    try:
        balance = w3.eth.get_balance(address)
        return {"address": address, "balance": w3.from_wei(balance, 'ether')}
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
