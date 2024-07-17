import Card from "@/features/home/components/Card";
import Hero from "@/features/home/components/Hero.tsc";
import React from "react";

export const metadata = {
	title: "Home - Simple",
	description: "Page description",
};


export default function Home() {
	const server_ids = ["rvzy77", "95aabe"];

	return (
		<>
			<Hero />
			<div className="max-w-7xl mx-auto flex">
				{server_ids.map((id,index) => (
					<Card key={id} server_id={id} order={index} />
				))}
			</div>
		</>
	);
}
