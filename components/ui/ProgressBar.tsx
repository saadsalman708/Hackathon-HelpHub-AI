interface ProgressBarProps {
  percentage: number
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  const safePercentage = Math.min(Math.max(percentage, 0), 100)
  return (
    <div className="progress">
      <span style={{ width: `${safePercentage}%` }}></span>
    </div>
  )
}