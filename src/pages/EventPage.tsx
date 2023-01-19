import React, { FC, useEffect, useState } from 'react'
import CalendarEvent from '../components/CalendarEvent'
import { Button, Layout, Modal, Row } from 'antd'
import EventForm from '../components/EventForm'
import { useActions, useAppSelector } from '../hooks/redux'
import { IEvent } from '../models/event'


const EventPage: FC = () => {
  const {user} = useAppSelector(state => state.user)
  const {quests,events} = useAppSelector(state => state.event)
  const [modalVisible,setModalVisible] = useState<boolean>(false)
  const {getQuestsFromFirebase,createEvent,getEvents} = useActions()
  useEffect(() =>{
    getQuestsFromFirebase()
    getEvents({
      userName: user.login
    })
  },[])
 
  const addNewEvent = (event: IEvent) =>{
    setModalVisible(false)
    createEvent(event)
  }
  return (
    <Layout >
      <CalendarEvent events={events} />
      <Row className='buttonEvent' justify='center'> 
        <Button onClick={() => setModalVisible(true)}>
          add event
        </Button>
      </Row>
      <div>
        <Modal footer={false} onCancel={() => setModalVisible(false)} title='add event' open={modalVisible}>
          <EventForm submit={addNewEvent} quests={quests} />
        </Modal>
      </div>
    </Layout>
  )
}

export default EventPage