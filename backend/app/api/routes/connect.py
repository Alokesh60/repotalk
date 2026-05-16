from fastapi import APIRouter

from app.models.request_models import RepoRequest
from app.services.github_service import clone_repository
from app.services.repo_parser import extract_repo_context


router = APIRouter()

@router.post("/connect")
def connect_repo(data: RepoRequest):

    repo_path = clone_repository(data.repo_url)

    print("CLONED PATH: ", repo_path)

    context = extract_repo_context(repo_path)

    print("CONTEXT: ", context)

    return {
        "message": "Connected to repository",
        "repo_path": repo_path,

        "total_files": len(context),
        "sample": context[:3]
    }