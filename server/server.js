const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config({ debug: true });

const app = express();
const port = 8080;
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
	process.env;

const Client = new Pool({
	host: POSTGRES_HOST,
	database: POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	port: 5432,
});

let isTableCreated = false;

async function createTable() {
	try {
		await Client.connect();
		const query = `
         CREATE TABLE IF NOT EXISTS onboarding_product (
            id SERIAL PRIMARY KEY,
            "products" JSON
         );
      `;
		await Client.query(query);
		isTableCreated = true;
		console.log("Table created successfully");
	} catch (err) {
		console.error("Error creating table:", err);
	}
}

app.get("/getProducts", async (req, res) => {
	try {
		if (!isTableCreated) createTable();
		const result = await Client.query("SELECT * FROM onboarding_product");
		res.json({ products: result.rows[0].products });
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

app.post("/setProducts", async (req, res) => {
	try {
		const { products, id } = req.body;
		if (!products) {
			return res.status(400).send("Info is required");
		}
		if (!isTableCreated) await createTable();
		await Client.query(
			"INSERT INTO onboarding_product (id, products) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET products = EXCLUDED.products",
			[id, products]
		);
		res.status(201).send({ isSuccess: true, message: "Data added" });
	} catch (err) {
		console.error(err);
		res.status(500).send({
			isError: true,
			isSuccess: false,
			error: err,
			errorMessage: err.message,
			message: "Internal Server Error",
		});
	}
});

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
