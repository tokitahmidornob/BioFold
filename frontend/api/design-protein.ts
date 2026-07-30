import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  // 1. Validation & Fallback Check
  if (!process.env.HUGGINGFACE_API_KEY) {
    return res.status(500).json({ detail: 'Server Configuration Error: Inference Engine offline.' });
  }

  try {
    const { target_prompt } = req.body;

    // 2. Server-Side Execution Check: Route the API request entirely through this secure backend endpoint.
    // 3. Authentication Injection: explicit Authorization Bearer token using standard Node syntax.
    const response = await fetch('https://tokitahmidornob-biofold-engine.hf.space/api/v1/design-protein', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.HUGGINGFACE_API_KEY
      },
      body: JSON.stringify({ target_prompt })
    });

    // 4. CORS & Error Passthrough: Handle HF-specific errors cleanly.
    if (!response.ok) {
      let errorMessage = `Hugging Face API Error (${response.status})`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.error || errorMessage;
      } catch {
        // Fallback if body is not JSON (e.g. 503 plain-text)
        errorMessage = `API Error: ${response.status} ${response.statusText}`;
      }

      // Provide specific actionable messages for common failure modes
      if (response.status === 401 || response.status === 403) {
        errorMessage = `Authentication Failed (${response.status}): Verify that HUGGINGFACE_API_KEY is correctly set in Vercel Project → Settings → Environment Variables.`;
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded on the Hugging Face API. Please wait a moment before retrying.';
      } else if (response.status === 503) {
        errorMessage = 'The BioFold HF Space is loading or temporarily unavailable (cold start). Please retry in 30 seconds.';
      }

      return res.status(response.status).json({ detail: errorMessage });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error: any) {
    console.error('API Route Error:', error);
    return res.status(500).json({ detail: 'Internal Server Error: ' + (error.message || '') });
  }
}
