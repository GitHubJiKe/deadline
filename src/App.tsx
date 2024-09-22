import DeadlineCard from './DeadlineCard'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

function App() {
  return (
    <div className='flex justify-center items-center h-full gap-4 p-4 flex-col'>
      <DeadlineCard />
      <Button className='w-[40%]' variant="secondary"><PlusIcon /></Button>
    </div>
  )
}

export default App
