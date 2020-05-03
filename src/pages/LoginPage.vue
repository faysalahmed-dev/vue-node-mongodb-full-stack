<template>
    <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">
                        Login
                    </h3>
                    <p class="subtitle has-text-grey">
                        Please login to proceed.
                    </p>
                    <div class="box">
                        <figure class="avatar">
                            <img src="https://placehold.it/128x128" />
                        </figure>
                        <form>
                            <InputGroup
                                name="email"
                                placeholder="Your Email"
                                :handle-change="validator_handleChange"
                                :handle-blur="validator_handleBlur"
                                :errors="validator_errors['email']"
                            />
                            <InputGroup
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                :handle-change="validator_handleChange"
                                :handle-blur="validator_handleBlur"
                                :errors="validator_errors['password']"
                            />
                            <button
                                :disabled="validator_buttonIsDisabled"
                                @click.prevent="validator_onSubmit(handleLogin)"
                                class="button is-block is-info is-large is-fullwidth"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a>Sign In With Google</a> &nbsp;·&nbsp;
                        <router-link :to="{ name: 'signup' }">
                            Sign Up
                        </router-link>
                        &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
import formMixin from '@/mixins/validator.mixin';
import InputGroup from '@/components/InputGroup';

export default {
    name: 'Login',
    mixins: [formMixin],
    data() {
        return {
            formData: {
                email: null,
                password: null
            }
        };
    },
    methods: {
        ...mapActions('auth', ['loginUser']),
        handleLogin() {
            console.log('handle login');
        }
    },
    components: { InputGroup }
};
</script>

<style scoped>
.hero.is-success {
    background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
}
.box {
    margin-top: 5rem;
}
.avatar {
    margin-top: -70px;
    padding-bottom: 20px;
}
.avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
    font-weight: 300;
}
p {
    font-weight: 700;
}
p.subtitle {
    padding-top: 1rem;
}
</style>
