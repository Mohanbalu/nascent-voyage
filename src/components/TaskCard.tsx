import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Code, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  difficulty?: number;
  estimated_hours?: number;
  due_date?: string;
  tags?: string[];
}

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string | null;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'todo' | 'in_progress' | 'completed' | 'blocked';
    difficulty?: number | null;
    estimated_hours?: number | null;
    due_date?: string | null;
    tags?: string[] | null;
  };
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: any) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', 
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  urgent: 'bg-red-500/10 text-red-500 border-red-500/20'
};

const difficultyColors = {
  1: 'bg-green-500/10 text-green-500',
  2: 'bg-green-500/10 text-green-500', 
  3: 'bg-yellow-500/10 text-yellow-500',
  4: 'bg-orange-500/10 text-orange-500',
  5: 'bg-red-500/10 text-red-500'
};

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  
  const handleToggleComplete = async () => {
    setIsCompleting(true);
    await onToggleComplete(task.id);
    setIsCompleting(false);
  };

  const isCompleted = task.status === 'completed';
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !isCompleted;

  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-md',
      isCompleted && 'opacity-60',
      isOverdue && 'border-red-500/50 bg-red-500/5'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent"
              onClick={handleToggleComplete}
              disabled={isCompleting}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
              )}
            </Button>
            <div className="flex-1">
              <CardTitle className={cn(
                'text-base font-medium leading-tight',
                isCompleted && 'line-through text-muted-foreground'
              )}>
                {task.title}
              </CardTitle>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 w-8 h-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            
            {task.difficulty && (
              <Badge variant="secondary" className={difficultyColors[task.difficulty as keyof typeof difficultyColors]}>
                {task.difficulty}/5
              </Badge>
            )}
            
            {task.estimated_hours && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {task.estimated_hours}h
              </div>
            )}
          </div>
          
          {task.due_date && (
            <div className={cn(
              'flex items-center gap-1 text-xs',
              isOverdue ? 'text-red-500' : 'text-muted-foreground'
            )}>
              <Calendar className="w-3 h-3" />
              {format(new Date(task.due_date), 'MMM d')}
            </div>
          )}
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="flex gap-1 mt-3 flex-wrap">
            {task.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {task.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{task.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}