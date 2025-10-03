'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { analyticsData } from '@/lib/data';

export function AnalyticsCharts() {
  const barChartConfig = {
    applications: {
      label: 'Applications',
      color: 'hsl(var(--chart-1))',
    },
  };

  const pieChartConfig = {
    value: {
      label: 'Internships',
    },
    ...analyticsData.industryEngagement.reduce((acc, cur) => {
      acc[cur.name] = { label: cur.name, color: cur.fill };
      return acc;
    }, {} as any)
  };

  const radarChartConfig = {
    required: {
      label: 'Skills Required',
      color: 'hsl(var(--chart-1))',
    },
    available: {
      label: 'Skills Available',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Student Participation</CardTitle>
          <CardDescription>Monthly internship applications</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={analyticsData.studentParticipation}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="applications"
                  fill="var(--color-applications)"
                  radius={8}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Industry Engagement</CardTitle>
          <CardDescription>Distribution of internships by industry</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square h-[300px]"
          >
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={analyticsData.industryEngagement}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
       <Card className="lg:col-span-5">
        <CardHeader>
          <CardTitle>Skill Gap Analysis</CardTitle>
          <CardDescription>
            Comparison of required skills vs. available student skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={radarChartConfig} className="h-[400px] w-full">
            <ResponsiveContainer>
              <RadarChart
                data={analyticsData.skillGaps.required.map((req, i) => ({
                  skill: req.skill,
                  required: req.value,
                  available: analyticsData.skillGaps.available[i].value,
                }))}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Radar
                  name="Required"
                  dataKey="required"
                  stroke="var(--color-required)"
                  fill="var(--color-required)"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Available"
                  dataKey="available"
                  stroke="var(--color-available)"
                  fill="var(--color-available)"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
