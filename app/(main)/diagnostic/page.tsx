import { redirect } from 'next/navigation';

const VILO_DIAGNOSIS_URL =
  process.env.NEXT_PUBLIC_VILO_DIAGNOSIS_URL ?? 'https://alvarovillena.cl/diagnostico';

export default function DiagnosticPage() {
  redirect(VILO_DIAGNOSIS_URL);
}
