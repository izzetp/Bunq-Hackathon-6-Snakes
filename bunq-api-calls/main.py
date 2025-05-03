from fastapi import FastAPI
from lib.bunq_lib import BunqClient
import config

class BunqDataRetriever:
    def __init__(self, USER_API_KEY: str):
        self.bunq_client = BunqClient(USER_API_KEY, service_name='PeterScript')

        # Try to create installation and device server, but don't worry if they already exist
        try:
            self.bunq_client.create_installation()
            self.bunq_client.create_device_server()
        except Exception as e:
            print(f"Installation setup message: {e}")
            print("Continuing with existing installation...")

        # Create session - this should work whether the device is new or existing
        self.bunq_client.create_session()

        # Initialize the FastAPI app
        self.app = FastAPI()

        # Define API routes
        self.setup_routes()

    def setup_routes(self):
        @self.app.get("/monetary_account")
        def get_monetary_account():
            response = self.bunq_client.request(endpoint='monetary-account', method='GET', data={})
            return response

        @self.app.get("/request")
        def request():
            endpoint = "monetary-account/"
            response = self.bunq_client.request(endpoint=endpoint, method='GET', data=None)
            return response

        @self.app.get("/payment")
        def payment():
            payment = self.bunq_client.create_payment(
                amount='0.10', 
                recipient_iban='NL14RABO0169202917',
                currency='EUR',
                from_monetary_account_id='1882944', 
                description='test'
            )
            return payment

        @self.app.post("/create_payment")
        def create_payment(amount: str, recipient_iban: str, description: str, 
                            currency: str = 'EUR', from_account_id: str = '1882944'):
            payment = self.bunq_client.create_payment(
                amount=amount, 
                recipient_iban=recipient_iban,
                currency=currency,
                from_monetary_account_id=from_account_id, 
                description=description
            )
            return payment

    def get_payment_history(self):
        # Get all the monetary account IDs for users
        monetary_account_ids = self.get_all_monetary_account_ids()
        
        all_payments = []
        
        # Fetch payment history for each monetary account
        for account_id in monetary_account_ids:
            # Fetch payments for this specific account
            endpoint = f"monetary-account/{account_id}/payment"
            response = self.bunq_client.request(endpoint=endpoint, method='GET', data={})
            
            payments = response.get('Response', [])
            
            # Append payments to the result list
            for payment in payments:
                payment_data = payment.get('Payment')
                if payment_data:
                    all_payments.append(payment_data)
        
        return {"payment_history": all_payments}

    def get_first_monetary_account_id(self):
        response = self.bunq_client.request(endpoint='monetary-account', method='GET', data={})
        accounts = response.get('Response', [])
        for account in accounts:
            account_data = account.get('MonetaryAccountBank') or account.get('MonetaryAccount')
            if account_data and 'id' in account_data:
                return account_data['id']
        raise Exception("No monetary account ID found.")

    def get_all_monetary_account_ids(self):
        response = self.bunq_client.request(endpoint='monetary-account', method='GET', data={})
        accounts = response.get('Response', [])
        monetary_account_ids = []
        for account in accounts:
            account_data = account.get('MonetaryAccountBank') or account.get('MonetaryAccount')
            if account_data and 'id' in account_data:
                monetary_account_ids.append(account_data['id'])
        return monetary_account_ids

### USAGE EXAMPLE ###
bunq_reader = BunqDataRetriever(config.BUNQ_API_KEY)
history = bunq_reader.get_payment_history()
print(history)
