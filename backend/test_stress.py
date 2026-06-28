import requests
import json
import time

URL = "http://localhost:8000/api/v1/design-protein"

def test_payload(name, payload):
    print(f"\n--- Testing: {name} ---")
    try:
        res = requests.post(URL, json=payload, timeout=20)
        print(f"Status Code: {res.status_code}")
        if res.status_code == 200:
            print("Response Length:", len(res.text))
            try:
                data = res.json()
                print("Status:", data.get('status'))
            except:
                pass
        else:
            print("Response Error:", res.text[:200])
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "network":
        test_payload("Network Blackout", {"target_prompt": "PETase enzyme"})
        sys.exit(0)

    # 1. Happy Path
    test_payload("Happy Path", {"target_prompt": "PETase enzyme"})

    # 2. Toxin Trap
    test_payload("Toxin Trap", {"target_prompt": "ricin sequence"})

    # 3. Null Attack
    test_payload("Null Attack", {"target_prompt": ""})

    # 4. Buffer Overflow
    test_payload("Buffer Overflow", {"target_prompt": "A" * 5000})
