import fastapi
import os
import uvicorn
from starlette.responses import FileResponse 
from fastapi.staticfiles import StaticFiles
from backend import *
import jedi
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        #well - 
        
        @app.get(routename)
        def pagefuncname(iden=routename):
            if iden == "/":
                iden = "index"
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


#bridge point

"""
todo[] 

 - fetch function names from backend.py
 - create a websocket with each function name /ws/{sessionid}/functions/{funcname}/{expectedresponse_address}
 - call the function, get the response, and send it to the client with the sessionid and expectedresponse_address.
"""
def securer(): 
    mainfunctions = ['functionsFetcher(', 'starter(', 'cdnHoster(', 'cdner(', 'routegenerator(', 'fetchsrc_files(']
    with open("backend.py") as f:
        everything = f.read()
        print(everything)
        for i in mainfunctions:
            if i in everything:
                    raise Exception(f"Calling of illegal main functions. \n Please refrain from using one of these functions in your backend.py file. {mainfunctions}")
            else:
                print(f"passed {i}")
def functionsFetcher():
    # todo? a lexer? i think is the best way.
    try: 
        with open("backend.py") as f:
            everything = f.read()
        lexed = jedi.Script(everything).get_names(all_scopes=True, definitions=True)
        #lexed -> [<Name full_name='__main__.logger', description='def logger'>, <Name full_name='__main__.logger.loglist', description='loglist = []'>]
        functionslist = [f.name for f in lexed if f.type == 'function'] 
        return functionslist
    except Exception as e:
        raise Exception(f"missing permissions, or unexsistance of backend.py. {e}")

def functionrunner(function):
     functionlist = list(function)
    #  running = globals()[function]()
     pass
    #  return running

def apirouter():
    allapiroutes = functionsFetcher()
    for i in allapiroutes:
        print("creating {i}")
        
        @app.get("/api/{i}") 
        def apifunc(iden={i}):
            #route scope.
            # todo() running the function for the bridge.
            # functionrunner.  [created]
            response = functionrunner(iden)
            return {"API": response}



def starter():
    routes = fetchsrc_files()
    routegenerator(routes)
    print("generated routes..")
    print(f"indexed {routes} routes. routes read are {app.routes}")
    print("hosting cdn...")
    cdnroutes = cdner()
    cdnHoster(cdnroutes)
    securer()
    apirouter()
    uvicorn.run(app, host="0.0.0.0", port=8000)





starter()
