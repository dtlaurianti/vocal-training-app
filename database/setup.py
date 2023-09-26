from sqlalchemy import create_engine, inspect
from sqlalchemy import Column, Integer, String, ForeignKey, ForeignKeyConstraint
from sqlalchemy.orm import DeclarativeBase, sessionmaker, relationship, mapped_column, declarative_base

from ..backend.app.models.orm_models import Scale, Chord, Pattern, Base

# Database Configuration
#--------------------------------------------------------------
db = 'database'
url = 'localhost:3306'
user = 'root'
password = 'root'

host = f'mysql+mysqlconnector://{user}:{password}@{url}/{db}'

db_url = host
engine = create_engine(db_url)

Base.metadata.create_all(engine)

# Database Session
#--------------------------------------------------------------

Session = sessionmaker(bind=engine)
session = Session()
    
session.add_all([
    Scale(name='Major', abbr='Maj', intervals='M2M2m2M2M2M2m2'),
    Scale(name='Natural Minor', abbr='min', intervals='M2m2M2M2m2M2M2'),
    Pattern(name='Arpeggio Up', abbr='ArpU', degrees='u3u5u1'),
    Pattern(name='Arpeggio Down', abbr='ArpD', degrees='d5d3d1')
])


session.commit()

# inspector = inspect(engine)
# print(inspector.get_table_names())
# print(inspector.get_foreign_keys('patterns'))


session.close()