import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import projectsJSON from '../../assets/data/projects.json';

const Show = () => {
  const [project, setProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    // let temp = projectsJSON.filter((project) => {
    //   return project.slug === slug;
    // });

    axios.get('https://mo-portfolio-c0e43-default-rtdb.europe-west1.firebasedatabase.app/.json')
             .then(response => {

              setProject(response.data.find(project => project.slug === slug));
             })
             .catch(e => {
                console.error(e);
             });
    
  }, []);

  if(!project) return <h1>Project doesnt exist</h1>;

  const tags = project.tags.map((tag, i) => {
    return <div key={i} className="badge badge-outline badge-primary">{tag}</div>;
  });


  let imageCarousel = "";

  if(project.images){

    let items = project.images.map((image, i) => {
      return (
        <div id={`item${i}`} className="carousel-item w-full">
          <img title={image.caption} src={`${image.path}`} className="w-full" />
        </div> 
      );
    });

    let buttons = project.images.map((image, i) => {
      return (
        <a href={`#item${i}`} className="btn btn-xs">{i+1}</a> 
      );
    });

    imageCarousel = (
      <>
      <div className="carousel">
        {items}
      </div> 
      <div className="flex justify-center w-full py-2 gap-2">
        {buttons}
      </div>
      </>
    );
  }

  return (
    <>
      <p><b>Title:</b> {project.title}</p>
      <p><b>Description:</b> {project.description}</p>
      {imageCarousel}
      <p><b>Date:</b> {project.date}</p>
      <p><b>Tags:</b>{tags}</p>
      <p><a href={project.website} target="_blank" rel="noreferrer" className="btn btn-primary">Web</a></p>
      <p><a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary">GitHub</a></p>

      {(project.demo) ? (
        <p>Demo goes here</p>
      ) : ""}
    </>
  );
};

export default Show;