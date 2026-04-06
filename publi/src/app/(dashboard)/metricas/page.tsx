"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  CheckCircle2,
  Clock,
  FileText,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/store/use-app-store"

const weeklyData = [
  { semana: "Sem 1", publicaciones: 4 },
  { semana: "Sem 2", publicaciones: 6 },
  { semana: "Sem 3", publicaciones: 3 },
  { semana: "Sem 4", publicaciones: 8 },
  { semana: "Sem 5", publicaciones: 5 },
  { semana: "Sem 6", publicaciones: 7 },
  { semana: "Sem 7", publicaciones: 9 },
  { semana: "Sem 8", publicaciones: 6 },
]

const platformData = [
  { plataforma: "Instagram", publicaciones: 18 },
  { plataforma: "Facebook", publicaciones: 7 },
  { plataforma: "LinkedIn", publicaciones: 4 },
  { plataforma: "TikTok", publicaciones: 2 },
]

const summaryCards = [
  {
    icon: FileText,
    label: "Total publicaciones",
    value: "31",
    variation: "+8 vs período anterior",
    variationClassName: "text-green-600",
  },
  {
    icon: Clock,
    label: "Publicaciones programadas",
    value: "8",
    variation: "+2 vs período anterior",
    variationClassName: "text-green-600",
  },
  {
    icon: CheckCircle2,
    label: "Tasa de cumplimiento",
    value: "94%",
    variation: "+3% vs período anterior",
    variationClassName: "text-green-600",
  },
  {
    icon: Users,
    label: "Cuentas activas",
    value: "2",
    variation: "Sin cambios",
    variationClassName: "text-muted-foreground",
  },
] as const

const periodFilterOptions = [
  { label: "Última semana", value: "ultima-semana" },
  { label: "Último mes", value: "ultimo-mes" },
  { label: "Últimos 3 meses", value: "ultimos-3-meses" },
]

export default function MetricasPage() {
  const posts = useAppStore((state) => state.posts)
  const accounts = useAppStore((state) => state.accounts)
  const { toast } = useToast()

  const [selectedAccount, setSelectedAccount] = React.useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("ultima-semana")

  const statusData = React.useMemo(() => {
    const storeProgramadas = posts.filter((post) => post.status === "programada").length
    const storePublicadas = posts.filter((post) => post.status === "publicada").length
    const storeFallidas = posts.filter((post) => post.status === "fallida").length

    const data = [
      { name: "Programadas", value: storeProgramadas + 6, color: "#0095b6" },
      { name: "Publicadas", value: storePublicadas + 20, color: "#22c55e" },
      { name: "Fallidas", value: storeFallidas + 1, color: "#ef4444" },
    ]

    return data
  }, [posts])

  const totalStatusPosts = React.useMemo(
    () => statusData.reduce((acc, item) => acc + item.value, 0),
    [statusData]
  )

  const availableAccounts = React.useMemo(() => {
    const storeAccounts = accounts.map((account) => account.username)
    return Array.from(new Set([...storeAccounts, "@cafeelmolino", "@studiolucia"]))
  }, [accounts])

  const handleAccountFilterChange = React.useCallback(
    (value: string) => {
      setSelectedAccount(value)
      const label =
        value === "all"
          ? "Todas las cuentas"
          : availableAccounts.find((account) => account === value) ?? value

      toast({
        title: `Mostrando datos de ${label}`,
      })
    },
    [availableAccounts, toast]
  )

  const handlePeriodFilterChange = React.useCallback(
    (value: string) => {
      setSelectedPeriod(value)
      const label =
        periodFilterOptions.find((option) => option.value === value)?.label ?? value
      toast({
        title: `Mostrando datos del ${label}`,
      })
    },
    [toast]
  )

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Métricas</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Analizá el rendimiento de tus publicaciones
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Select value={selectedAccount} onValueChange={handleAccountFilterChange}>
            <SelectTrigger className="h-10 w-full sm:w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las cuentas</SelectItem>
              {availableAccounts.map((account) => (
                <SelectItem key={account} value={account}>
                  {account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={handlePeriodFilterChange}>
            <SelectTrigger className="h-10 w-full sm:w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periodFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(({ icon: Icon, label, value, variation, variationClassName }) => (
          <Card key={label}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-foreground">{value}</p>
              <p className={cn("mt-2 text-xs font-medium", variationClassName)}>{variation}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Publicaciones por semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="semana" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="publicaciones"
                  stroke="#0095b6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#0095b6" }}
                  activeDot={{ r: 6, fill: "#ffb703" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publicaciones por red social</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="plataforma" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "#ffb7031a" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Bar dataKey="publicaciones" fill="#0095b6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="flex justify-center">
        <Card className="w-full max-w-[500px]">
          <CardHeader>
            <CardTitle>Estado de publicaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Legend verticalAlign="bottom" />
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  stroke="none"
                  labelLine={false}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-2xl font-semibold"
                >
                  {totalStatusPosts}
                </text>
                <text
                  x="50%"
                  y="58%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-xs"
                >
                  Publicaciones
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              {statusData.map((item) => (
                <Badge key={item.name} className="text-white" style={{ backgroundColor: item.color }}>
                  {item.name}: {item.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
