'use client';
import { ArrayField, Debug, Form, Input, TextArea } from 'informed';

export default function Home() {
  const fieldClasssNames =
    'p-3 text-black placeholder:text-grey-300 border w-full';
  const labelClassNames = 'flex flex-column flex-wrap space-y-2';
  return (
    <>
      <h1 className="text-2xl font-semibold uppercase">Add a new event</h1>
      <Form className="flex flex-col justify-items-center space-y-4 w-full mt-4">
        <h2 className="text-xl font-semibold">Event details</h2>
        <Input className={fieldClasssNames} type="hidden" name="id" />
        <label htmlFor="name" className={labelClassNames}>
          <span>Event name</span>
          <Input
            className={fieldClasssNames}
            type="text"
            name="name"
            placeholder="Event name"
          />
        </label>
        <label htmlFor="date" className={labelClassNames}>
          <span>Event date</span>
          <Input
            className={fieldClasssNames}
            type="datetime-local"
            name="date"
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
                      type="hidden"
                      name="id"
                    />
                    <Input
                      className={fieldClasssNames}
                      type="text"
                      name="name"
                      placeholder="Ticket name"
                    />
                    <Input
                      className={fieldClasssNames}
                      type="text"
                      name="type"
                      placeholder="Ticket type"
                    />
                    <Input
                      className={fieldClasssNames}
                      type="number"
                      name="price"
                      placeholder="Ticket price"
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
        <Debug values modified dirty />
      </Form>
    </>
  );
}
