import requests
import time

while True:
    try:
        requests.get("http://localhost:8000/hello")
    except requests.exceptions.ConnectionError as e:
        print(f"Connection error: {e}")
    time.sleep(2)
