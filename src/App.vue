<template>
    <div id="app">
        <TheNavbar />
        <div class="flex-grow-1 d-flex flex-column">
            <router-view />
        </div>
        <TheFooter />
    </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar';
import TheFooter from '@/components/TheFooter';
export default {
    name: 'App',
    components: {
        TheNavbar,
        TheFooter
    }
};
</script>

<style lang="scss">
.bold {
    font-weight: bold;
}
.cover {
    background-size: cover;
    /*background-position: center;*/
    background-repeat: no-repeat;
    background-attachment: fixed;
}
.hero {
    position: relative;
}
.hero-body {
    padding: 3rem 1.5rem;
}
.hero-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url('https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
</style>
