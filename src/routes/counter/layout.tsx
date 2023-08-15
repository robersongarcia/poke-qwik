import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {

    return (<div class="flex flex-col justify-center items-center">
        <Slot />

        <Link href="/" class='mt-10 btn btn-primary'>Go Back</Link>
    </div>);
});