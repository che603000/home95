export const waterings = [
    {
        id: "0001",
        area: "1",
        name: "За забором",
        start: "04:00",
        time: 30,
        active: true
    },
    {
        id: "0002",
        area: "2",
        name: "Перед крыльцом",
        start: "06:00",
        time: 20,
        active: true
    },
    {
        id: "0004",
        area: "3",
        name: "Большой газон",
        start: "08:00",
        time: 40,
        active: false
    }
];

//waterings areas
export const AREAS =[
    {
        id: 1,
        name: 'Перед домом'
    },
    {
        id: 2,
        name: 'Большой газон'
    },
    {
        id: 3,
        name: 'Малый газон'
    },
    {
        id: 4,
        name: 'Капельный полив'
    },
];

export const mqtt  ={
    connectString :'ws://192.168.1.35:18883/mqtt',
    clientId :'homeApp'
};

//export  const