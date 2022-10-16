import { render } from "@testing-library/react-native";
import React from "react";
import PrecentageChart from "../PrecentageChart";

describe('render snapshot with less than 50', () => {
    it('render snapshot', () => {
        const container = render(
            <PrecentageChart
                percent={30}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
            />
        );
        expect(container.toJSON()).toMatchSnapshot();
    })

    it('render snapshot with more than 50', () => {
        const container = render(
            <PrecentageChart
                percent={80}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
            />
        );
        expect(container.toJSON()).toMatchSnapshot();
    })
})