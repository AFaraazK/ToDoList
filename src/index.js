const projectList = document.querySelector(".projectList");
const taskList = document.querySelector(".taskList");
const newProjectInput = document.querySelector(".newProject");
const newTaskInput = document.querySelector(".newTask");
const deleteButton = document.querySelector(".deleteProject");

let projects = [];
let activeProject;

// TODO: Modal explaining this.
// TODO: Make tasks objects with additional info
// TODO: Local Storage
// TODO: Divide file into multipe module files

function Project(name,id,tasks){
    function newTask(task,id,completeness){
        let addedTask = new Task(task,id,completeness);
        tasks.push(addedTask);
    }
    return {name: name,id: id,tasks,newTask};
}

function Task(name,id,completeness){
    function completeTask(){
        completeness = true;
        console.log(completeness);
    }
    return {name: name,id: id,completeness: completeness, completeTask};
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
    });

    // set taskHeader to name of active Project
    if(activeProject != null){
        document.querySelector(".taskHeader").innerText = (projects.find(project => project.id == activeProject)).name;
    } else if(activeProject == null){
        document.querySelector(".taskHeader").innerText = "Create a Project";  
    }
}

function displayTasks(){
    
    //clear task list
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    if(activeProject != null){
    // loop through activeProject tasks array and create a list item
    (projects.find(project => project.id == activeProject)).tasks.forEach(task => {
        let taskEl = document.createElement("li");
        taskEl.innerHTML = task.name;
        taskEl.dataset.taskid = task.id;

        /*
        taskEl.addEventListener('click', e => {
            if(e.target.tagName.toLowerCase() == "li"){
                //(projects.find(project => project.id == activeProject)).tasks.filter(task => task.id != taskEl.dataset.taskid);
                //(projects.find(project => project.id == activeProject)).tasks.find(task => task.id == taskEl.dataset.taskid).completeTask();
            }
        });
        */
       taskEl.addEventListener('click', e => {
             if(e.target.tagName.toLowerCase() == "li"){
                var index = (projects.find(project => project.id == activeProject)).tasks.findIndex(function(o){
                    return o.id == taskEl.dataset.taskid;
                })
                if (index !== -1) (projects.find(project => project.id == activeProject)).tasks.splice(index, 1);
                displayTasks();
             }
       })

        taskList.appendChild(taskEl);
    }) }

}

newProjectInput.addEventListener('keypress', e => {
    if(e.key == "Enter" && newProjectInput.value != null){
        //alert(newProjectInput.value);
        let proj = new Project(newProjectInput.value,Date.now().toString(),[]);
        projects.push(proj);
        displayProjects();
        newProjectInput.value = '';
    }
})

newTaskInput.addEventListener('keypress', e => {
    if(e.key == "Enter" && newTaskInput.value != '' && activeProject != null){
        let activeProjectObjTask = projects.find(project => project.id == activeProject);
        activeProjectObjTask.newTask(newTaskInput.value,Date.now().toString(),false);
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

deleteButton.addEventListener('click', () => {
    projects = projects.filter(project => project.id != activeProject);
    activeProject = null;
    displayProjects();
    displayTasks();
})

let ProjOne = new Project("Example Project",Date.now().toString(),[]);
projects.push(ProjOne);
displayProjects();

ProjOne.newTask("Wash the Groceries",Date.now().toString(),false);
ProjOne.newTask("Get the dishes",(Date.now().toString())+"12",false);
