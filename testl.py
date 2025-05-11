import requests
from bs4 import BeautifulSoup
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Credentials
htno = "1602-22-748-011"  # Replace with your real HTNO
password = "unwoof"       # Replace with your real password
login_page_url = "https://erp.vce.ac.in/sinfo/Default.aspx"

# Function to login using Selenium (maintains session in browser)
def login_with_selenium():
    print("[🔄] Starting browser automation...")
    
    # Initialize browser (Chrome or Firefox)
    try:
        # Try Chrome first
        driver = webdriver.Chrome()
    except:
        try:
            # Fall back to Firefox if Chrome is not available
            driver = webdriver.Firefox()
        except Exception as e:
            print(f"[❌] Browser initialization failed: {e}")
            print("[❗] Please install Chrome or Firefox and the appropriate webdriver")
            return
    
    try:
        # Navigate to login page
        driver.get(login_page_url)
        
        # Fill in login form
        driver.find_element(By.ID, "txt_HTNO").send_keys(htno)
        driver.find_element(By.ID, "txt_Password").send_keys(password)
        
        # Click login button
        driver.find_element(By.ID, "btn_Login").click()
        
        # Wait for redirect to dashboard
        WebDriverWait(driver, 10).until(
            EC.url_contains("DashBoard.aspx")
        )
        
        print("[✅] Login Successful! Browser is now showing the dashboard.")
        
        # Keep browser open until user closes it manually
        print("[🌐] Browser will remain open with your session. Close it manually when done.")
        
        # This will prevent the script from closing the browser
        while True:
            time.sleep(1)
            if not driver:
                break
                
    except Exception as e:
        print(f"[❌] Login process failed: {e}")
        driver.quit()

# Start the login process
if __name__ == "__main__":
    login_with_selenium()
