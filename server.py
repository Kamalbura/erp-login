from flask import Flask, request, jsonify, send_file
import requests
from bs4 import BeautifulSoup
import os

app = Flask(__name__, static_folder='./')

# Store active sessions
sessions = {}

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/login', methods=['POST'])
def login():
    # Get credentials from request
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Start a session to maintain cookies
    session = requests.Session()

    # 1. First GET the login page to get the latest VIEWSTATE, EVENTVALIDATION, etc.
    login_page_url = "https://erp.vce.ac.in/sinfo/Default.aspx"
    response = session.get(login_page_url)

    # Parse hidden fields from the HTML
    soup = BeautifulSoup(response.text, "html.parser")
    viewstate = soup.find("input", {"name": "__VIEWSTATE"})["value"]
    event_validation = soup.find("input", {"name": "__EVENTVALIDATION"})["value"]
    viewstate_generator = soup.find("input", {"name": "__VIEWSTATEGENERATOR"})["value"]

    # 2. Prepare payload with login credentials and hidden fields
    payload = {
        "__VIEWSTATE": viewstate,
        "__VIEWSTATEGENERATOR": viewstate_generator,
        "__EVENTVALIDATION": event_validation,
        "txt_HTNO": username,
        "txt_Password": password,
        "btn_Login": "Sign in"
    }

    # 3. Headers (optional, helps mimic browser behavior)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://erp.vce.ac.in/sinfo/Default.aspx",
        "Origin": "https://erp.vce.ac.in"
    }

    # 4. POST the login form
    login_response = session.post(login_page_url, data=payload, headers=headers, allow_redirects=True)

    # 5. Check if redirected to dashboard
    if "DashBoard.aspx" in login_response.url:
        # Store session for future requests
        session_id = os.urandom(16).hex()
        sessions[session_id] = session
        
        # Return dashboard HTML and session ID
        return jsonify({
            "success": True,
            "message": "Login successful!",
            "session_id": session_id,
            "dashboard_html": login_response.text
        })
    else:
        return jsonify({
            "success": False,
            "message": "Login failed. Please check your credentials."
        })

@app.route('/fetch', methods=['POST'])
def fetch_erp_page():
    # Get session ID and URL from request
    data = request.json
    session_id = data.get('session_id')
    url = data.get('url')
    
    if session_id not in sessions:
        return jsonify({
            "success": False,
            "message": "Session expired. Please login again."
        })
    
    # Use the stored session to fetch the requested page
    session = sessions[session_id]
    response = session.get(url)
    
    return jsonify({
        "success": True,
        "html": response.text
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
