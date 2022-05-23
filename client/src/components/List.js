import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function List(){
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/list')
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                //console.log(json);
                })
            .catch(console.error);
    }, []);

    if(data){
        //console.log(data);
        return (<div className="art-list"><Row xs={1} md={2} className="g-4">
            {data.map(item => <ArtCard key={item.id} title={item.title} />)}
        </Row></div>);
    }
    return null
}

function ArtCard({title}){
    return (
        <Col>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        </Col>
    );
}

export default List;