<template>
    <b-navbar spaced fixed-top shadow>
        <template slot="brand">
            <b-navbar-item tag="router-link" class="mr-3" :to="{ name: 'homePage' }">
                <h1 class="brand-title title is-4 has-text-primary">
                    VueMeetuper
                </h1>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item class="px-3" active tag="router-link" :to="{ name: 'findMeetups' }">
                Find
            </b-navbar-item>
            <b-navbar-dropdown class="px-3" label="More" collapsible>
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <template v-if="user">
                <p class="mr-2">Welcome {{ user.username }}</p>
                <b-navbar-dropdown label="Account" hoverable boxed>
                    <b-navbar-item href="#">
                        Profile
                    </b-navbar-item>
                    <b-navbar-item @click="logoutUser">
                        Logout
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Setting
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
            <b-navbar-item tag="div" v-else>
                <div class="buttons">
                    <router-link
                        v-if="$route.name !== 'signup'"
                        :to="{ name: 'signup' }"
                        class="button is-primary"
                    >
                        <strong>Sign up</strong>
                    </router-link>
                    <router-link
                        v-if="$route.name !== 'login'"
                        :to="{ name: 'login' }"
                        class="button is-light"
                        :class="[$route.name === 'signup' ? 'is-primary' : 'is-light']"
                    >
                        Log in
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
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
