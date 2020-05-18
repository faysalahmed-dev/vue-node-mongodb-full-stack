<template>
    <section class="section">
        <b-field
            label="Meetup Title"
            :type="{ 'is-danger': hasError('title').status }"
            :message="hasError('title').message"
        >
            <b-input
                name="title"
                placeholder="Meetup Title"
                size="is-medium"
                @blur="validator_handleBlur"
                @input.native="validator_handleChange"
            ></b-input>
        </b-field>

        <b-field label="Select a date">
            <b-datepicker
                placeholder="Click to select..."
                v-model="startDate"
                icon-pack="fas"
                :min-date="minDate"
                :max-date="maxDate"
                :date-formatter="formatTime"
            ></b-datepicker>
        </b-field>
        <b-field label="Time Form">
            <b-clockpicker
                v-model="timeFrom"
                icon-pack="fas"
                hour-format="12"
                :min-time="mintimeFrom"
            ></b-clockpicker>
        </b-field>
        <b-field label="Time To">
            <b-clockpicker
                v-model="timeTo"
                icon-pack="fas"
                hour-format="12"
                :min-time="minTimeTo"
            ></b-clockpicker>
        </b-field>
        <b-field label="Choose Category">
            <b-select name="category" placeholder="Select Category" @input="handleSelect">
                <option
                    v-for="categoryList in categories"
                    :key="categoryList.id"
                    :value="categoryList.id"
                >
                    {{ categoryList.name }}
                </option>
            </b-select>
        </b-field>

        <div class="d-flex justify-content-end py-4 px-4">
            <b-button
                type="is-danger"
                icon-pack="fas"
                icon-left="backward"
                @click.prevent="$emit('prev')"
                class="mr-3"
            >
                Previous
            </b-button>
            <b-button
                type="is-success"
                icon-pack="fas"
                icon-right="forward"
                @click.prevent="validator_onSubmit(gotoNext)"
                :disabled="buttonDisable"
            >
                Next
            </b-button>
        </div>
    </section>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
import moment from 'moment';
import validator_mixin from '@/mixins/validator.mixin';

export default {
    name: 'MeetupDetails',
    mixins: [validator_mixin],
    data() {
        return {
            formData: {
                title: null
            },
            category: null,
            startDate: new Date(),
            timeFrom: new Date(),
            timeTo: moment(this.timeFrom)
                .add(10, 'minutes')
                .toDate()
        };
    },
    watch: {
        timeFrom() {
            this.timeTo = this.minTimeTo;
        }
    },
    methods: {
        handleSelect(selectedItem) {
            this.category = this.$store.getters.categories.find(item => item.id === selectedItem);
        },
        gotoNext() {
            this.$emit('handleSubmit', {
                ...this.formData,
                category: this.category,
                startDate: this.startDate,
                timeTo: moment(this.timeTo).format('LT'),
                timeFrom: moment(this.timeFrom).format('LT')
            });
        }
    },
    computed: {
        buttonDisable() {
            return this.validator_buttonIsDisabled || !this.category;
        },
        mintimeFrom() {
            if (moment(new Date()).isBefore(this.startDate, 'days')) {
                return this.startDate;
            }
            return new Date();
        },
        minTimeTo() {
            const so = moment(this.timeFrom)
                .add(10, 'minutes')
                .toDate();
            return so;
        },
        hasError() {
            return field => this.validator[field].error;
        },
        maxDate() {
            return moment()
                .add(6, 'months')
                .toDate();
        },
        minDate() {
            return moment()
                .subtract(1, 'day')
                .toDate();
        },
        formatTime() {
            return date => moment(date).format('LL');
        },
        ...mapGetters(['categories'])
    }
};
</script>
