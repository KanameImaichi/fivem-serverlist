"use client";
// ダメだった例
import { type ReactNode, createContext, useContext } from "react";

// コンテキストに入れるデータ型
export type User = {
	name: string;
	email: string;
};

// コンテキストを作成
export const LoginContext = createContext({
	name: "default",
	email: "default@example.com",
} as User);

// 値を取得するカスタムフック
export function useUser() {
	return useContext(LoginContext);
}

type Props = {
	children: ReactNode;
	user: User;
};

// コンテキストのProviderを呼び出すクライアントコンポーネントを作成する
export function Provider({ children, user }: Props) {
	return <LoginContext.Provider value={user}>{children}</LoginContext.Provider>;
}
