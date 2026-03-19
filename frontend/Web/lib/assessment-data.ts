export interface FormField {
  key: string
  label: string
  type: "select" | "number" | "radio"
  options?: { value: number; label: string }[]
  min?: number
  max?: number
  description?: string
}

export interface FormSection {
  id: string
  title: string
  description: string
  icon: string
  fields: FormField[]
}

// Reorganized into 6 logical groups based on emotional load
export const formSections: FormSection[] = [
  // Part 1: Basic Intro + Low Emotional Load
  {
    id: "basic-intro",
    title: "Basic Information",
    description: "Let's start with some basic details about you",
    icon: "user",
    fields: [
      {
        key: "Gender",
        label: "Gender",
        type: "radio",
        options: [
          { value: 0, label: "Female" },
          { value: 1, label: "Male" },
        ],
      },
      {
        key: "Age",
        label: "Age",
        type: "number",
        min: 16,
        max: 100,
      },
      {
        key: "Relationship_Status_Single",
        label: "Currently Single",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Relationship_Status_In a Relationship",
        label: "In a Relationship",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Relationship_Status_Married",
        label: "Married",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Relationship_Status_Divorced",
        label: "Divorced",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Academic Status",
        label: "Academic Status",
        type: "select",
        description: "Your current academic level",
        options: [
          { value: 1, label: "1 - First Year" },
          { value: 2, label: "2 - Second Year" },
          { value: 3, label: "3 - Third Year" },
          { value: 4, label: "4 - Fourth Year" },
          { value: 5, label: "5 - Graduate" },
        ],
      },
      {
        key: "Residential_Area_Hall",
        label: "Living in Hall/Dorm",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Residential_Area_With family",
        label: "Living with Family",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Residential_Area_Outside Hall",
        label: "Living Outside Hall",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Social Economic Status",
        label: "Socioeconomic Status",
        type: "select",
        description: "Your perceived socioeconomic level",
        options: [
          { value: 1, label: "1 - Very Low" },
          { value: 2, label: "2 - Low" },
          { value: 3, label: "3 - Average" },
          { value: 4, label: "4 - Above Average" },
          { value: 5, label: "5 - High" },
        ],
      },
    ],
  },

  // Part 2: Mood-Related Questions
  {
    id: "mood-related",
    title: "Mood & Emotions",
    description: "How have you been feeling lately?",
    icon: "heart",
    fields: [
      {
        key: "Melancholic",
        label: "Feeling melancholic or sad",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Feeling_Down",
        label: "Feeling down or depressed",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Future_Hopelessness",
        label: "Feeling hopeless about the future",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Hopelessness_EndFeeling",
        label: "Persistent feelings of hopelessness",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Self_Perceived_Failure",
        label: "Feeling like a failure",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Feeling_Insignificant",
        label: "Feeling insignificant",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Self_Confidence_Erosion",
        label: "Decreased self-confidence",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Interest_Loss",
        label: "Loss of interest in activities",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Anhedonia_No_Joy",
        label: "Unable to feel joy or pleasure",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Lack_of_Pleasure",
        label: "Lack of pleasure in activities you used to enjoy",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Meaninglessness",
        label: "Feeling life is meaningless",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Irritability",
        label: "Increased irritability",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Agitation_Level",
        label: "Feeling agitated",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Crying_Frequency",
        label: "Frequent crying",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
    ],
  },

  // Part 3: Behavioral / Lifestyle
  {
    id: "behavioral-lifestyle",
    title: "Lifestyle & Behavior",
    description: "Your daily habits and lifestyle patterns",
    icon: "activity",
    fields: [
      {
        key: "Work_While_Study",
        label: "Working while studying",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Workload_Academic_Demand",
        label: "High academic workload/demand",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Financial_Pressure",
        label: "Experiencing financial pressure",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Has_Debts",
        label: "Has debts",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Satisfied_Living_Environment",
        label: "Satisfied with living environment",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Physical_Activity",
        label: "Regular physical activity",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Social_Media_Hours",
        label: "Daily social media hours",
        type: "number",
        min: 0,
        max: 24,
      },
      {
        key: "Smoking",
        label: "Smoking",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Alcohol_Consumption",
        label: "Alcohol consumption",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Significant_Ailments",
        label: "Has significant ailments",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "On_Medication",
        label: "Currently on medication",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Social_Withdrawal",
        label: "Withdrawing from social activities",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Restlessness",
        label: "Feeling restless",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
    ],
  },

  // Part 4: Cognitive Patterns
  {
    id: "cognitive-patterns",
    title: "Cognitive Patterns",
    description: "Your thought patterns and mental clarity",
    icon: "brain",
    fields: [
      {
        key: "Difficulty_Focusing",
        label: "Difficulty focusing",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Low_Concentration",
        label: "Low concentration",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Indecisiveness",
        label: "Difficulty making decisions",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Performance_Decline",
        label: "Decline in performance",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Difficulty_Speaking_Socially",
        label: "Difficulty speaking in social settings",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Life_Feels_Hard",
        label: "Life feels hard",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Fear_Something_Bad",
        label: "Fear that something bad will happen",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Feels_Pitied",
        label: "Feeling pitied by others",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
    ],
  },

  // Part 5: Sleep / Energy / Physical
  {
    id: "sleep-energy-physical",
    title: "Sleep, Energy & Physical",
    description: "Your physical wellbeing and energy levels",
    icon: "moon",
    fields: [
      {
        key: "Sleep_Duration",
        label: "Average sleep hours per night",
        type: "number",
        min: 1,
        max: 16,
      },
      {
        key: "Insomnia",
        label: "Difficulty sleeping (insomnia)",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Fatigue_Frequency",
        label: "Frequent fatigue",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Easy_Fatigue",
        label: "Getting tired easily",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Low_Appetite",
        label: "Low appetite",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "High_Appetite",
        label: "Increased appetite",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
    ],
  },

  // Part 6: Sensitive Questions (Social Isolation, Trauma, Suicidal Thoughts)
  {
    id: "sensitive",
    title: "Personal Experiences",
    description:
      "These questions help us understand your support needs. Your responses are confidential.",
    icon: "shield",
    fields: [
      {
        key: "Feels_Others_Are_Kind",
        label: "Feel others are kind to you",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Share_Feelings_Lack",
        label: "Difficulty sharing feelings with others",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Social_LeftOut_Level",
        label: "Feeling left out socially",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Isolation_Frequency",
        label: "Frequent isolation from others",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "No_Support_Frequency",
        label: "Feeling unsupported",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Loneliness_Frequency",
        label: "Frequent feelings of loneliness",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Emotional_Alignment_Frequency",
        label: "Emotions feel misaligned or out of place",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Presence_Not_Genuine_Frequency",
        label: "Feeling your presence isn't genuine or valued",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Relationships_Unimportant_Level",
        label: "Relationships feel unimportant",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Lost_Someone_Recently",
        label: "Lost someone close recently",
        type: "radio",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Recent_Abuse_Experience",
        label: "Recent experience of abuse or trauma",
        type: "radio",
        description: "Your response is confidential",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "Suicidal_Thoughts",
        label: "Thoughts of self-harm or ending your life",
        type: "radio",
        description:
          "Please answer honestly - your response is confidential and helps us connect you with appropriate support",
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
    ],
  },
]

export const getDefaultFormData = (): Record<string, number> => {
  const data: Record<string, number> = {}
  formSections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.type === "number") {
        data[field.key] = field.min ?? 0
      } else {
        data[field.key] = 0
      }
    })
  })
  return data
}
