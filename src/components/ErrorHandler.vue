<template>
    <div class="container">
        <div class="notFoundContainer">
            <div class="mb-3">
                <h1 class="title">
                    {{ errorTitle }}
                </h1>
                <router-link :to="{ name: navigateTo }" class="button is-primary">
                    {{ navigateText }}
                </router-link>
            </div>
            <h2 class="subtitle">
                {{ status }}
                <span> :( </span>
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorHandler',
    props: {
        errorTitle: {
            type: String,
            default: 'Some Thing went wrong'
        },
        navigateTo: {
            type: String,
            default: 'homePage'
        },
        navigateText: {
            type: String,
            default: 'Navigate Back Home'
        },
        status: {
            type: Number,
            default: 404
        }
    }
};
</script>

<style scoped>
.title {
    font-size: 40px;
}
.subtitle {
    font-size: 140px;
    text-align: center;
}
.notFoundContainer {
    margin-top: 80px;
}
</style>
