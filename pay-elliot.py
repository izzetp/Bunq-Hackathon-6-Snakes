import time, json, requests

BASE_URL    = "https://public-api.sandbox.bunq.com/v1"
TOKEN       = "35737decfe0ea9ecbaf9f9a6efcd04c456b0e8fe264905408bba1b36068a17e1"
USER_ID     = 1882124          # Elliot
ACCOUNT_ID  = 2112100          # Elliot’s MonetaryAccountBank

HEADERS = {
    "Content-Type":                 "application/json",
    "X-Bunq-Client-Authentication": TOKEN,
    "X-Bunq-Geolocation":           "0 0 0 0 NL",
    "X-Bunq-Language":              "en_US",
    "X-Bunq-Region":                "en_US",
}

# ---------- 1) create the request-inquiry ----------
payload = {
    "amount_inquired": {
        "value":    "100.00",
        "currency": "EUR"
    },
    "counterparty_alias": {
        "type":  "EMAIL",
        "value": "sugardaddy@bunq.com",
        "name":  "Sugar Daddy"
    },
    "description":  "You're the best!",
    "allow_bunqme": False
}

create = requests.post(
    f"{BASE_URL}/user/{USER_ID}/monetary-account/{ACCOUNT_ID}/request-inquiry",
    headers=HEADERS, json=payload
).json()

req_id = create["Response"][0]["Id"]["id"]
print(f"Created request-inquiry #{req_id}")

# ---------- 2) poll until the bot accepts ----------
while True:
    inquiry = requests.get(
        f"{BASE_URL}/user/{USER_ID}/monetary-account/{ACCOUNT_ID}/request-inquiry/{req_id}",
        headers=HEADERS
    ).json()

    status = inquiry["Response"][0]["RequestInquiry"]["status"]
    print(f"Status: {status}")
    if status == "ACCEPTED":
        break
    time.sleep(1)

# ---------- 3) fetch the updated balance ----------
acct = requests.get(
    f"{BASE_URL}/user/{USER_ID}/monetary-account/{ACCOUNT_ID}",
    headers=HEADERS
).json()

balance = acct["Response"][0]["MonetaryAccountBank"]["balance"]["value"]
print(f"New balance for Elliot: €{balance}")
