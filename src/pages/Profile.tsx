import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  points: number;
}

interface Activity {
  id: number;
  type: 'course_complete' | 'lesson_complete' | 'achievement' | 'streak';
  title: string;
  description: string;
  date: string;
  points: number;
}

const Profile = () => {
  const navigate = useNavigate();

  const [userProfile] = useState({
    name: 'Анастасия Стасюк',
    email: 'anastasia@example.com',
    level: 9,
    currentXP: 1890,
    nextLevelXP: 2000,
    totalXP: 12450,
    joinDate: '01.09.2024',
    currentStreak: 12,
    longestStreak: 28,
    coursesCompleted: 2,
    totalCourses: 5,
    achievementsUnlocked: 8,
    totalAchievements: 15,
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'Первый шаг',
      description: 'Завершите первый урок',
      icon: '🎯',
      unlocked: true,
      date: '15.09.2024',
      points: 50,
    },
    {
      id: 2,
      title: 'Марафонец',
      description: '7 дней подряд',
      icon: '🔥',
      unlocked: true,
      date: '20.09.2024',
      points: 100,
    },
    {
      id: 3,
      title: 'Двухнедельный спринт',
      description: '14 дней подряд',
      icon: '⚡',
      unlocked: true,
      date: '27.09.2024',
      points: 200,
    },
    {
      id: 4,
      title: 'Первый курс',
      description: 'Завершите первый курс полностью',
      icon: '📚',
      unlocked: true,
      date: '05.10.2024',
      points: 300,
    },
    {
      id: 5,
      title: 'Мастер продаж',
      description: 'Получите 1000 баллов',
      icon: '⭐',
      unlocked: true,
      date: '25.10.2024',
      points: 500,
    },
    {
      id: 6,
      title: 'Покоритель вершин',
      description: 'Достигните 9 уровня',
      icon: '🏔️',
      unlocked: true,
      date: '28.10.2024',
      points: 400,
    },
    {
      id: 7,
      title: 'Эксперт брендинга',
      description: 'Завершите курс "Личный бренд"',
      icon: '💎',
      unlocked: true,
      date: '15.10.2024',
      points: 250,
    },
    {
      id: 8,
      title: 'Активный студент',
      description: 'Выполните 20 заданий',
      icon: '✅',
      unlocked: true,
      date: '22.10.2024',
      points: 150,
    },
    {
      id: 9,
      title: 'Знаток',
      description: 'Завершите 3 курса',
      icon: '🏆',
      unlocked: false,
      points: 600,
    },
    {
      id: 10,
      title: 'Месячный марафон',
      description: '30 дней подряд',
      icon: '🎖️',
      unlocked: false,
      points: 500,
    },
  ]);

  const [recentActivity] = useState<Activity[]>([
    {
      id: 1,
      type: 'achievement',
      title: 'Получено достижение',
      description: 'Покоритель вершин',
      date: '28.10.2024',
      points: 400,
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Получено достижение',
      description: 'Мастер продаж',
      date: '25.10.2024',
      points: 500,
    },
    {
      id: 3,
      type: 'lesson_complete',
      title: 'Урок завершён',
      description: 'Контент-план для соцсетей',
      date: '24.10.2024',
      points: 50,
    },
    {
      id: 4,
      type: 'streak',
      title: 'Серия продолжена',
      description: '12 дней подряд',
      date: '23.10.2024',
      points: 20,
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Получено достижение',
      description: 'Активный студент',
      date: '22.10.2024',
      points: 150,
    },
    {
      id: 6,
      type: 'lesson_complete',
      title: 'Урок завершён',
      description: 'Где искать клиентов в 2025 году',
      date: '21.10.2024',
      points: 50,
    },
    {
      id: 7,
      type: 'course_complete',
      title: 'Курс завершён',
      description: 'Личный бренд и продвижение',
      date: '15.10.2024',
      points: 300,
    },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_complete':
        return 'GraduationCap';
      case 'lesson_complete':
        return 'BookCheck';
      case 'achievement':
        return 'Trophy';
      case 'streak':
        return 'Flame';
      default:
        return 'Circle';
    }
  };

  const progressToNextLevel = (userProfile.currentXP / userProfile.nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-muted"
        >
          <Icon name="ArrowLeft" className="mr-2" size={18} />
          Назад к курсам
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                    <AvatarFallback className="text-3xl bg-accent text-accent-foreground font-bold">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
                  <p className="text-muted-foreground mb-4">{userProfile.email}</p>
                  
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Уровень</span>
                      <Badge variant="outline" className="text-lg px-3 py-1 font-bold">
                        {userProfile.level}
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">До {userProfile.level + 1} уровня</span>
                        <span className="font-semibold">{userProfile.currentXP} / {userProfile.nextLevelXP}</span>
                      </div>
                      <Progress value={progressToNextLevel} className="h-2" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Всего XP</span>
                      <span className="font-bold text-accent">{userProfile.totalXP}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Участник с</span>
                      <span className="font-semibold">{userProfile.joinDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-accent" size={24} />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="Flame" className="text-accent" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Текущая серия</div>
                      <div className="font-bold text-lg">{userProfile.currentStreak} дней</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Award" className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Лучшая серия</div>
                      <div className="font-bold text-lg">{userProfile.longestStreak} дней</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="BookOpen" className="text-accent" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Курсы завершено</div>
                      <div className="font-bold text-lg">{userProfile.coursesCompleted} / {userProfile.totalCourses}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Trophy" className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Достижения</div>
                      <div className="font-bold text-lg">{userProfile.achievementsUnlocked} / {userProfile.totalAchievements}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" className="text-accent" size={24} />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        achievement.unlocked
                          ? 'bg-accent/5 border-accent/30 hover:border-accent/50'
                          : 'bg-muted/30 border-muted opacity-60 grayscale'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`text-4xl ${achievement.unlocked ? 'animate-bounce-slow' : ''}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold mb-1">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="flex items-center justify-between">
                            {achievement.unlocked && achievement.date ? (
                              <Badge variant="outline" className="text-xs">
                                <Icon name="Calendar" className="mr-1" size={12} />
                                {achievement.date}
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                <Icon name="Lock" className="mr-1" size={12} />
                                Заблокировано
                              </Badge>
                            )}
                            <span className="text-sm font-semibold text-accent">+{achievement.points} XP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" className="text-accent" size={24} />
                  История активности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 bg-background rounded-lg">
                        <Icon name={getActivityIcon(activity.type) as any} className="text-accent" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-accent text-sm">+{activity.points}</div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
