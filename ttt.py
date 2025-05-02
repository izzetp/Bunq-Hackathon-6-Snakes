import requests, json

BASE_URL      = "https://public-api.sandbox.bunq.com/v1"
SESSION_TOKEN = "35737decfe0ea9ecbaf9f9a6efcd04c456b0e8fe264905408bba1b36068a17e1"

headers = {
    "Cache-Control":               "no-cache",
    "Content-Type":                "application/json",
    "X-Bunq-Client-Authentication": SESSION_TOKEN,
    "X-Bunq-Geolocation":          "0 0 0 0 NL",
    "X-Bunq-Language":             "en_US",
    "X-Bunq-Region":               "en_US"
}

resp = requests.get(f"{BASE_URL}/user", headers=headers)
print(json.dumps(resp.json(), indent=2))
