import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'task' | 'text';
  completed: boolean;
  locked: boolean;
}

interface CourseData {
  id: number;
  title: string;
  description: string;
  icon: string;
  totalLessons: number;
  completedLessons: number;
  lessons: Lesson[];
}

const CourseDetail = () => {
  const navigate = useNavigate();
  
  const [courseData] = useState<CourseData>({
    id: 1,
    title: 'Личный бренд и продвижение',
    description: 'Научитесь выделяться среди конкурентов и эффективно продвигать себя в социальных сетях',
    icon: 'Sparkles',
    totalLessons: 4,
    completedLessons: 3,
    lessons: [
      {
        id: 1,
        title: 'Как выделиться среди конкурентов',
        description: 'Изучите ключевые принципы создания уникального предложения',
        duration: '15 мин',
        type: 'video',
        completed: true,
        locked: false,
      },
      {
        id: 2,
        title: 'Где искать клиентов в 2025 году',
        description: 'Актуальные каналы привлечения клиентов и работа с ними',
        duration: '20 мин',
        type: 'video',
        completed: true,
        locked: false,
      },
      {
        id: 3,
        title: 'Контент-план для соцсетей',
        description: 'Создайте эффективный контент-план для своих соцсетей',
        duration: '25 мин',
        type: 'text',
        completed: true,
        locked: false,
      },
      {
        id: 4,
        title: 'Практическое задание',
        description: 'Аудит текущего профиля + план продвижения',
        duration: '60 мин',
        type: 'task',
        completed: false,
        locked: false,
      },
    ],
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'PlayCircle';
      case 'task':
        return 'FileCheck';
      case 'text':
        return 'BookOpen';
      default:
        return 'Circle';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'video':
        return 'Видео';
      case 'task':
        return 'Задание';
      case 'text':
        return 'Материал';
      default:
        return 'Урок';
    }
  };

  const progress = (courseData.completedLessons / courseData.totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-primary/10"
        >
          <Icon name="ArrowLeft" className="mr-2" size={18} />
          Назад к курсам
        </Button>

        <div className="animate-fade-in">
          <Card className="border-2 border-primary/20 mb-6">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl text-white">
                  <Icon name={courseData.icon as any} size={40} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{courseData.title}</CardTitle>
                  <p className="text-muted-foreground text-lg">{courseData.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Icon name="BookOpen" className="text-primary" size={20} />
                      <span className="font-semibold">{courseData.totalLessons} уроков</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle" className="text-success" size={20} />
                      <span className="font-semibold">{courseData.completedLessons} завершено</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {Math.round(progress)}% завершено
                  </Badge>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {courseData.lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className={`transition-all hover:shadow-lg animate-fade-in ${
                  lesson.locked ? 'opacity-60' : 'hover:scale-[1.02] cursor-pointer'
                } ${lesson.completed ? 'border-success/30 bg-success/5' : 'border-2'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        lesson.completed
                          ? 'bg-success text-white'
                          : lesson.locked
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-gradient-to-br from-primary to-secondary text-white'
                      }`}
                    >
                      <Icon
                        name={lesson.locked ? 'Lock' : lesson.completed ? 'CheckCircle' : (getTypeIcon(lesson.type) as any)}
                        size={28}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-xl mb-1">{lesson.title}</h3>
                          <p className="text-muted-foreground">{lesson.description}</p>
                        </div>
                        <Badge variant={lesson.type === 'task' ? 'default' : 'secondary'}>
                          {getTypeBadge(lesson.type)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Clock" size={16} />
                          <span>{lesson.duration}</span>
                        </div>

                        {!lesson.locked && (
                          <Button
                            variant={lesson.completed ? 'outline' : 'default'}
                            className={
                              lesson.completed
                                ? ''
                                : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                            }
                          >
                            {lesson.completed ? (
                              <>
                                <Icon name="RotateCcw" className="mr-2" size={18} />
                                Повторить
                              </>
                            ) : (
                              <>
                                <Icon name="Play" className="mr-2" size={18} />
                                Начать урок
                              </>
                            )}
                          </Button>
                        )}

                        {lesson.locked && (
                          <Button variant="outline" disabled>
                            <Icon name="Lock" className="mr-2" size={18} />
                            Заблокировано
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {progress === 100 && (
            <Card className="mt-6 bg-gradient-to-r from-success/10 to-accent/10 border-2 border-success/30 animate-scale-in">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">🎉</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl mb-2">Поздравляем с завершением курса!</h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      Вы успешно изучили все материалы курса "Личный бренд и продвижение"
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="Trophy" className="mr-2" size={18} />
                        Получить сертификат
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/')}>
                        <Icon name="BookOpen" className="mr-2" size={18} />
                        Следующий курс
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;