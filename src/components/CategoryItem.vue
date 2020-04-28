<template>
    <div class="column is-one-quarter" :style="{ 'min-height': '160px' }">
        <a href="#">
            <span class="is-primary is-top is-medium tooltip">
                <figure class="image is-4by3 imageFade">
                    <img
                        class="rounded-lg"
                        :src="category.image"
                        :alt="category.name"
                    />
                </figure>
                <div class="subtitle mt-2 bold text-capitalize">
                    {{ category.name }}
                </div>
            </span>
        </a>
    </div>
</template>

<script>
export default {
    name: 'CategoryItem',
    props: {
        category: {
            type: Object,
            required: true
        }
    }
};
</script>
