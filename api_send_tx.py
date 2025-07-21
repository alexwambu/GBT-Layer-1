from web3 import Web3
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()
w3 = Web3(Web3.HTTPProvider("https://GBTNetwork"))

@app.post("/api/send-tx")
async def send_tx(req: Request):
    try:
        body = await req.json()
        signed_tx = body.get("signedTx", "")
        if not signed_tx:
            return JSONResponse(status_code=400, content={"error": "Missing signedTx"})

        tx_hash = w3.eth.send_raw_transaction(bytes.fromhex(signed_tx[2:]))
        return {"tx_hash": tx_hash.hex()}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
