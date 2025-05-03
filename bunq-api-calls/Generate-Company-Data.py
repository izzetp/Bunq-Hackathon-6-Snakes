import requests
import json
import random
from datetime import datetime, timedelta

BASE_URL = "https://public-api.sandbox.bunq.com/v1"
SESSION_TOKEN = "35737decfe0ea9ecbaf9f9a6efcd04c456b0e8fe264905408bba1b36068a17e1"

headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "X-Bunq-Client-Authentication": SESSION_TOKEN,
    "X-Bunq-Geolocation": "0 0 0 0 NL",
    "X-Bunq-Language": "en_US",
    "X-Bunq-Region": "en_US"
}

# 1. Get the first 5 users (companies)
resp = requests.get(f"{BASE_URL}/user", headers=headers)
if resp.status_code != 200:
    print(f"Failed to get users: {resp.status_code}")
    print(resp.json())  # Print the error details for debugging
else:
    users = resp.json()

    # Check if the expected 'Response' key is present
    if 'Response' not in users:
        print("Error: 'Response' key not found in the response")
        print(json.dumps(users, indent=2))  # Print the full response for debugging
    else:
        # Extract the first 5 users to treat as companies
        first_5_companies = users['Response'][:5]

        # 2. For each user, get their account and create random transactions
        for user in first_5_companies:
            user_id = user['UserPerson']['id']
            user_display_name = user['UserPerson']['display_name']
            
            # Get user's monetary account (assuming they have at least one account)
            accounts_resp = requests.get(f"{BASE_URL}/user/{user_id}/monetary-account", headers=headers)
            accounts = accounts_resp.json()
            account_id = accounts['Response'][0]['MonetaryAccountBank']['id']

            # 3. Get the alias of the user to treat as the company (we want an email alias)
            email_alias = None
            for alias in user['UserPerson']['alias']:
                if alias['type'] == 'EMAIL':
                    email_alias = alias['value']
                    break

            # If no email alias is found, skip this user
            if not email_alias:
                print(f"No email alias found for {user_display_name}, skipping.")
                continue

            # 4. Create 5 random transactions between this user (as company) and other users
            for _ in range(5):
                # Random amount between 10 and 500 EUR
                amount = round(random.uniform(10, 500), 2)

                # Generate a random date within the last year
                days_ago = random.randint(0, 365)
                transaction_date = (datetime.now() - timedelta(days=days_ago)).strftime('%Y-%m-%dT%H:%M:%S')

                # Prepare the payment data (removed the "scheduled" field)
                payment_data = {
                    "amount": {
                        "currency": "EUR",
                        "value": str(amount)
                    },
                    "counterparty_alias": {
                        "type": "EMAIL",
                        "value": email_alias,  # Use the email alias here
                        "name": email_alias.split('@')[0]  # Just using the company name part
                    },
                    "description": f"Payment from {user_display_name} to {email_alias.split('@')[0]}"
                }

                # Send the payment
                payment_resp = requests.post(
                    f"{BASE_URL}/user/{user_id}/monetary-account/{account_id}/payment",
                    headers=headers,
                    data=json.dumps(payment_data)
                )

                if payment_resp.status_code == 200:
                    print(f"Transaction of €{amount} from {user_display_name} to {email_alias.split('@')[0]} created!")
                else:
                    print(f"Payment failed for {user_display_name} to {email_alias.split('@')[0]}:")
                    print(json.dumps(payment_resp.json(), indent=2))

        # 5. After creating transactions, fetch transaction history for each user and account
        for user in first_5_companies:
            user_id = user['UserPerson']['id']
            accounts_resp = requests.get(f"{BASE_URL}/user/{user_id}/monetary-account", headers=headers)
            accounts = accounts_resp.json()
            
            for account in accounts['Response']:
                account_id = account['MonetaryAccountBank']['id']
                
                # Fetch transaction history
                transactions_resp = requests.get(f"{BASE_URL}/user/{user_id}/monetary-account/{account_id}/payment", headers=headers)
                transactions = transactions_resp.json()
                
                # Print the transaction history
                print(f"Transaction history for user {user_id} and account {account_id}:")
                print(json.dumps(transactions, indent=2))
