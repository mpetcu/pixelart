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
        return (<div className="art-list m-3">
            <Row xs={1} md={2} lg={3} xxl={4} className="g-5">
                {data.map(item => <ArtCard key={item.id} item={item} title={item.title} content={item.content} />)}
            </Row>
        </div>);
    }
    return null
}

function ArtCard({item, title, content}){

    return (
        <Col>
            <Card.Link href={'/'+item.slug} >
                <Card>
                  <Card.Body style="bg">
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <img alt={title} src={'/artpic/'+item.slug+'.png'} width="100%" />
                    </Card.Text>
                  </Card.Body>
                </Card>
            </Card.Link>
        </Col>
    );
}

export default List;