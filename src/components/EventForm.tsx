import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import { rulesFrom } from '../utils/rules'
import { Option } from 'antd/es/mentions'
import { IUser } from '../models/user'
import { IEvent } from '../models/event'
import { Moment } from 'moment'
import { Dayjs } from 'dayjs'
import { formatDate } from '../utils/date'
import { useAppSelector } from '../hooks/redux'
import { uid } from 'uid'

interface EventFormProps {
    quests: IUser[],
    submit: (event: IEvent) => void,
}

const EventForm: React.FC<EventFormProps> = ({
    quests,
    submit
}) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        quest: '',
        id: '',
    })
    const { user } = useAppSelector(state => state.user)
    const selectDate = (date: Dayjs | null) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) })
        }
    }
    const submitForm = () => {
        submit({ ...event, author: user.login, id: uid(8), })
    }

    return (
        <Form
            autoComplete="off"
            className='form'
            onFinish={submitForm}
        >
            <Form.Item
                label="event description"
                name="description"
                rules={[rulesFrom.require({
                    message: 'Please input your description!',
                    required: true,
                })]}
            >
                <Input value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            </Form.Item>


            <Form.Item
                label="event quests"
                name="quests"
                rules={[rulesFrom.require({
                    required: true,
                    message: 'Please input your quest!',
                })]}
            >
                <Select onChange={(quest: string) => setEvent({ ...event, quest })} >
                    {quests.map(quest => <Select.Option key={quest.id} value={quest.login}>{quest.login}</Select.Option>)}
                </Select>
            </Form.Item>


            <Form.Item
                label={'event date'}
                name={'date'}
                rules={[rulesFrom.require({
                    required: true,
                    message: 'Please input your date!',
                })]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EventForm