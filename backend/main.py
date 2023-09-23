from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import Optional

from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.models import sampler

app = FastAPI()

# CORS
#--------------------------------------------------------------
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Database
#--------------------------------------------------------------
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/database"
engine = create_engine(url=SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
#--------------------------------------------------------------





# HTTP Routes
#--------------------------------------------------------------

@app.get("/")
def read_root():
    return "Hello World!"

@app.get("/sample/{sample_id}")
def read_sample(sample_id: int):
    return sampler.get_piano_sample(sample_id)
