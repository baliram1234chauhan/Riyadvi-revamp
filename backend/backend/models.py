import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base

class ContactEnquiry(Base):
    __tablename__ = "contact_enquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    company = Column(String(100))
    requirement = Column(String(100))
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class HealthCheckupLead(Base):
    __tablename__ = "health_checkup_leads"

    id = Column(Integer, primary_key=True, index=True)
    business_info = Column(Text, nullable=False)
    digital_presence = Column(Text)
    tech_stack = Column(Text)
    challenges = Column(Text, nullable=False)
    contact_email = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class LeadMagnet(Base):
    __tablename__ = "lead_magnets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    company = Column(String(100))
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)