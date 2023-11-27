import { useState, useEffect } from 'react';
import axios from 'axios';

// import projectsJSON from '../../assets/data/projects.json';

import ProjectCard from '../../components/ProjectCard';

const Index = () => {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        axios.get('https://mo-portfolio-c0e43-default-rtdb.europe-west1.firebasedatabase.app/.json')
             .then(response => {
                setProjects(response.data);
             })
             .catch(e => {
                console.error(e);
             });
    }, []);

    if(!projects) return (<p>loading...</p>);

    const projectList = projects.map((project, i) => {
        return <ProjectCard key={i} project={project} />
    });

    return (
        <div className='grid grid-cols-2 gap-2 justify-items-center'>
            {projectList}
        </div>
    );
};

export default Index;