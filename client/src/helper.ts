export const storeUser = (data: any) => {
    localStorage.setItem(
        'user',
        JSON.stringify({
            username: data.user.username,
            email: data.user.email,
            jwt: data.jwt,
            point: data.user.point,
        })
    );
};

export const getUserData = () => {
    const stringfiedUser = localStorage.getItem('user') || '';
    if (stringfiedUser) {
        return JSON.parse(stringfiedUser);
    }
    return null; 
};

export const getUsername = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      return user.username; 
    }
    return null;
};

export const updateLocalUserPoint = (newPoint: number) => {
    const userData = getUserData();
    if (userData) {
        const updatedUserData = {
            ...userData,
            point: newPoint
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
    }
};