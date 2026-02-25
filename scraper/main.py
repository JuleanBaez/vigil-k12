from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import re
from googlesearch import search

app = FastAPI()

class AuditRequest(BaseModel):
    url: str
    name: str

@app.post("/analyze")
async def analyze(req: AuditRequest):
    target_url = req.url
    
    if target_url == "AUTO":
        try:
            search_results = list(search(f"{req.name} privacy policy", num_results=3))
            target_url = next((s for s in search_results if ".pdf" not in s.lower()), None)
            if not target_url:
                raise Exception("No HTML policy found")
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"Discovery failed: {str(e)}")

    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
        res = requests.get(target_url, headers=headers, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        text = soup.get_text()

        # Simple Heuristics for K-12
        flags = []
        if re.search(r'third-party marketing|share data', text, re.I):
            flags.append({"type": "Data Sharing", "severity": "CRITICAL", "text": "Marketing sharing detected."})
        
        return {
            "riskScore": 40 if flags else 10,
            "flags": flags,
            "discoveredUrl": target_url,
            "rawText": text[:2000]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))