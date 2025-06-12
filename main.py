from fastapi import FastAPI,Query,Form,File,UploadFile, HTTPException
from typing import Union, Annotated
from enum import Enum
from pydantic import BaseModel


class schemas(BaseModel):
    name:str
    Class:str
    roll:int



class ModelName(str, Enum):
    one = "one"
    two = "two"
    Three = "Three"

app=FastAPI()

@app.get("/hello")
async def hello():
    return {
        "Message": "Hello word"
    }


@app.get('/item/{Item}')
def path_function(Item):
    var_name={"path variable": Item}
    return (var_name)


@app.get('/query')
def query_func(name:Union[str,None]=None, rollNo: Union[int,None]=None):    #union ko help le required and non required garna mil x
    var_name={"name":name, "rollNo": rollNo}
    return var_name



@app.get('/choose/{ModelName}')
def choose_item(model_name: ModelName):
    if model_name=="one":
        return{"Message":"you selected one "}
    elif model_name=="two":
        return {"Message":"you selected two"}
    elif model_name=="Three":
        return {"Message":"you selected: Three"}


#request body

@app.post("/item")
async def create_items(item:schemas):
    return item
    



# @app.get("/items/{item_id}")
# async def read_items(
#     item_id: Annotated[int, Path(title="The ID of the item to get")], q: str
# ):
#     results = {"item_id": item_id}
#     if q:
#         results.update({"q": q})
#     return results



@app.post("/login/")
async def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    return {"username": username}


#from data
@app.post('/form_data/')
async def form_data(username:str=Form(), password:str=Form()):    # Form matrai lekhyo vane required hudai n tara
                                                               #Form() lekhyo vane required hun x 
    return ({"username": username, "password":password})



#upload file
@app.post("/files")
async def create_file(file:bytes=File()):
    return ({"file": len(file)})



#file name 
@app.post("/uploadfile")
async def create_upload_file(file:UploadFile):
    return ({"filename": file.filename})



@app.post("/uploadfileEx")
async def create_upload_fileex(filename:UploadFile, file2:bytes=File(), name:str=Form()):
    return ({"filename": filename.filename, "file":len(file2), "name":name})



#Error handalling
@app.get("/Errorhandling")
async def Errorhandalling(item:int):
    if item==5:
        raise HTTPException(status_code=400, detail="item should not be equal to 5")
    return {"value": item}





































