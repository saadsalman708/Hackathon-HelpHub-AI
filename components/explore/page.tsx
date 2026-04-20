"use client"
import { useState } from "react"
import PageHero from "@/components/layout/PageHero"
import FilterForm from "@/components/explore/FilterForm"
import FeedResults from "@/components/explore/FeedResults"
import { useRequests } from "@/lib/hooks/useRequests"
import { useAuth } from "@/lib/hooks/useAuth"
import type { FilterState } from "@/lib/types"

export default function ExplorePage() {
  const { requests } = useRequests()
  const { users } = useAuth()
  
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    urgency: "",
    skill: "",
    location: "",
  })

  const filteredRequests = requests.filter((request) => {
    const matchCategory = !filters.category || request.category === filters.category
    const matchUrgency = !filters.urgency || request.urgency === filters.urgency
    
    const matchSkill = !filters.skill || 
      request.tags.join(" ").toLowerCase().includes(filters.skill.toLowerCase())
      
    const matchLocation = !filters.location || 
      request.location.toLowerCase().includes(filters.location.toLowerCase())

    return matchCategory && matchUrgency && matchSkill && matchLocation
  })

  return (
    <main className="container">
      <PageHero
        eyebrow="Explore / Feed"
        title="Browse help requests with filterable community context."
        subtitle="Filter by category, urgency, skills, and location to surface the best matches."
      />
      
      <section className="feed-grid section">
        <FilterForm filters={filters} setFilters={setFilters} />
        <FeedResults requests={filteredRequests} users={users} />
      </section>
    </main>
  )
}