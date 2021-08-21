import React, { Component } from "react";

//*When you have index file you need to mention folder name
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";
export default class App extends Component {
	state = {
		data: {},
		country: "",
	};

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ data: fetchedData });
	}

	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);
		this.setState({ data: fetchedData, country: country });
	};

	render() {
		const { data, country } = this.state;

		return (
			<div>
				<div className={styles.header}>
					<img
						className={styles.image}
						src={coronaImage}
						alt="COVID-19"
					/>
					<div className={styles.headerText}>
						<h1>COVID-19 TRACKER</h1>
						<h3>Stay Informed, Stay Safe</h3>
					</div>
				</div>
				<div className={styles.container}>
					<CountryPicker
						handleCountryChange={this.handleCountryChange}
					/>
					<Cards data={data} />
					<Chart data={data} country={country} />
				</div>
			</div>
		);
	}
}
