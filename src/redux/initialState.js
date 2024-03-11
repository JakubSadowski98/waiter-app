const initialState = {
  tables: [
    {
      "id": "1",
      "status": "busy",
      "peopleAmount": 3,
      "maxPeopleAmount": 3,
      "bill": 2
    },
    {
      "id": "2",
      "status": "reserved",
      "peopleAmount": 2,
      "maxPeopleAmount": 3,
      "bill": 0
    },
    {
      "id": "3",
      "status": "free",
      "peopleAmount": 0,
      "maxPeopleAmount": 0,
      "bill": 0
    },
    {
      "id": "4",
      "status": "busy",
      "peopleAmount": 1,
      "maxPeopleAmount": 2,
      "bill": 5
    }
  ]
}

export default initialState;