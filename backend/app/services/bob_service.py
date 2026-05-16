def ask_bob(question, repo_context):

    """
    Simulated IBM Bob / watsonx.ai pipeline
    """

    # Step 1: Build repository context
    context_text = ""

    for item in repo_context:

        context_text += f"\nFILE: {item['file']}\n"

        context_text += item["content"]

        context_text += "\n" + "=" * 50 + "\n"

    # Step 2: Create AI prompt
    prompt = f"""
You are an AI code assistant.

Analyze this repository carefully.

Repository Context:
{context_text}

User Question:
{question}

Give a clear and technical answer.
"""

    # Step 3: Temporary fake response
    return {
        "question": question,
        "prompt_preview": prompt[:1000],
        "message": "IBM Bob integration coming next"
    }