import fastapi
import os
import uvicorn

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
            return {"info":f"{iden}."}

def starter():
    routes = fetchsrc_files()
    routegenerator(routes)
    print("generated routes..")
    print(f"indexed {routes} routes. routes read are {app.routes}")

    uvicorn.run(app, host="0.0.0.0", port=8000)


starter()