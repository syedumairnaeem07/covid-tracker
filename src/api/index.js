import axios from "axios";

const url = "https://disease.sh/v3/covid-19";

export const fetchData = async (country) => {
	let dynamicUrl = `${url}/all`;
	if (country) dynamicUrl = `${url}/countries/${country}`;

	try {
		const {
			data: { cases, recovered, deaths, updated },
		} = await axios.get(dynamicUrl);

		return { confirmed: cases, recovered, deaths, lastUpdate: updated };
	} catch (error) {
		return error;
	}
};

export const fetchDailyData = async () => {
	try {
		const {
			data: { cases, recovered, deaths },
		} = await axios.get(`${url}/historical/all?lastdays=120`);

		return {
			confirmed: Object.values(cases),
			recovered: Object.values(recovered),
			deaths: Object.values(deaths),
			date: Object.keys(cases),
		};
	} catch (error) {
		return error;
	}
};

export const fetchCountries = async () => {
	try {
		const { data } = await axios.get(`${url}/countries`);
		return data.map(({ country }) => country);
	} catch (error) {
		return error;
	}
};
