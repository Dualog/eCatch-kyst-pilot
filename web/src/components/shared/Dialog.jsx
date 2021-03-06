import React from 'react'
import {Dialog as MuiDialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core"
import {withStore} from "../../db"
import {DestructButton} from "."
import {useTranslation} from 'react-i18next'


export const Dialog = ({store: {dialog: {open, children, handleSubmit, handleCancel, isDestructive, type}}}) => {
  const SubmitButton = isDestructive ? DestructButton : Button
  const [t] = useTranslation("dialogs")
  const [commonT] = useTranslation("common")

  return (
    <MuiDialog {...{open}} onClose={() => handleCancel && handleCancel()}>
      <DialogTitle>{t(`${type}.titles.main`)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(`${type}.description`)}

        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCancel} >
          {commonT(`negative.cancel-message`)}
        </Button>
        <SubmitButton color="secondary" onClick={handleSubmit} variant="contained">
          {commonT(`positive.submit`)}
        </SubmitButton>
      </DialogActions>
    </MuiDialog>
  )
}

export default withStore(Dialog)