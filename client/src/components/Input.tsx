import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LegacyRef, forwardRef } from "react";

type InputProps = {
	search: string;
	handleSearch: (searchText: string) => void;
	clearSearchInputDropdown: () => void;
};

const Input = forwardRef(function (
	{ search, handleSearch, clearSearchInputDropdown }: InputProps,
	ref: LegacyRef<HTMLInputElement> | undefined
) {
	return (
		<div className="relative">
			<div className="absolute top-[2.8rem] left-2 mr-10 w-6  text-gray-400">
				<MagnifyingGlassIcon />
			</div>
			<input
				ref={ref}
				className={`w-full h-[3rem] pl-10  font-normal text-lg text-black my-8 border rounded-md border-blue-500
      `}
				type="text"
				id="search"
				name="search"
				value={search}
				onChange={(e) => handleSearch(e.target.value)}
				placeholder="Search for any software..."
			/>
			{search.length >= 1 && (
				<div
					className="absolute top-12 right-4 w-5 text-grey"
					onClick={clearSearchInputDropdown}>
					<XMarkIcon />
				</div>
			)}
		</div>
	);
});

export default Input;
