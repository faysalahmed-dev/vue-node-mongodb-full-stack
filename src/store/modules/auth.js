export default {
    namespaced: true,
    state: { user: null },
    actions: {
        loginUser(_, data) {
            console.log(data);
        },
        signupUser(_, data) {
            console.log(data);
        }
    }
};
