import fastapi
import os
app = fastapi.FastAPI()

def fetchsrc_files():
    # todo(): [fetch the file names from the src dir ]
    print(os.listdir("src"))
d