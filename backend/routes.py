from fastapi import APIRouter, HTTPException
from app.models import ScoldingRequest, ScoldingResponse
from app.config import model, GEMINI_API_KEY
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are an Indian mom from Kerala. Generate a short Malayalam scolding line based on the scenario.

Format your response as:
Malayalam: [malayalam text]
Translation: [english translation]
Drama Rating: [1-5] 🌶️

Keep it authentic, emotional, and concise (1-2 sentences max)."""

@router.get("/")
async def root():
    return {"message": "Malayalam Mom Scolding Generator API"}

@router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@router.post("/generate-scolding", response_model=ScoldingResponse)
async def generate_scolding(request: ScoldingRequest):
    if not GEMINI_API_KEY or not model:
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
            raise HTTPException(status_code=500, detail="Empty response from Gemini")

        # Basic parsing
        response_text = response.text.strip()
        malayalam_line, translation, drama_rating = "", "", 3

        for line in response_text.splitlines():
            line = line.strip()
            if line.startswith("Malayalam:"):
                malayalam_line = line.replace("Malayalam:", "").strip()
            elif line.startswith("Translation:"):
                translation = line.replace("Translation:", "").strip()
            elif line.startswith("Drama Rating:"):
                try:
                    drama_rating = int(line.split(":")[1].strip().split()[0])
                except:
                    drama_rating = 3

        # Fallbacks
        if not malayalam_line:
            for line in response_text.splitlines():
                if any('\u0D00' <= ch <= '\u0D7F' for ch in line):
                    malayalam_line = line.strip()
                    break

        if not translation:
            translation = "Could not extract translation"

        return ScoldingResponse(
            malayalam_scolding=malayalam_line or "Could not extract line",
            english_translation=translation,
            drama_rating=drama_rating,
            spice_level="🌶️" * max(1, min(drama_rating, 5)),
            scenario=scenario
        )

    except Exception as e:
        logger.error(f"Error generating scolding: {str(e)}")
        raise HTTPException(status_code=500, detail="Something went wrong")
