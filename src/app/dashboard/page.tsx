import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchCurrentUser, FanvueUser } from "@/lib/fanvue";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    redirect("/");
  }

  let user: FanvueUser | null = null;
  let fetchError: string | null = null;

  try {
    user = await fetchCurrentUser(accessToken);
  } catch {
    fetchError = "Could not load profile. Your session may have expired.";
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>fanvue</div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" style={styles.logoutBtn}>
              Sign out
            </button>
          </form>
        </header>

        {fetchError ? (
          <div style={styles.error}>{fetchError}</div>
        ) : user ? (
          <div style={styles.profileCard}>
            {user.avatar_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar_url}
                alt={user.display_name}
                style={styles.avatar}
              />
            )}
            <h2 style={styles.displayName}>{user.display_name}</h2>
            <p style={styles.username}>@{user.username}</p>
            {user.email && <p style={styles.email}>{user.email}</p>}

            <details style={styles.details}>
              <summary style={styles.summary}>Raw profile data</summary>
              <pre style={styles.pre}>{JSON.stringify(user, null, 2)}</pre>
            </details>
          </div>
        ) : null}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: "1rem",
  } as React.CSSProperties,
  container: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 0",
    marginBottom: "2rem",
    borderBottom: "1px solid #2a2a2a",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#ff4d8d",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #444",
    borderRadius: "8px",
    color: "#888",
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: "0.5rem 1rem",
  },
  error: {
    background: "#2d1a1a",
    border: "1px solid #5a2a2a",
    borderRadius: "8px",
    color: "#ff6b6b",
    padding: "1rem",
  },
  profileCard: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center" as const,
  },
  avatar: {
    borderRadius: "50%",
    height: "80px",
    marginBottom: "1rem",
    width: "80px",
    objectFit: "cover" as const,
  },
  displayName: {
    fontSize: "1.4rem",
    fontWeight: 600,
    marginBottom: "0.25rem",
  },
  username: {
    color: "#ff4d8d",
    marginBottom: "0.5rem",
  },
  email: {
    color: "#888",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  details: {
    marginTop: "1.5rem",
    textAlign: "left" as const,
  },
  summary: {
    color: "#888",
    cursor: "pointer",
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
  },
  pre: {
    background: "#0f0f0f",
    borderRadius: "8px",
    color: "#aaa",
    fontSize: "0.75rem",
    overflowX: "auto" as const,
    padding: "1rem",
  },
} satisfies Record<string, React.CSSProperties>;
