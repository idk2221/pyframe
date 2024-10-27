import fastapi
import os
import uvicorn
from starlette.responses import FileResponse 
from fastapi.staticfiles import StaticFiles

app = fastapi.FastAPI()
def fetchsrc_files():
    # todo(): [fetch the file names from the src dir ]
    # this returns a list . [os.listdir("")]
    fileslist = os.listdir("src")
    routes = []
    for i in fileslist:
        if i.endswith(".html"):
             routename = i.replace(".html", "") # routename - extention.
             if routename == "index":  #index to /
                 routename = "/"
             else:
                 routename = "/" + routename
             routes.append(routename)
    return routes

def routegenerator(routes):
    # todo() [route setup upon routes names.]
    for i in routes:
        routename = i
        print(routename)
        pagefuncname = "page_" + routename
        @app.get(routename)
        def pagefuncname(iden=routename):
          return FileResponse(f"src/{iden}.html")

def starter():
    routes = fetchsrc_files()
    routegenerator(routes)
    print("generated routes..")
    print(f"indexed {routes} routes. routes read are {app.routes}")
    app.mount("/src/public", StaticFiles(directory="public",html = True), name="public")
    uvicorn.run(app, host="0.0.0.0", port=8000)


starter()