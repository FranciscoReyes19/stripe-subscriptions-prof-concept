export const createSubscription = async (data) => {
    const response = await fetch("http://localhost:3000/create-subscription", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};
