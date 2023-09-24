from sqlalchemy import create_engine, inspect
from sqlalchemy import Column, Integer, String, ForeignKey, ForeignKeyConstraint
from sqlalchemy.orm import DeclarativeBase, sessionmaker, relationship, mapped_column

# Database Configuration
#--------------------------------------------------------------
db = 'database'
url = 'localhost:3306'
user = 'root'
password = 'root'

host = f'mysql+mysqlconnector://{user}:{password}@{url}/{db}'

db_url = host
engine = create_engine(db_url)
# Base = declarative_base()

# ORM Models
# --------------------------------------------------------------
class Base(DeclarativeBase):
    pass

class Note(Base):
    __tablename__ = 'notes'
    id = mapped_column(Integer, primary_key=True)
    name_flat = mapped_column(String(2)) # Ab, Bb, etc.
    name_sharp = mapped_column(String(2)) # G#, A#, etc. (enharmonics)
    octave = mapped_column(Integer) # 0-10

class Scale(Base):
    __tablename__ = 'scales'
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String(25))
    abbr = mapped_column(String(10))
    intervals = mapped_column(String(12)) # wwhwwwh, etc.
    

class Chord(Base):
    __tablename__ = 'chords'
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String(25))
    abbr = mapped_column(String(10))
    intervals = mapped_column(String(12)) # M3m3, etc. root implied

class Pattern(Base):
    __tablename__ = 'patterns'
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String(25))
    abbr = mapped_column(String(10))
    degrees = mapped_column(String(20)) # u3u5u1d5d3, etc.



Base.metadata.create_all(engine)

# Database Session
#--------------------------------------------------------------

Session = sessionmaker(bind=engine)
session = Session()

# notes to sample mapping
session.add_all([
    Note(name_flat='Ab', name_sharp='Ab', octave=0), # 0
    Note(name_flat='A', name_sharp='A', octave=0), # 1
    Note(name_flat='Bb', name_sharp='A#', octave=0), # 2
    Note(name_flat='B', name_sharp='B', octave=0), # 3
    Note(name_flat='C', name_sharp='C', octave=1), # 4
    Note(name_flat='Db', name_sharp='C#', octave=1), # 5
    Note(name_flat='D', name_sharp='D', octave=1), # 6
    Note(name_flat='Eb', name_sharp='D#', octave=1), # 7
    Note(name_flat='E', name_sharp='E', octave=1), # 8
    Note(name_flat='F', name_sharp='F', octave=1), # 9
    Note(name_flat='Gb', name_sharp='F#', octave=1), # 10
    Note(name_flat='G', name_sharp='G', octave=1), # 11
    Note(name_flat='Ab', name_sharp='G#', octave=1), # 12
    Note(name_flat='A', name_sharp='A', octave=1), # 13
    Note(name_flat='Bb', name_sharp='A#', octave=1), # 14
    Note(name_flat='B', name_sharp='B', octave=1), # 15
    Note(name_flat='C', name_sharp='C', octave=2), # 16
    Note(name_flat='Db', name_sharp='C#', octave=2), # 17
    Note(name_flat='D', name_sharp='D', octave=2), # 18
    Note(name_flat='Eb', name_sharp='D#', octave=2), # 19
    Note(name_flat='E', name_sharp='E', octave=2), # 20
    Note(name_flat='F', name_sharp='F', octave=2), # 21
    Note(name_flat='Gb', name_sharp='F#', octave=2), # 22
    Note(name_flat='G', name_sharp='G', octave=2), # 23
    Note(name_flat='Ab', name_sharp='G#', octave=2), # 24
    Note(name_flat='A', name_sharp='A', octave=2), # 25
    Note(name_flat='Bb', name_sharp='A#', octave=2), # 26
    Note(name_flat='B', name_sharp='B', octave=2), # 27
    Note(name_flat='C', name_sharp='C', octave=3), # 28
    Note(name_flat='Db', name_sharp='C#', octave=3), # 29
    Note(name_flat='D', name_sharp='D', octave=3), # 30
    Note(name_flat='Eb', name_sharp='D#', octave=3), # 31
    Note(name_flat='E', name_sharp='E', octave=3), # 32
    Note(name_flat='F', name_sharp='F', octave=3), # 33
    Note(name_flat='Gb', name_sharp='F#', octave=3), # 34
    Note(name_flat='G', name_sharp='G', octave=3), # 35
    Note(name_flat='Ab', name_sharp='G#', octave=3), # 36
    Note(name_flat='A', name_sharp='A', octave=3), # 37
    Note(name_flat='Bb', name_sharp='A#', octave=3), # 38
    Note(name_flat='B', name_sharp='B', octave=3), # 39
    Note(name_flat='C', name_sharp='C', octave=4), # 40
    Note(name_flat='Db', name_sharp='C#', octave=4), # 41
    Note(name_flat='D', name_sharp='D', octave=4), # 42
    Note(name_flat='Eb', name_sharp='D#', octave=4), # 43
    Note(name_flat='E', name_sharp='E', octave=4), # 44
    Note(name_flat='F', name_sharp='F', octave=4), # 45
    Note(name_flat='Gb', name_sharp='F#', octave=4), # 46
    Note(name_flat='G', name_sharp='G', octave=4), # 47
    Note(name_flat='Ab', name_sharp='G#', octave=4), # 48
    Note(name_flat='A', name_sharp='A', octave=4), # 49
    Note(name_flat='Bb', name_sharp='A#', octave=4), # 50
    Note(name_flat='B', name_sharp='B', octave=4), # 51
    Note(name_flat='C', name_sharp='C', octave=5), # 52
    Note(name_flat='Db', name_sharp='C#', octave=5), # 53
    Note(name_flat='D', name_sharp='D', octave=5), # 54
    Note(name_flat='Eb', name_sharp='D#', octave=5), # 55
    Note(name_flat='E', name_sharp='E', octave=5), # 56
    Note(name_flat='F', name_sharp='F', octave=5), # 57
    Note(name_flat='Gb', name_sharp='F#', octave=5), # 58
    Note(name_flat='G', name_sharp='G', octave=5), # 59
    Note(name_flat='Ab', name_sharp='G#', octave=5), # 60
    Note(name_flat='A', name_sharp='A', octave=5), # 61
    Note(name_flat='Bb', name_sharp='A#', octave=5), # 62
    Note(name_flat='B', name_sharp='B', octave=5), # 63
    Note(name_flat='C', name_sharp='C', octave=6), # 64
])

    
session.add_all([
    Scale(name='Major', abbr='Maj', intervals='wwhwwwh'),
    Scale(name='Natural Minor', abbr='min', intervals='whwwhww'),
    Pattern(name='Arpeggio Up', abbr='ArpU', degrees='u3u5u1'),
    Pattern(name='Arpeggio Down', abbr='ArpD', degrees='d5d3d1')
])


session.commit()

# inspector = inspect(engine)
# print(inspector.get_table_names())
# print(inspector.get_foreign_keys('patterns'))


session.close()