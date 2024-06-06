'use client';

import React from "react";
import { Chart } from "react-google-charts";
import clsx from "clsx";

const options = {
    title: 'Appointments by Specializations',
    hAxis: { title: "Specialization" },
    vAxis: { title: "Appointments" },
    legend: { position: "none" },
    backgroundColor: 'transparent',
    chartArea: {backgroundColor: 'transparent'},
    dataOpacity: 0.8,
};

export function SpecializationCounts({ data, className }) {

    let types = [['Specialization', 'Appointments']];
    data = data.map(x => [x.description, x.total]);
    data = types.concat(data);

    return (
        <div className={clsx("flex flex-col justify-center items-center w-full", className)}>
            <Chart
                chartType="ColumnChart"
                width="1000px"
                height="450px"
                data={data}
                options={options}
            />
        </div>
    );
}
