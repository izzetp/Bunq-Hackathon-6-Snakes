from openai import OpenAI
import json
import pandas as pd
from datetime import datetime
import re

class BunqWrappedGenerator:
    def __init__(self, api_key: str):
        self.client = OpenAI(
            base_url="https://integrate.api.nvidia.com/v1",
            api_key=api_key
        )
        self.model = "nvidia/llama-3.1-nemotron-ultra-253b-v1"
        self.temperature = 0.6
        self.top_p = 0.95
        self.max_tokens = 4096
        self.frequency_penalty = 0
        self.presence_penalty = 0

    def _call_model(self, prompt: str, system_message: str = "") -> str:
        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]

        response_text = ""
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=self.temperature,
            top_p=self.top_p,
            max_tokens=self.max_tokens,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty,
            stream=True
        )

        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                response_text += chunk.choices[0].delta.content

        return response_text

    def get_year_one_line(self, transactions: list) -> dict:
        """
        Processes a list of transaction dictionaries to extract the top 100 expenses
        made by COMPANY-type users, ordered by most money spent.

        Args:
            transactions (list): List of transaction records in JSON format.

        Returns:
            dict: A quirky, hilarious slogan summarizing this year's transactions.
        """
        df = pd.DataFrame(transactions)

        # Filter for COMPANY user_type
        df = df[df["user_type"] == "COMPANY"]

        # Sort by amount (most negative = most spent), and get top 100
        df_sorted = df.sort_values(by="amount").head(100)

        # Keep only the specified columns
        df_filtered = df_sorted[[
            "transaction_description",
            "counterparty_name",
            "place_name",
            "category"
        ]]

        # Convert to a readable string
        df_string = df_filtered.to_string(index=False)

        # Compose clean prompt
        prompt = (
            "Based on the following list of 100 major business expenses, summarize this year's spending in 10 words or fewer "
            "with a quirky and hilarious slogan. Focus on the dominant themes. Do not use quotation marks or punctuation at the end.\n\n"
            + df_string
        )

        # Call the model
        response = self._call_model(prompt).strip()

        # Sanitize response to remove stray quotes
        slogan = re.sub(r'^[\'"]?(.*?)[\'"]?$', r'\1', response)

        return {"desc": slogan}


    def get_total_nr_purchases(self, transactions: list) -> dict:
        """
        Returns the total number of purchases and average purchases per day.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "nr_purchases": int,
                "avg_day": float
            }
        """
        count = len(transactions)
        avg_per_day = round(count / 365, 2)

        return {
            "nr_purchases": count,
            "avg_day": avg_per_day
        }

    def get_prime_spending_hour(self, transactions: list) -> dict:
        """
        Analyzes transactions to find the hour of the day with the highest total spend.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "hour": str,
                "desc": str
            }
        """
        if not transactions:
            return {"hour": None, "desc": "No data, no damage. You're either broke or a budgeting ninja. 🥷💸"}

        df = pd.DataFrame(transactions)
        df = df[df["amount"].notnull() & df["updated_timestamp"].notnull()]

        # Convert timestamps to datetime and extract hour
        df["hour"] = pd.to_datetime(df["updated_timestamp"], errors="coerce").dt.hour
        df = df[df["hour"].notnull() & (df["amount"] < 0)]

        if df.empty:
            return {"hour": None, "desc": "Your wallet slept while the world spent. 💤💳"}

        hourly_spending = df.groupby("hour")["amount"].sum()
        peak_hour = int(hourly_spending.idxmin())
        hour_str = f"{peak_hour:02d}:00"

        if 0 <= peak_hour < 6:
            desc = f"Nothing good happens after midnight, except maybe online shopping. 🌙📦"
        elif 6 <= peak_hour < 12:
            desc = f"Coffee, croissants, and questionable financial decisions. ☕🥐💸"
        elif 12 <= peak_hour < 18:
            desc = f"Peak productivity or peak procrastination with a side of spending? ⏰🛒"
        else:
            desc = f"Spending therapy hits different after dark. 🌆🤑"

        return {
            "hour": hour_str,
            "desc": desc
        }


    def get_most_expensive_night(self, transactions: list) -> dict:
        """
        Identifies the night with the highest total spending (from 18:00 to 06:00)
        and returns a structured summary with the top 3 biggest spends.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "date": "Month Day",
                "amount": float,
                "3_most_spent": [str, str, str]
            }
        """
        if not transactions:
            return {
                "date": None,
                "amount": 0
            }

        df = pd.DataFrame(transactions)
        df["timestamp"] = pd.to_datetime(df["updated_timestamp"], errors='coerce')
        df = df[df["timestamp"].notnull() & (df["amount"] < 0)]  # Only spending

        if df.empty:
            return {
                "date": None,
                "amount": 0,
            }

        # Assign each transaction to a 'night' period
        def assign_night(ts):
            hour = ts.hour
            if hour >= 20:
                return ts.date()
            elif hour < 6:
                return (ts - pd.Timedelta(days=1)).date()
            else:
                return None

        df["night"] = df["timestamp"].apply(assign_night)
        df = df[df["night"].notnull()]

        # Group by night and sum spending
        night_spending = df.groupby("night")["amount"].sum()

        if night_spending.empty:
            return {
                "date": None,
                "amount": 0
            }

        worst_night = night_spending.idxmin()
        total_spent = abs(night_spending.min())

        # Get top 3 expenses from that night
        night_df = df[df["night"] == worst_night]
        top_3 = (
            night_df.sort_values(by="amount")
            .head(3)["transaction_description"]
            .fillna("Unknown expense")
            .tolist()
        )

        return {
            "date": worst_night.strftime('%B %d'),
            "amount": round(total_spent, 2)
        }

    def get_most_painful_single_expense(self, transactions: list) -> dict:
        """
        Finds the largest single expense and returns a structured summary.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "amount": float,
                "expense": str,
                "date": str
            }
        """
        if not transactions:
            return {
                "amount": 0.0,
                "expense": None,
                "date": None
            }

        df = pd.DataFrame(transactions)
        df = df[df["amount"] < 0]  # Only expenses

        if df.empty:
            return {
                "amount": 0.0,
                "expense": None,
                "date": None
            }

        max_expense = df.loc[df["amount"].idxmin()]
        amount = round(abs(max_expense["amount"]), 2)
        description = max_expense.get("transaction_description", "Unknown expense")
        date = pd.to_datetime(max_expense.get("updated_timestamp")).date().isoformat()

        return {
            "amount": amount,
            "expense": description,
            "date": date
        }


    def get_most_money_spent_one_place(self, transactions: list) -> dict:
        """
        Finds the place where the user spent the most money with COMPANY recipients.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "place": str,
                "nr_visits": int,
                "amount": float
            }
        """
        if not transactions:
            return {
                "place": None,
                "nr_visits": 0,
                "amount": 0.0
            }

        df = pd.DataFrame(transactions)

        # Filter: only expenses (negative amounts) to COMPANY
        df = df[(df["amount"] < 0) & (df["user_type"] == "COMPANY")]

        if df.empty:
            return {
                "place": None,
                "nr_visits": 0,
                "amount": 0.0
            }
        
        # Combine place_name and counterparty_name into 'vendor'
        df["vendor"] = df["place_name"].combine_first(df["counterparty_name"])

        # Drop rows where both are missing or empty
        df["vendor"] = df["vendor"].astype(str).str.strip()
        df = df[df["vendor"] != ""]  # Remove rows with no valid vendor


        # Group by vendor and sum the spending
        vendor_spending = df.groupby("vendor")["amount"].sum()
        top_vendor = vendor_spending.idxmin()
        total_spent = abs(vendor_spending.min())

        # Count how many times the user spent money at that vendor
        nr_visits = df[df["vendor"] == top_vendor].shape[0]

        return {
            "place": top_vendor,
            "nr_visits": nr_visits,
            "amount": round(total_spent, 2)
        }


    def get_person_sent_most_money(self, transactions: list) -> dict:
        """
        Identifies the person who sent the most money to the user.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "name": str,
                "amount": float
            }
        """
        if not transactions:
            return {
                "name": None,
                "amount": 0.0
            }

        df = pd.DataFrame(transactions)

        # Filter: only incoming payments (positive amounts) from PERSON
        df = df[(df["amount"] > 0) & (df["user_type"] == "PERSON")]

        if df.empty or df["counterparty_name"].isnull().all():
            return {
                "name": None,
                "amount": 0.0
            }

        sender_totals = df.groupby("counterparty_name")["amount"].sum()
        top_sender = sender_totals.idxmax()
        total_received = round(sender_totals.max(), 2)

        return {
            "name": top_sender,
            "amount": total_received
        }


    def get_person_got_most_money(self, transactions: list) -> dict:
        """
        Finds the person who received the most money from the user.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "name": str,
                "amount": float
            }
        """
        if not transactions:
            return {
                "name": None,
                "amount": 0.0
            }

        df = pd.DataFrame(transactions)

        # Filter: only outgoing payments (negative amounts) to PERSON
        df = df[(df["amount"] < 0) & (df["user_type"] == "PERSON")]

        if df.empty or df["counterparty_name"].isnull().all():
            return {
                "name": None,
                "amount": 0.0
            }

        receiver_totals = df.groupby("counterparty_name")["amount"].sum()
        top_receiver = receiver_totals.idxmin()
        total_sent = round(abs(receiver_totals.min()), 2)

        return {
            "name": top_receiver,
            "amount": total_sent
        }

    def get_spending_as_playlist(self, transactions: list) -> dict:
        """
        Uses top 5 most painful expenses to generate a playlist via LLM.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "songs": [str, str, str, str, str]
            }
        """
        if not transactions:
            return {"songs": []}

        df = pd.DataFrame(transactions)
        df = df[(df["amount"] < 0) & df["transaction_description"].notnull()]

        if df.empty:
            return {"songs": []}

        top_expenses = df.nsmallest(5, "amount")

        vibe_list = [
            f"- €{abs(row['amount']):.2f} on \"{row['transaction_description']}\""
            for _, row in top_expenses.iterrows()
        ]

        prompt = (
            "You are given a list of 5 massive expenses. Based on their emotional vibe, suggest 5 song titles that fit them. "
            "Return the result as a single line, with each song formatted like: Song Title by Artist. "
            "Separate each with a comma. Do not number or bold the list. Do not use quotation marks.\n\n"
            "Expenses:\n" + "\n".join(vibe_list)
        )

        system_message = "You are a creative and witty music curator generating mood-based playlists."
        raw_line = self._call_model(prompt, system_message).strip()

        def sanitize_song_titles(raw_line: str) -> list:
            raw_items = raw_line.split(",")
            cleaned_songs = []
            for item in raw_items:
                item = item.strip()
                if "by" not in item:
                    continue
                item = re.sub(r'"?\s*by', ' by', item)
                item = item.strip(' "\'')
                cleaned_songs.append(item)
            return cleaned_songs

        songs = sanitize_song_titles(raw_line)
        return {"songs": songs[:5]}

    def get_mashup(self, transactions: list) -> dict:
        """
        Finds the person with the most total transfers (sent or received) and returns a summary.

        Args:
            transactions (list): A list of transaction dictionaries.

        Returns:
            dict: {
                "name": str,
                "nr_transfers": int
            }
        """
        if not transactions:
            return {
                "name": None,
                "nr_transfers": 0
            }

        df = pd.DataFrame(transactions)

        # Keep only transactions involving people
        df = df[df["user_type"] == "PERSON"]

        if df.empty or df["counterparty_name"].isnull().all():
            return {
                "name": None,
                "nr_transfers": 0
            }

        # Count transactions by counterparty
        transfer_counts = df["counterparty_name"].value_counts()
        top_person = transfer_counts.idxmax()
        nr_transfers = int(transfer_counts.max())

        return {
            "name": top_person,
            "nr_transfers": nr_transfers
        }
    
    def generate_report(self, transactions: list) -> list:
        data = []
        data.append(self.get_most_expensive_night(transactions))
        data.append(self.get_person_sent_most_money(transactions))
        data.append(self.get_person_got_most_money(transactions))
        data.append(self.get_most_painful_single_expense(transactions))
        data.append(self.get_spending_as_playlist(transactions))
        data.append(self.get_prime_spending_hour(transactions))
        data.append(self.get_most_money_spent_one_place(transactions))
        data.append(self.get_total_nr_purchases(transactions))
        data.append(self.get_year_one_line(transactions))
        data.append(self.get_mashup(transactions))
        return data

# Example usage from outside the class
if __name__ == "__main__":
    API_KEY = "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"
    generator = BunqWrappedGenerator(API_KEY)

    with open("transactions.json", "r") as file:
        transactions = json.load(file)

    report = generator.generate_report(transactions)
    print(report)