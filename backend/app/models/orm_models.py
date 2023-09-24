from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, relationship, mapped_column

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

