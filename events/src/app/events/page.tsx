import Link from 'next/link';
import { getEvents } from '../../utils/getData';

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl">Events page</h1>
        {events.length ? (
          <div className="space-y-8">
            {events.map((ev) => (
              <article className="event space-y-2" key={ev.id}>
                <Link href={`/events/${ev.id}`} className="text-xl">
                  {ev.name}
                </Link>
                <p>{ev.date}</p>
                <p>{ev.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <h2 className="text-xl">No events here :(</h2>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
