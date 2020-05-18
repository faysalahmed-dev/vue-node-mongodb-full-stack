<template>
    <ErrorHandler
        error-title="Ooooops, page you are trying to access doesn't exist'"
        navigate-to="homePage"
        navigate-text="Navigate back to home"
        :status="404"
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
