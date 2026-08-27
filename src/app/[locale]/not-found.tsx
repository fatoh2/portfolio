import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span>404</span>
      <h1>This system path does not exist.</h1>
      <Link href="/">Return home</Link>
    </main>
  );
}
