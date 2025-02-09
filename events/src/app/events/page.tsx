import Link from 'next/link';
import { getEvents } from '../../utils/getData';
import { formatDate } from '@/utils/formatDate';

export default async function Events() {
  const events = await getEvents();

  return (
    <>
      <h1 className="text-2xl font-semibold uppercase mb-4">Events list</h1>
      {events.length ? (
        <div className="space-y-4">
          {events.map((ev) => (
            <article className="event space-y-2 w-full" key={ev.id}>
              <Link
                href={`/events/${ev.id}`}
                className="text-xl font-semibold shrink"
              >
                {ev.name}
              </Link>
              <span className="italic block">{formatDate(ev.date)}</span>
              <p className="w-full">{ev.description}</p>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="text-xl">No events here :(</h2>
      )}
    </>
  );
}
