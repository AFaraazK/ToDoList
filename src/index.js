const projectList = document.querySelector(".projectList");
const newProjectInput = document.querySelector(".newProject");
import {consolePrint} from './factories';

let projects = [];

function Project(name,id,tasks){
    return {name: name,id: id,tasks: []};
}

function displayProjects(){
    //clear list
    while(projectList.firstChild){
        projectList.removeChild(projectList.firstChild);
    }

    projects.forEach(project => {
        let projEl = document.createElement('li');
        projEl.innerHTML = project.name;
        projectList.appendChild(projEl);
    })
}

newProjectInput.addEventListener('keypress', e => {
    if(e.key == "Enter"){
        //alert(newProjectInput.value);
        let proj = new Project(newProjectInput.value,Date.now(),[]);
        projects.push(proj);
        displayProjects();
        newProjectInput.value = '';
    }
})

let ProjOne = new Project("Example Project",Date.now().toString(),[]);
projects.push(ProjOne);
displayProjects();