import Vue from 'vue';
import _ from 'lodash';
import { validateStatus } from '@/uitls/utils';

const validate = Symbol().toString();

export default {
    data() {
        return {
            validator_errors: {}
        };
    },
    computed: {
        validator_buttonIsDisabled() {
            return Object.values(this.validator_errors).some(
                item => item.status
            );
        }
    },
    created() {
        if (process.env.NODE_ENV === 'development' && !this.formData) {
            throw new Error('Form data is required for work validations mixin');
        }
        this.validator_errors = _.transform(
            this.formData,
            (res, val, key) => {
                res[key] = { status: true, message: '' };
            },
            {}
        );
    },
    methods: {
        [validate](name) {
            Vue.set(
                this.validator_errors,
                name,
                validateStatus(name, this.formData)
            );
        },
        validator_handleChange({ target: { name, value } }) {
            Vue.set(this.formData, name, value.trim());
            this[validate](name);
        },
        validator_handleBlur({ target: { name } }) {
            // if name is null it means => untouched so make it touch
            if (this.formData[name] === null) {
                Vue.set(this.formData, name, '');
            }
            this[validate](name);
        },
        validator_onSubmit(callBackHandler = null) {
            if (!this.validator_buttonIsDisabled && callBackHandler) {
                callBackHandler();
            }
        }
    }
};
