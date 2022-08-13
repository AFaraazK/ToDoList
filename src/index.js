const projectList = document.querySelector(".projectList");
const taskList = document.querySelector(".taskList");
const newProjectInput = document.querySelector(".newProject");
const newTaskInput = document.querySelector(".newTask");
const deleteButton = document.querySelector(".deleteProject");

let projects = [];
let activeProject;

function Project(name,id,tasks){
    function newTask(task){
        tasks.push(task);
    }
    return {name: name,id: id,tasks,newTask};
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
            projEl.style.backgroundColor = "var(--purple)";
        }
        projectList.appendChild(projEl);
    })

    // set taskHeader to name of active Project
    if(activeProject != null){
        document.querySelector(".taskHeader").innerText = (projects.find(project => project.id == activeProject)).name;
    }
}

function displayTasks(){
    
    //clear task list
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    if(activeProject != null){
    //find activeProject object
    let activeProjectObj = projects.find(project => project.id == activeProject);
    // loop through activeProject tasks array and create a list item
    activeProjectObj.tasks.forEach(task => {
        let taskEl = document.createElement("li");
        taskEl.innerHTML = task;
        taskList.appendChild(taskEl);
    }) }

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

newTaskInput.addEventListener('keypress', e => {
    if(e.key == "Enter" && newTaskInput.value != '' && activeProject != null){
        let activeProjectObjTask = projects.find(project => project.id == activeProject);
        activeProjectObjTask.newTask(newTaskInput.value);
        displayTasks();
        newTaskInput.value = '';
    }
})

projectList.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() == 'li'){
        activeProject = e.target.dataset.projectid;
        displayProjects();
        displayTasks();
    }
})

deleteButton.addEventListener('click', e => {
    projects = projects.filter(project => project.id != activeProject);
    activeProject = null;
    displayProjects();
    displayTasks();
})

let ProjOne = new Project("Example Project",Date.now().toString(),[]);
projects.push(ProjOne);
displayProjects();

ProjOne.newTask("Get Groceries");
ProjOne.newTask("Wash the dishes");