import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MovieListScreen from "../screens/MovieListScreen";

export type RootParamList = {
    MovieListScreen: undefined;
}

const Stack = createNativeStackNavigator<RootParamList>();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MovieListScreen"
                component={MovieListScreen}
                options={{
                    title: "Top Rated Movies",
                    headerStyle: {
                        backgroundColor: '#042444'
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontSize: 18
                    },
                    headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation;