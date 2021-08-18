import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
	const [fetchedCountries, setFetchedCountries] = useState([]);

	useEffect(() => {
		const fetchCountriesDataFromAPI = async () => {
			setFetchedCountries(await fetchCountries());
		};

		fetchCountriesDataFromAPI();
	}, [setFetchedCountries]);

	return (
		<div>
			<FormControl className={styles.formControl}>
				<NativeSelect
					default=""
					onChange={(e) => handleCountryChange(e.target.value)}
				>
					<option value="">Global</option>
					{fetchedCountries.map((country, i) => (
						<option key={i} value={country}>
							{country}
						</option>
					))}
				</NativeSelect>
			</FormControl>
		</div>
	);
};

export default CountryPicker;
