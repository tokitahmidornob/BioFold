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

    // 4. CORS & Error Passthrough: Handle HF Specific errors cleanly.
    if (!response.ok) {
      let errorMessage = 'Hugging Face API Error';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.error || errorMessage;
      } catch (e) {
         // Fallback if parsing fails (e.g. 503 Service Unavailable, model loading)
         errorMessage = `Hugging Face API Error: Status ${response.status} ${response.statusText}`;
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
