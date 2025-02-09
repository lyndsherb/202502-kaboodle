'use client';
import { ArrayField, Debug, Form, Input, TextArea } from 'informed';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Add a new event</h1>
        <Form className="flex flex-col justify-items-center p-8">
          <h2>Event details</h2>
          <Input type="hidden" name="id" className="mb-8" />
          <Input type="text" name="name" className="mb-8" />
          <Input type="datetime-local" name="date" className="mb-8" />
          <TextArea name="description" className="mb-8" />
          <h2 className="mb-8">Tickets</h2>
          <ArrayField name="tickets">
            {({ add }) => (
              <>
                <ArrayField.Items>
                  {() => (
                    <>
                      <Input type="hidden" name="id" className="mb-8" />
                      <Input type="text" name="name" className="mb-8" />
                      <Input type="text" name="type" className="mb-8" />
                      <Input type="number" name="price" className="mb-8" />
                      <Input
                        type="number"
                        name="booking_fee"
                        className="mb-8"
                      />
                    </>
                  )}
                </ArrayField.Items>
                {/**
                 * Linting complains that the expected value of `onClick` doesn't recognise Informed's `add` but this is
                 * the recommended use case, so disable with use of `any` and disabling the linter for that one line.
                 * @see: https://teslamotors.github.io/informed/getting-started/array-field
                 * */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <button onClick={add as any} className="mb-8">
                  + Add ticket
                </button>
              </>
            )}
          </ArrayField>
          <button type="submit" className="mb-8">
            Submit
          </button>
          <Debug values modified dirty />
        </Form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
