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

def cdner():
    fileslist = os.listdir("src/public")
    routes = []
    for i in fileslist:
        routes.append(i)
    return routes

def cdnHoster(routes):
    for i in routes:
        @app.get(f"/public/{i}")
        def cdnfunc(iden=i):
            return FileResponse(f"src/public/{iden}")

def starter():
    routes = fetchsrc_files()
    routegenerator(routes)
    print("generated routes..")
    print(f"indexed {routes} routes. routes read are {app.routes}")
    print("hosting cdn...")
    cdnroutes = cdner()
    cdnHoster(cdnroutes)
    uvicorn.run(app, host="0.0.0.0", port=8000)


starter()