import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://restcountries.eu/rest/v2/",
})


export const api = {
    cache: {},

    _get(url) {
        if (this.cache[url]) return Promise.resolve(this.cache[url]);

        return instance.get(url)
            .then(res => {
                this.cache[url] = res.data;
                return res.data
            })
            .catch(error => {
                console.error(error)
                throw new Error("API error")
            })
    },
    getFullName(fullName) {
        return this._get(`name/${fullName}?fullText=true`)
    },
    sendShortName(shortName) {
        return this._get(`name/${shortName}`)
    },
    sendCurrencyCode(currencyCode) {
        return this._get(`currency/${currencyCode}`)
    },
    sendCountryCode(code){
      return this._get(`alpha/${code}`)
    },
    allCountryData(){
       return this._get(`all`)
    }
}

