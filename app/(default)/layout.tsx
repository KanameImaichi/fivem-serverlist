
import {useEffect} from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/layouts/header";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {


	return (
		<>
			<Header />

			<main className="grow">{children}</main>
		</>
	);
}
