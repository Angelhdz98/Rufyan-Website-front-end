const TOKEN_KEY = 'rufyanWebSiteAccessToken';


export const getTokenKey=()=>{
    return TOKEN_KEY;
};

export const setAccessToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const getAccessToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};


export const clearAccessToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};