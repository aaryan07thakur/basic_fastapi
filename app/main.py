# Define UserCreate schema for request validation
from pydantic import BaseModel
from  database import User, get_db
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: str


class UserResponse(BaseModel):  # for response
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True  # This is essential for SQLAlchemy compatibility



@app.post('/User/', response_model=UserResponse)  # ✅ Use Pydantic schema here
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user  