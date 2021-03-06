import React from 'react'
import {Grid, Paper, InputLabel} from '@material-ui/core'

import TextInput from './TextInput'
import {useTranslation} from 'react-i18next'
import DropdownMulti from './DropdownMulti'

const DropdownMap = props => {

  const handleKeyValueChange = ({name, value: inputValue}) => {
    const {onChange, dataId, value, inputType} = props
    const newValue = {...value}
    newValue[name] = (inputType === "number" ? parseInt(inputValue, 10) : inputValue) || ""
    onChange({name: dataId, value: newValue})
  }


  return (
    <Paper style={{padding: 8}}>
      <InputLabel >{props.label}</InputLabel>
      <DropdownMulti {...props}/>
      <Grid container direction="column">
        {Object.entries(props.value || {}).map(([key, value]) =>
          <KeyValueInput
            dataId={key}
            disabled={props.disabled}
            inputType={props.inputType}
            key={key}
            onChange={handleKeyValueChange}
            type={props.type}
            unit={props.unit}
            value={value}
          />
        )}
      </Grid>
    </Paper>
  )
}

const KeyValueInput = ({dataId, inputType, type, ...props}) => {
  const [t] = useTranslation("dropdowns")

  const label = t(type, {returnObjects: true})
    .find(option => option.value === dataId).label

  return (
    <Grid
      {...props}
      component={TextInput}
      dataId={dataId}
      item
      label={label}
      type={inputType}
    />
  )
}

export default DropdownMap