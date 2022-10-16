import { ResponseTopRelated } from "../utils/ResponseModel"

const URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=9618b5cf6ae9661f92fff553c697bed4&language=en-US&page="

export const RestAPI = (pageNo: string): Promise<ResponseTopRelated | undefined> => {
    return new Promise((resolve, reject) => {
        fetch(URL + pageNo, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                return resolve(res);
            }).catch(error => {
                return reject(error);
            })
    })

}