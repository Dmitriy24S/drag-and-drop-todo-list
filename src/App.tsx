import { useState } from 'react'
import { DragDropContext, DragUpdate, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Column from './components/Column'
import initialData from './data/initialData'

export interface TaskType {
  id: string
  content: string
}

export interface ColumnsType {
  id: string
  title: string
  taskIds: string[]
}

interface DataType {
  tasks: {
    [T: string]: TaskType
  }
  columns: {
    [T: string]: ColumnsType
  }
  columnOrder: string[]
}

// const initialData = {
//   tasks: {
//     'task-1': { id: 'task-1', content: 'Take out the garbage' },
//     'task-2': { id: 'task-2', content: 'Watch my favorite show' },
//     'task-3': { id: 'task-3', content: 'Charge my phone' },
//     'task-4': { id: 'task-4', content: 'Cook dinner' }
//   },
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'Todo',
//       taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
//     }
//   },
// For reordering of the columns
//   columnOrder: ['column-1']
// }

function App() {
  const [data, setData] = useState<DataType>(initialData)

  // ! not used mess
  const columns = data.columnOrder.map((columnId) => {
    const column = data.columns[columnId]
    const tasks = column.taskIds.map((taskId) => data.tasks[taskId])
    return column.title
  })

  // reorder column
  // const onDragEnd = (result: any) => {
  const onDragEnd = (result: DropResult) => {
    // document.body.style.color = 'inherit'
    const { destination, source, draggableId } = result
    // outside
    if (!destination) {
      return
    }
    // same place
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    console.log('onDragEnd source', source);
    // onDragEnd source { index: 0, droppableId: 'column-1' }
    // onDragEnd column { id: 'column-1', title: 'Todo', taskIds: Array(4) }
    // onDragEnd newTaskIds(4)['task-1', 'task-2', 'task-3', 'task-4']
    const column = data.columns[source.droppableId] // 'column-1'
    console.log('onDragEnd column', column);
    // {index: 1, droppableId: 'column-1'}
    console.log('onDragEnd destination', destination);
    // {droppableId: 'column-1', index: 0}
    const newTaskIds = Array.from(column.taskIds) // avoid mutation? same arr make
    console.log('onDragEnd newTaskIds', newTaskIds);

    // modify new array:
    newTaskIds.splice(source.index, 1) // remove 1 item
    newTaskIds.splice(destination.index, 0, draggableId) // not remove, add item

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn
      }
    }

    setData(newState)
  }

  const onDragStart = () => {
    // document.body.style.color = 'orange'
  }

  const onDragUpdate = (update: DragUpdate) => {
    const { destination } = update
    const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0
    console.log('Object.keys(data.tasks)', Object.keys(data.tasks));
    // Object.keys(data.tasks)
    // (4) ['task-1', 'task-2', 'task-3', 'task-4']
    // 0: "task-1"
    // 1: "task-2"
    // 2: "task-3"
    // 3: "task-4"
    console.log('destination', destination);
    console.log('opacity', opacity);
    // destination {droppableId: 'column-1', index: 1}
    // opacity 0.25
    // destination {droppableId: 'column-1', index: 2}
    // opacity 0.5
    // destination {droppableId: 'column-1', index: 3}
    // opacity 0.75
    document.body.style.backgroundColor = `rgba(21, 81, 153, ${opacity})`
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <span>Drag & Drop</span>
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Container>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId])
            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>

      </DragDropContext >
    </div>
  )
}

export default App

const Container = styled.section`
margin-top: 2rem;
/* background-color: #242424; */
/* background-color: #0b0725; */
display: grid;
gap:2rem;
grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
`