from sqlalchemy import create_engine, Column, Integer,String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy .orm import sessionmaker

SQLALCHEMY_DATABASE_URL="sqlite:///./test.db"


engine=create_engine(
    SQLALCHEMY_DATABASE_URL,connect_args={"check_same_thread":False}

)
sessionlocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base=declarative_base()



class User(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String, index=True)
    email=Column(String,unique=True, index=True)


Base.metadata.create_all(bind=engine)


def get_db():
    db=sessionlocal()
    try:
        yield db
    finally:
        db.close()



