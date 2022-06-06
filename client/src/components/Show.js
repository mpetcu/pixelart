import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function Show(){
    const [data, setData] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        fetch('http://localhost:4000/api/get/?slug='+slug)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                console.log(json);
                })
            .catch(console.error);
    }, [slug]);

    if(data){
        return (
        <div className="art-show m-3">
            <h1>{data.title??''}</h1>
            <p>{data.tags??''}</p>
            <img src={'/artpic/'+data.slug+'.png'} alt={data.title??''} className="art" />
            <br/><br/>
            <a role="button" className="btn btn-primary" href={'/editor/'+data.slug} target="_blank" rel="noopener noreferrer" >Open in Editor</a>
        </div>
        )
    }
    return null
}
