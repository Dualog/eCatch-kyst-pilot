import React, {Component, createContext} from "react"
import initValues from "./initialValues.json"
import {CONNECTION_REF} from "../lib/firebase"

import * as darkMode from "./actions/darkMode"
import {login, updateProfile, logout, deleteUser} from "./actions/users"
import * as dialog from './actions/dialog'
import * as notification from './actions/notification'

const Store = createContext()

export class Database extends Component {


  state = initValues

  async componentDidMount() {

    this.initDarkMode()

    this.userLogin()

    setTimeout(() => {
      CONNECTION_REF
        .on("value", snap => {
          const isOffline = !snap.val()

          isOffline &&
            this.notify({
              name: "offline", type: "error", action: () => window.location.reload(), duration: 5000
            })
          this.setState({isOffline})
        })
    }, 2500
    )

  }

  // Dark mode
  initDarkMode = darkMode.init.bind(this)

  toggleDarkMode = darkMode.toggle.bind(this)

  // Dialog
  handleDialog = dialog.handle.bind(this)

  resetDialog = dialog.reset.bind(this)

  // Notification
  notificationQueue = []

  notify = notification.handle.bind(this)

  processNotificationQueue = notification.processQueue.bind(this)

  notificationClose = notification.close.bind(this)


  // User
  userLogin = login.bind(this)

  userLogout = logout.bind(this)

  userDelete = deleteUser.bind(this)

  userUpdateProfile = updateProfile.bind(this)

  render() {
    return (
      <Store.Provider
        value={{
          handleToggleDarkMode: this.toggleDarkMode,
          handleUserUpdateProfile: this.userUpdateProfile,
          handleUserLogout: this.userLogout,
          handleUserLogin: this.userLogin,
          handleUserDelete: this.userDelete,
          handleDialog: this.handleDialog,
          notify: this.notify,
          processNotificationQueue: this.processNotificationQueue,
          notificationClose: this.notificationClose,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}

export default Store