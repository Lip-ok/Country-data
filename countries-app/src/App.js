import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {
    allCountryDataTC, changeLocalAC,
    countryCodeChangeAC,
    currencyChangedAC, currentLocalAC,
    getFullNameSuccess, getFullName, sendCountryCodeTC, sendCurrencyCodeTC, sendShortNameTC,
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

const LANGUAGES = {
    EN: 'en',
    RU: 'ru'
}

class App extends React.Component {
    state = {
        isChecked: true,
        currentLocal: LANGUAGES.EN,
        messages: {
            [LANGUAGES.RU]: messages_ru,
            [LANGUAGES.EN]: messages_en
        }
    };
    changeLocal = () => {
        const newLang = this.state.currentLocal === LANGUAGES.EN ? LANGUAGES.RU : LANGUAGES.EN;
            this.setState({currentLocal: newLang})
            localStorage.setItem('language', newLang);
    };

    componentDidMount() {
        const language = localStorage.getItem('language');
        if (language) {
            this.setState({currentLocal: language})
        }
        this.props.allCountryData();
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
        this.props.sendFullDataItem(fullName)
    }
    sendShortName = () => {
        const shortName = this.props.countryShortName
        this.props.sendShortDataItem(shortName);
    }
    sendCurrencyCode = () => {
        const currencyCode = this.props.currencyCode
        this.props.sendCurrencyCode(currencyCode);

    }
    sendCountryCode = () => {
        const code = this.props.countryCode
        this.props.sendCountryCode(code);
    }

    render() {
        const CodeCountries = this.props.allDataItems.map(el => <option className='optionClass'
                                                                       key={el.id}> {el.name}: {el.alpha3Code}
        </option>);
        let isChecked = this.state.currentLocal === LANGUAGES.EN;

        return (
            <div className="App">
                <div className="App-header">
                    <IntlProvider locale={this.state.currentLocal}
                                  messages={this.state.messages[this.state.currentLocal]}

                    >
                        <header className="header">
                            <div className="switch">
                                <FormattedHTMLMessage id={'app.language'}
                                                      defaultMessage={'Language'}
                                                      className="title"
                                ></FormattedHTMLMessage>
                                <Switch className="switchBtn" checked={isChecked} onChange={this.changeLocal}
                                        checkedChildren="EN" unCheckedChildren="RU"/>
                            </div>
                        </header>
                        <div className="inputForm">
                            <div><FormattedHTMLMessage id={'app.fullName'}
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
                        <div className={'inputForm error'}>

                            {this.props.error}
                        </div>
                        <div className={'inputForm loading'}>
                            {this.props.loading && "loading..."}

                        </div>
                        <div className="drawingData">
                            <DrawingData dataItems={this.props.dataItems}/>
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
        loading: state.loading,
        error: state.error,
        countryFullName: state.countryFullName,
        dataItems: state.dataItems,
        countryShortName: state.countryShortName,
        currencyCode: state.currencyCode,
        allDataItems: state.allDataItems,
        countryCode: state.countryCode,
        // currentLocal: state.currentLocal,
    }
}
/*const mapDispatchToProps = (dispatch) => {
    return {
        fullNameChanged: (inputValue) => {
            dispatch(getFullNameSuccess(inputValue))
        },
        shortNameChanged: (shortName) => {
            dispatch(shortNameChangedAC(shortName))
        },
        currencyChanged: (inputValue) => {
            dispatch(currencyChangedAC(inputValue))
        },
        countryCodeChange: (inputValue) => {
            dispatch(countryCodeChangeAC(inputValue))
        },
        allCountryData: () => {
            dispatch(allCountryDataTC())
        },
        sendFullDataItem: (fullName) => {
            dispatch(getFullName(fullName))
        },
        sendShortDataItem: (shortName) => {
            dispatch(sendShortNameTC(shortName))
        },
        sendCurrencyCode: (currencyCode) => {
            dispatch(sendCurrencyCodeTC(currencyCode))
        },
        sendCountryCode: (code) => {
            dispatch(sendCountryCodeTC(code))
        },
        // currentLocal: (language) => {
        //     dispatch(currentLocalAC(language))
        // },
    }
}*/
const ConnectApp = connect(mapStateToProps,
    {
        fullNameChanged: getFullNameSuccess,
        shortNameChanged: shortNameChangedAC,
        currencyChanged: currencyChangedAC,
        countryCodeChange: countryCodeChangeAC,
        allCountryData: allCountryDataTC,
        sendFullDataItem: getFullName,
        sendShortDataItem: sendShortNameTC,
        sendCurrencyCode: sendCurrencyCodeTC,
        sendCountryCode: sendCountryCodeTC
    })(App)

export default ConnectApp;
