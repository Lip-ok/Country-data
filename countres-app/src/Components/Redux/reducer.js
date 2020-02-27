const COUNTRY_FULL_NAME = "COUNTRY_FULL_NAME"
const COUNTRY_SHORT_NAME = "COUNTRY_SHORT_NAME"
const CURRENCY_NAME = "CURRENCY_NAME"
const DATA_ITEM = "DATA_ITEM"
const ALL_DATA_COUNTRY = "ALL_DATA_COUNTRY"
const COUNTRY_CODE_CHENGED = "COUNTRY_CODE_CHENGED"
const COUNTRY_CODE = "COUNTRY_CODE"




const initialState ={
    countryFullName: "",
    dataItem: [],
    countryShortName: "",
    currencyCode: "",
    allDataItem:[],
    countryCode: "",


}

const reducer =(state = initialState, action)=>{

    switch (action.type) {
        case COUNTRY_FULL_NAME:{
            return {
                ...state,
                countryFullName: action.inputValue
            }
        }
        case COUNTRY_SHORT_NAME:{
            return {
                ...state,
                countryShortName: action.inputValue
            }
        }
        case CURRENCY_NAME:{
            return {
                ...state,
                currencyCode: action.inputValue
            }
        }
        case DATA_ITEM:{
            return {
                ...state,
                dataItem: [...action.dataItem]
            }
        }
        case ALL_DATA_COUNTRY:{

            return {
                ...state,
                allDataItem: action.allDataCountry
            }
        }
        case COUNTRY_CODE_CHENGED:{

            return {
                ...state,
                countryCode: action.inputValue
            }
        }
        case COUNTRY_CODE:{
            return {
                ...state,
                dataItem: [action.dataItem]
            }
        }
    }
    return state
}

export const fullNameChangedAC = (inputValue) => ({type: COUNTRY_FULL_NAME, inputValue})
export const shortNameChangedAC = (inputValue) => ({type: COUNTRY_SHORT_NAME, inputValue})
export const currencyChangedAC = (inputValue) => ({type: CURRENCY_NAME, inputValue})
export const countryCodeChangeAC = (inputValue) => ({type: COUNTRY_CODE_CHENGED, inputValue})
export const allDataItemAC = (allDataCountry) => ({type: ALL_DATA_COUNTRY, allDataCountry})
export const sendCountryCodeAC = (dataItem) => ({type: COUNTRY_CODE, dataItem})
export const dataItemAC = (dataItem) => ({type: DATA_ITEM, dataItem})

export default reducer;