# Bunq-Hackathon-6-Snakes

# bunq-wrapped

`bunq-wrapped` is a full-stack web application and API service with integrated AI functionality, designed to streamline interactions with the bunq sandbox environment. It offers a graphical user interface and AI-driven insights to manage authentication, account operations, sandbox top-ups, and payment processing.

---

## Features

- **Web Interface**: Responsive frontend for visualizing accounts, balances, and transactions.  
- **AI Insights**: Generate transaction summaries, anomaly detection, and personalized recommendations using AI models.  
- **Sandbox User Management**: Programmatically create and manage multiple sandbox profiles.  
- **Key Pair & Session Workflow**: Automate RSA key generation, installation, device registration, and session token handling.  
- **Account Operations**: List monetary accounts, retrieve balances, and view transaction history.  
- **Sandbox Top-Up**: Automate balance top-up via request inquiries to the sandbox “Sugar Daddy.”  
- **Payment Processing**: Initiate, track, and summarize single or batch payments.  

---

## Architecture

- **Backend**: Python 3.8+ with FastAPI for API endpoints and authentication workflows.  
- **Frontend**: Next.js for server-side rendering and interactive dashboards.  
- **AI Integration**: Connects to OpenAI or a custom ML service for generating insights.  

---

## Getting Started

### Prerequisites

- **Python 3.8 or higher**  
- **Node.js & npm**  
- **OpenSSL** command-line tool  
- **bunq sandbox API access**  
- **OpenAI API key** (if using AI features)  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bunq-wrapped.git
   cd bunq-wrapped

### Install backend dependencies:

cd backend
pip install -r requirements.txt

### Install frontend dependencies:

cd ../frontend
npm install

### Configuration

Create a .env file in the backend/ directory containing: