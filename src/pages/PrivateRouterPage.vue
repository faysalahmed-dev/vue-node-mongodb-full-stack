<template>
    <div>
        only auth user
    </div>
</template>

<script>
import router from '@/routes';
export default {
    created() {
        this.unsubscribe = this.$store.subscribe((mututions, state) => {
            if (!state.auth.user) {
                router.go({ name: 'authUserOnly' });
            }
        });
    },
    beforeDestroy() {
        this.unsubscribe();
    }
};
</script>

<style lang="scss" scoped></style>
