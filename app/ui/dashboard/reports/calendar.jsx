'use client';

import React from "react";
import { Chart } from "react-google-charts";

const options = {
    title: "Appointments by Day",
};

export function CalendarReport({ data }) {
    let types = [[
        {
            type: "date",
            id: "Date",
        },
        {
            type: "number",
            id: "Count",
        }
    ]];
    data = data.map(x => [new Date(x.date), x.total]);
    data = types.concat(data);
    console.log(data);
    return (
        <Chart
            chartType="Calendar"
            width="100%"
            height="100%"
            data={data}
            options={options}
        />
    );
}
