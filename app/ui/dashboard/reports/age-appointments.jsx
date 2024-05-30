'use client';

import React from "react";
import { Chart } from "react-google-charts";

const options = {
    title: 'Appointments by Age\nLast 3 Years',
    hAxis: { title: "Age" },
    vAxis: { title: "Appointments" },
    legend: { position: "none" },
    backgroundColor: 'transparent',
    chartArea: {backgroundColor: 'transparent'},
    dataOpacity: 0.25,
};

export function AppointmentByAgeReport({ data }) {

    let types = [['Age', 'Appointments']];
    data = data.map(x => [x.age, x.total]);
    data = types.concat(data);

    return (
        <Chart
            chartType="ScatterChart"
            width="80%"
            height="600px"
            data={data}
            options={options}
        />
    );
}
