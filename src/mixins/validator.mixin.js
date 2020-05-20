import Vue from 'vue';
import _ from 'lodash';
import validatorOpt from '@/utils/validator';

const validate = Symbol().toString();

export default {
    data() {
        return {
            validator: {}
        };
    },
    computed: {
        validator_buttonIsDisabled() {
            return Object.values(this.validator).some(item => item.error.status || !item.touched);
        }
    },
    created() {
        if (process.env.NODE_ENV === 'development' && !this.formData) {
            throw new Error('Form data is required for work validations mixin');
        }
        this.resetValidateState();
    },
    methods: {
        [validate](name) {
            const { formData } = this;
            this.validator[name].error = validatorOpt(name, formData);
            if (!this.validator[name].touched) {
                this.validator[name].touched = true;
            }

            if (
                name === 'password' &&
                formData.confirmPassword &&
                this.validator.confirmPassword.touched
            ) {
                this.validator.confirmPassword.error = validatorOpt('confirmPassword', formData);
            }
        },
        validator_handleChange({ target: { name, value } }) {
            Vue.set(this.formData, name, value.trim());
            this[validate](name);
        },
        validator_handleBlur({ target: { name } }) {
            //if name is null it means => untouched so make it touch
            if (!this.validator[name].touched) {
                this.validator[name].touched = true;
            }
            this[validate](name);
        },
        validator_onSubmit(callBackHandler = null) {
            if (!this.validator_buttonIsDisabled && callBackHandler) {
                callBackHandler();
            }
        },
        resetValidateState() {
            this.validator = _.transform(
                this.formData,
                (result, val, key) => {
                    result[key] = {
                        error: { status: false, message: '' },
                        touched: false
                    };
                },
                {}
            );
        }
    }
};
