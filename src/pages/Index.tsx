import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Course {
  id: number;
  title: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  icon: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface Student {
  id: number;
  name: string;
  points: number;
  level: number;
  avatar: string;
  rank: number;
}

interface Habit {
  id: number;
  title: string;
  streak: number;
  completedToday: boolean;
  goal: number;
}

const Index = () => {
  const [courses] = useState<Course[]>([
    { id: 1, title: 'Основы продаж', progress: 75, lessons: 12, completedLessons: 9, icon: 'Target' },
    { id: 2, title: 'Холодные звонки', progress: 45, lessons: 8, completedLessons: 4, icon: 'Phone' },
    { id: 3, title: 'Работа с возражениями', progress: 30, lessons: 10, completedLessons: 3, icon: 'MessageSquare' },
  ]);

  const [achievements] = useState<Achievement[]>([
    { id: 1, title: 'Первый шаг', description: 'Завершите первый урок', icon: '🎯', unlocked: true, date: '15.10.2024' },
    { id: 2, title: 'Марафонец', description: '7 дней подряд', icon: '🔥', unlocked: true, date: '20.10.2024' },
    { id: 3, title: 'Знаток', description: 'Завершите 3 курса', icon: '🏆', unlocked: false },
    { id: 4, title: 'Мастер продаж', description: 'Получите 1000 баллов', icon: '⭐', unlocked: true, date: '25.10.2024' },
  ]);

  const [leaderboard] = useState<Student[]>([
    { id: 1, name: 'Алексей Иванов', points: 2450, level: 12, avatar: '👨‍💼', rank: 1 },
    { id: 2, name: 'Мария Петрова', points: 2320, level: 11, avatar: '👩‍💼', rank: 2 },
    { id: 3, name: 'Вы', points: 1890, level: 9, avatar: '🚀', rank: 3 },
    { id: 4, name: 'Дмитрий Сидоров', points: 1650, level: 8, avatar: '👨', rank: 4 },
    { id: 5, name: 'Елена Козлова', points: 1420, level: 8, avatar: '👩', rank: 5 },
  ]);

  const [habits] = useState<Habit[]>([
    { id: 1, title: 'Утренний звонок клиенту', streak: 12, completedToday: true, goal: 30 },
    { id: 2, title: 'Изучение материалов', streak: 8, completedToday: true, goal: 21 },
    { id: 3, title: 'Практика презентации', streak: 5, completedToday: false, goal: 14 },
  ]);

  const userStats = {
    level: 9,
    points: 1890,
    nextLevelPoints: 2000,
    completedCourses: 2,
    totalCourses: 5,
    streak: 12,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                SalesAcademy
              </h1>
              <p className="text-muted-foreground text-lg">Игровая платформа обучения продажам</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-lg px-4 py-2 animate-pulse-glow">
                <Icon name="Zap" className="mr-2" size={20} />
                {userStats.points} XP
              </Badge>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Lvl {userStats.level}</div>
                <div className="text-xs text-muted-foreground">Уровень</div>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">Прогресс до уровня {userStats.level + 1}</span>
                <span className="text-sm text-muted-foreground">{userStats.points} / {userStats.nextLevelPoints} XP</span>
              </div>
              <Progress value={(userStats.points / userStats.nextLevelPoints) * 100} className="h-3" />
            </CardContent>
          </Card>
        </header>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="courses" className="gap-2">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Курсы</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Icon name="Trophy" size={18} />
              <span className="hidden sm:inline">Достижения</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Icon name="Medal" size={18} />
              <span className="hidden sm:inline">Рейтинг</span>
            </TabsTrigger>
            <TabsTrigger value="habits" className="gap-2">
              <Icon name="Target" size={18} />
              <span className="hidden sm:inline">Привычки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={course.id} className="hover:shadow-lg transition-all hover:scale-105 border-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl text-white mb-3">
                        <Icon name={course.icon as any} size={28} />
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {course.completedLessons}/{course.lessons}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-semibold text-primary">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Продолжить обучение
                        <Icon name="ArrowRight" className="ml-2" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card 
                  key={achievement.id} 
                  className={`text-center transition-all hover:scale-105 animate-fade-in ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30' 
                      : 'opacity-50 grayscale'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className={`text-6xl mb-3 ${achievement.unlocked ? 'animate-bounce-slow' : ''}`}>
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    {achievement.unlocked && achievement.date && (
                      <Badge variant="outline" className="text-xs">
                        <Icon name="Calendar" className="mr-1" size={12} />
                        {achievement.date}
                      </Badge>
                    )}
                    {!achievement.unlocked && (
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Lock" className="mr-1" size={12} />
                        Заблокировано
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Trophy" className="text-secondary" size={28} />
                  Топ участников
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((student, index) => (
                    <div
                      key={student.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-102 animate-fade-in ${
                        student.name === 'Вы'
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/40'
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className={`text-2xl font-bold ${
                        student.rank === 1 ? 'text-yellow-500' :
                        student.rank === 2 ? 'text-gray-400' :
                        student.rank === 3 ? 'text-orange-600' :
                        'text-muted-foreground'
                      }`}>
                        #{student.rank}
                      </div>
                      <div className="text-4xl">{student.avatar}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{student.name}</div>
                        <div className="text-sm text-muted-foreground">Уровень {student.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-primary">{student.points}</div>
                        <div className="text-xs text-muted-foreground">XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="habits" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit, index) => (
                <Card key={habit.id} className="border-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{habit.title}</CardTitle>
                      {habit.completedToday && (
                        <Badge className="bg-success">
                          <Icon name="Check" size={16} />
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🔥</div>
                      <div>
                        <div className="text-3xl font-bold text-secondary">{habit.streak}</div>
                        <div className="text-sm text-muted-foreground">дней подряд</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Цель: {habit.goal} дней</span>
                        <span className="font-semibold">{Math.round((habit.streak / habit.goal) * 100)}%</span>
                      </div>
                      <Progress value={(habit.streak / habit.goal) * 100} className="h-2" />
                    </div>
                    <Button 
                      variant={habit.completedToday ? "outline" : "default"}
                      className="w-full"
                      disabled={habit.completedToday}
                    >
                      {habit.completedToday ? (
                        <>
                          <Icon name="Check" className="mr-2" size={18} />
                          Выполнено сегодня
                        </>
                      ) : (
                        <>
                          <Icon name="Target" className="mr-2" size={18} />
                          Отметить выполнение
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🏆</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-1">Текущая серия: {userStats.streak} дней</h3>
                    <p className="text-muted-foreground">Продолжайте в том же духе! Каждый день приближает вас к мастерству.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
