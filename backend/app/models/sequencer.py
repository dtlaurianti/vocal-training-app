# computes the notes of an exercise given a scale, a pattern, and starting
# and ending tonics, and a middle c sample id

from sqlalchemy import create_engine, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from app.models.theory import note_names, note_accidentals, intervals
from app.models.theory import MIDDLE_C_OCTAVE, NOTES_PER_OCTAVE
from app.models.orm_models import Scale, Chord, Pattern

# for piano samples, middle c is sample 40
MIDDLE_C_ID = 40

# database configuration and connection setup
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/database"
engine = create_engine(url=SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# any function that uses the database should be decorated with this to manage session


def session_decorator(func):
    def wrapper(*args, **kwargs):
        session = SessionLocal()
        res = func(session, *args, **kwargs)
        session.close()
        return res
    return wrapper


# separates a note string into name, accidental, and octave
def parse_note_string(note: str):
    name = note[0]
    accidental = note[1:-1] if note[1:-1] else 'n'
    octave = int(note[-1])
    return name, accidental, octave

# middle_c defines the sample id number of middle_c in the implied sample set


def compute_note(name: str, accidental: str, octave: int, middle_c: int):
    octave_offset = (octave - MIDDLE_C_OCTAVE) * NOTES_PER_OCTAVE
    name_offset = note_names[name].value
    accidental_offset = note_accidentals[accidental].value
    return middle_c + octave_offset + name_offset + accidental_offset

# computes the number of half steps between two scale degrees given a scale and a direction


def compute_interval(scale: str, degree1: int, degree2: int, asc: bool):
    interval = 0
    if asc:
        if degree2 < degree1:
            degree2 += len(scale) // 2  # wrap around
        for i in range(degree1-1, degree2-1):
            i = i % (len(scale) // 2)
            interval += intervals[scale[2*i:2*i+2]].value
    else:
        if degree2 > degree1:
            degree1 += len(scale) // 2  # wrap around
        for i in range(degree1-1, degree2-1, -1):
            i = i % (len(scale) // 2)
            interval -= intervals[scale[2*i:2*i+2]].value
    return interval

# TODO: add support for chords - do we want multiple sequences in parallel?
# TODO: add support for chromaticism/ non-scale based patterns
# generates a sequence of notes based on a scale to be return to the frontend and played


@session_decorator
def generate_sequence(session: Session, scale: str, pattern: str, start_tonic: str, end_tonic: str):
    res = []
    # parse the input according to the database mappings
    pattern_degrees = session.query(Pattern).filter(
        Pattern.name == pattern).first().degrees
    scale_intervals = session.query(Scale).filter(
        Scale.name == scale).first().intervals
    # convert the pattern degrees to an array
    pattern_degrees = [pattern_degrees[i:i+2]
                       for i in range(0, len(pattern_degrees), 2)]

    # parse the starting and ending tonics and compute their note ids
    start_tonic = compute_note(*parse_note_string(start_tonic), MIDDLE_C_ID)
    end_tonic = compute_note(*parse_note_string(end_tonic), MIDDLE_C_ID)

    # determine whether the exercise will ascend or descend through key centers
    step = 1 if start_tonic < end_tonic else -1
    # for each tonic compute the notes of each sequence
    for tonic in range(start_tonic, end_tonic + step, step):
        res.append(tonic)
        prev_degree = 1
        for degree in pattern_degrees:
            res.append(res[-1] + compute_interval(scale_intervals, prev_degree,
                                                  int(degree[1]), degree[0] == 'u'))
            prev_degree = int(degree[1])  # don't need to know the direction

    return res
