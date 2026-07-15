import os
from huggingface_hub import InferenceClient

hf_token = os.getenv("HF_TOKEN")
if not hf_token:
    print("No token")
else:
    try:
        client = InferenceClient(model="meta-llama/Meta-Llama-3.1-8B-Instruct", token=hf_token)
        response = client.chat_completion(
            messages=[{"role": "system", "content": "hi"}, {"role": "user", "content": "test"}],
            max_tokens=10,
        )
        print("Success:", response)
    except Exception as e:
        print("Error:", e)
