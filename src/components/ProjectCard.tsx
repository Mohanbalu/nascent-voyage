import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar,
  Users,
  MoreVertical,
  Edit,
  Trash2,
  FolderOpen
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  color?: string;
  due_date?: string;
  is_shared: boolean;
  repository_url?: string;
  created_at: string;
  task_count?: number;
  completed_tasks?: number;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onClick: (projectId: string) => void;
}

const statusColors = {
  planning: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  active: 'bg-green-500/10 text-green-500 border-green-500/20',
  completed: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  on_hold: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
};

const statusLabels = {
  planning: 'Planning',
  active: 'Active', 
  completed: 'Completed',
  on_hold: 'On Hold'
};

export function ProjectCard({ project, onEdit, onDelete, onClick }: ProjectCardProps) {
  const completionRate = project.task_count && project.task_count > 0 
    ? Math.round(((project.completed_tasks || 0) / project.task_count) * 100)
    : 0;

  const isOverdue = project.due_date && 
    new Date(project.due_date) < new Date() && 
    project.status !== 'completed';

  return (
    <Card 
      className={cn(
        'transition-all duration-200 hover:shadow-md cursor-pointer',
        isOverdue && 'border-red-500/50 bg-red-500/5'
      )}
      onClick={() => onClick(project.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div 
              className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
              style={{ backgroundColor: project.color || '#6366f1' }}
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-medium leading-tight truncate">
                {project.name}
              </CardTitle>
              {project.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="p-0 w-8 h-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(project.id);
                }}
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
        <div className="space-y-3">
          {/* Progress */}
          {project.task_count && project.task_count > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {project.completed_tasks || 0} of {project.task_count} tasks completed
              </p>
            </div>
          )}

          {/* Status and details */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={statusColors[project.status]}>
                {statusLabels[project.status]}
              </Badge>
              
              {project.is_shared && (
                <Badge variant="secondary">
                  <Users className="w-3 h-3 mr-1" />
                  Shared
                </Badge>
              )}
            </div>
            
            {project.due_date && (
              <div className={cn(
                'flex items-center gap-1 text-xs',
                isOverdue ? 'text-red-500' : 'text-muted-foreground'
              )}>
                <Calendar className="w-3 h-3" />
                {format(new Date(project.due_date), 'MMM d')}
              </div>
            )}
          </div>

          {project.repository_url && (
            <div className="pt-2 border-t">
              <a
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <FolderOpen className="w-3 h-3" />
                View Repository
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}