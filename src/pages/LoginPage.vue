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
                            <img :src="require('@/assets/128x128.png')" />
                        </figure>
                        <form class="text-left" @submit.prevent="validator_onSubmit(handleSubmit)">
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
                                    ref="emailInput"
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
                                ></b-input>
                            </b-field>
                            <b-button
                                type="is-primary"
                                :disabled="validator_buttonIsDisabled"
                                expanded
                                size="is-medium"
                                :loading="isFormSubmiting"
                                native-type="submit"
                            >
                                Login
                            </b-button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a>Sign In With Google</a> &nbsp;·&nbsp;
                        <router-link :to="{ name: 'signupPage' }">
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
import validatorMixin from '@/mixins/validator.mixin';

export default {
    name: 'Login',
    mixins: [validatorMixin],
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            isFormSubmiting: false
        };
    },
    methods: {
        ...mapActions('auth', ['loginUser']),
        async handleSubmit() {
            this.isFormSubmiting = true;
            try {
                await this.loginUser(this.formData);
                this.$buefy.toast.open({
                    duration: 3000,
                    message: 'successfully logged in',
                    position: 'is-top',
                    type: 'is-success'
                });
                if (this.$route.query.redirect) {
                    this.$router.replace(this.$route.query.redirect);
                } else {
                    this.$router.replace('/');
                }
            } catch (err) {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: err,
                    position: 'is-top-right',
                    type: 'is-danger'
                });
            } finally {
                this.isFormSubmiting = false;
            }
        }
    },
    computed: {
        hasError() {
            return field => this.validator[field].error;
        }
    },
    mounted() {
        this.$refs.emailInput.focus();
    }
};
</script>

<style scoped lang="scss">
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
