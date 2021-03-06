import React, {useContext} from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'

import {Divider, Grid, Typography, Button} from '@material-ui/core'

import {Loading, Page, Status} from '../../shared'
import Centered from '../../Centered'

import Forms from "../../Forms"
import TripRow from "./TripRow"
import DCAOverview from "./DCAOverview"
import Store from '../../../db'
import {useTranslation} from 'react-i18next'
export {TripRow}

export const Trip = ({match: {params: {tripId}}}) => {
  const {trips} = useContext(Store)
  const [t] = useTranslation("dropdowns")
  const ports = t("ports", {returnObjects: true})

  const {POR, DEP, DCAList, start, end, isFinished, fish} = trips.find(trip => trip.id === tripId) || {}

  const departureLabel = (ports.find(p => DEP && p.value === DEP.PO) || {}).label || ""
  let title = `${departureLabel} → `

  const subtitle = `${start ? format(start, "MMMM dd - H:mm") : ""} / ${isFinished ? format(end, "MMMM dd - H:mm") : "..."}`
  if (isFinished) {
    const arrivalLabel = ports.find(p => p.value === POR.PO).label
    title += arrivalLabel
  }

  return (
    <Page
      subtitle={subtitle}
      title={() =>
        <Grid alignItems="center" container justify="space-between" style={{padding: 16}}>
          <Grid component={Typography} item variant="h4">{title}</Grid>
          <Grid item>
            {isFinished ? null : <Forms direction="row" justify="flex-start"/>}
          </Grid>
        </Grid>
      }
    > {
        start ?
          <TripOverview
            DCAList={DCAList}
            DEP={DEP}
            POR={POR}
            fish={fish}
          /> :
          <Centered>
            <Loading/>
          </Centered>
      }
    </Page>
  )
}


export default withRouter(Trip)


export const TripOverview = ({DEP, POR, DCAList, fish}) => {
  const [t] = useTranslation("trips")

  return (
    <>
    <Divider/>
    <Grid alignItems="center" container item style={{padding: 16}}>
      {/* TODO: Clicking on this should show an uneditable message overview */}
      <Grid component={Button} item style={{margin: 4}} variant="outlined">
        <Typography variant="h6">
          DEP
          <Status result={DEP.result}/>
        </Typography>
      </Grid>
      →
      {DCAList.map(d =>
        <div key={d.id}>
          {/* TODO: Clicking on this should show an uneditable message overview */}
          <Grid component={Button} item style={{margin: 4}} variant="outlined">
            <Typography variant="h6">
              DCA({d.RN})
              <Status result={d.result}/>
            </Typography>
          </Grid>
          →
        </div>
      )}
      {POR ?
        <Grid component={Button} item style={{margin: 4}} variant="outlined">
          <Typography variant="h6">
            POR
            <Status result={POR.result}/>
          </Typography>
        </Grid> :
        null
      }
    </Grid>
    <Divider/>
    <Grid item>
      <Typography style={{padding: 16}} variant="h5">{t("overview.title")}</Typography>
      <DCAOverview fish={fish} list={DCAList}/>
    </Grid>
  </>
  )
}