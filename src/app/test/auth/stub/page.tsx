import { notFound } from 'next/navigation';

interface AuthStubProps {
  searchParams: Promise<{ [key: string]: string }>,
}

export default async function AuthStub({ searchParams }: AuthStubProps) {
  if (process.env.NODE_ENV === 'production') notFound();

  const params = await searchParams;
  return (
    <form action={params.redirect_uri} method="GET">
      <input type="hidden" name="code" value={123} />
      <input type="hidden" name="scope" value={params.scope} />
      <button>Authorize</button>
    </form>
  );
}
