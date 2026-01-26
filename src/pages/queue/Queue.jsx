import React from 'react'
import AppDownload from '../../components/App/AppDownland'
import { QueueStatus } from '../../components/queueStatus/QueueStatus'

function Queue() {
  return (
    <div>
      <QueueStatus/>
      <AppDownload/>
    </div>
  )
}

export default Queue
