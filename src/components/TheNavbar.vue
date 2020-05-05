<template>
    <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" :to="{ name: 'homePage' }">
                <h1 class="brand-title title is-4">
                    VueMeetuper
                </h1>
            </router-link>
            <a
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
            >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu is-active">
            <div class="navbar-start">
                <router-link :to="{ name: 'findMeetups' }">
                    Find
                </router-link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            About
                        </a>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider" />
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <template v-if="user">
                    <div class="mr-2">Welcome {{ user.username }}</div>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Account
                        </a>
                        <div class="navbar-dropdown">
                            <a href="#" class="navbar-item">
                                Profile
                            </a>
                            <hr class="navbar-divider" />
                            <a class="navbar-item" @click="logoutUser">
                                Logout
                            </a>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <router-link :to="{ name: 'signup' }" class="button is-primary mr-2">
                        <strong>Sign up</strong>
                    </router-link>
                    <router-link :to="{ name: 'login' }" class="button is-light">
                        Log in
                    </router-link>
                </template>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: mapGetters('auth', ['user']),
    methods: {
        logoutUser() {
            this.$store.dispatch('auth/logoutUser');
        }
    }
};
</script>

<style scoped>
.brand-title {
    font-family: var(--bold-font-family);
    font-weight: 400;
}
</style>
