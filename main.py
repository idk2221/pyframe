import fastapi
import os
app = fastapi.FastAPI()

def fetchsrc_files():
    # todo(): [fetch the file names from the src dir ]
    # this returns a list . [os.listdir("")]
    fileslist = os.listdir("src")
    routes = []
    for i in fileslist:
        if i.endsWith(".html"):
             routename = i.replace(".html", "")
             routes.append(routename)

print(fetchsrc_files())