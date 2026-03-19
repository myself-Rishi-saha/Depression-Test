"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Shield,
  AlertTriangle,
  Phone,
  RefreshCw,
  Heart,
  ExternalLink,
} from "lucide-react"

interface ResultDisplayProps {
  prediction: number
  confidence: number
  onReset: () => void
}

export function ResultDisplay({
  prediction,
  confidence,
  onReset,
}: ResultDisplayProps) {
  const isHighRisk = prediction === 1
  const confidencePercentage = (confidence * 100).toFixed(1)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Main Result Card */}
      <Card
        className={`p-8 text-center border-2 ${
          isHighRisk
            ? "border-destructive/50 bg-destructive/5"
            : "border-success/50 bg-success/5"
        }`}
      >
        <div
          className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 ${
            isHighRisk ? "bg-destructive/10" : "bg-success/10"
          }`}
        >
          {isHighRisk ? (
            <AlertTriangle className="h-10 w-10 text-destructive" />
          ) : (
            <Shield className="h-10 w-10 text-success" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-foreground">
          {isHighRisk
            ? "Elevated Risk Indicators Detected"
            : "Low Risk Indicators"}
        </h2>

        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {isHighRisk
            ? "Based on your responses, some indicators suggest you may benefit from speaking with a mental health professional."
            : "Based on your responses, your current indicators are within normal ranges. Continue maintaining healthy habits."}
        </p>

        {/* Confidence Score */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
          <span className="text-sm text-muted-foreground">
            Assessment Confidence:
          </span>
          <span className="text-sm font-semibold text-foreground">
            {confidencePercentage}%
          </span>
        </div>
      </Card>

      {/* Important Notice */}
      <Card className="p-6 bg-accent/10 border-accent/30">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Heart className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Important Notice
            </h3>
            <p className="text-sm text-muted-foreground">
              This assessment is not a clinical diagnosis. It uses machine
              learning to analyze patterns and should only be used as a
              preliminary screening tool. Please consult a qualified mental
              health professional for proper evaluation and support.
            </p>
          </div>
        </div>
      </Card>

      {/* Resources */}
      {isHighRisk && (
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Support Resources
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="tel:988"
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  988 Suicide & Crisis Lifeline
                </p>
                <p className="text-xs text-muted-foreground">
                  Call or text 988 (US)
                </p>
              </div>
            </a>
            <a
              href="https://www.samhsa.gov/find-help/national-helpline"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">SAMHSA Helpline</p>
                <p className="text-xs text-muted-foreground">
                  1-800-662-4357 (US)
                </p>
              </div>
            </a>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="gap-2"
          size="lg"
        >
          <RefreshCw className="h-4 w-4" />
          Take Assessment Again
        </Button>
      </div>
    </div>
  )
}
