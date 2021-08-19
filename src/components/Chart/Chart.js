import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchDataFromAPI = async () => {
			setDailyData(await fetchDailyData());
		};

		fetchDataFromAPI();
	}, []);
	let arrC = Object.entries(dailyData)[0];
	let arrR = Object.entries(dailyData)[1];
	let arrDT = Object.entries(dailyData)[2];
	let arrD = Object.entries(dailyData)[3];

	const lineChart = Object.keys(dailyData).length ? (
		<Line
			data={{
				labels: arrD && arrD[1],
				datasets: [
					{
						data: arrC && arrC[1],
						label: "Cases",
						borderColor: "rgba(241,174,97)",
						backgroundColor: "rgba(241,174,97)",
						fill: true,
					},
					{
						data: arrR && arrR[1],
						label: "Recoveries",
						borderColor: "rgba(127,235,122)",
						backgroundColor: "rgba(127,235,122)",
						fill: true,
					},
					{
						data: arrDT && arrDT[1],
						label: "Deaths",
						borderColor: "rgba(241,116,110)",
						backgroundColor: "rgba(241,116,110)",
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ["Cases", "Recoveries", "Deaths"],
				datasets: [
					{
						label: "People",
						data: [confirmed, recovered, deaths],
						backgroundColor: ["#f1ae61", "#7feb7a", "#f1746e"],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current State In ${country}` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>{country ? barChart : lineChart}</div>
	);
};

export default Chart;
