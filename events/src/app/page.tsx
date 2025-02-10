'use client';
// 'use client' as Informed uses Context which Next is unhappy about for SSR
import { useState } from 'react';
import { ArrayField, Form, FormState, Input, TextArea } from 'informed';
import { handleSubmit } from '@/utils/setData';
import { BaseError, KbdFullEventData } from '@/types';
import classNames from 'classnames';
import Link from 'next/link';

const useForm = () => {
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    message: string;
    link?: string;
  } | null>(null);

  const handleFormSubmit = async (state: FormState): Promise<void> => {
    setMessage(null);
    const submit = await handleSubmit(state.values as KbdFullEventData);

    if (submit.status === 200) {
      setMessage({
        type: 'success',
        message: 'Event created successfully!',
        // @ts-expect-error data is incorrectly typed on the output. This needs to be addressed at some point.
        link: `/events/${submit.data.id}`,
      });
    } else {
      setMessage({ type: 'error', message: (submit as BaseError).message });
    }
  };

  return { handleFormSubmit, message };
};

export default function Home() {
  const { handleFormSubmit, message } = useForm();

  const fieldClasssNames =
    'p-3 text-black placeholder:text-grey-300 border w-full rounded-3xl';
  const labelClassNames = 'flex flex-column flex-wrap space-y-2';
  return (
    <>
      <h1 className="text-2xl font-semibold uppercase">Add a new event</h1>
      {message ? (
        <div
          className={classNames('p-4 mt-4 w-full rounded-3xl', {
            'bg-green-400 dark:bg-green-600': message.type === 'success',
            'bg-red-400 dark:bg-red-600': message.type === 'error',
          })}
        >
          {message.message}{' '}
          {message.link ? (
            <Link href={message.link}>Click here to view your new event</Link>
          ) : null}
        </div>
      ) : null}
      <Form
        className="flex flex-col justify-items-center space-y-4 w-full mt-4"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-xl font-semibold">Event details</h2>
        <label htmlFor="name" className={labelClassNames}>
          <span>Event name</span>
          <Input
            className={fieldClasssNames}
            type="text"
            name="name"
            placeholder="Event name"
            required
          />
        </label>
        <label htmlFor="date" className={labelClassNames}>
          <span>Event date</span>
          <Input
            className={fieldClasssNames}
            type="datetime-local"
            name="date"
            required
          />
        </label>
        <label htmlFor="description" className={labelClassNames}>
          <span>Event description</span>
          <TextArea
            className={fieldClasssNames}
            name="description"
            placeholder="Event description"
          />
        </label>
        <h2 className="text-xl font-semibold">Tickets</h2>
        <ArrayField name="tickets">
          {({ add }) => (
            <>
              <ArrayField.Items>
                {({ remove }) => (
                  <>
                    <Input
                      className={fieldClasssNames}
                      type="text"
                      name="name"
                      placeholder="Ticket name"
                      required
                    />
                    <Input
                      className={fieldClasssNames}
                      type="text"
                      name="type"
                      placeholder="Ticket type"
                      required
                    />
                    <Input
                      className={fieldClasssNames}
                      type="number"
                      name="ticket_qty"
                      placeholder="Ticket quantity"
                    />
                    <Input
                      className={fieldClasssNames}
                      type="number"
                      name="price"
                      placeholder="Ticket price"
                      required
                    />
                    <Input
                      className={fieldClasssNames}
                      type="number"
                      name="booking_fee"
                      placeholder="Booking fee"
                    />
                    <button
                      className="ml-auto bg-rose-300 hover:bg-rose-500 px-4 py-2 rounded-2xl font-semibold dark:bg-rose-700 transition-[background-color] ease-in-out duration-300 motion-reduce:transition-none"
                      onClick={remove}
                    >
                      Remove ticket
                    </button>
                  </>
                )}
              </ArrayField.Items>
              {/**
               * Linting complains that the expected value of `onClick` doesn't recognise Informed's `add` but this is
               * the recommended use case, so disable with use of `any` and disabling the linter for that one line.
               * @see: https://teslamotors.github.io/informed/getting-started/array-field
               * */}
              <button
                className="mr-auto bg-violet-300 hover:bg-violet-500 p-4 rounded-3xl font-semibold uppercase dark:bg-violet-700 transition-[background-color] ease-in-out duration-300 motion-reduce:transition-none w-full md:w-auto"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={add as any}
              >
                + Add ticket
              </button>
            </>
          )}
        </ArrayField>
        <button
          className="bg-teal-300 hover:bg-teal-500 mx-auto py-4 px-8 rounded-3xl font-semibold uppercase dark:bg-teal-700 transition-[background-color] ease-in-out duration-300 w-full md:w-auto"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </>
  );
}
