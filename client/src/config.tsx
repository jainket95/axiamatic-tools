import { EmptyProductBoxes, Products } from "./types";

export const products = [
	{ id: "0600b34b", name: "Slack", isSelected: false },
	{ id: "e483aa60", name: "Microsoft Teams", isSelected: false },
	{ id: "7ae74157", name: "Zoom", isSelected: false },
	{ id: "3c38b7ca", name: "Google Meet", isSelected: false },
	{ id: "d0ffdceb", name: "Jira", isSelected: false },
	{ id: "d997c4e1", name: "Trello", isSelected: false },
	{ id: "ffe2b5ef", name: "Asana", isSelected: false },
	{ id: "6e1b9282", name: "Monday.com", isSelected: false },
	{ id: "54670bfb", name: "Confluence", isSelected: false },
	{ id: "93490135", name: "Notion", isSelected: false },
	{ id: "42eca060", name: "Google Docs", isSelected: false },
	{ id: "1be07c16", name: "Microsoft OneNote", isSelected: false },
	{ id: "0334df24", name: "GitHub", isSelected: false },
	{ id: "b9bed16c", name: "GitLab", isSelected: false },
	{ id: "6a350606", name: "Bitbucket", isSelected: false },
	{ id: "8daa65e4", name: "Jenkins", isSelected: false },
	{ id: "479bf71e", name: "CircleCI", isSelected: false },
	{ id: "ca9aae1e", name: "Travis CI", isSelected: false },
	{
		id: "5e301487",
		name: "Amazon Web Services (AWS)",
		isSelected: false,
	},
	{ id: "6b26d0f2", name: "Microsoft Azure", isSelected: false },
	{
		id: "579fa16e",
		name: "Google Cloud Platform (GCP)",
		isSelected: false,
	},
	{ id: "51a1cacb", name: "MySQL", isSelected: false },
	{ id: "74ac1c32", name: "PostgreSQL", isSelected: false },
	{ id: "f513cfd5", name: "MongoDB", isSelected: false },
	{ id: "b19dc581", name: "Visual Studio Code", isSelected: false },
	{ id: "c59de3d7", name: "IntelliJ IDEA", isSelected: false },
	{ id: "cedc43f2", name: "Postman", isSelected: false },
];

export const numberOfProducts: number = 4;

export const generateRandom = (length: number): string => {
	return Math.random()
		.toString()
		.slice(2, length + 2);
};

export const emptyProductCard = (products: Products): EmptyProductBoxes => {
	return Array.from(
		{
			length: numberOfProducts - products.length,
		},
		(_, i) => i + 1
	).map(() => ({ type: "add", id: String(generateRandom(8)) }));
};
