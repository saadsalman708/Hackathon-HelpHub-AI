import Card from "@/components/ui/Card"
import FilterField from "./FilterField"
import type { FilterState } from "@/lib/types"

interface FilterFormProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
}

export default function FilterForm({ filters, setFilters }: FilterFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  return (
    <Card className="stack">
      <div>
        <p className="section-kicker">Filters</p>
        <h2>Refine the feed</h2>
      </div>
      
      <FilterField label="Category">
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Design">Design</option>
          <option value="Career">Career</option>
          <option value="Academics">Academics</option>
          <option value="Content">Content</option>
          <option value="Community">Community</option>
        </select>
      </FilterField>
      
      <FilterField label="Urgency">
        <select name="urgency" value={filters.urgency} onChange={handleChange}>
          <option value="">All urgency levels</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </FilterField>
      
      <FilterField label="Skills">
        <input
          name="skill"
          type="text"
          placeholder="React, Figma, Git/GitHub"
          value={filters.skill}
          onChange={handleChange}
        />
      </FilterField>
      
      <FilterField label="Location">
        <input
          name="location"
          type="text"
          placeholder="Karachi, Lahore, Remote"
          value={filters.location}
          onChange={handleChange}
        />
      </FilterField>
    </Card>
  )
}