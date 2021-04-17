import {CELSIUS, FAHREN} from "../redux/actions/actionTypes"

const Kal2Cel = (Kal)=>{
    return Kal -273.15
}

const Kal2Fer = (Kal)=>{
    return ((Kal -273.15)*1.8) + 32
}

const TimeStampToUTCString = (timeStamp)=>{

    const date = new Date(timeStamp*1000)
    return date.toUTCString().split(' ').slice(0, 4).join(' ');
}

const TimeStampToUTCTimeString = (timeStamp)=>{

    const date = new Date(timeStamp*1000)
    return date.toUTCString().split(' ')[4];
}


const TimeStampToUTCDate = (timeStamp)=>{

    const date = new Date(timeStamp*1000)
    return date.getUTCDate()
}



const UnitConversion = (unit, kal)=>{

        if(unit === CELSIUS) return parseFloat(Kal2Cel(kal)).toFixed(2);

        if(unit === FAHREN) return parseFloat(Kal2Fer(kal)).toFixed(2);

}

export {UnitConversion,TimeStampToUTCString,TimeStampToUTCDate,TimeStampToUTCTimeString}