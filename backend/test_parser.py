from app.services.repo_parser import extract_repo_context

context = extract_repo_context("../")

for item in context[:5]:
    print(item["file"])