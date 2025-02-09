import { getSingleEvent } from '../../../utils/getData';

export default async function Event({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const event = await getSingleEvent(slug);

  if (!event) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Whoops!</h1>
          <p> It appears that this event doesn&apos;t exist! Sorry!</p>
        </main>
      </div>
    );
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{event.name}</h1>
        <p>{event.date}</p>
        <p>{event.description}</p>
        <h2>Tickets</h2>
        <ul>
          {event.tickets.map((ticket) => (
            <li key={ticket.id}>
              <article>
                <p>{ticket.name}</p>
                <p>
                  <em>{ticket.type}</em>
                </p>
                <p>
                  £{ticket.price}{' '}
                  <small>with £{ticket.booking_fee} booking fee</small>
                </p>
                <p>Remaining tickets: {ticket.ticket_qty}</p>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
