from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


app = FastAPI(title="AI Task Analyzer")


class AnalyzeRequest(BaseModel):
    text: str


class AnalyzeResponse(BaseModel):
    priority: str
    category: str


def analyze_priority(text: str) -> str:
    text_lower = text.lower()

    high_priority_words = [
        "срочно",
        "важно",
        "дедлайн",
        "до завтра",
        "до пятницы",
        "клиент",
        "экзамен",
        "зачет",
        "презентация",
    ]

    low_priority_words = [
        "когда-нибудь",
        "потом",
        "не срочно",
        "свободное время",
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

    business_words = [
        "клиент",
        "презентация",
        "отчет",
        "проект",
        "встреча",
        "договор",
        "заказ",
    ]

    study_words = [
        "учеба",
        "практика",
        "экзамен",
        "зачет",
        "курсовая",
        "лабораторная",
        "домашка",
    ]

    personal_words = [
        "купить",
        "дом",
        "уборка",
        "спорт",
        "врач",
        "магазин",
    ]

    for word in business_words:
        if word in text_lower:
            return "business"

    for word in study_words:
        if word in text_lower:
            return "study"

    for word in personal_words:
        if word in text_lower:
            return "personal"

    return "general"


@app.get("/")
def root():
    return {
        "message": "Python task analyzer is running"
    }


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