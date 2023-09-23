import wave
import os
from fastapi.responses import FileResponse


def get_piano_sample(sample_id: int):
    sample_id = f'{sample_id:02}'
    sample_path = os.path.join("audio", "piano", f"{sample_id}.wav")
    return FileResponse(sample_path)