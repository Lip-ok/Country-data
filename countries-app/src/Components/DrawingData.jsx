import React from "react";
import {FormattedHTMLMessage} from "react-intl";

const CountryProperty = ({name, defaultMessage, dataItems, isImage = false, isArrayOfObjects = false}) => {
    if (dataItems.length === 0) return null;

    const isArray = Array.isArray(dataItems[0][name]);


    const text = isArray ? <>
        {dataItems[0][name].map(el => isArrayOfObjects ? el.name: el)}</> : dataItems[0][name]

    return (
        <div>
                <span>

                       <b> <FormattedHTMLMessage
                            id={'drawingData.' + name}
                            defaultMessage={defaultMessage}
                        />
</b>
                        { isImage
                            ? <img className="flag" src={dataItems[0][name]}/>
                            : <span> {text}</span>
                        }


                    </span>
        </div>
    )
}


const DrawingData = (props) => {
    let {dataItems} = props;
    return (

        <div className="DrawingData">

            <CountryProperty name={'name'} defaultMessage={'Country'} dataItems={dataItems}/>
            <CountryProperty name={'capital'} defaultMessage={'Capital'} dataItems={dataItems}/>
            <CountryProperty name={'region'} defaultMessage={'Region'} dataItems={dataItems}/>
            <CountryProperty name={'subregion'} defaultMessage={'Subregion'} dataItems={dataItems}/>
            <CountryProperty name={'population'} defaultMessage={'Population'} dataItems={dataItems}/>
            <CountryProperty name={'topLevelDomain'} defaultMessage={'Top level domain'} dataItems={dataItems}/>
            <CountryProperty name={'alpha2Code'} defaultMessage={'Alpha2Code'} dataItems={dataItems}/>
            <CountryProperty name={'alpha3Code'} defaultMessage={'Alpha3Code'} dataItems={dataItems}/>
            <CountryProperty name={'languages'} defaultMessage={'Languages'} dataItems={dataItems} isArrayOfObjects={true}/>
            <CountryProperty name={'borders'} defaultMessage={'Borders'} dataItems={dataItems}/>
            <CountryProperty name={'timezones'} defaultMessage={'Timezones'} dataItems={dataItems}/>
            <CountryProperty name={'nativeName'} defaultMessage={'Native name'} dataItems={dataItems}/>
            <CountryProperty name={'numericCode'} defaultMessage={'Numeric code country'} dataItems={dataItems}/>
            <CountryProperty name={'flag'} defaultMessage={'Flag'} dataItems={dataItems} isImage={true}/>


            {/*<div>*/}
            {/*    <span><FormattedHTMLMessage id={'drawingData.flag'}*/}
            {/*                                defaultMessage={'Flag'}/> {(dataItems.length > 0) &&*/}
            {/*    <img className="flag" src={dataItems[0].flag}/>}</span>*/}
            {/*</div>*/}
        </div>
    )
}

export default DrawingData;