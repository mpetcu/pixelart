import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Canvas from './list/Canvas.js'

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

    const maxW = 200;
    const maxH = 200;

    const cellSize = () => {
        let c = Math.floor(maxW/content.layoutSize.w > maxH/content.layoutSize.h ? maxH/content.layoutSize.h : maxW/content.layoutSize.w);
        return c;
    }

    return (

        <Col>
            <Card.Link href={'/'+item.slug} >
                <Card>
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <img src={'/artpic/'+item.slug+'.png'} height="200" />
                        {/*<Canvas
                            width={cellSize()*content.layoutSize.w}
                            height={cellSize()*content.layoutSize.h}
                            data={content}
                        />*/}
                    </Card.Text>
                  </Card.Body>
                </Card>
            </Card.Link>
        </Col>
    );
}

export default List;