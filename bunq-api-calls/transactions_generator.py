import random
import time
from datetime import datetime
import json

from lib.bunq_lib import BunqClient
import config

class BunqTransactionSimulator:
    def __init__(self, api_key, service_name='PeterScript'):
        self.api_key = api_key
        self.bunq_client = BunqClient(api_key, service_name=service_name)

        try:
            self.bunq_client.create_installation()
            self.bunq_client.create_device_server()
        except Exception as e:
            print(f"Installation setup message: {e}")
            print("Continuing with existing installation...")

        self.bunq_client.create_session()
        self.account_id = self._get_user_account_id()

    def _get_user_account_id(self):
        accounts_response = self.bunq_client.get_monetary_accounts()
        try:
            for item in accounts_response['Response']:
                for key in item:
                    account = item[key]
                    if 'id' in account:
                        return account['id']
            raise ValueError("No valid monetary account found.")
        except (KeyError, IndexError, TypeError) as e:
            raise RuntimeError(f"Failed to extract account ID: {e}")

    def generate_transactions(self, count=5, min_amount=5.0, max_amount=100.0):
        results = []
        failed = []

        for _ in range(count):
            company = random.choice(config.COMPANIES)

            if company["typical_amounts"] and random.random() < 0.7:
                amount = random.choice(company["typical_amounts"])
            else:
                amount = round(random.uniform(min_amount, max_amount), 2)

            description = f"Payment to {company['name']} on {datetime.now().strftime('%d-%m-%Y')}"

            try:
                payment = self.bunq_client.create_payment(
                    amount=f"{amount:.2f}",
                    recipient_alias={
                        "type": "IBAN",
                        "value": company["iban"],
                        "name": company["name"]
                    },
                    currency='EUR',
                    from_monetary_account_id=self.account_id,
                    description=description
                )

                results.append({
                    "company": company["name"],
                    "category": company["category"],
                    "amount": amount,
                    "description": description,
                    "payment_id": payment.get("Response", [{}])[0].get("Id", {}).get("id", "unknown")
                })

                time.sleep(0.5)

            except Exception as e:
                failed.append({
                    "company": company["name"],
                    "amount": amount,
                    "error": str(e)
                })

        return {
            "success": len(results),
            "failed": len(failed),
            "transactions": results,
            "failures": failed if failed else None
        }

    # Uses spending divisions
    def generate_realistic_month(self, month_budget=1500.0, include_subscriptions=True):
        COMPANIES = config.COMPANIES
        results = []
        failed = []

        spending_categories = {
            "Supermarket": 0.25,
            "Transportation": 0.15,
            "Online Retail": 0.10,
            "Telecom": 0.08,
            "Electronics": 0.05,
            "Fuel": 0.37,
        }

        subscriptions = [c for c in COMPANIES if c["category"] == "Subscription"]
        other_companies = [c for c in COMPANIES if c["category"] != "Subscription"]

        if include_subscriptions:
            for sub in subscriptions:
                amount = random.choice(sub["typical_amounts"])
                description = f"Monthly subscription - {sub['name']} - {datetime.now().strftime('%d-%m-%Y')}"

                try:
                    payment = self.bunq_client.create_payment(
                        amount=f"{amount:.2f}",
                        recipient_alias={
                            "type": "IBAN",
                            "value": sub["iban"],
                            "name": sub["name"]
                        },
                        currency='EUR',
                        from_monetary_account_id=self.account_id,
                        description=description
                    )

                    results.append({
                        "company": sub["name"],
                        "category": "Subscription",
                        "amount": amount,
                        "description": description,
                        "payment_id": payment.get("Response", [{}])[0].get("Id", {}).get("id", "unknown")
                    })

                    month_budget -= amount
                    time.sleep(0.5)

                except Exception as e:
                    failed.append({
                        "company": sub["name"],
                        "amount": amount,
                        "error": str(e)
                    })

        remaining_budget = month_budget

        for category, percentage in spending_categories.items():
            category_budget = month_budget * percentage
            category_companies = [c for c in other_companies if c["category"] == category]
            if not category_companies:
                continue

            if category == "Supermarket":
                num_transactions = random.randint(8, 12)
            elif category == "Transportation":
                num_transactions = random.randint(10, 15)
            elif category == "Fuel":
                num_transactions = random.randint(3, 5)
            else:
                num_transactions = random.randint(2, 6)

            avg_amount = category_budget / num_transactions

            for _ in range(num_transactions):
                company = random.choice(category_companies)
                amount = round(random.uniform(avg_amount * 0.7, avg_amount * 1.3), 2)
                if amount < 1.0:
                    amount = round(random.uniform(1.0, 5.0), 2)

                description = f"Payment to {company['name']} - {datetime.now().strftime('%d-%m-%Y')}"

                try:
                    payment = self.bunq_client.create_payment(
                        amount=f"{amount:.2f}",
                        recipient_alias={
                            "type": "IBAN",
                            "value": company["iban"],
                            "name": company["name"]
                        },
                        currency='EUR',
                        from_monetary_account_id=self.account_id,
                        description=description
                    )

                    results.append({
                        "company": company["name"],
                        "category": company["category"],
                        "amount": amount,
                        "description": description,
                        "payment_id": payment.get("Response", [{}])[0].get("Id", {}).get("id", "unknown")
                    })

                    remaining_budget -= amount
                    time.sleep(0.5)

                except Exception as e:
                    failed.append({
                        "company": company["name"],
                        "amount": amount,
                        "error": str(e)
                    })

        return {
            "success": len(results),
            "failed": len(failed),
            "total_spent": month_budget - remaining_budget,
            "remaining_budget": remaining_budget,
            "transactions": results,
            "failures": failed if failed else None
        }


### EXAMPLE USAGE ###
if __name__ == "__main__":
    simulator = BunqTransactionSimulator(api_key=config.BUNQ_API_KEY)

    random_tx = simulator.generate_transactions(count=5)
    print(json.dumps(random_tx, indent=2))

    # Uncomment to simulate a realistic month:
    # month_tx = simulator.generate_realistic_month(month_budget=1500.0, include_subscriptions=True)
    # print(json.dumps(month_tx, indent=2))
