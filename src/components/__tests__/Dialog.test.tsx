import React from 'react';
import Dialog from '../Dialog';
import { render } from '@testing-library/react-native'

const component = (
    <Dialog
        title={''}
        description={''}
    />
)

describe('render successfully', () => {
    it('render snapshot', () => {
        const container = render(component);
        expect(container.toJSON()).toMatchSnapshot();
    })
})