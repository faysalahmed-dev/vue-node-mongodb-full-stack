<template>
    <div class="field">
        <div class="control">
            <input
                class="input"
                :type="type"
                :name="name"
                :placeholder="placeholder"
                @input="handleChange"
                @blur="handleBlur"
            />
            <p v-if="errors.status" class="size-3 py-1 has-text-danger">
                {{ errors.message }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputGroup',
    props: {
        errors: { type: Object, required: true },
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        handleChange: {
            type: Function,
            default: null
        },
        handleBlur: {
            type: Function,
            default: null
        }
    }
};
</script>

<style lang="scss" scoped></style>
