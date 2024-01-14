export interface Task {
    id: string;
    title: string;
    description: string;
    checked: boolean;
    showPainel: boolean;
    showEditFrom: boolean;
}

export interface BoardSection {
    title: string;
    status: string;
    tasks: Task[];
    showFormAddTask: boolean;
}