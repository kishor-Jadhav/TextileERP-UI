export const increment = () => ({
    type: 'INCREMENT',
});

export const decrement = () => ({
    type: 'DECREMENT',
});

// Asynchronous Thunk Action Example
export const asyncIncrement = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment());
        }, 2000); // Simulating API call delay
    };
};
