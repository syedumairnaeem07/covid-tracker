import React, { Component } from "react";
import Chart from "./components/Chart/Chart";
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";

export default class App extends Component {
	render() {
		return (
			<div>
				<Cards />
				<Chart />
				<CountryPicker />
			</div>
		);
	}
}
