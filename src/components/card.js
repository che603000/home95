import React from 'react';
import {Card, Form} from 'react-bootstrap';

export const CardWatering = props => {
    const {id = 1, start = "06:00", name = "", time = 20, active = false, onChange} = props;
    return (
        <Card style={{width: '28rem', margin: "5px", display: 'inline-block'}}>
            <Card.Body>
                <Card.Title>
                    {/*<button type="button" className="close">*/}
                    {/*    <span aria-hidden="true">×</span>*/}
                    {/*    <span className="sr-only">Close alert</span>*/}
                    {/*</button>*/}
                    {name}
                </Card.Title>
                {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                <Card.Text as={"div"}>
                    <Form>
                        {/*<Form.Group controlId={"name-" + id}>*/}
                        {/*    <Form.Label>Название</Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        onChange={e => onChange(id, 'name', e.target.value)}*/}
                        {/*        value={name}/>*/}
                        {/*</Form.Group>*/}
                        <Form.Group controlId={"start-" + id}>
                            <Form.Label>Начало полива</Form.Label>
                            <Form.Control
                                type="time"
                                onChange={e => onChange(id, 'start', e.target.value)}
                                value={start}/>
                        </Form.Group>
                        <Form.Group controlId={"time-" + id}>
                            <Form.Label>Продолжительность полива</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e => onChange(id, 'time', e.target.value)}
                                value={time}
                            >
                                <option value={10}>10 минут</option>
                                <option value={20}>20 минут</option>
                                <option value={30}>30 минут</option>
                                <option value={40}>40 минут</option>
                                <option value={50}>50 минут</option>
                                <option value={60}>60 минут</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId={"active-" + id}>
                            <Form.Check
                                type="checkbox"
                                label="Применять правило"
                                onChange={e => onChange(id, 'active', e.target.checked)}
                                checked={active}/>
                        </Form.Group>
                    </Form>
                </Card.Text>
                    <Card.Link href="#">Сохранить</Card.Link>
                    <Card.Link href="#">Удалить</Card.Link>
            </Card.Body>
        </Card>
    )
};
