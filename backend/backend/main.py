from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Create database tables if missing
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Riyadvi API Server")

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- SCHEMAS ---------------- #

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    phone: Optional[str] = ""
    company: Optional[str] = ""
    requirement: Optional[str] = ""

class HealthCheckupForm(BaseModel):
    business_info: str
    digital_presence: Optional[str] = ""
    tech_stack: Optional[str] = ""
    challenges: Optional[str] = ""
    contact_email: EmailStr

class LeadMagnetForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""


# ---------------- POST ROUTES (Lead Submissions) ---------------- #

@app.post("/contact")
async def receive_contact(data: ContactForm, db: Session = Depends(get_db)):
    try:
        new_enquiry = models.ContactEnquiry(
            name=data.name,
            email=data.email,
            message=data.message,
            phone=data.phone or "",
            company=data.company or "",
            requirement=data.requirement or ""
        )
        db.add(new_enquiry)
        db.commit()
        db.refresh(new_enquiry)
        return {"status": "success", "message": "Inquiry saved to database!"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/health-checkup")
async def receive_health_checkup(data: HealthCheckupForm, db: Session = Depends(get_db)):
    try:
        new_lead = models.HealthCheckupLead(
            business_info=data.business_info,
            digital_presence=data.digital_presence or "",
            tech_stack=data.tech_stack or "",
            challenges=data.challenges or "",
            contact_email=data.contact_email
        )
        db.add(new_lead)
        db.commit()
        db.refresh(new_lead)
        return {"status": "success", "message": "Health Checkup Lead saved!"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/lead-magnet")
async def receive_lead_magnet(data: LeadMagnetForm, db: Session = Depends(get_db)):
    try:
        new_magnet = models.LeadMagnet(
            name=data.name,
            email=data.email,
            phone=data.phone or "",
            company=data.company or ""
        )
        db.add(new_magnet)
        db.commit()
        db.refresh(new_magnet)
        return {"status": "success", "message": "Lead Magnet request saved!"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# ---------------- GET ROUTES (Admin Dashboard Data) ---------------- #

@app.get("/admin/enquiries")
async def get_all_enquiries(db: Session = Depends(get_db)):
    return db.query(models.ContactEnquiry).all()

@app.get("/admin/health-checkups")
async def get_all_health_checkups(db: Session = Depends(get_db)):
    return db.query(models.HealthCheckupLead).all()

@app.get("/admin/lead-magnets")
async def get_all_lead_magnets(db: Session = Depends(get_db)):
    return db.query(models.LeadMagnet).all()