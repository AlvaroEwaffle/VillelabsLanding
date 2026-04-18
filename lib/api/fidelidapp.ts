/**
 * Fidelidapp API client for contact form submissions.
 *
 * The Fidelidapp API's POST /auth/contact endpoint:
 * - Validates reCAPTCHA
 * - Creates the contact as a lead/client in Fidelidapp
 * - Sends a lead notification email
 * - Logs the contact in Slack #leads channel
 *
 * Required env var: NEXT_PUBLIC_FIDELIDAPP_API_URL
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  organization?: string;
  recaptchaToken: string;
}

export interface FidelidappResponse {
  message: string;
}

export interface FidelidappError {
  message: string;
  details?: string;
}

const FIDELIDAPP_API_URL =
  process.env.NEXT_PUBLIC_FIDELIDAPP_API_URL ?? 'https://api.fidelidapp.cl';

/**
 * Submit a contact form to Fidelidapp's /auth/contact endpoint.
 * Creates the lead in Fidelidapp and triggers email notifications.
 */
export async function submitContact(
  data: ContactFormData
): Promise<FidelidappResponse> {
  const url = `${FIDELIDAPP_API_URL}/auth/contact`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: FidelidappError = await response.json().catch(() => ({
      message: 'Error de conexión. Intenta nuevamente.',
    }));
    throw new Error(error.message);
  }

  return response.json();
}

/**
 * Register a client directly to a Fidelidapp account via the
 * landing page registration endpoint.
 *
 * POST /api/landing/register
 * Used when we want to add a client to a specific account
 * (e.g., Daniel Reyes' account) without the full contact flow.
 */
export async function registerClient(data: {
  name: string;
  email: string;
  phone?: string;
  accountId: string;
  tags?: string;
  birthDate?: string;
}): Promise<{ message: string }> {
  const url = `${FIDELIDAPP_API_URL}/api/landing/register`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Error de conexión. Intenta nuevamente.',
    }));
    throw new Error(error.error ?? error.message ?? 'Error al registrar');
  }

  return response.json();
}
