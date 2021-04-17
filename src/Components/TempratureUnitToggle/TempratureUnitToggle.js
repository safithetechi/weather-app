import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {connect} from 'react-redux';
import {changeUnit} from '../../redux/actions/actions'
import { bindActionCreators } from "redux"


const TempratureUnitToggle = (props)=>{
    const [unit, setUnit] = React.useState('C')
    
    const handleUnitChange = (e, currentUnit)=>{
        setUnit(currentUnit);
        props.changeUnit(currentUnit)
    }

   return ( <ToggleButtonGroup
      value={unit}
      exclusive
      onChange={handleUnitChange}
    >

            <ToggleButton value={"C"}>
                C
            </ToggleButton>

            <ToggleButton value={"F"}>
                F
            </ToggleButton>

    </ToggleButtonGroup>


   )

}


const mapDispatchToProps = dispatch=>{
    return(bindActionCreators( {
        changeUnit:unit=>changeUnit(unit)
        },dispatch))
  }
  
  

export default connect(null,mapDispatchToProps)(TempratureUnitToggle);