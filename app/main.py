# Define UserCreate schema for request validation
# from pydantic import BaseModel
from  database import User, get_db
from fastapi import FastAPI, Depends,HTTPException
from sqlalchemy.orm import Session
from typing import List
from schemas import UserCreate,UserResponse,Userupdate

app = FastAPI()





@app.post('/User/', response_model=UserResponse)  # ✅ Use Pydantic schema here
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user  



@app.get("/users/", response_model=List[UserResponse])
def get_users(skip:int=0, limit:int=10, db:Session=Depends(get_db)):
    users=db.query(User).offset(skip).limit(limit).all()
    return users


@app.get("/User/{user_id}", response_model=UserResponse)
def ger_user_by_ID(user_id:int, db:Session=Depends(get_db)):
    user=db.query(User).filter(User.id==user_id).first()
    if user is None :
        raise HTTPException(status_code=404,detail="user Not found")
    return user




@app.put("/User/{user_id}",response_model=UserResponse)
def update_user(user_id:int, user:Userupdate, db:Session=Depends(get_db)):
    db_user=db.query(User).filter(User.id==user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User Not Found")
    
    
    if user.name is not None:
        setattr(db_user, "name", user.name)
    if user.email is not None:
        setattr(db_user, "email", user.email)
    db.commit()
    db.refresh(db_user)
    return db_user



@app.delete("/User/{user_id}",response_model=UserResponse)
def delete_user_by_ID(user_id:int,db:Session=Depends(get_db)):
    db_users=db.query(User).filter(User.id==user_id).first()
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_users)
    db.commit()
    raise HTTPException(status_code=200,detail="Successfully deleted")
