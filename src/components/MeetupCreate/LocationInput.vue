<template>
    <div class="mt-4">
        <CountrySelect @onSelect="val => (selectedCountry = val)" />
        <template>
            <b-field
                label="Enter Meetup City"
                :type="{ 'is-danger': hasError('city').status }"
                :message="hasError('city').message"
                class="mt-3"
            >
                <b-input
                    @blur="validator_handleBlur"
                    @input.native="validator_handleChange"
                    size="is-medium"
                    name="city"
                    placeholder="Meetup City..."
                    :disabled="!selectedCountry"
                ></b-input>
            </b-field>

            <b-field
                label="Enter Meetup Address"
                :type="{ 'is-danger': hasError('address').status }"
                :message="hasError('address').message"
                class="mt-3"
            >
                <b-input
                    @blur="validator_handleBlur"
                    @input.native="validator_handleChange"
                    size="is-medium"
                    name="address"
                    placeholder="Meetup Address..."
                    :disabled="!selectedCountry"
                ></b-input>
            </b-field>

            <div class="d-flex justify-content-end py-4 px-4">
                <b-button
                    type="is-success"
                    icon-pack="fas"
                    icon-right="forward"
                    @click.prevent="validator_onSubmit(gotoNext)"
                    :disabled="validator_buttonIsDisabled"
                >
                    Next
                </b-button>
            </div>
        </template>
    </div>
</template>
<script type="text/javascript">
import CountrySelect from '@/components/CountrySelect';
import validator_mixin from '@/mixins/validator.mixin';
import _ from 'lodash';
export default {
    name: 'LocationInput',
    mixins: [validator_mixin],
    data() {
        return {
            selectedCountry: null,
            formData: {
                city: null,
                address: null
            }
        };
    },
    computed: {
        hasError() {
            return field => this.validator[field].error;
        }
    },
    methods: {
        gotoNext() {
            this.$emit('handleSubmit', {
                location: {
                    ..._.pick(this.selectedCountry, ['country', 'code', 'isoCode']),
                    ...this.formData
                }
            });
        }
    },
    components: { CountrySelect }
};
</script>
