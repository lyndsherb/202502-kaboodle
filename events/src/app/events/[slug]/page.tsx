import { formatDate } from '@/utils/formatDate';
import { getSingleEvent } from '../../../utils/getData';

export default async function Event({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const event = await getSingleEvent(slug);

  if (event.status !== 200) {
    return (
      <>
        <h1 className="text-2xl">Whoops!</h1>
        <p> It appears that this event doesn&apos;t exist! Sorry!</p>
      </>
    );
  }
  return (
    <>
      <h1 className="text-2xl">{event.name}</h1>
      <p>{formatDate(event.date)}</p>
      <p>{event.description}</p>
      <h2 className="text-xl">Tickets</h2>
      <ul className="space-y-8">
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
    </>
  );
}
