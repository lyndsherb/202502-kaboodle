import Link from 'next/link';
import { getEvents } from '../../utils/getData';

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Events page</h1>
        {events.length ? (
          events.map((ev) => (
            <article className="event" key={ev.id}>
              <Link href={`/events/${ev.id}`}>{ev.name}</Link>
              <p>{ev.date}</p>
              <p>{ev.description}</p>
            </article>
          ))
        ) : (
          <h2>No events here :(</h2>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
