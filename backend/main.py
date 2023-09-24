from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import Optional

from app.models import sampler
from app.models import sequencer

app = FastAPI()

# CORS
# --------------------------------------------------------------
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# HTTP Routes
# --------------------------------------------------------------


@app.get("/sample/{sample_id}")
def read_sample(sample_id: int):
    return sampler.get_piano_sample(sample_id)


@app.get("/sequence/{scale}/{pattern}/{low}/{high}")
def read_sequence(scale: str, pattern: str, low: str, high: str):
    return {"data": sequencer.generate_sequence(scale, pattern, low, high)}
