import {api} from "../API/API";

const COUNTRY_FULL_NAME = "Countries/COUNTRY_FULL_NAME"
const COUNTRY_SHORT_NAME = "Countries/COUNTRY_SHORT_NAME"
const CURRENCY_NAME = "Countries/CURRENCY_NAME"
const DATA_ITEM = "Countries/DATA_ITEM"
const ALL_DATA_COUNTRY = "Countries/ALL_DATA_COUNTRY"
const COUNTRY_CODE_CHENGED = "Countries/COUNTRY_CODE_CHENGED"
const COUNTRY_CODE = "Countries/COUNTRY_CODE"
const SET_ERROR = "Countries/SET_ERROR"
const SET_LOADING = "Countries/SET_LOADING"
// const CHANGE_LOCAL = "CHANGE_LOCAL"


const initialState = {
    countryFullName: "",
    dataItems: [],
    countryShortName: "",
    currencyCode: "",
    allDataItems: [],
    countryCode: "",
    arrRepeatedRequests: [],
    error: null,
    loading: false
    // currentLocal: "en",

}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case COUNTRY_FULL_NAME: {
            return {
                ...state,
                countryFullName: action.inputValue
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case COUNTRY_SHORT_NAME: {
            return {
                ...state,
                countryShortName: action.inputValue
            }
        }
        case CURRENCY_NAME: {
            return {
                ...state,
                currencyCode: action.inputValue
            }
        }
        case DATA_ITEM: {
            return {
                ...state,
                dataItems: [...action.dataItems]
            }
        }
        case ALL_DATA_COUNTRY: {

            return {
                ...state,
                allDataItems: action.allDataCountry
            }
        }
        case COUNTRY_CODE_CHENGED: {

            return {
                ...state,
                countryCode: action.inputValue
            }
        }
        case COUNTRY_CODE: {
            return {
                ...state,
                dataItems: [action.dataItem]
            }
        }
        // case CHANGE_LOCAL: {
        //     return {
        //         ...state,
        //         currentLocal: [action.language]
        //     }
        // }
    }
    return state
}

export const getFullNameSuccess = (inputValue) => ({type: COUNTRY_FULL_NAME, inputValue})
export const shortNameChangedAC = (inputValue) => ({type: COUNTRY_SHORT_NAME, inputValue})
export const currencyChangedAC = (inputValue) => ({type: CURRENCY_NAME, inputValue})
export const countryCodeChangeAC = (inputValue) => ({type: COUNTRY_CODE_CHENGED, inputValue})
export const allDataItemAC = (allDataCountry) => ({type: ALL_DATA_COUNTRY, allDataCountry})
export const sendCountryCodeAC = (dataItem) => ({type: COUNTRY_CODE, dataItem})
export const sendDataItemAC = (dataItems) => ({type: DATA_ITEM, dataItems: dataItems})
export const setError = (errorMessage) => ({type: SET_ERROR, error: errorMessage})
export const setLoading = (loading) => ({type: SET_LOADING, loading })
// export const currentLocalAC = (language) => ({type: CHANGE_LOCAL, language})

let _errorInterval = null;
const _setError = (error, dispatch) => {
    clearTimeout(_errorInterval);
    dispatch(setError(error.message));
    _errorInterval = setTimeout(() => {
        dispatch(setError(null))
    }, 4000)

}

const _tryCatch = async (operation, dispatch) => {
    try {
        dispatch(setLoading(true))
        await operation();
    } catch (error) {
        _setError(error, dispatch)
    } finally {
        dispatch(setLoading(false))
    }
}


export const getFullName = (fullName) => (dispatch) => {
    // example of usage helper-wrapper function

    _tryCatch(async () => {
        const data = await api.getFullName(fullName);
        dispatch(sendDataItemAC(data));
        dispatch(getFullNameSuccess(""));
    }, dispatch);
}


export const sendShortNameTC = (shortName) => (dispatch) => {
    // example of usage helper-wrapper function
    _tryCatch(async () => {
        const data = await api.sendShortName(shortName);
        dispatch(sendDataItemAC(data));
        dispatch(shortNameChangedAC(""))
    }, dispatch)
}
export const sendCurrencyCodeTC = (currencyCode) => (dispatch) => {
    // example with promise
    api.sendCurrencyCode(currencyCode)
        .then(data => {
            dispatch(sendDataItemAC(data));
            dispatch(currencyChangedAC(""))
        })
        .catch(error => _setError(error, dispatch))
}
export const sendCountryCodeTC = (code) => (dispatch) => {
    // example with promise
    api.sendCountryCode(code)
        .then(data => {
            dispatch(sendCountryCodeAC(data));
            dispatch(countryCodeChangeAC(""))
        })
        .catch(error => _setError(error, dispatch))
}
export const allCountryDataTC = () => (dispatch) => {
    api.allCountryData()
        .then(data => {

            dispatch(allDataItemAC(data));
        })
        .catch(error => _setError(error, dispatch))
}


export default reducer;