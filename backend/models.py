from pydantic import BaseModel

class ScoldingRequest(BaseModel):
    scenario: str

class ScoldingResponse(BaseModel):
    malayalam_scolding: str
    english_translation: str
    drama_rating: int
    spice_level: str
    scenario: str
