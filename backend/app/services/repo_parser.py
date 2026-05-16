import os

# Files we want AI to understand
ALLOWED_EXTENSIONS = [
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".java",
    ".cpp",
    ".c",
    ".json",
    ".html",
    ".css",
    ".md"
]

# Folders we should ignore
IGNORE_FOLDERS = {
    "node_modules",
    ".git",
    "__pycache__",
    "venv",
    ".next",
    "dist",
    "build"
}


def extract_repo_context(repo_path: str):

    repo_context = []

    # Walk through every file and folder
    for root, dirs, files in os.walk(repo_path):

        # Ignore unnecessary folders
        dirs[:] = [d for d in dirs if d not in IGNORE_FOLDERS]

        for file in files:

            # Accept README files with no extension
            is_readme = file.upper() == "README"

            # Accept allowed extensions
            is_allowed = any(
                file.endswith(ext)
                for ext in ALLOWED_EXTENSIONS
            )

            if is_allowed or is_readme:

                file_path = os.path.join(root, file)

                try:
                    with open(file_path, "r", encoding="utf-8") as f:

                        content = f.read(3000)

                        repo_context.append({
                            "file": file_path,
                            "content": content
                        })

                except Exception as e:

                    print(f"Error reading {file_path}: {e}")

    return repo_context