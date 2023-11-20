import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projectsJSON from '../../assets/data/projects.json';

const Show = () => {
  const [project, setProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    // let temp = projectsJSON.filter((project) => {
    //   return project.slug === slug;
    // });
    
    setProject(projectsJSON.find(project => project.slug === slug));
  }, []);

  if(!project) return <h1>Project doesnt exist</h1>;


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
      <div className="carousel w-full">
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
      <p><b>Tags:</b> {project.tags}</p>
      <p><b>Website:</b> {project.website}</p>
      <p><b>GitHub:</b> {project.github}</p>

      {(project.demo) ? (
        <p>Demo goes here</p>
      ) : ""}
    </>
  );
};

export default Show;