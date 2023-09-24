from sqlalchemy.orm import Session
from sqlalchemy import create_engine, or_, text, MetaData, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.inspection import inspect

from app.models.orm_models import Note, Scale, Chord, Pattern

SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/database"
engine = create_engine(url=SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
session = SessionLocal()

inspector = inspect(engine)
notes = inspector.get_columns('notes')
scales = inspector.get_columns('scales')
chords = inspector.get_columns('chords')
patterns = inspector.get_columns('patterns')


def compute_interval(scale: str, degree1: int, degree2: int, asc: bool):
    interval = 0
    if asc:
        for i in range(degree1, degree2):
            if scale(i-1) == 'w':
                interval += 2
            elif scale(i-1) == 'h':
                interval += 1
            elif scale(i-1) == 'a':
                interval += 3
            else:
                raise Exception('Invalid interval in scale')
    else:
        for i in range(degree2, degree1, -1):
            if scale(i-1) == 'w':
                interval -= 2
            elif scale(i-1) == 'h':
                interval -= 1
            elif scale(i-1) == 'a':
                interval -= 3
            else:
                raise Exception('Invalid interval in scale')
    return interval


def compute_next_note(scale, prev_note, prev_degree, next_degree):
    if next_degree[0] == 'u':
        return prev_note + compute_interval(scale, prev_degree, next_degree, True)
    elif next_degree[0] == 'd':
        return prev_note + compute_interval(scale, prev_degree, next_degree, False)
    else:
        raise Exception('Invalid degree in pattern')


def generate_sequence(scale: str, pattern: str, low: str, high: str):
    res = []
    # parse the input URL according to the database mappings
    if low[1] == 'b':
        low_id = session.execute(select(Note).where(
            Note.name_flat == low)).first()
    else:
        low_id = session.execute(select(Note).where(
            Note.name_sharp == low)).first()
    if high[1] == 'b':
        high_id = session.execute(select(Note).where(
            Note.name_flat == high)).first()
    else:
        high_id = session.execute(select(Note).where(
            Note.name_sharp == high)).first()
        
    pattern_degrees = session.execute(
        select(Pattern).where(Pattern.name == pattern)).first()
    scale_intervals = session.execute(
        select(Scale).where(Scale.name == scale)).first()
    
    # convert the pattern degrees to an array
    pattern_degrees = [pattern_degrees[i:i+2]
                       for i in range(0, len(pattern_degrees), 2)]

    for tonic in range(low_id, high_id+1):
        res.append(tonic)
        prev_degree = 1
        for degree in pattern_degrees:
            res.append(compute_next_note(
                scale_intervals, res[-1], prev_degree, degree))
            prev_degree = degree[1]

    return res
