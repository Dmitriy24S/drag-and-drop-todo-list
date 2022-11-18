import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { ColumnsType, TaskType } from '../App'
import Task from './Task'

interface Props {
    column: ColumnsType
    tasks: TaskType[]
    index: number
}

const InnerList = ({ tasks }: { tasks: TaskType[] }) => {
    console.log('render?');
    return (
        <>
            {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
            ))}
        </>
    )
}
const MemoInnerList = React.memo(InnerList)


const Column = ({ column, tasks, index }: Props) => {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) =>
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Title {...provided.dragHandleProps}>
                        {column.title}
                    </Title>
                    <Droppable droppableId={column.id} type='task'>
                        {(provided, snapshot) =>
                            <TaskList
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                                {...provided.droppableProps}
                            >
                                {/* {tasks.map((task, index) => {
                                    return <Task key={task.id} task={task} index={index} />
                                })} */}
                                <MemoInnerList tasks={tasks} />
                                {provided.placeholder}
                            </TaskList>
                        }
                    </Droppable>
                </Container>
            }
        </Draggable>
    )
}

export default Column

interface TaskListProps {
    isDraggingOver: boolean
}

const Container = styled.div`
/* margin: 8px; */
/* border: 1px solid gray; */
/* border-radius: 2px; */
border: 1px solid #3a3737;
border-radius: 6px;
background-color: #242424;
display: flex;
flex-direction: column;
/* min-height: 200px; */
min-height: 295px;
margin-right: 2rem; // instead of grid parent gap -> fix spacing stutter on column reorder?
`

const Title = styled.h3`
padding: 8px;
color: #e52f4f;
`

const TaskList = styled.div<TaskListProps>`
padding: 8px;
transition: background-color 350ms ease;
background-color: ${props => (props.isDraggingOver ? '#1b1b1b' : '#242424')};
flex-grow: 1;
`