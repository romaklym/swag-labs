import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-white px-4 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/sl-404.jpg" alt="Not found" className="w-80 max-w-full" />
      <Link href="/inventory" className="btn btn-action">
        Back Home
      </Link>
    </div>
  );
}
