from fastapi import APIRouter

from app.models.request_models import ChatRequest
from app.services.bob_service import ask_bob
from app.services.repo_parser import extract_repo_context

router = APIRouter()

@router.post("/chat")
def chat_with_repo(data: ChatRequest):

    # Extract repository context
    repo_context = extract_repo_context(data.repo_path)

    # Get answer from Bob
    answer = ask_bob(
        question = data.question,
        repo_context = repo_context
        )

    return {
        "success": True,
        "answer": answer
    }