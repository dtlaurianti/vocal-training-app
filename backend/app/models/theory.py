# Provides enums for converting music theory notation to numerical values of half steps

from enum import Enum

MIDDLE_C_OCTAVE = 4
NOTES_PER_OCTAVE = 12

class note_names(Enum):
    C = 0
    D = 2
    E = 4
    F = 5
    G = 7
    A = 9
    B = 11

class note_accidentals(Enum):
    bb = -2
    b = -1
    n = 0
    s = 1
    ss = 2

class intervals(Enum):
    p1 = 0

    d2 = 0
    m2 = 1
    M2 = 2
    a2 = 3

    d3 = 2
    m3 = 3
    M3 = 4
    a3 = 5

    d4 = 4
    P4 = 5
    a4 = 6

    d5 = 6
    P5 = 7
    a5 = 8

    d6 = 7
    m6 = 8
    M6 = 9
    a6 = 10

    d7 = 9
    m7 = 10
    M7 = 11
    a7 = 12

    P8 = 12