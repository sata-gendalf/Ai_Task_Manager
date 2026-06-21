from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Task Analyzer")

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    priority: str
    category: str

def analyze_priority(text: str) -> str:
    text_lower = text.lower()

    high_priority_words = [
        "срочно", "важно", "дедлайн", "до завтра", "до пятницы", "клиент", 
        "экзамен", "зачет", "презентация", "urgent", "asap"
    ]

    low_priority_words = [
        "когда-нибудь", "потом", "не срочно", "свободное время", "low"
    ]

    for word in high_priority_words:
        if word in text_lower:
            return "high"

    for word in low_priority_words:
        if word in text_lower:
            return "low"

    return "medium"


def analyze_category(text: str) -> str:
    text_lower = text.lower()

    if any(word in text_lower for word in ["клиент", "презентация", "отчет", "проект", "встреча", "договор", "заказ", "работ", "офис", "началь", "business"]):
        return "work"
    if any(word in text_lower for word in ["учеба", "практика", "экзамен", "зачет", "курсовая", "лабораторная", "домашка", "студ", "универ", "школ"]):
        return "study"
    if any(word in text_lower for word in ["купить", "дом", "уборка", "магазин", "продукт", "семь", "ребёнок", "личн"]):
        return "personal"
    if any(word in text_lower for word in ["спорт", "врач", "здоров", "тренир", "фитнес"]):
        return "health"
    return "general"


@app.get("/")
def root():
    return {"message": "Python task analyzer is running"}

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_task(request: AnalyzeRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail="Task text is required"
        )

    priority = analyze_priority(request.text)
    category = analyze_category(request.text)

    return {
        "priority": priority,
        "category": category
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)