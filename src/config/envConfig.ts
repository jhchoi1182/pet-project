export const googleRedirectURI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const kakaoRedirectURI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
export const kakaoRestApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const githubRedirectURI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;
export const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
export const isDevelopmentEnv = process.env.NODE_ENV === "development";
// export const studySyncServerURL = "http://localhost:8080/api";
export const studySyncServerURL = isDevelopmentEnv ? "http://localhost:8080/api" : process.env.NEXT_PUBLIC_SERVER_URL;
