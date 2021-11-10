const Task = require('./Task')

class Tasks {
    constructor() {
        this._list = {};
    }

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        })

        return list;
    }

    createTask(description = '') {

        const task = new Task(description);
        this._list[task.id] = task;
    }

    deleteTask(id) {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    uploadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        })

    }

    allListTasks() {
        console.log();

        this.listArr.forEach((task, i) => {
            const index = `${i + 1}.`.green;
            const { description, dateCompleted } = task;
            const status = (dateCompleted) ?
                'Completed'.green :
                'Pending'.red;
            console.log(`${index} ${description} :: ${status}`);
        })
    }

    listPendingAndCompletedTasks(complete = true) {
        console.log();
        let countIndex = 0;
        this.listArr.forEach(task => {
            const { description, dateCompleted } = task;
            const status = (dateCompleted) ?
                'Completed'.green :
                'Pending'.red;

            if (complete) {

                if (dateCompleted) {
                    countIndex += 1;
                    console.log(`${(countIndex + '.').green} ${description} :: ${(dateCompleted/* .toString() */).green}`);
                }
            } else {
                if (!dateCompleted) {
                    countIndex += 1;
                    console.log(`${(countIndex + '.').green} ${description} :: ${status}`);
                }
            }
        })
    }

    toggleCompleteTasks(ids = []) {
        const formatDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

        ids.forEach(id => {
            const task = this._list[id];
            if (!task.dateCompleted) {
                task.dateCompleted = new Date().toLocaleDateString("en-US", formatDate);
            }
        });

        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].dateCompleted = null;
            }
        })
    }
}

module.exports = Tasks;