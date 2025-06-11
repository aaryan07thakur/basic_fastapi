from fastapi import FastAPI
from typing import Union
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
    






@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item to get")], q: str
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results