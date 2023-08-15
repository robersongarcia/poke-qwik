import { component$, useStore, useStylesScoped$, $, useComputed$ } from "@builder.io/qwik";

import styles from './login.css?inline';

export default component$(() => {

    const formState = useStore(
        {email:'',
        password:'',
        formPosted: false}
    )

    const emailError = useComputed$( () => {
        if (formState.email.includes('@') || !formState.formPosted) {
            return '';
        }
        return 'not-valid';
    })

    const passError = useComputed$( () => {
        if (formState.password.length >= 6 || !formState.formPosted) {
            return '';
        }
        return 'not-valid';
    })

    const isFormValid = useComputed$( () => {
        return !emailError.value && !passError.value;
    })

    const onSubmit = $(() => {
        formState.formPosted = true;
        console.log('submit', formState);
        console.log('isFormValid', isFormValid.value)
    })

    useStylesScoped$(styles);

    return (
        <form class="login-form" preventdefault:submit>
            <div class="relative">
                <input 
                    class={[emailError.value]}
                    value={ formState.email}
                    onInput$={ (ev) => formState.email = (ev.target as HTMLInputElement).value }
                    name="email"
                    type="text"
                    placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                    class={[passError.value]}
                    value={ formState.password}
                    onInput$={ (ev) => formState.password = (ev.target as HTMLInputElement).value }
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button
                    onClick$={ onSubmit}
                >Ingresar</button>
            </div>


            <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>
        </form>
    )
});