'use client';

import React from "react";
import { Chart } from "react-google-charts";
import clsx from "clsx";

const dow_map = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday',
};

const options = {
    title: 'Appointments by Day of Week',
    hAxis: { title: "Day of Week" },
    vAxis: { title: "Appointments" },
    legend: { position: "none" },
    backgroundColor: 'transparent',
    chartArea: {backgroundColor: 'transparent'},
    // bars: 'vertical',
    dataOpacity: 0.8,
};

export function AppointmentsByDayOfWeek({ data, className }) {

    let types = [['Day', 'Appointments']];
    data = data.map(x => [dow_map[x.dayofweek], x.total]);
    data = types.concat(data);

    return (
        <div className={clsx("flex flex-col", className)}>
            <Chart
                chartType="ColumnChart"
                width="500px"
                height="500px"
                data={data}
                options={options}
            />
        </div>
    );
}
