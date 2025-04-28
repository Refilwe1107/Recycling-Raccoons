import { Hero } from "./components/Hero"
import { DataVisualization } from "./components/DataVisualization"
import { EducationalSections } from "./components/EducationalSections"
import { RecyclingServices } from "./components/RecyclingServices"
import { PMDGuidelines } from "./components/PMDGuidelines"

function App() {
  return (
    <div className='min-h-screen bg-white'>
      <Hero />
      <RecyclingServices />
      <PMDGuidelines />
      <DataVisualization />
      <EducationalSections />
    </div>
  )
}

export default App
