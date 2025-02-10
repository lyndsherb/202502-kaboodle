import classNames from 'classnames';
import { formatDate } from '@/utils/formatDate';
import { getSingleEvent } from '@/utils/getData';

// if this was to go into production we would NOT do this - otherwise the page cannot be indexed
// and that means the site would go right down in Google results. Bad SEO is a bad time!
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return [
    {
      slug: '04de7ba9-7d86-46e6-a93a-0b977dd7f585',
    },
  ];
}

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
        <h1 className="text-2xl font-semibold uppercase mb-4">Whoops!</h1>
        <p> It appears that this event doesn&apos;t exist! Sorry!</p>
      </>
    );
  }
  return (
    <article className="space-y-4 w-full">
      <h1 className="text-2xl font-semibold uppercase mb-4 text-center">
        {event.name}
      </h1>
      <p className="text-center">{formatDate(event.date)}</p>
      <p>{event.description}</p>
      <h2 className="text-xl font-semibold mb-4">Tickets</h2>
      <table className="space-y-8 w-full">
        <tbody>
          {event.tickets.length ? (
            event.tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="pb-2">
                  <h3
                    className={classNames('font-semibold', {
                      'line-through italic': !ticket.ticket_qty,
                    })}
                  >
                    {ticket.name}
                  </h3>

                  {ticket.ticket_qty > 0 ? (
                    <p>{ticket.ticket_qty} tickets left</p>
                  ) : (
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      Sold out
                    </p>
                  )}
                </td>
                <td className="pb-2 text-right">
                  <p>
                    <span
                      className={classNames({
                        'line-through italic': !ticket.ticket_qty,
                      })}
                    >
                      £{ticket.price}
                    </span>{' '}
                    <br />
                    <small>with £{ticket.booking_fee} booking fee</small>
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>This event has no tickets.</td>
            </tr>
          )}
        </tbody>
      </table>
    </article>
  );
}
