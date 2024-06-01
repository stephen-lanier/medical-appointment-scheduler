'use client';

import React from "react";
import { Chart } from "react-google-charts";
import clsx from "clsx";

const options = {
    title: 'Appointments by Age\nLast 3 Years',
    hAxis: { title: "Age" },
    vAxis: { title: "Appointments" },
    legend: { position: "none" },
    backgroundColor: 'transparent',
    chartArea: { backgroundColor: 'transparent' },
    dataOpacity: 0.25,
};

export function AppointmentByAgeReport({ data, className }) {

    let types = [['Age', 'Appointments']];
    data = data.map(x => [x.age, x.total]);
    data = types.concat(data);

    return (
        <div className={clsx("flex flex-col", className)}>
            <Chart
                chartType="ScatterChart"
                width="500px"
                height="500px"
                data={data}
                options={options}
            />
        </div>
    );
}
