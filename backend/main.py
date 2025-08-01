from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Malayalam Mom Scolding Generator",
    description="Generate authentic Malayalam scolding lines",
    version="1.0.0"
)

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyANocggFHi4lsh0dKe52tnNOtMdmuuxNaU"
if not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# Pydantic models
class ScoldingRequest(BaseModel):
    scenario: str
    
class ScoldingResponse(BaseModel):
    malayalam_scolding: str
    english_translation: str
    drama_rating: int
    spice_level: str
    scenario: str

# System prompt
SYSTEM_PROMPT = """You are an Indian mom from Kerala. Generate a short Malayalam scolding line based on the scenario.

Format your response as:
Malayalam: [malayalam text]
Translation: [english translation]
Drama Rating: [1-5] 🌶️

Keep it authentic, emotional, and concise (1-2 sentences max)."""

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Malayalam Mom Scolding Generator API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/generate-scolding", response_model=ScoldingResponse)
async def generate_scolding(request: ScoldingRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    scenario = request.scenario.strip()
    if not scenario:
        raise HTTPException(status_code=400, detail="Scenario cannot be empty")
    
    if len(scenario) > 500:
        raise HTTPException(status_code=400, detail="Scenario too long (max 500 characters)")
    
    try:
        full_prompt = f"{SYSTEM_PROMPT}\n\nScenario: {scenario}"
        response = model.generate_content(full_prompt)
        
        if not response.text:
            raise HTTPException(status_code=500, detail="Failed to generate response")
        
        # Parse response
        response_text = response.text.strip()
        malayalam_line = ""
        translation = ""
        drama_rating = 3
        
        lines = response_text.split('\n')
        for line in lines:
            line = line.strip()
            if line.startswith('Malayalam:'):
                malayalam_line = line.replace('Malayalam:', '').strip()
            elif line.startswith('Translation:'):
                translation = line.replace('Translation:', '').strip()
            elif line.startswith('Drama Rating:'):
                rating_part = line.replace('Drama Rating:', '').strip()
                try:
                    drama_rating = int(rating_part.split()[0])
                    drama_rating = max(1, min(5, drama_rating))
                except:
                    drama_rating = 3
        
        # Fallback parsing
        if not malayalam_line:
            for line in lines:
                if any(ord(char) >= 0x0D00 and ord(char) <= 0x0D7F for char in line):
                    malayalam_line = line.strip()
                    break
            if not malayalam_line:
                malayalam_line = lines[0] if lines else "Error generating text"
                
        if not translation:
            translation = "Translation parsing failed"
        
        spice_level = "🌶️" * drama_rating
        
        return ScoldingResponse(
            malayalam_scolding=malayalam_line,
            english_translation=translation,
            drama_rating=drama_rating,
            spice_level=spice_level,
            scenario=scenario
        )
        
    except Exception as e:
        logger.error(f"Error generating scolding: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate scolding: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)