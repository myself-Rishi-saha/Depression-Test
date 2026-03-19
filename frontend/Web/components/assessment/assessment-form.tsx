"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formSections, getDefaultFormData } from "@/lib/assessment-data"
import { AssessmentFormSection } from "./form-section"
import { ProgressIndicator } from "./progress-indicator"
import { ResultDisplay } from "./result-display"
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PredictionResult {
  prediction: number
  confidence: number
}

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, number>>(
    getDefaultFormData()
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const handleChange = useCallback((key: string, value: number) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction. Please try again.")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setFormData(getDefaultFormData())
    setResult(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isLastStep = currentStep === formSections.length - 1
  const currentSection = formSections[currentStep]

  if (result) {
    return (
      <ResultDisplay
        prediction={result.prediction}
        confidence={result.confidence}
        onReset={handleReset}
      />
    )
  }

  return (
    <div className="space-y-6">
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={formSections.length}
        sectionTitles={formSections.map((s) => s.title)}
      />

      <Card className="p-6 md:p-8">
        <AssessmentFormSection
          section={currentSection}
          formData={formData}
          onChange={handleChange}
        />
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex gap-2">
          {!isLastStep ? (
            <Button onClick={handleNext} className="gap-2">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Assessment</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
