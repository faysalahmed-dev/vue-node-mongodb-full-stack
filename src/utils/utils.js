export const errorMesssage = (err) => {
	const { data } = err.response;
	return Promise.reject(data.message || 'some thing went wrong');
}