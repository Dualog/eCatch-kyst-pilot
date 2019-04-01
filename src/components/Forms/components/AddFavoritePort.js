/* eslint-disable require-jsdoc */
import React from 'react'
import Select from 'react-select'
import {Grid, Typography} from '@material-ui/core'
import {useTranslation} from "react-i18next"
import {useStore} from '../../../hooks'

export const AddPort = () => {
  const [t] = useTranslation("dropdowns")
  const [presetT] = useTranslation("preset")
  const options = t("ports", {returnObjects: true})
  const placeholder = presetT("placeholders.favoritePort")
  const disabled = false
  const {
    handleCustomListChange,
    addToCustomList,
    custom: {ports}
  } = useStore()


  function handleChange(option, index) {
    handleCustomListChange({
      name: "value",
      value: option.value,
      callback: () => addToCustomList("ports", `${index}`)})
  }

  const selectStyles = {
    input: base => ({
      ...base,
      '& input': {
        font: 'inherit'
      }
    })
  }

  return (
    <div>
      <Typography variant="h6">{presetT("headline.favoritePort")}</Typography>
      <Grid alignItems="stretch" container direction="column" spacing={16}>
        <Grid item>
          {new Array(3).fill(null).map((_, i) =>
            <Select
              isDisabled={disabled}
              key={i}
              label={t("customLists.fishingSpots.label")}
              onChange={option => handleChange(option, i)}
              options={options}
              placeholder={placeholder}
              styles={selectStyles}
              textFieldProps={{InputLabelProps: {shrink: true}}}
              value={options.find(option => ports[i] && option.value === ports[i].value)}
            />
          )}
        </Grid>

      </Grid>
    </div>
  )
}


export default AddPort