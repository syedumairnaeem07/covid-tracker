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
	console.log(Object.entries(dailyData));
	let arrC = Object.entries(dailyData)[0];
	let arrR = Object.entries(dailyData)[1];
	let arrDT = Object.entries(dailyData)[2];
	let arrD = Object.entries(dailyData)[3];
	// console.log(arrD && arrD[1]);

	const lineChart = Object.keys(dailyData).length ? (
		<Line
			data={{
				labels: arrD && arrD[1],
				datasets: [
					{
						data: arrC && arrC[1],
						label: "Infected",
						borderColor: "#3333ff",
						fill: true,
					},
					{
						data: arrR && arrR[1],
						label: "Recovered",
						borderColor: "green",
						backgroundColor: "rgba(0, 255, 0, 0.5)",
						fill: true,
					},
					{
						data: arrDT && arrDT[1],
						label: "Deaths",
						borderColor: "red",
						backgroundColor: "rgba(255,0,0,0.5)",
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ["Infected", "Recovered", "Deaths"],
				datasets: [
					{
						label: "People",
						data: [confirmed, recovered, deaths],
						backgroundColor: [
							"rgba(0, 0, 255, 0.5)",
							"rgba(0, 255, 0, 0.5)",
							"rgba(255, 0, 0, 0.5)",
						],
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
