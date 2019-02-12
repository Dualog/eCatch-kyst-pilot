import React from 'react'
import {withTranslation} from 'react-i18next'
import {withPage} from './shared'
import InputDropdown from './shared/InputDropdown'
import Departure from './Departure'


const Dashboard = () => <div>
  <Departure/>
</div>

export default withTranslation("pages")(withPage(Dashboard, {namespace: "dashboard"}))