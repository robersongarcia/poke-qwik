import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './auth.css?inline';

// https://freefrontend.com/tailwind-forms/
export default component$(() => {

    useStylesScoped$(styles);

    return (
        <div class="login-main mt-16">
            <div class="login-bg">
                <div
                    class="login-bg-gradient">
                </div>
                <div class="login-white-bg">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="login-title">Login Form</h1>
                        </div>
                        <div class="login-content">
                            <Slot />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});