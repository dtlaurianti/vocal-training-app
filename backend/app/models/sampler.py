import os
from fastapi.responses import Response


def get_piano_sample(sample_id: int):
    sample_id = f'{sample_id:02}'
    sample_path = os.path.join("audio", "piano", f"{sample_id}.wav")
    with open(sample_path, "rb") as sample_file:
        return Response(content=sample_file.read(), media_type="audio/wav")