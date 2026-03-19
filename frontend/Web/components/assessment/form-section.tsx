"use client"

import { FormSection, FormField } from "@/lib/assessment-data"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  User,
  GraduationCap,
  Home,
  HeartPulse,
  Users,
  Brain,
  Activity,
  Thermometer,
  Lightbulb,
  HeartHandshake,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  user: <User className="h-5 w-5" />,
  "graduation-cap": <GraduationCap className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  "heart-pulse": <HeartPulse className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
  activity: <Activity className="h-5 w-5" />,
  thermometer: <Thermometer className="h-5 w-5" />,
  lightbulb: <Lightbulb className="h-5 w-5" />,
  "heart-handshake": <HeartHandshake className="h-5 w-5" />,
}

interface FormSectionProps {
  section: FormSection
  formData: Record<string, number>
  onChange: (key: string, value: number) => void
}

export function AssessmentFormSection({
  section,
  formData,
  onChange,
}: FormSectionProps) {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "radio":
        return (
          <RadioGroup
            value={String(formData[field.key] ?? 0)}
            onValueChange={(value) => onChange(field.key, Number(value))}
            className="flex gap-4"
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={String(option.value)}
                  id={`${field.key}-${option.value}`}
                  className="border-primary text-primary"
                />
                <Label
                  htmlFor={`${field.key}-${option.value}`}
                  className="font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "select":
        return (
          <Select
            value={String(formData[field.key] ?? 1)}
            onValueChange={(value) => onChange(field.key, Number(value))}
          >
            <SelectTrigger className="w-full max-w-xs bg-card">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "number":
        return (
          <Input
            type="number"
            min={field.min}
            max={field.max}
            value={formData[field.key] ?? field.min ?? 0}
            onChange={(e) => onChange(field.key, Number(e.target.value))}
            className="w-full max-w-xs bg-card"
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
          {iconMap[section.icon]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {section.title}
          </h2>
          <p className="text-sm text-muted-foreground">{section.description}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {section.fields.map((field) => (
          <div
            key={field.key}
            className="grid gap-2 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-foreground">
                {field.label}
              </Label>
              {field.description && (
                <p className="text-xs text-muted-foreground">
                  {field.description}
                </p>
              )}
            </div>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  )
}
