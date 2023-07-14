import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (<>
                <h1>ListClient</h1>
            </>)
});

export const head: DocumentHead = {
    title: "Client-List",
    meta: [
      {
        name: "description",
        content: "First qwik application",
      },
    ],
  };