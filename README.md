# 🔍 bunq Lens

**bunq Lens** is an AI-powered application that transforms your Bunq transaction data into a personalized, shareable year-in-review.

Inspired by Spotify Wrapped, it helps users gain insightful, visually appealing summaries of their spending habits, favorite merchants, and financial patterns.

---

## 🚀 Features

- 🔐 **Secure bunq Integration**  
  Connects with the Bunq sandbox API to fetch and process transaction data.

- 🤖 **AI-Driven Insights**  
  Utilizes NVIDIA-powered LLaMA models to analyze and summarize financial behavior.

- 📊 **Engaging Visualizations**  
  Highlights top categories, trends, and merchants with dynamic charts and summaries.

- 📤 **Share-Ready Reports**  
  Wrap up your financial year in a format that’s easy to download or post online.

- ⚡ **Next.js Frontend**  
  Responsive UI built with Next.js for a smooth user experience.

---

## 🛠️ Technical Overview

- **Frontend**: Built with **Next.js**
- **Backend**: Python scripts interacting with the **Bunq Sandbox API**
- **AI Summarization**: LLaMA models via NVIDIA’s API
- **Visualization**: Summary generated in JSON/text for potential frontend rendering

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/izzetp/Bunq-Hackathon-6-Snakes.git
cd Bunq-Hackathon-6-Snakes

# 2. Set up virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment variables
# Create a .env file in the root directory with:
# BUNQ_API_KEY=your_bunq_api_key
# NVIDIA_API_KEY=your_nvidia_api_key

# 5. Run the backend (e.g. summarizer or transaction scripts)
python main.py
```

To run the frontend (optional if not included in repo):
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Usage

1. Make sure `.env` is configured with valid sandbox API keys.
2. Run the relevant Python script (e.g. `main.py`, `pay-elliot.py`, etc.)
3. Backend fetches transactions, processes them, and generates summaries.
4. Results appear in the console or exported JSON.
5. Optionally integrate with a frontend to visualize the results.

---

## 🎯 Hackathon Rubric Alignment

- **Innovation**: Combines real financial data with modern LLMs for unique summaries.
- **Technical Execution**: Integrates multiple APIs (Bunq, LLaMA) and processes data programmatically.
- **Business Value**: Drives engagement, fun insights, and shareable outputs to promote Bunq.
- **User Experience**: Lightweight scripts and frontend potential for a seamless wrap-up experience.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
