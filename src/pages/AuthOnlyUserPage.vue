<template>
    <ErrorHandler
        :error-title="'Ooooops, can\'t access this page!! Authentication Required'"
        :navigate-to="'login'"
        :navigate-text="'Login Now'"
        :status="401"
    />
</template>

<script>
import ErrorHandler from '@/components/ErrorHandler';
export default {
    name: 'NotFoundPage',
    components: {
        ErrorHandler
    }
};
</script>

<style lang="scss" scoped></style>
