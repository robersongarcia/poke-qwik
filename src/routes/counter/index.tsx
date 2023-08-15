import { component$ } from '@builder.io/qwik';
import { useCounter } from "../../hooks/useCounter";

export default component$(() => {
    const {counter, increment, decrement} = useCounter(2)
  return (<div class="flex flex-col mt-5 justify-center items-center">
    <span class="text-2xl">Counter</span>
    <span class="text-7xl mb-3"> {counter.value} </span>


    <div>
        <button class="btn btn-primary mr-2" onClick$={() => increment()}>+1</button>
        <button class="btn btn-primary" onClick$={() => decrement()}>-1</button>
    </div>
  </div>)
});