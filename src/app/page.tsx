import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

const ERROR_MESSAGES: Record<string, string> = {
  missing_params: "Missing authorization parameters.",
  state_mismatch: "Security check failed. Please try again.",
  missing_code_verifier: "Session expired. Please try again.",
  token_exchange_failed: "Failed to complete sign in. Please try again.",
  server_misconfiguration: "Server error. Please contact support.",
};

export default async function HomePage({ searchParams }: PageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? (ERROR_MESSAGES[error] ?? "An error occurred.") : null;

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <div style={styles.logo}>fanvue</div>
        <h1 style={styles.heading}>Welcome</h1>
        <p style={styles.subheading}>
          Connect your Fanvue account to get started.
        </p>

        {errorMessage && (
          <div style={styles.error}>{errorMessage}</div>
        )}

        <Link href="/api/auth/login" style={styles.button}>
          Sign in with Fanvue
        </Link>
      </div>
    </main>
  );
}

const styles = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "1rem",
  } as React.CSSProperties,
  card: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center" as const,
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#ff4d8d",
    marginBottom: "1.5rem",
    letterSpacing: "-0.5px",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  subheading: {
    color: "#888",
    marginBottom: "2rem",
    lineHeight: 1.5,
  },
  error: {
    background: "#2d1a1a",
    border: "1px solid #5a2a2a",
    borderRadius: "8px",
    color: "#ff6b6b",
    padding: "0.75rem 1rem",
    marginBottom: "1.25rem",
    fontSize: "0.9rem",
  },
  button: {
    display: "block",
    background: "#ff4d8d",
    color: "#fff",
    borderRadius: "8px",
    padding: "0.85rem 1.5rem",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "background 0.2s",
  },
} satisfies Record<string, React.CSSProperties>;
