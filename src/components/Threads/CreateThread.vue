<template>
    <section>
        <button class="button is-primary mb-3" @click="isOpen = !isOpen">
            <b-icon pack="fas" icon="plus" size="is-small" class="mr-1"></b-icon>
            <span>
                Create Thread
            </span>
        </button>
        <b-collapse position="is-bottom" class="panel mb-3" animation="slide" :open.sync="isOpen">
            <form class="create-threads pb-3 pt-4 px-3 rounded">
                <b-field
                    label="Enter Thread Title"
                    :type="{ 'is-danger': hasError.status }"
                    :message="hasError.message"
                >
                    <b-input
                        :value="formData.title"
                        type="textarea"
                        name="title"
                        placeholder="Thread title...."
                        @blur="validator_handleBlur"
                        @input.native="validator_handleChange"
                    >
                    </b-input>
                </b-field>
                <b-button
                    type="is-success mr-3"
                    :disabled="validator_buttonIsDisabled"
                    :loading="threadSubmiting"
                    @click.prevent="validator_onSubmit(handleSave)"
                >
                    Save
                </b-button>
                <b-button type="is-danger" @click="handleCancle">
                    Cancel
                </b-button>
            </form>
        </b-collapse>
    </section>
</template>

<script>
import validator_mixin from '@/mixins/validator.mixin';
export default {
    name: 'CreateThreads',
    mixins: [validator_mixin],
    props: {
        meetupId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isOpen: false,
            threadSubmiting: false,
            formData: {
                title: null
            }
        };
    },
    computed: {
        hasError() {
            return this.validator.title.error;
        }
    },
    methods: {
        handleCancle() {
            this.formData.title = null;
            this.resetValidateState();
            this.isOpen = false;
        },
        async handleSave() {
            this.threadSubmiting = true;
            try {
                await this.$store.dispatch('threads/createThread', {
                    threadData: this.formData,
                    meetupId: this.meetupId
                });
                this.handleCancle();
                this.$buefy.toast.open({
                    duration: 3000,
                    message: 'successfully thread created',
                    position: 'is-top',
                    type: 'is-success'
                });
            } catch (err) {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: err,
                    position: 'is-top',
                    type: 'is-success'
                });
            } finally {
                this.threadSubmiting = false;
            }
        }
    }
};
</script>

<style type="text/css">
.create-threads {
    border: 1px solid #d0d0d0;
}
</style>
