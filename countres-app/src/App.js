import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {
    allDataItemAC, countryCodeChangeAC,
    currencyChangedAC,
    dataItemAC,
    fullNameChangedAC, sendCountryCodeAC,
    shortNameChangedAC
} from "./Components/Redux/reducer";
import * as axios from "axios";
import InputFullName from "./Components/InputFullName";
import DrawingData from "./Components/DrawingData";
import InputShortName from "./Components/InputShortName";
import InputCurrency from "./Components/InputCurrency";
import {Switch, Icon} from 'antd';
import messages_ru from "./Components/i18next/ru";
import messages_en from "./Components/i18next/en";
import {FormattedHTMLMessage, IntlProvider} from 'react-intl';
import 'antd/dist/antd.css';
import InputAlpha3CodeCountry from "./Components/InputAlpha3CodeCountry";





class App extends React.Component {

    instance = axios.create({
        baseURL: "https://restcountries.eu/rest/v2/",
    })

    state = {
        isChecked: true,
        currentLocal: 'en',
        messages: {
            'ru': messages_ru,
            'en': messages_en
        }
    };


    changeLocal = (e) => {
        if (e) {
            this.setState({currentLocal: 'en'}
            )
        } else {
            this.setState({currentLocal: 'ru'})
        }
    };

    componentDidMount() {
        this.instance.get(`all`).then(res => {
            const allDataCountry = res.data;
            this.props.allCountryData(allDataCountry);
        })
    }

    fullNameChanged = (e) => {
        this.props.fullNameChanged(e.currentTarget.value)
    }
    shortNameChanged = (e) => {
        this.props.shortNameChanged(e.currentTarget.value)
    }
    currencyChanged = (e) => {
        this.props.currencyChanged(e.currentTarget.value)
    }
    countryCodeChange = (e) => {
        this.props.countryCodeChange(e.currentTarget.value)
    }

    sendFullName = () => {
        const fullName = this.props.countryFullName
        this.instance.get(`name/${fullName}?fullText=true`).then(res => {
            const dataItem = res.data;
            this.props.sendDataItem(dataItem);
            this.props.fullNameChanged("")
        })
    }
    sendShortName = () => {
        const shortName = this.props.countryShortName
        this.instance.get(`name/${shortName}`).then(res => {
            const dataItem = res.data;
            this.props.sendDataItem(dataItem);
            this.props.shortNameChanged("")
        })
    }
    sendCurrencyCode = () => {
        const currencyCode = this.props.currencyCode
        this.instance.get(`currency/${currencyCode}`).then(res => {
            const dataItem = res.data;
            this.props.sendDataItem(dataItem);
            this.props.currencyChanged("")
        })
    }
    sendCountryCode = () => {
        const code = this.props.countryCode
        this.instance.get(`alpha/${code}`).then(res => {
            const dataItem = res.data;
            this.props.sendCountryCode(dataItem);
            this.props.countryCodeChange("")
        })
    }

    render() {
        const CodeCountries = this.props.allDataItem.map(el => <option className='optionClass' key={el.id}> {el.name}: {el.alpha3Code}
        </option>);
        let isChecked = this.state.currentLocal === 'en';

        return (
            <div className="App">
                <div className="App-header">
                    <IntlProvider locale={this.state.currentLocal}
                                  messages={this.state.messages[this.state.currentLocal]}

                    >
                        <header className="header">
                        <div className="switch">
                            <FormattedHTMLMessage  id={'app.language'}
                                                  defaultMessage={'Language'}
                                                   className="title"
                            ></FormattedHTMLMessage>
                            <Switch  className="switchBtn" checked={isChecked} onChange={this.changeLocal}
                                    checkedChildren="EN" unCheckedChildren="RU"/>
                        </div>
                        </header>

                        <div className="inputForm">
                            <div> <FormattedHTMLMessage id={'app.fullName'}
                                                        defaultMessage={'Enter full country name'}><span></span></FormattedHTMLMessage>
                                <InputFullName countryFullName={this.props.countryFullName}
                                               fullNameChanged={this.fullNameChanged}
                                               sendFullName={this.sendFullName}
                                />
                            </div>
                            <div><FormattedHTMLMessage id={'app.shortName'}
                                                       defaultMessage={'Enter short country name'}><span></span></FormattedHTMLMessage>
                                <InputShortName countryShortName={this.props.countryShortName}
                                                shortNameChanged={this.shortNameChanged}
                                                sendShortName={this.sendShortName}
                                />
                            </div>
                            <div><FormattedHTMLMessage id={'app.currencyCode'}
                                                       defaultMessage={'Enter currency code'}><span></span></FormattedHTMLMessage>
                                <InputCurrency currencyCode={this.props.currencyCode}
                                               currencyChanged={this.currencyChanged}
                                               sendCurrencyCode={this.sendCurrencyCode}
                                />
                            </div>
                            <div><FormattedHTMLMessage id={'app.countryCode'}
                                                       defaultMessage={'Enter country code'}><span></span></FormattedHTMLMessage>
                                <InputAlpha3CodeCountry countryCodeChange={this.countryCodeChange}
                                                        countryCode={this.props.countryCode}
                                                        sendCountryCode={this.sendCountryCode}
                                />
                            </div>


                        </div>
                        <div className="drawingData">
                            <DrawingData dataItem={this.props.dataItem}/>
                            <select className="select">
                                    {CodeCountries}
                                </select>

                        </div>

                    </IntlProvider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        countryFullName: state.countryFullName,
        dataItem: state.dataItem,
        countryShortName: state.countryShortName,
        currencyCode: state.currencyCode,
        allDataItem: state.allDataItem,
        countryCode: state.countryCode,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fullNameChanged: (inputValue) => {
            dispatch(fullNameChangedAC(inputValue))
        },
        shortNameChanged: (inputValue) => {
            dispatch(shortNameChangedAC(inputValue))
        },
        currencyChanged: (inputValue) => {
            dispatch(currencyChangedAC(inputValue))
        },
        countryCodeChange: (inputValue) => {
            dispatch(countryCodeChangeAC(inputValue))
        },
        allCountryData: (allDataCountry) => {

            dispatch(allDataItemAC(allDataCountry))
        },
        sendDataItem: (dataItem) => {
            dispatch(dataItemAC(dataItem))
        },
        sendCountryCode: (dataItem) => {
            dispatch(sendCountryCodeAC(dataItem))
        },

    }
}
const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectApp;
