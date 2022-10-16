import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import * as API from "../../api/RestAPI";
import MovieListScreen from "../MovieListScreen";

const component = (
    <MovieListScreen
        navigation={{ navigate: jest.fn() } as any}
        route={jest.fn() as any}
    />
)

const fakeResponse = {
    adult: false,
    backdrop_path: "/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg",
    genre_ids: [
        12,
        14,
        28
    ],
    id: 122,
    original_language: "en",
    original_title: "The Lord of the Rings: The Return of the King",
    overview: "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
    popularity: 132.794,
    poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    release_date: "2003-12-01",
    title: "The Lord of the Rings: The Return of the King",
    video: false,
    vote_average: 8.5,
    vote_count: 20340
};

describe('render successfully', () => {
    it('render snapshot', () => {
        const container = render(component);
        expect(container.toJSON()).toMatchSnapshot();
    })
    it('flatlist check', () => {
        const container = render(component);
        fireEvent(container.getByTestId('flatlist_testid'), 'keyExtractor');
    })
    it('flatlist onEndReached check', () => {
        const container = render(component);
        fireEvent(container.getByTestId('flatlist_testid'), 'onEndReached');
    })
    it('flatlist renderItem check', () => {
        const container = render(component);
        const element = container.getByTestId('flatlist_testid');
        element.props.renderItem(fakeResponse);
    })
    it('refresh controller onRefresh check', async () => {
        const container = render(component);
        const element = container.getByTestId('flatlist_testid');
        const { refreshControl } = element.props;
        await act(async () => {
            refreshControl.props.onRefresh();
        });
    })
    it('check RESTAPI with response', async () => {
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(fakeResponse) });
        const mockedFetch = jest.spyOn(API, 'RestAPI').mockImplementationOnce(() => mockFetch as any)
        render(component);
        expect(mockedFetch).toHaveBeenCalledTimes(1);
    })
    it('check RESTAPI without response', async () => {
        const mockFetch = Promise.resolve(undefined);
        const mockedFetch = jest.spyOn(API, 'RestAPI').mockImplementationOnce(() => mockFetch as any)
        render(component);
        expect(mockedFetch).toHaveBeenCalledTimes(3);
    })
})
