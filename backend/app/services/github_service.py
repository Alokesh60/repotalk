from git import Repo
import os

CLONE_DIR = "cloned_repos"


def clone_repository(repo_url: str):

    repo_name = repo_url.split("/")[-1].replace(".git", "")

    repo_path = os.path.join(CLONE_DIR, repo_name)

    if os.path.exists(repo_path):
        return repo_path

    Repo.clone_from(repo_url, repo_path)

    return repo_path