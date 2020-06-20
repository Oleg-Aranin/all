import React, {useState} from 'react';
import './App.css';

import * as jsonData from "./data/data.json"
import Form from "./Form";
import Row from "./Row";
import Label from "./Label";
import Input from "./Input";


function App() {

  const [data, setData] = useState(jsonData.default)
  console.log(data)

  return (

      <Form title={data.title}>
        <Row>
          <Label>{data.properties.firstName.title}</Label>
          <Input type={"text"} required value="Chuck"/>
        </Row>
        <Row>
          <Label>{data.properties.lastName.title}</Label>
          <Input type="text" required/>
        </Row>
      </Form>


  );
}

export default App;
