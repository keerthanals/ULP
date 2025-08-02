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
voice_model = genai.GenerativeModel('gemini-2.5-pro-preview-tts')

# Pydantic models
class ScoldingRequest(BaseModel):
    scenario: str
    character: str 
    
class ScoldingResponse(BaseModel):
    malayalam_scolding: str
    audio: str
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
DAD_PROMPT = """You are an Indian dad from Kerala. Generate a short Malayalam roasting logical line based on the scenario.

Format your response as:
Malayalam: [malayalam text]
Translation: [english translation]
Drama Rating: [1-5] 🌶️

Be sarcastic, stern, and to the point. 1-2 sentences max."""

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
    character = request.character.strip().lower()

    if not scenario:
        raise HTTPException(status_code=400, detail="Scenario cannot be empty")

    if len(scenario) > 500:
        raise HTTPException(status_code=400, detail="Scenario too long (max 500 characters)")

    if character == "mom":
        system_prompt = SYSTEM_PROMPT
    elif character == "dad":
        system_prompt = DAD_PROMPT
    else:
        raise HTTPException(status_code=400, detail="Character must be either 'mom' or 'dad'")

    try:
        full_prompt = f"{system_prompt}\n\nScenario: {scenario}"
        response = model.generate_content(full_prompt)
        
        if not response.text:
            raise HTTPException(status_code=500, detail="Failed to generate response")

        # parsing logic continues here (same as before)...

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
        voice = 'Kore' if character == 'mom' else 'schedar'
        import random
        uid = random.randint(1000, 9999)
        audio = generate_and_save_audio(malayalam_line, voice_name=voice, output_wav_path=f'static/{uid}scolding.wav')
        return ScoldingResponse(
            malayalam_scolding=malayalam_line,
            audio=audio,
            english_translation=translation,
            drama_rating=drama_rating,
            spice_level=spice_level,
            scenario=scenario
        )
        
    except Exception as e:
        logger.error(f"Error generating scolding: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate scolding: {str(e)}")
import requests
import base64
import wave
import io

def generate_and_save_audio( text, output_wav_path='output.wav', voice_name='Kore'):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent"

    headers = {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [{
            "parts": [{"text": text}]
        }],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice_name
                    }
                }
            }
        },
        "model": "gemini-2.5-flash-preview-tts"
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()

    try:
        audio_base64 = response.json()['candidates'][0]['content']['parts'][0]['inlineData']['data']
    except (KeyError, IndexError):
        raise ValueError("Invalid response structure or missing audio data")

    pcm_data = base64.b64decode(audio_base64)

    # Save to WAV using wave module (assumes PCM: s16le, 24kHz, mono)
    with wave.open(output_wav_path, 'wb') as wav_file:
        wav_file.setnchannels(1)       # mono
        wav_file.setsampwidth(2)       # 16-bit PCM = 2 bytes
        wav_file.setframerate(24000)   # 24kHz sample rate
        wav_file.writeframes(pcm_data)

    print(f"Audio saved to {output_wav_path}")
    return output_wav_path

# static files serving
from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory="static"), name="static")

# generate_and_save_audio("കണക്കിൽ ഇത്രയും കുറഞ്ഞ മാർക്കോ? നിന്നെ ഞാൻ എന്ത് ചെയ്യാനാ!", voice_name='schedar')
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=80)