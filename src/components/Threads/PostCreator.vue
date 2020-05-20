<template>
    <form class="post-create mt-4">
        <b-field
            label="Enter Post Title"
            :type="{ 'is-danger': hasError.status }"
            :message="hasError.message"
            class="flex-column"
        >
            <b-input
                v-auto-expend
                name="title"
                type="textarea"
                rows="2"
                :value="formData.title"
                placeholder="Write a post"
                @input.native="validator_handleChange"
            ></b-input>
        </b-field>
        <b-button
            type="is-primary"
            :disabled="validator_buttonIsDisabled"
            @click.prevent="validator_onSubmit(handleSave)"
            :loading="postSubmiting"
        >
            Send
        </b-button>
    </form>
</template>
<script type="text/javascript">
import validator_mixin from '@/mixins/validator.mixin';

export default {
    name: 'PostCreator',
    mixins: [validator_mixin],
    props: {
        threadId: {
            type: String,
            required: true
        }
    },
    directives: {
        autoExpend: {
            bind(el) {
                el.addEventListener('keyup', () => {
                    setTimeout(() => {
                        el.style.cssText = 'height: auto';
                        el.style.cssText = 'height:' + (el.scrollHeight + 10) + 'px';
                    }, 0);
                });
            }
        }
    },
    data() {
        return {
            formData: {
                title: null
            },
            postSubmiting: false
        };
    },
    computed: {
        hasError() {
            return this.validator.title.error;
        }
    },
    methods: {
        async handleSave() {
            this.postSubmiting = true;
            try {
                await this.$store.dispatch('threads/createThreadPost', {
                    postData: { text: this.formData.title },
                    threadId: this.threadId
                });
                this.resetValidateState();
                this.formData.title = null;
                this.$buefy.toast.open({
                    duration: 3000,
                    message: 'successfully post created',
                    position: 'is-top',
                    type: 'is-success'
                });
            } catch (err) {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: err,
                    position: 'is-top',
                    type: 'is-danger'
                });
            } finally {
                this.postSubmiting = false;
            }
        }
    }
};
</script>
