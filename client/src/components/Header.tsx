import TopHeader from "./TopHeader";

const Header = () => {
	return (
		<div className="w-full bg-white fixed z-10">
			<TopHeader />
			<p className="font-semibold text-3xl text-black py-5 sm:py-4">
				axiamatic
			</p>
		</div>
	);
};

export default Header;
