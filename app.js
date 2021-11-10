require('colors');
const {
    inquirerMenu,
    pause,
    readInput,
    listDeleteTasks,
    confirm,
    listCheckTasks
} = require('./helpers/inquirer');
const Task = require('./models/Task');
const Tasks = require('./models/Tasks');
const { saveDB, readDB } = require('./helpers/methodsFile');

const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const savedFileDB = readDB();
    if (savedFileDB) {
        tasks.uploadTasksFromArray(savedFileDB);
    }

    do {
        opt = await inquirerMenu();
        // console.log({ opt });

        switch (opt) {
            case 1:
                const description = await readInput('description: ');
                tasks.createTask(description);
                // console.log(description);
                break;
            case 2:
                tasks.allListTasks();
                break;
            case 3:
                tasks.listPendingAndCompletedTasks();
                break;
            case 4:
                tasks.listPendingAndCompletedTasks(false);
                break;
            case 5:
                const ids = await listCheckTasks(tasks.listArr);
                tasks.toggleCompleteTasks(ids);
                break;
            case 6:
                const id = await listDeleteTasks(tasks.listArr);
                if (id !== 0) {
                    const deleteConfirm = await confirm('Are you sure?')
                    if (deleteConfirm) {
                        tasks.deleteTask(id);
                        console.log('Deleted successfully!');
                    }
                }
                break;
            default:
                break;
        }

        saveDB(tasks.listArr);

        await pause();
    } while (opt !== 0);

}

main();