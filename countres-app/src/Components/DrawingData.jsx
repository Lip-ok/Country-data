import React from "react";
import {FormattedHTMLMessage} from "react-intl";


const DrawingData = (props) => {
    return (

        <div className="DrawingData">
            <div>
                <span><FormattedHTMLMessage
                    id={'drawingData.country'}
                    defaultMessage={'country'}/> {(props.dataItem.length > 0) && props.dataItem[0].name}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.capital'}
                                            defaultMessage={'Capital'}/> {(props.dataItem.length > 0) && props.dataItem[0].capital}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.region'}
                                            defaultMessage={'Region'}/> {(props.dataItem.length > 0) && props.dataItem[0].region}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.subregion'}
                                            defaultMessage={'Subregion'}/> {(props.dataItem.length > 0) && props.dataItem[0].subregion}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.population'}
                                            defaultMessage={'Population'}/> {(props.dataItem.length > 0) && props.dataItem[0].population}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.topLevelDomain'}
                                            defaultMessage={'Top level domain'}/> {(props.dataItem.length > 0) && props.dataItem[0].topLevelDomain}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.alpha2Code'}
                                            defaultMessage={'Alpha2Code'}/> {(props.dataItem.length > 0) && props.dataItem[0].alpha2Code}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.alpha3Code'}
                                            defaultMessage={'Alpha3Code'}/> {(props.dataItem.length > 0) && props.dataItem[0].alpha3Code}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.languages'}
                                            defaultMessage={'Languages'}/> {(props.dataItem.length > 0) && props.dataItem[0].languages.map(l => (
                    <span>{l.name}   </span>))}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.borders'}
                                            defaultMessage={'Borders'}/> {(props.dataItem.length > 0) && props.dataItem[0].borders.map(l => (
                    <span>{l}   </span>))}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.timezones'}
                                            defaultMessage={'Timezones'}/> {(props.dataItem.length > 0) && props.dataItem[0].timezones}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.nativeName'}
                                            defaultMessage={'Native name'}/> {(props.dataItem.length > 0) && props.dataItem[0].nativeName}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.numericCodeCountry'}
                                            defaultMessage={'Numeric code country'}/> {(props.dataItem.length > 0) && props.dataItem[0].numericCode}</span>
            </div>
            <div>
                <span><FormattedHTMLMessage id={'drawingData.flag'}
                                            defaultMessage={'Flag'}/> {(props.dataItem.length > 0) &&
                <img className="flag" src={props.dataItem[0].flag}/>}</span>
            </div>
        </div>
    )
}

export default DrawingData;