# translator.py
# RepoTalk — AI/ML Layer
# Member 4: Prompt Engineering & Plain English Translation
# -----------------------------------------------------------
# This file contains two things:
#   1. build_prompt()      — constructs the prompt sent to IBM Bob
#   2. simplify_answer()   — takes Bob's raw answer and simplifies it further
#
# HOW BACKEND USES THIS FILE:
#   from translator import build_prompt, simplify_answer
#
# FLOW:
#   repo_files + question
#       → build_prompt()
#       → send to IBM Bob (in backend's /chat endpoint)
#       → Bob returns raw_bob_answer
#       → simplify_answer(raw_bob_answer)
#       → return { "answer": simplified, "raw_bob_answer": raw }
# -----------------------------------------------------------


# ============================================================
# PROMPT 1 — CODEBASE OVERVIEW
# Use this when user asks: "What does this codebase do?"
# Test this in Bob IDE with facebook/react
# ============================================================
PROMPT_OVERVIEW = """
You are explaining a GitHub codebase to someone who has never written a single line of code.
They are a Product Manager, Designer, or Business Analyst.

REPOSITORY CODE:
{repo_files}

USER QUESTION: What does this codebase do and why does it exist?

Answer Rules:
- No jargon or technical terms whatsoever
- Use simple everyday analogies (e.g. "think of it like a restaurant kitchen")
- Maximum 150 words
- Write in a warm, friendly tone
- If something is unclear, say so simply
"""


# ============================================================
# PROMPT 2 — SPECIFIC USER QUESTION (MAIN PROMPT)
# Use this for ALL questions from the user
# This is the PRIMARY prompt — backend should use this one
# Test with: "Why is login slow?", "Where is payment code?"
# ============================================================
PROMPT_SPECIFIC = """
You are analyzing a GitHub repository for a non-technical person.
They are a Product Manager, Designer, or Business Analyst — not a developer.

REPOSITORY CODE:
{repo_files}

USER QUESTION: {question}

Answer Rules:
- Use only simple everyday words — no code, no jargon
- Use analogies where helpful (e.g. "think of it like a restaurant")
- Maximum 150 words
- Be direct and answer the question clearly
- If you cannot find the answer in the code, say so simply
"""


# ============================================================
# PROMPT 3 — PROBLEM DIAGNOSIS
# Use this when user asks WHY something is happening
# e.g. "Why is the login slow?", "Why does the app crash?"
# ============================================================
PROMPT_DIAGNOSIS = """
You are a friendly expert helping a non-technical person understand a software problem.

REPOSITORY CODE:
{repo_files}

USER QUESTION: {question}

Your job:
- In plain English, explain why this problem might be happening in this codebase
- Use a real-world analogy to explain (e.g. "it's like a traffic jam because...")
- Maximum 150 words
- No code snippets, no technical terms
- End with one simple suggestion the team could look into
"""


# ============================================================
# build_prompt()
# Called by backend to construct the right prompt for Bob
#
# Parameters:
#   repo_files (str) — the repo content as a string
#   question   (str) — the user's question
#   mode       (str) — "specific" (default), "overview", "diagnosis"
#
# Returns:
#   str — the full prompt to send to IBM Bob
# ============================================================
def build_prompt(repo_files: str, question: str, mode: str = "specific") -> str:
    if mode == "overview":
        return PROMPT_OVERVIEW.format(repo_files=repo_files)
    elif mode == "diagnosis":
        return PROMPT_DIAGNOSIS.format(repo_files=repo_files, question=question)
    else:
        # Default — use PROMPT_SPECIFIC for all regular questions
        return PROMPT_SPECIFIC.format(repo_files=repo_files, question=question)


# ============================================================
# simplify_answer()
# Called AFTER Bob gives its raw answer
# Use this if Bob's answer is still too technical
#
# Parameters:
#   bob_answer (str) — raw answer from IBM Bob
#
# Returns:
#   str — the simplified plain English prompt
#         (backend sends this back to Bob OR to watsonx.ai Granite)
#
# NOTE FOR BACKEND:
#   After calling this, send the returned string to Bob again:
#       simplified = call_bob(simplify_answer(raw_bob_answer))
#   OR send to watsonx.ai Granite model if available
# ============================================================
def simplify_answer(bob_answer: str) -> str:
    simplify_prompt = f"""
Take this technical explanation and rewrite it for someone who has never written code.
Use simple words only. No jargon. No code. Maximum 100 words.

Technical explanation: {bob_answer}

Plain English version:
"""
    return simplify_prompt


# ============================================================
# AUTO-DETECT MODE
# Helper function — detects which prompt mode to use
# based on keywords in the user's question
#
# Backend can call this instead of hardcoding the mode
# ============================================================
def detect_mode(question: str) -> str:
    question_lower = question.lower()

    overview_keywords = ["what does", "what is this", "what does this do",
                         "explain this", "overview", "summary", "purpose"]

    diagnosis_keywords = ["why is", "why does", "why isn't", "why can't",
                          "slow", "broken", "crash", "error", "not working",
                          "problem", "issue", "bug"]

    for keyword in overview_keywords:
        if keyword in question_lower:
            return "overview"

    for keyword in diagnosis_keywords:
        if keyword in question_lower:
            return "diagnosis"

    return "specific"


# ============================================================
# FULL PIPELINE — convenience function for backend
#
# Backend can call just this one function:
#   prompt = get_bob_prompt(repo_files, question)
#   raw_answer = call_bob(prompt)
#   final_answer = simplify_answer(raw_answer)
#   final_simplified = call_bob(final_answer)  # or watsonx.ai
# ============================================================
def get_bob_prompt(repo_files: str, question: str) -> str:
    mode = detect_mode(question)
    return build_prompt(repo_files, question, mode)


# ============================================================
# DEMO QUESTION SET — for judges
# These 3 questions are tested and will wow the judges
# Use facebook/react as the demo repo
# ============================================================
DEMO_QUESTIONS = [
    {
        "question": "What does this codebase do?",
        "mode": "overview",
        "why_it_wows": "Judges immediately see a full plain English summary of React — no code knowledge needed"
    },
    {
        "question": "Why might the rendering be slow?",
        "mode": "diagnosis",
        "why_it_wows": "Shows Bob diagnosing a real performance problem — emotional for PMs and founders"
    },
    {
        "question": "Where is the code that handles what appears on screen?",
        "mode": "specific",
        "why_it_wows": "Non-technical phrasing — shows any non-developer can find what they need instantly"
    }
]