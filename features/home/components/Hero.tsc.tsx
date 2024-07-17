const Header = () => {
	return (
		<section className="relative bg-blue-500">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 ">
				{/* Hero content */}
				<div className="pb-12 pt-32 md:pb-20 md:pt-40">
					{/* Section header */}
					<div className="pb-12 justify-start md:pb-16 text-white">
						<h1
							className="mb-6 text-5xl font-bold"
							data-aos="zoom-y-out"
							data-aos-delay={150}
						>
							Fivemサーバーリスト
						</h1>
						<div className="mx-auto max-w-3xl">
							<p
								className="mb-8 text-lg text-gray-700"
								data-aos="zoom-y-out"
								data-aos-delay={300}
							>
								Simple is a modern website builder powered by AI that changes
								how companies create user interfaces together.
							</p>
							<div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
								<div
									className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
									data-aos="zoom-y-out"
									data-aos-delay={450}
								>
									<a
										className="btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
										href="#0"
									>
										<span className="relative inline-flex items-center">
											Start Free Trial{" "}
											<span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
												-&gt;
											</span>
										</span>
									</a>
									<a
										className="btn w-full bg-white text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto"
										href="#0"
									>
										Learn More
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Header;
