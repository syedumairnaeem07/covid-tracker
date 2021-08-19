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
			data: { timeline },
		} = await axios.get(`${url}/historical/pakistan`);

		return {
			confirmed: Object.values(timeline.cases),
			recovered: Object.values(timeline.recovered),
			deaths: Object.values(timeline.deaths),
			date: Object.keys(timeline.cases),
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
