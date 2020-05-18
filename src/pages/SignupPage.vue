<template>
    <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">
                        Register
                    </h3>
                    <p class="subtitle has-text-grey">
                        Please register to proceed.
                    </p>
                    <div class="box">
                        <figure class="avatar">
                            <img :src="require('@/assets/128x128.png')" />
                        </figure>

                        <form class="text-left">
                            <b-field
                                label="Name"
                                :type="{ 'is-danger': hasError('name').status }"
                                :message="hasError('name').message"
                            >
                                <b-input
                                    @input.native="validator_handleChange"
                                    @blur="validator_handleBlur"
                                    placeholder="Your Name"
                                    name="name"
                                    size="is-medium"
                                    icon-pack="fas"
                                ></b-input>
                            </b-field>

                            <b-field
                                label="User Name"
                                :type="{ 'is-danger': hasError('username').status }"
                                :message="hasError('username').message"
                            >
                                <b-input
                                    @input.native="validator_handleChange"
                                    @blur="validator_handleBlur"
                                    placeholder="Your User Name"
                                    name="username"
                                    size="is-medium"
                                    icon-pack="fas"
                                ></b-input>
                            </b-field>

                            <b-field
                                label="Email"
                                :type="{ 'is-danger': hasError('email').status }"
                                :message="hasError('email').message"
                            >
                                <b-input
                                    @input.native="validator_handleChange"
                                    @blur="validator_handleBlur"
                                    placeholder="Your Email"
                                    name="email"
                                    size="is-medium"
                                    icon-pack="fas"
                                ></b-input>
                            </b-field>

                            <b-field
                                label="Password"
                                :type="{ 'is-danger': hasError('password').status }"
                                :message="hasError('password').message"
                            >
                                <b-input
                                    @input.native="validator_handleChange"
                                    @blur="validator_handleBlur"
                                    placeholder="Your Password"
                                    type="password"
                                    name="password"
                                    password-reveal
                                    size="is-medium"
                                    icon-pack="fas"
                                ></b-input>
                            </b-field>

                            <b-field
                                label="Confirm Password"
                                :type="{ 'is-danger': hasError('confirmPassword').status }"
                                :message="hasError('confirmPassword').message"
                            >
                                <b-input
                                    @input.native="validator_handleChange"
                                    @blur="validator_handleBlur"
                                    placeholder="Re-Type password Again"
                                    type="password"
                                    name="confirmPassword"
                                    size="is-medium"
                                    password-reveal
                                    icon-pack="fas"
                                ></b-input>
                            </b-field>

                            <b-button
                                type="is-primary"
                                :disabled="validator_buttonIsDisabled"
                                expanded
                                size="is-medium"
                                @click.prevent="validator_onSubmit(handleSubmit)"
                                :loading="isFormSubmiting"
                            >
                                Sign Up
                            </b-button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <router-link :to="{ name: 'loginPage' }">
                            Login
                        </router-link>
                        &nbsp;·&nbsp; &nbsp;·&nbsp;
                        <a>Sign Up With Google</a> &nbsp;·&nbsp;
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

export default {
    name: 'Sign',
    mixins: [formMixin],
    data() {
        return {
            formData: {
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            isFormSubmiting: false
        };
    },
    methods: {
        ...mapActions('auth', ['signupUser']),
        async handleSubmit() {
            this.isFormSubmiting = true;
            try {
                await this.signupUser(this.formData);
                this.$buefy.toast.open({
                    duration: 3000,
                    message: 'successfully account created',
                    position: 'is-top',
                    type: 'is-success'
                });
                if (this.$route.query.redirect) {
                    this.$router.replace(this.$route.query.redirect);
                } else {
                    this.$router.replace('/');
                }
            } catch (err) {
                if (Array.isArray(err)) {
                    const some = err.map(el => `<div class="text-right">${el}</div>`);
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: some.join(''),
                        position: 'is-top-right',
                        type: 'is-danger'
                    });
                } else {
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: err,
                        position: 'is-top-right',
                        type: 'is-danger'
                    });
                }
            } finally {
                this.isFormSubmiting = false;
            }
        }
    },
    computed: {
        hasError() {
            return field => this.validator[field].error;
        }
    }
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
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
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
