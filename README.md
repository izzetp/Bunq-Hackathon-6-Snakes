### Bunq Lens
Bunq Lens is an AI-powered application that transforms your Bunq transaction data into a personalized, shareable year-in-review. Inspired by Spotify Wrapped, it provides users with insightful summaries of their spending habits, favorite merchants, and financial trends, all presented in an engaging and visually appealing format.

### 🚀 Features
Secure Bunq Integration: Connects with the Bunq sandbox API to fetch user data.

AI-Driven Insights: Utilizes NVIDIA-powered LLaMA models to analyze spending patterns and generate personalized summaries.

Interactive Visualizations: Presents data through dynamic charts and graphs, highlighting top spending categories, frequent merchants, and monthly trends.

Shareable Reports: Generates visually appealing summaries that users can share on social media platforms.

User-Friendly Interface: Offers an intuitive web interface for users to view and interact with their financial summaries.

### 🛠️ Technical Overview
Frontend: Built with React for a responsive and dynamic user experience.

Backend: Developed using Python and Flask to handle API requests and data processing.

AI Integration: Incorporates LLaMA models via NVIDIA's API for natural language processing and summarization.

Data Visualization: Employs Chart.js and D3.js for rendering interactive charts.

Authentication: Implements secure OAuth2 authentication with the Bunq API.

### 📦 Installation
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/izzetp/Bunq-Hackathon-6-Snakes.git
cd Bunq-Hackathon-6-Snakes
Set Up Virtual Environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Configure Environment Variables:

Create a .env file in the root directory and add your Bunq API credentials:

env
Copy
Edit
BUNQ_API_KEY=your_bunq_api_key
NVIDIA_API_KEY=your_nvidia_api_key
Run the Application:

bash
Copy
Edit
flask run
Access the application at http://localhost:5000.

### 🧪 Usage
Authenticate: Log in using your Bunq sandbox credentials.

Generate Summary: Click on "Generate Wrapped" to fetch and analyze your transaction data.

View Insights: Explore your personalized financial summary, including top spending categories, frequent merchants, and monthly trends.

Share: Download or share your financial summary on social media platforms.

### 🎯 Hackathon Rubric Alignment
Innovation: Combines financial data with AI to create personalized, shareable summaries, offering a novel way to engage with banking information.

Technical Execution: Successfully integrates multiple APIs (Bunq and NVIDIA's LLaMA), handles authentication securely, and presents data through interactive visualizations.

Business Value: Encourages user engagement and brand promotion through shareable content, potentially attracting new users to Bunq.

User Experience: Provides an intuitive interface with clear insights, making financial data accessible and engaging.

### 📁 Project Structure
plaintext
Copy
Edit
├── app.py                 # Main Flask application
├── templates/             # HTML templates
├── static/
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript files
├── bunq_api/
│   ├── auth.py            # Handles Bunq authentication
│   └── transactions.py    # Fetches and processes transaction data
├── ai/
│   └── summarizer.py      # Interfaces with LLaMA API for summarization
├── visualizations/
│   └── charts.py          # Generates charts using Chart.js
├── requirements.txt       # Python dependencies
└── README.md              # Project documentation

### 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
