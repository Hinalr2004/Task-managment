import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plus, Filter, Search, MoreVertical, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

/* ================= TYPES ================= */

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  deadline: string;
  assignee: string;
  status: "todo" | "inprogress" | "completed";
}

interface TaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
}

interface ColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDrop: (taskId: string, newStatus: Task["status"]) => void;
}

/* ================= TASK CARD ================= */

const TaskCard = ({ task, onTaskClick }: TaskCardProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const priorityColor = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-700",
  };

  return (
    <div
      ref={dragRef as unknown as React.Ref<HTMLDivElement>}
      onClick={() => onTaskClick(task)}
      className={`bg-white p-4 rounded-lg border shadow cursor-pointer transition ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold">{task.title}</h3>
        <MoreVertical className="h-4 w-4 text-gray-400" />
      </div>

      <p className="text-sm text-gray-600 mb-3">{task.description}</p>

      <div className="flex justify-between items-center">
        <Badge className={priorityColor[task.priority]}>
          {task.priority.toUpperCase()}
        </Badge>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          {task.deadline}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback>
            {task.assignee.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs">{task.assignee}</span>
      </div>
    </div>
  );
};

/* ================= COLUMN ================= */

const Column = ({
  title,
  status,
  tasks,
  onTaskClick,
  onTaskDrop,
}: ColumnProps) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string; status: Task["status"] }) => {
      if (item.status !== status) {
        onTaskDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      className={`flex-1 min-w-[280px] bg-gray-100 rounded-lg p-4 ${
        isOver ? "ring-2 ring-indigo-400" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">{title}</h2>
        <Badge>{tasks.length}</Badge>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  );
};

/* ================= KANBAN BOARD ================= */

export function KanbanBoard({
  onTaskClick,
}: {
  onTaskClick: (task: Task) => void;
}) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design Landing Page",
      description: "Create UI for landing page",
      priority: "high",
      deadline: "Jan 10",
      assignee: "Sima",
      status: "todo",
    },
    {
      id: "2",
      title: "Fix Login Bug",
      description: "Resolve auth issue",
      priority: "medium",
      deadline: "Jan 12",
      assignee: "Ankita",
      status: "inprogress",
    },
    {
      id: "3",
      title: "Deploy App",
      description: "Production deployment",
      priority: "low",
      deadline: "Jan 15",
      assignee: "Mina",
      status: "completed",
    },
  ]);

  const handleTaskDrop = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Task Board</h1>

        <div className="flex gap-3 mb-6">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input className="pl-9" placeholder="Search tasks..." />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Task
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto">
          <Column
            title="To Do"
            status="todo"
            tasks={tasks.filter((t) => t.status === "todo")}
            onTaskClick={onTaskClick}
            onTaskDrop={handleTaskDrop}
          />
          <Column
            title="In Progress"
            status="inprogress"
            tasks={tasks.filter((t) => t.status === "inprogress")}
            onTaskClick={onTaskClick}
            onTaskDrop={handleTaskDrop}
          />
          <Column
            title="Completed"
            status="completed"
            tasks={tasks.filter((t) => t.status === "completed")}
            onTaskClick={onTaskClick}
            onTaskDrop={handleTaskDrop}
          />
        </div>
      </div>
    </DndProvider>
  );
}
