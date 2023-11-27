import axios from 'axios';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import projectsJSON from '../../assets/data/projects.json';


const Demo = () => {
    const [project, setProject] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const App = lazy(() => import(`./demos/${slug}/App`));

    useEffect(() => {


        axios.get('https://mo-portfolio-c0e43-default-rtdb.europe-west1.firebasedatabase.app/.json')
             .then(response => {

                let proj = response.data.find(project => project.slug === slug);

                if(!proj){
                    navigate("/projects");
                }
                else if(!proj.demo){
                    navigate(`/projects/${proj.slug}`);
                }
        
                setProject(proj);
             })
             .catch(e => {
                console.error(e);
             });





    }, []);

    if(!project) return <h1>Project doesnt exist</h1>;


    return (
        <Suspense fallback={<p>Loading...</p>}>
            <App />
        </Suspense>
    );
};

export default Demo;