from typing import Optional
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class UserResponse(BaseModel):  # for response
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True  # This is essential for SQLAlchemy compatibility


class Userupdate(BaseModel):
    name:Optional[str]=None
    email:Optional[str]=None


