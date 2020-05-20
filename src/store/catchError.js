import { errorMesssage } from '@/utils/utils';

export default callback => async (context, payload) => {
    try {
        return await callback(context, payload);
    } catch (err) {
        console.log(err);
        console.log(err.response);
        return errorMesssage(err);
    }
};
