import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {

    const id = useLocation().params.id;

  return (
    <>
        <span class="text-5xl">Pokemon: {id}</span>
    </>
  )
});