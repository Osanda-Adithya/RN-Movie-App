import React, { FC, useEffect, useState } from "react";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, View, Text, StyleSheet, Image, RefreshControl } from "react-native";
import { RestAPI } from "../api/RestAPI";
import { RootParamList } from "../navigator/StackNavigation";
import { Results } from "../utils/ResponseModel";
import { ternary } from "../utils/Tools";
import PrecentageChart from "../components/PrecentageChart";

type MovieListScreenProps = NativeStackScreenProps<RootParamList, 'MovieListScreen'>;

const MovieListScreen: FC<MovieListScreenProps> = () => {

    const [topRelated, setTopRelated] = useState<Results[]>([]);
    const [data, setData] = useState<{ isLoading: boolean, pageNo: number, rederID: number }>({ isLoading: true, pageNo: 1, rederID: 0 })

    useEffect(() => {
        fetchAPIData()
    }, [data.rederID])

    function fetchAPIData() {
        RestAPI(data.pageNo.toString()).then(res => {
            if (res) {
                setTopRelated(topRelated.concat(res.results));
                setData({ ...data, isLoading: false })
            }
        });
    }

    const renderSigleRow = ({ item, index }: { item: Results, index: number }) => {
        return (
            <View style={styles.singleRowContainer}>

                <Image source={{ uri: 'https://image.tmdb.org/t/p/w500' + item?.poster_path, width: 150, height: 200 }} style={styles.image} />

                <View style={styles.chartContainer}>
                    <PrecentageChart
                        color={"#04d11c"}
                        shadowColor={"#999"}
                        bgColor={"#042444"}
                        radius={25}
                        borderWidth={5}
                        percent={item.popularity}
                    />
                </View>

                <View style={styles.container}>
                    <Text numberOfLines={2} style={styles.originalTitle}>#{index + 1} {item?.original_title}</Text>
                    <Text style={styles.title}>({item?.title})</Text>
                    <View style={styles.subContainer}>
                        <Text style={styles.fontStyle}> {item?.release_date}  ({item?.original_language})</Text>
                        <View style={styles.dot} />
                        <View style={styles.genderFontContainer}>
                            <Text style={styles.fontStyle}>{ternary(item?.adult, "R", "All")}</Text>
                        </View>
                    </View>
                    <Text style={styles.fontStyle} numberOfLines={4}>{item?.overview}</Text>
                </View>

            </View>
        )
    }

    const onHandleEndReach = () => {
        setData({ isLoading: true, pageNo: data.pageNo + 1, rederID: new Date().getUTCMilliseconds() })
    }

    const onRefreshHandle = () => {
        setTopRelated([]);
        setData({ isLoading: true, pageNo: 1, rederID: new Date().getUTCMilliseconds() })
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                testID="flatlist_testid"
                data={topRelated}
                keyExtractor={(_, index) => index?.toString()}
                renderItem={renderSigleRow}
                onEndReached={onHandleEndReach}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={data.isLoading}
                        colors={['red', 'green', 'blue']}
                        title={'Refreshing'}
                        titleColor={'black'}
                        onRefresh={onRefreshHandle}
                    />
                }
            />
        </View>
    )
}

export default MovieListScreen;

const styles = StyleSheet.create({
    singleRowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 12,
        paddingVertical: 18,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 10
    },
    container: {
        flex: 1,
        marginVertical: 10,
        marginRight: 5,
        marginLeft: 14,
        justifyContent: 'center'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    genderFontContainer: {
        width: 22,
        borderWidth: 1,
        borderColor: '#878686',
        borderRadius: 4,
        alignItems: 'center',
    },
    fontStyle: {
        fontSize: 14,
        color: '#878686'
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#878686',
        marginTop: 5,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#878686'
    },
    originalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    image: {
        borderRadius: 10
    },
    chartContainer: {
        width: 40,
        height: 30,
        borderRadius: 50,
        position: 'absolute',
        top: 192,
        left: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    precentage: {
        color: 'white',
        fontSize: 12
    }
})