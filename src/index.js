const projectList = document.querySelector(".projectList");
const newProjectInput = document.querySelector(".newProject");

let projects = [];
let activeProject;

function Project(name,id,tasks){
    return {name: name,id: id,tasks: []};
}

function displayProjects(){
    //clear list
    while(projectList.firstChild){
        projectList.removeChild(projectList.firstChild);
    }

    // display projects
    projects.forEach(project => {
        let projEl = document.createElement('li');
        projEl.innerHTML = project.name;
        projEl.dataset.projectid = project.id;
        // select active project list
        if(project.id == activeProject){
            projEl.style.fontWeight = "bold";
            projEl.style.color = "goldenrod";
        }
        projectList.appendChild(projEl);
    })

    // set taskHeader to name of active Project
    if(activeProject != null){
        document.querySelector(".taskHeader").innerText = (projects.find(project => project.id == activeProject)).name;
    }
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

projectList.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() == 'li'){
        activeProject = e.target.dataset.projectid;
        displayProjects();
    }
})

let ProjOne = new Project("Example Project",Date.now().toString(),[]);
projects.push(ProjOne);
displayProjects();