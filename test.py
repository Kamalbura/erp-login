import requests

url = "https://docs.google.com/forms/d/e/1FAIpQLScStreRZRW9Y4ipI2MNBENtSsbMqYn2CYvPRTlCs_eZs3d0vg/formResponse"
data = {
    "entry.163375498": "john doe",
    "entry.1850673272": "hello from esp32!"
}

response = requests.post(url, data=data)
print("Status:", response.status_code)
